import Link from 'next/link';

// import { LatestPost } from '~/app/_components/post';
import { getServerAuthSession } from '@/server/auth';
// import { api, HydrateClient } from '~/trpc/server';

export default async function Home() {
    //   const hello = await api.post.hello({ text: "from tRPC" });
    const session = await getServerAuthSession();

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
            <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
                <div className="flex flex-col items-center gap-2">
                    <div className="flex flex-col items-center justify-center gap-4">
                        <p className="text-center text-2xl text-white">
                            {session && (
                                <span>Logged in as {session.user?.name}</span>
                            )}
                        </p>
                        {/* <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
            >
              {session ? "Sign out" : "Sign in"}
            </Link> */}
                        <Link
                            href={
                                session
                                    ? '/api/auth/signout'
                                    : '/api/auth/signin'
                            }
                            className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20">
                            {session ? 'Sign out' : 'Sign in'}
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
