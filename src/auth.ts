// import prisma from '@/server/db';
// import NextAuth, { type DefaultSession } from 'next-auth';
// // import authConfig from '~/src/auth.config';
// // import { Role } from '@prisma/client';
// import { cookies } from 'next/headers';
// // import { v4 as uuidv4 } from 'uuid';

// export type ExtendedUser = DefaultSession['user'] & {
//     id: string;
//     username: string;
//     role: Role;
//     email: string;
//     createdAt: Date;
//     emailVerified: Date;
//     isNewUser: boolean;
// };

// declare module 'next-auth' {
//     interface Session extends DefaultSession {
//         user: ExtendedUser;
//     }
// }

// export const {
//     handlers: { GET, POST },
//     auth,
//     signIn,
//     signOut,
//     unstable_update,
// } = NextAuth({
//     basePath: '/api/auth',
//     pages: {
//         signIn: '/auth/signin',
//     },
//     events: {
//         async linkAccount({ user }) {
//             const existingUser = await prisma.user.findUnique({
//                 where: { id: user.id },
//                 select: {
//                     emailVerified: true,
//                 },
//             });

//             if (existingUser && !existingUser.emailVerified) {
//                 await prisma.user.update({
//                     where: { id: user.id },
//                     data: { emailVerified: new Date() },
//                 });
//             }
//         },
//         async signOut({ session, token }: { session?: any; token?: any }) {
//             if (session) {
//                 const { sessionToken = '' } = session as unknown as {
//                     sessionToken?: string;
//                 };
//                 if (sessionToken) {
//                     await prisma.session.deleteMany({
//                         where: {
//                             sessionToken,
//                         },
//                     });
//                 }
//             } else if (token) {
//                 const sessionToken = token.id as string | undefined;
//                 if (sessionToken) {
//                     await prisma.session.deleteMany({
//                         where: {
//                             sessionToken,
//                         },
//                     });
//                 }
//             }
//         },
//     },
//     callbacks: {
//         async redirect({ url, baseUrl }) {
//             if (url.startsWith(baseUrl)) {
//                 return url;
//             } else if (url.startsWith('/')) {
//                 return new URL(url, baseUrl).toString();
//             }
//             // Return the original URL if it doesn't match the expected patterns
//             return url;
//         },
//         async jwt({ user, token, account }) {
//             // Override default jwt callback behavior.
//             // Create a session instead and then return that session token for use in the
//             // `jwt.encode` callback below.
//             if (user) {
//                 const sessionToken = uuidv4();
//                 const sessionExpiry = new Date(Date.now() + 2592000 * 1000); // 30 days
//                 const session = await prisma.session.create({
//                     data: {
//                         sessionToken,
//                         expires: sessionExpiry,
//                         user: {
//                             connect: {
//                                 id: user.id,
//                             },
//                         },
//                     },
//                 });

//                 cookies().set('next-auth.session-token', sessionToken, {
//                     expires: sessionExpiry,
//                 });
//                 token.id = session.sessionToken;
//             }

//             return token;
//         },
//         async signIn({ user, account }) {
//             if (!user.email) {
//                 return false;
//             }

//             const existingUser = await prisma.user.findFirst({
//                 where: {
//                     OR: [{ id: user.id }, { email: user.email }],
//                 },
//                 select: {
//                     id: true,
//                     emailVerified: true,
//                 },
//             });

//             if (account?.provider !== 'credentials') {
//                 const existingAccount = await prisma.account.findFirst({
//                     where: {
//                         provider: account?.provider,
//                         providerAccountId: account?.providerAccountId,
//                     },
//                 });
//                 if (existingUser && !existingAccount) {
//                     await prisma.account.create({
//                         data: {
//                             userId: existingUser.id,
//                             type: account!.type,
//                             provider: account!.provider,
//                             providerAccountId: account!.providerAccountId,
//                             access_token: account?.access_token,
//                             expires_at: account?.expires_at,
//                             token_type: account?.token_type,
//                             scope: account?.scope,
//                             id_token: account?.id_token,
//                             refresh_token: account?.refresh_token,
//                         },
//                     });
//                 }

//                 return true;
//             } else {
//                 if (!existingUser || !existingUser.emailVerified) {
//                     return false;
//                 }
//             }

//             return true;
//         },
//         async session({ session, user }) {
//             if (session.user) {
//                 const existingUser = await prisma.user.findUnique({
//                     where: {
//                         id: user.id,
//                     },
//                 });

//                 if (existingUser) {
//                     session.user.id = existingUser.id;
//                     session.user.role = existingUser.role as Role;
//                     session.user.email = existingUser.email;
//                     session.user.username = existingUser.username;
//                     session.user.emailVerified = existingUser.emailVerified!;
//                     session.user.createdAt = existingUser.createdAt;
//                     session.user.isNewUser = existingUser.isNewUser;
//                 }
//             }

//             return session;
//         },
//     },
//     jwt: {
//         async encode({ token }) {
//             // This is the string returned from the `jwt` callback above.
//             // It represents the session token that will be set in the browser.
//             return token?.id as unknown as string;
//         },
//         async decode() {
//             // Disable default JWT decoding.
//             // This method is really only used when using the email provider.
//             return null;
//         },
//     },
//     session: {
//         strategy: 'database',
//         generateSessionToken: () => uuidv4(),
//     },
//     ...authConfig,
//     debug: process.env.NODE_ENV === 'development',
// });
