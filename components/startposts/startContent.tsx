import React from "react";

const TitleContent = () => {
  return (
    <div className="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-16 max-w-7xl lg:py-24">
      <div className="flex w-full mx-auto text-left">
        <div className="relative inline-flex items-center mx-auto align-middle">
          <div className="text-center">
            <h1 className="max-w-5xl text-2xl font-bold leading-none tracking-tighter text-neutral-600 md:text-5xl lg:text-6xl lg:max-w-7xl">
              Tool Of "Zero Second Thinking"
              <br />
            </h1>
            <p className="max-w-xl mx-auto mt-8 text-base leading-relaxed text-gray-500">
              「0秒思考」を手軽に、有益に使うためのツールです。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitleContent;
