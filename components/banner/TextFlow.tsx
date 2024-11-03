import React from "react";
import useIsMobile from "@/hooks/useIsMobile";
const TextFlow = () => {
  const isMobile = useIsMobile();
  const artist = [
    "bigbang",
    "shinee",
    "blackpink",
    "newjeans",
    "tvxq",
    "gdragon",
    "2ne1",
    "babymonster",
    "txt",
    "vibe",
    "nmixx",
    "itzy",
    "miyao",
    "kissoflife",
  ];
  return (
    <div className="z-10 fixed top-0 bg-black bg-opacity-70 w-full h-[30px] text-neutral-500 overflow-hidden flex flex-row">
      <div className="flow-text w-full">
        {artist.map((item) => (
          <div key={item} className="inline-block pr-10 py-1 text-sm">
            {item}
          </div>
        ))}
      </div>
      {!isMobile && (
        <div className="flow-text2 w-full">
          {artist.map((item) => (
            <div key={item} className="inline-block pr-10 py-1 text-sm">
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TextFlow;
