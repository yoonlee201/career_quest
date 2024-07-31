'use server';

// import prisma from '@/server/db';
import NextAuth, { type DefaultSession } from 'next-auth';
// import authConfig from '~/src/auth.config';
import { cookies } from 'next/headers';
// import { v4 as uuidv4 } from 'uuid';

export type ExtendedUser = DefaultSession['user'] & {
    id: string;
    username: string;
    email: string;
    createdAt: Date;

    emailVerified: Date;
    isNewUser: boolean;
};

declare module 'next-auth' {
    interface Session extends DefaultSession {
        user: ExtendedUser;
    }
}

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
    unstable_update,
} = NextAuth({
    basePath: '/api/auth',
    pages: {
        signIn: '/auth/signin',
    },
    events: {
        async linkAccount({ user }) {
            const existingUser = await prisma.user.findUnique({
                where: { id: user.id },
                select: {
                    emailVerified: true,
                },
            });

            if (existingUser && !existingUser.emailVerified) {
                await prisma.user.update({
                    where: { id: user.id },
                    data: { emailVerified: new Date() },
                });
            }
        },
        async signOut({ session, token }: { session?: any; token?: any }) {
            if (session) {
                const { sessionToken = '' } = session as unknown as {
                    sessionToken?: string;
                };
                if (sessionToken) {
                    await prisma.session.deleteMany({
                        where: {
                            sessionToken,
                        },
                    });
                }
            } else if (token) {
                const sessionToken = token.id as string | undefined;
                if (sessionToken) {
                    await prisma.session.deleteMany({
                        where: {
                            sessionToken,
                        },
                    });
                }
            }
        },
    },
    callbacks: {
        async signIn({ user, account }) {
            if (!user.email) {
                return false;
            }

            const existingUser = await prisma.user.findFirst({
                where: {
                    OR: [{ id: user.id }, { email: user.email }],
                },
                select: {
                    id: true,
                    emailVerified: true,
                },
            });

            if (account?.provider !== 'credentials') {
                const existingAccount = await prisma.account.findFirst({
                    where: {
                        provider: account?.provider,
                        providerAccountId: account?.providerAccountId,
                    },
                });
                if (existingUser && !existingAccount) {
                    await prisma.account.create({
                        data: {
                            userId: existingUser.id,
                            type: account!.type,
                            provider: account!.provider,
                            providerAccountId: account!.providerAccountId,
                            access_token: account?.access_token,
                            expires_at: account?.expires_at,
                            token_type: account?.token_type,
                            scope: account?.scope,
                            id_token: account?.id_token,
                            refresh_token: account?.refresh_token,
                        },
                    });
                }

                return true;
            } else {
                if (!existingUser || !existingUser.emailVerified) {
                    return false;
                }
            }

            return true;
        },
    },
});

export const signInWithSocial = async (
    provider: 'github' | 'discord',
    callbackUrl: string = '/signin'
) => {
    await signIn(provider, {
        redirectTo: callbackUrl,
        forceRefreshSession: true,
    });
};
