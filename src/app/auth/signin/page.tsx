import Link from 'next/link';
// import { getServerAuthSession } from '@/server/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faDiscord } from '@fortawesome/free-brands-svg-icons';
import { signIn } from '@/server/auth';

export default async function Home() {
    //   const hello = await api.post.hello({ text: "from tRPC" });
    // const session = await getServerAuthSession();

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
            <div className="flex h-full min-h-screen items-center justify-center p-4 font-[sans-serif]">
                <div className="mx-auto w-full max-w-md">
                    <form className="rounded-2xl bg-white bg-opacity-70 p-6 shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)]">
                        <div className="mb-12">
                            <h3 className="text-3xl font-extrabold text-gray-800">
                                Sign in
                            </h3>
                        </div>

                        <div>
                            <div className="relative flex items-center">
                                <input
                                    name="email"
                                    type="text"
                                    required
                                    className="w-full border-b border-gray-400 bg-transparent px-2 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-800 focus:border-gray-800"
                                    placeholder="Enter email"
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="#333"
                                    stroke="#333"
                                    className="absolute right-2 h-[18px] w-[18px]"
                                    viewBox="0 0 682.667 682.667">
                                    <defs>
                                        <clipPath
                                            id="a"
                                            clipPathUnits="userSpaceOnUse">
                                            <path
                                                d="M0 512h512V0H0Z"
                                                data-original="#000000"></path>
                                        </clipPath>
                                    </defs>
                                    <g
                                        clip-path="url(#a)"
                                        transform="matrix(1.33 0 0 -1.33 0 682.667)">
                                        <path
                                            fill="none"
                                            stroke-miterlimit="10"
                                            stroke-width="40"
                                            d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                                            data-original="#000000"></path>
                                        <path
                                            d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                                            data-original="#000000"></path>
                                    </g>
                                </svg>
                            </div>
                        </div>

                        <div className="mt-6">
                            <div className="relative flex items-center">
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    className="w-full border-b border-gray-400 bg-transparent px-2 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-800 focus:border-gray-800"
                                    placeholder="Enter password"
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="#333"
                                    stroke="#333"
                                    className="absolute right-2 h-[18px] w-[18px] cursor-pointer"
                                    viewBox="0 0 128 128">
                                    <path
                                        d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                                        data-original="#000000"></path>
                                </svg>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 shrink-0 rounded border-gray-300"
                                />
                                <label
                                    htmlFor="remember-me"
                                    className="ml-3 block text-sm text-gray-800">
                                    Remember me
                                </label>
                            </div>
                            <div>
                                <a
                                    href="jajvascript:void(0);"
                                    className="text-sm font-semibold text-blue-600 hover:underline">
                                    Forgot Password?
                                </a>
                            </div>
                        </div>

                        <div className="mt-12">
                            <button
                                type="button"
                                className="w-full rounded-full bg-gray-800 px-4 py-2.5 text-sm font-semibold tracking-wider text-white hover:bg-[#222] focus:outline-none">
                                Sign in
                            </button>
                            <p className="mt-6 text-center text-sm text-gray-800">
                                Don't have an account{' '}
                                <a
                                    href="javascript:void(0);"
                                    className="ml-1 whitespace-nowrap font-semibold text-blue-600 hover:underline">
                                    Register here
                                </a>
                            </p>
                        </div>

                        <hr className="my-6 border-gray-400" />

                        <div className="flex justify-center space-x-8">
                            <Link
                                href={'/api/auth/signin/discord'}
                                // onClick={async () => {
                                //     await signIn('discord');
                                // }}
                                className="h-8 w-8 border-none text-black outline-none">
                                <FontAwesomeIcon icon={faDiscord} />
                            </Link>
                            <button
                                // href={'/api/auth/signin/github'}
                                onClick={async () => {
                                    await signIn('github', {
                                        redirectTo: '/auth/signin',
                                        forceRefreshSession: true,
                                    });
                                }}
                                className="h-8 w-8 border-none text-black outline-none">
                                <FontAwesomeIcon icon={faGithub} />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
