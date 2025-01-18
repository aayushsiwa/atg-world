import React, { useEffect, useRef, useState } from "react";
import type { PostProps } from "./types";
import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { Post } from "./Post";
import { BiInfoCircle } from "react-icons/bi";
import { MdModeEditOutline } from "react-icons/md";
import { LiaMapMarkerAltSolid } from "react-icons/lia";
import { auth } from "../../firebase";
import thumbsUp from "../assets/twotone-thumb_up-24px.png";
import leisure from "../assets/leisure.png";
import mba from "../assets/mba.png";
import philosophy from "../assets/philosophy.png";
import activism from "../assets/activism.png";

const posts: PostProps[] = [
    {
        type: "Article",
        icon: "✍️",
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/133164333fe2ff035cff9cdc4e800c0dba7b8550ffe0231579e93b1d7a188545?placeholderIfAbsent=true&apiKey=f01b86e2ed6a450e894cbf49dfa4b291",
        title: "What if famous brands had regular fonts? Meet RegulaBrands!",
        description:
            "I've worked in UX for the better part of a decade. From now on, I plan to rei…",
        author: {
            name: "Sarthak Kamra",
            avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/fec27c71a2f15635fe1ef966b9c613e0570b8b29deb6c4e73fb797607b225f81?placeholderIfAbsent=true&apiKey=f01b86e2ed6a450e894cbf49dfa4b291",
        },
        views: 1.4,
    },
    {
        type: "Education",
        icon: "🔬️",
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/32795a90d108c2a108de75638126f3476e2146d75848ee9a62ea82a7e5691f15?placeholderIfAbsent=true&apiKey=f01b86e2ed6a450e894cbf49dfa4b291",
        title: "Tax Benefits for Investment under National Pension Scheme launched by Government",
        description:
            "I've worked in UX for the better part of a decade. From now on, I plan to rei…",
        author: {
            name: "Sarah West",
            avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/ac21edf5aa0e6167036ba8e0da8a9ff3fbec79f4a5fab56e4332923fc3891bdd?placeholderIfAbsent=true&apiKey=f01b86e2ed6a450e894cbf49dfa4b291",
        },
        views: 1.4,
    },
    {
        type: "Meetup",
        icon: "🗓️",
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/75beb1e513788d8155acf07a79693792156eccb8ebfd5cfc84aa8e6447d06163?placeholderIfAbsent=true&apiKey=f01b86e2ed6a450e894cbf49dfa4b291",
        title: "Finance & Investment Elite Social Mixer @Lujiazui",
        date: "Fri, 12 Oct, 2018",
        location: "Ahmedabad, India",
        actionButton: {
            text: "Visit Website",
            variant: "danger",
        },
        author: {
            name: "Ronal Jones",
            avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/35f65710c246e261b90637bb6ee2ccf3028220c65d843c9de2471f06d4ac14c2?placeholderIfAbsent=true&apiKey=f01b86e2ed6a450e894cbf49dfa4b291",
        },
        views: 1.4,
    },
    {
        type: "Job",
        icon: "💼️",
        image: "",
        title: "Software Developer",
        description: "Innovaccer Analytics Private Ltd.",
        location: "Noida, India",
        actionButton: {
            text: "Apply on Timesjobs",
            variant: "primary",
        },
        author: {
            name: "Joseph Gray",
            avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/7f9ab40cba54a40c01a9246de1c75866366de8027d2732528f28e9c5426b9704?placeholderIfAbsent=true&apiKey=f01b86e2ed6a450e894cbf49dfa4b291",
        },
        views: 1.4,
    },
];

