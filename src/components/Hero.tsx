import * as React from "react";

export const Hero: React.FC = () => {
  return (
    <div className="flex relative flex-col w-full text-white min-h-[440px] max-md:max-w-full">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/0cd61c8bfac34ae172c39c210070780ef9ee0483122b8d3b6ca804f3a199e283?placeholderIfAbsent=true&apiKey=f01b86e2ed6a450e894cbf49dfa4b291"
        alt="Computer Engineering Banner"
        className="object-cover absolute inset-0 size-full"
      />
      <div className="flex relative flex-col items-start px-20 pt-72 pb-20 w-full border border-black border-solid shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:px-5 max-md:pt-24 max-md:max-w-full">
        <div className="flex flex-col">
          <div className="text-4xl font-bold">Computer Engineering</div>
          <div className="self-start mt-1 text-lg">
            142,765 Computer Engineers follow this
          </div>
        </div>
      </div>
    </div>
  );
};
