import * as React from "react";
import { PostProps } from "./types";
import menu from "/assets/menu.svg";

export const Post: React.FC<
    PostProps & { isMenuOpen: boolean; onToggleMenu: () => void }
> = ({
    type,
    icon,
    image,
    title,
    description,
    author,
    views,
    location,
    date,
    actionButton,
    isMenuOpen,
    onToggleMenu,
}) => {
    return (
        <div className="flex flex-col pt-px pb-5 bg-white rounded border border-solid border-neutral-200 max-md:max-w-full">
            {image && (
                <img
                    loading="lazy"
                    src={image}
                    alt={title}
                    className="object-contain w-full rounded aspect-[3.14] max-md:max-w-full"
                />
            )}
            <div className="flex flex-col px-5 mt-5 w-full max-md:px-5 max-md:max-w-full">
                <div className="self-start text-lg text-black">
                    <span className="font-medium">{icon} </span>
                    <span className="font-medium">{type}</span>
                </div>
                <div className="flex gap-5 justify-between mt-2.5 text-2xl font-semibold leading-8 text-black max-md:max-w-full">
                    <div className="max-md:max-w-full flex flex-wrap">
                        {title}
                    </div>
                    <div className="relative object-contain shrink-0 self-start w-7 aspect-square">
                        <img
                            loading="lazy"
                            src={menu}
                            alt="Post options"
                            className=""
                            onClick={onToggleMenu}
                        />
                        {isMenuOpen && (
                            <div className="absolute right-0 z-10 w-44 bg-white rounded border border-solid border-neutral-200">
                                <div className="flex flex-col justify-start items-start">
                                    <button className="text-base text-left font-light text-black p-2 hover:border hover:border-blue-500 border border-white w-full">
                                        Edit
                                    </button>
                                    <button className="text-base text-left font-light text-black p-2 hover:border hover:border-blue-500 border border-white w-full">
                                        Report
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {description && (
                    <div className="mt-3 text-xl leading-none text-zinc-600 max-md:max-w-full">
                        {description}
                    </div>
                )}
                {(date || location) && (
                    <div className="flex gap-10 max-w-full text-base font-medium text-black w-[358px]">
                        {date && (
                            <div className="flex flex-1 gap-1">
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/69de05e9d0bb0c54c8e790b2cbf9aefc4949446bb6a886ff5547b86a00449f4a?placeholderIfAbsent=true&apiKey=f01b86e2ed6a450e894cbf49dfa4b291"
                                    alt="Calendar icon"
                                    className="object-contain shrink-0 w-5 aspect-square"
                                />
                                <div className="basis-auto">{date}</div>
                            </div>
                        )}
                        {location && (
                            <div className="flex flex-1 gap-1">
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/5599b69710d5244f860fcc5d95b63609e61ccac50710a7a26c878aedd08b4eac?placeholderIfAbsent=true&apiKey=f01b86e2ed6a450e894cbf49dfa4b291"
                                    alt="Location icon"
                                    className="object-contain shrink-0 w-5 aspect-square"
                                />
                                <div className="basis-auto">{location}</div>
                            </div>
                        )}
                    </div>
                )}
                {actionButton && (
                    <button
                        className={`px-16 py-2.5 mt-4 text-sm font-semibold leading-snug text-center rounded-lg border border-gray-400 border-solid max-md:px-5 max-md:max-w-full ${
                            actionButton.variant === "danger"
                                ? "text-red-500 hover:bg-red-500 hover:text-white"
                                : actionButton.variant === "primary"
                                ? "text-emerald-500 hover:bg-emerald-500 hover:text-white"
                                : "text-blue-600 hover:bg-blue-600 hover:text-white"
                        }`}
                    >
                        {actionButton.text}
                    </button>
                )}
                <div className="flex flex-wrap gap-10 mt-8 w-full max-md:max-w-full">
                    <div className="flex flex-1 gap-2.5 text-lg font-semibold text-black">
                        <img
                            loading="lazy"
                            src={author.avatar}
                            alt={author.name}
                            className="object-contain shrink-0 w-12 rounded-3xl aspect-square"
                        />
                        <div className="my-auto basis-auto">{author.name}</div>
                    </div>
                    <div className="flex flex-1 gap-10 my-auto text-sm font-medium text-right text-neutral-600">
                        <div className="flex gap-2 my-auto">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/796f69616be18969b044e18aab72a37e4916680cdffae7fdc99465e6a9f5fa67?placeholderIfAbsent=true&apiKey=f01b86e2ed6a450e894cbf49dfa4b291"
                                alt="Views icon"
                                className="object-contain shrink-0 aspect-square w-[18px]"
                            />
                            <div>{views}k views</div>
                        </div>
                        <button className="bg-gray-100 p-2 rounded">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/188dd45a0bf21fbea31dd7ee10742d9f2920b1f445fdc20f2e44ebd49e0d3cd4?placeholderIfAbsent=true&apiKey=f01b86e2ed6a450e894cbf49dfa4b291"
                                alt="Share"
                                className="object-contain shrink-0 rounded-none aspect-[1.17] w-[42px]"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
