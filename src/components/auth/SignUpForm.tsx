import * as React from "react";
import { SocialButton } from "./SocialButton";
import { InputField } from "./InputField";
import { FaGithub, FaGoogle } from "react-icons/fa";

export const SignUpForm: React.FC = () => {
    const [showSignin, selectShowSignin] = React.useState(false);

    const toggleSignin = () => {
        selectShowSignin(!showSignin);
    };

    return (
        <div className="flex flex-col rounded-none max-w-[750px]">
            <div className="flex flex-col pb-9 mt-3 w-full bg-white rounded-lg shadow-[0px_8px_24px_rgba(0,0,0,0.25)] max-md:max-w-full">
                <div className="px-14 py-4 text-sm font-medium leading-none text-center text-green-700 bg-green-50 rounded-lg max-md:px-5 max-md:max-w-full">
                    Let's learn, share & inspire each other with our passion for
                    computer engineering. Sign up now 🤘🏼
                </div>

                <div className="self-center mt-6 w-full max-w-[664px] max-md:max-w-full">
                    <div className="flex gap-5 max-md:flex-col">
                        <form className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                            <div className="flex flex-col w-full text-base font-medium text-zinc-500 max-md:mt-6">
                                <h2 className="self-start text-2xl font-bold text-black mb-6">
                                    {showSignin ? "Sign In" : "Create Account"}
                                </h2>

                                <div className="rounded-md overflow-hidden border border-solid border-zinc-300">
                                    <div
                                        className={`w-full leading-none bg-slate-50 border-zinc-300 ${
                                            showSignin ? "hidden" : "flex"
                                        }`}
                                    >
                                        <InputField
                                            label="First Name"
                                            id="firstName"
                                            type="text"
                                        />
                                        <InputField
                                            label="Last Name"
                                            id="lastName"
                                            type="text"
                                        />
                                    </div>

                                    <InputField
                                        label="Email"
                                        id="email"
                                        type="email"
                                    />
                                    <InputField
                                        label="Password"
                                        id="password"
                                        type="password"
                                        hasIcon
                                        iconSrc="https://cdn.builder.io/api/v1/image/assets/f01b86e2ed6a450e894cbf49dfa4b291/ed19c7c1708ba88a08321b986c00bedc6d9b8ee6d701533956509bd0192e8ec5?apiKey=f01b86e2ed6a450e894cbf49dfa4b291&"
                                    />
                                    <InputField
                                        label="Confirm Password"
                                        id="confirmPassword"
                                        type="password"
                                        className={`${
                                            showSignin ? "hidden" : " "
                                        }`}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="px-16 py-3 mt-5 text-sm font-semibold leading-none text-center text-white bg-blue-600 rounded-3xl max-md:px-5"
                                >
                                    {showSignin ? "Sign In" : "Create Account"}
                                </button>

                                <SocialButton
                                    icon={<FaGithub />}
                                    text={`${
                                        showSignin ? "Sign In" : "Sign Up"
                                    } with Github`}
                                />
                                <SocialButton
                                    icon={<FaGoogle />}
                                    text={`${
                                        showSignin ? "Sign In" : "Sign Up"
                                    } with Google`}
                                />
                            </div>
                        </form>

                        <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                            <div className="flex flex-col grow mt-2 text-right max-md:mt-8">
                                <div className="self-end text-sm text-neutral-700">
                                    {showSignin
                                        ? "Don't have an account?  "
                                        : "Already have an account?"}
                                    <button
                                        className="font-semibold text-blue-600"
                                        onClick={toggleSignin}
                                    >
                                        {showSignin ? "Sign Up" : "Sign In"}
                                    </button>
                                </div>
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/f01b86e2ed6a450e894cbf49dfa4b291/415c612dbd7805ec95c26d029b3cc2f3f90a06fbb9017c646c04792b36a46ea7?apiKey=f01b86e2ed6a450e894cbf49dfa4b291&"
                                    alt="Sign up illustration"
                                    className="object-contain mt-8 w-full aspect-square"
                                />
                                <div className="mt-3 text-xs tracking-normal leading-none text-gray-800 max-md:ml-1">
                                    By signing up, you agree to our
                                    <a href="">Terms & conditions</a>,
                                    <a href="">Privacy policy</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