export const SocialFeed: React.FC = () => {
    const [location, setLocation] = useState("Noida, India");
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [followedGroups, setFollowedGroups] = useState<string[]>([]);
    const [menuOpenPostIndex, setMenuOpenPostIndex] = useState<number | null>(
        null
    );
    const menuRefs = useRef<(HTMLDivElement | null)[]>([]);
    const handleToggleMenu = (index: number) => {
        setMenuOpenPostIndex(menuOpenPostIndex === index ? null : index);
    };
    console.log(location, loading);
    const toggleFollow = (groupName: string) => {
        setFollowedGroups((prevState) =>
            prevState.includes(groupName)
                ? prevState.filter((group) => group !== groupName)
                : [...prevState, groupName]
        );
    };

    useEffect(() => {
        // Track user login state
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setLoggedIn(!!user); // Set loggedIn to true if user exists
            setLoading(false); // Stop loading once state is determined
        });

        // Cleanup listener on unmount
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuOpenPostIndex !== null &&
                menuRefs.current[menuOpenPostIndex] &&
                !menuRefs.current[menuOpenPostIndex]?.contains(
                    event.target as Node
                )
            ) {
                setMenuOpenPostIndex(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuOpenPostIndex]);

    return (
        <div className="flex overflow-hidden flex-col pb-24 bg-white">
            <Navbar />
            <Hero />
            <div className="flex flex-col self-center mt-10 w-full max-w-7xl max-md:max-w-full">
                <div className="flex flex-wrap gap-5 justify-between w-full max-md:max-w-full">
                    <div className="flex gap-5 my-auto text-base text-zinc-500">
                        <div className="grow text-black">All Posts(32)</div>
                        <div>Article</div>
                        <div>Event</div>
                        <div>Education</div>
                        <div>Job</div>
                    </div>
                    <div className="flex gap-4 text-base font-medium">
                        <button className="flex gap-2.5 py-2 pr-1.5 pl-3 text-black bg-gray-100 rounded">
                            Write a Post
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/116413c433e5cc4a13c5bf87ef4db6ab770f03f24a08e4e5bceacb8cb3609f99?placeholderIfAbsent=true&apiKey=f01b86e2ed6a450e894cbf49dfa4b291"
                                alt="Write post"
                                className="object-contain shrink-0 aspect-square w-[22px]"
                            />
                        </button>
                        <button className="flex gap-1.5 px-2.5 py-2 text-white bg-blue-600 rounded">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/593abf18dc09d8e607ebc66982ffc0356af336e81e28ee8c53a82d049fd0efae?placeholderIfAbsent=true&apiKey=f01b86e2ed6a450e894cbf49dfa4b291"
                                alt="Join group"
                                className="object-contain shrink-0 aspect-square w-[22px]"
                            />
                            Join Group
                        </button>
                    </div>
                </div>
                <div className="shrink-0 mt-3 w-full h-px border border-solid border-neutral-200" />
                <div className="z-10 shrink-0 h-px border border-black border-solid w-[93px]" />
                <div className="mt-7 max-md:max-w-full">
                    <div className="flex justify-between max-md:flex-col">
                        <div className="flex flex-col max-md:ml-0 max-md:w-full w-8/12">
                            <div className="flex flex-col grow max-md:mt-10 max-md:max-w-full">
                                {posts.map((post, index) => (
                                    <div
                                        key={index}
                                        className={index > 0 ? "mt-3.5" : ""}
                                        ref={(el) =>
                                            (menuRefs.current[index] = el)
                                        }
                                    >
                                        <Post
                                            {...post}
                                            isMenuOpen={
                                                menuOpenPostIndex === index
                                            }
                                            onToggleMenu={() =>
                                                handleToggleMenu(index)
                                            }
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* <div className="flex flex-col ml-5 w-[26%] max-md:ml-0 max-md:w-full">
                            <div className="flex flex-col mt-7 w-full text-black max-md:mt-10">
                                <div className="flex gap- pb-2 justify-between  text-base border-b border-zinc-300">
                                    <div className="flex gap-1 self-start items-center">
                                        <div>Noida, India</div>
                                        <input
                                            type="text"
                                            name=""
                                            id=""
                                            value={location}
                                        />
                                    </div>
                                    
                                </div>
                                <div className="shrink-0 mt-2.5 h-0 border-zinc-400" />
                                <div className="flex gap-2 mt-8 text-sm items-center justify-center">
                                    <BiInfoCircle className="text-3xl text-zinc-400" />
                                    <span className="text-zinc-400">
                                        Your location will help us serve better
                                        and extend a personalised experience.
                                    </span>
                                </div>
                            </div>
                        </div> */}

                        <div className="w-3/12">
                            <div>
                                <div className="w-full flex text-base items-center justify-between relative pb-2 border-b border-b-zinc-300">
                                    <LiaMapMarkerAltSolid className="absolute left-0 z-10 text-xl" />
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        onChange={(e) =>
                                            setLocation(e.target.value)
                                        }
                                        className="w-full px-6 pe-8 focus:outline-none"
                                        placeholder="Enter your location"
                                    />
                                    <MdModeEditOutline className="absolute right-0 z-10 text-xl" />
                                </div>
                                <div className="mt-8">
                                    <div className="flex gap-2">
                                        <BiInfoCircle className="text-xl text-zinc-400" />
                                        <span className="text-zinc-400 text-sm">
                                            Your location will help us serve
                                            better
                                        </span>
                                    </div>
                                    <span className="ms-8 text-zinc-400 text-sm">
                                        and extend a personalised experience.
                                    </span>
                                </div>
                            </div>

                            {loggedIn && (
                                <div className="mt-16">
                                    <div className="uppercase flex gap-4 font-semibold">
                                        <img src={thumbsUp} alt="Thumbs up" />
                                        Recommended Groups
                                    </div>
                                    {[
                                        { name: "Leisure", img: leisure },
                                        { name: "Activism", img: activism },
                                        { name: "MBA", img: mba },
                                        { name: "Philosophy", img: philosophy },
                                    ].map((group, index) => (
                                        <div
                                            key={index}
                                            className="flex mt-6 justify-between items-center"
                                        >
                                            <div className="flex gap-4 items-center">
                                                <img
                                                    src={group.img}
                                                    alt={group.name}
                                                    className="rounded-full"
                                                />
                                                {group.name}
                                            </div>
                                            <button
                                                className={`p-1 px-4 rounded-full  ${
                                                    followedGroups.includes(
                                                        group.name
                                                    )
                                                        ? "text-white bg-black"
                                                        : "text-black bg-gray-200"
                                                }
                                                transition-all duration-300`}
                                                onClick={() =>
                                                    toggleFollow(group.name)
                                                }
                                            >
                                                {followedGroups.includes(
                                                    group.name
                                                )
                                                    ? "Followed"
                                                    : "Follow"}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
