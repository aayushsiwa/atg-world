import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SignUpForm } from "./auth/SignUpForm";
import close from "../assets/close.svg";
import { auth, logOut } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

export const Navbar: React.FC = () => {
    const [showSignup, setShowSignup] = useState(false);
    const [user, setUser] = useState(null);
    const [showProfile, setShowProfile] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Listen for authentication state changes
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                setShowSignup(false); // Close signup form when a user signs in
            } else {
                setUser(null);
            }
            setShowProfile(false); // Reset profile menu to default closed state
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target as Node)
            ) {
                setShowProfile(false);
            }
        };

        if (showProfile) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showProfile]);

    const handleSignup = () => {
        setShowSignup(true);
    };

    const closeSignup = () => {
        setShowSignup(false);
    };

    const toggleProfile = () => {
        if (user) {
            setShowProfile((prev) => !prev);
        }
    };

    return (
        <>
            <div className="flex flex-wrap gap-5 justify-between items-center px-20 py-4 w-full font-medium bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.12)] max-md:px-5 max-md:max-w-full">
                <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/18dfc9c3aa3114a0e0385d7dcf110f2c521429a580ce8cb639399ac20bca5ec1?placeholderIfAbsent=true&apiKey=f01b86e2ed6a450e894cbf49dfa4b291"
                    alt="Company Logo"
                    className="object-contain shrink-0 self-stretch my-auto max-w-full aspect-[6.8] w-[163px]"
                />
                <div className="flex gap-3.5 self-stretch px-3.5 py-2.5 text-sm rounded-3xl bg-zinc-100 text-zinc-600 w-96">
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/e7ff6d9700f3a724b9f912b0cf80e51d26afeb7f68ca09c78c3370b7d6e942ed?placeholderIfAbsent=true&apiKey=f01b86e2ed6a450e894cbf49dfa4b291"
                        alt="Search Icon"
                        className="object-contain shrink-0 aspect-square w-[22px]"
                    />
                    <input
                        type="text"
                        className="flex-auto bg-transparent focus:outline-none"
                        placeholder="Search for your favorite groups in ATG"
                    />
                </div>
                <div className="flex self-stretch my-auto text-base text-right text-zinc-800">
                    {user ? (
                        <div className="relative" ref={profileRef}>
                            <img
                                src={user.photoURL}
                                alt=""
                                className="h-14 w-14"
                            />
                            <button className="flex" onClick={toggleProfile}>
                                <span className="grow cursor-pointer select-none">
                                    Welcome,{" "}
                                    <span className="font-bold text-blue-600">
                                        {user.displayName || user.email}
                                    </span>
                                </span>
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/599adac2e5c01a1005c41b85e90850d581d9ccabed4aa883da3d5907c0123223?placeholderIfAbsent=true&apiKey=f01b86e2ed6a450e894cbf49dfa4b291"
                                    alt="Account Options"
                                    className="object-contain shrink-0 w-6 aspect-square"
                                />
                            </button>

                            <div
                                className={`${
                                    showProfile ? "flex flex-col" : "hidden"
                                }
                                z-10 w-full absolute border bg-white 
                                `}
                            >
                                <button
                                    className="text-base text-left font-light text-black p-2 hover:border hover:border-blue-500 border border-white w-full"
                                    onClick={() => navigate("/edit-profile")}
                                >
                                    Edit Profile
                                </button>
                                <button
                                    className="text-base text-left font-light text-red-500 p-2 hover:border hover:border-red-500 border border-white w-full"
                                    onClick={logOut}
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button
                            className="grow cursor-pointer select-none"
                            onClick={handleSignup}
                        >
                            <span className="text-zinc-800">
                                Create account.{" "}
                            </span>
                            <span className="font-bold text-blue-600">
                                It's free!
                            </span>
                        </button>
                    )}
                </div>
            </div>

            {/* Overlay and Signup Card */}
            {showSignup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    {/* Signup Card */}
                    <div className="rounded-lg p-8 relative ">
                        <img
                            src={close}
                            alt=""
                            className="absolute top-0 right-0 cursor-pointer"
                            onClick={closeSignup}
                        />
                        <SignUpForm />
                    </div>
                </div>
            )}
        </>
    );
};
