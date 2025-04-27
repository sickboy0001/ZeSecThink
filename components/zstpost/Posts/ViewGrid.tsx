"use client";

import React from "react";
import { TypeZstPostWithTags } from "@/app/types/zstTypes";
import ZstDayTitles from "./zstDayTitles";
import { TypeTagMas } from "@/app/types/tagTypes";

interface propTypes {
  rows: number;
  cols: number;
  basedate: Date;
  className: string;
  dates: Date[];
  zstPosts: TypeZstPostWithTags[];
  putZstPosts: (posts: TypeZstPostWithTags, actionType: string) => void;
  favoriteTagMass: TypeTagMas[];
  normalTagMass: TypeTagMas[];
}

const ViewGrid = ({
  className,
  putZstPosts,
  favoriteTagMass,
  normalTagMass,
  ...props
}: propTypes) => {
  const { rows, cols, dates, zstPosts } = props;
  // taildwindows need plan text !?
  // grid-cols-1 grid-cols-2 grid-cols-3 grid-cols-4 grid-cols-5
  const grdicolsnumber = `grid-cols-${String(cols)}`;
  const divclassNameValue = `grid grid-cols-${String(cols)} gap-2 px-2`;
  return (
    <>
      <div className={divclassNameValue}>
        {dates.map((date, key) => (
          <div key={key}>
            <ZstDayTitles
              className={className}
              date={date}
              zstPosts={zstPosts}
              putZstPosts={putZstPosts}
              favoriteTagMass={favoriteTagMass}
              normalTagMass={normalTagMass}
            ></ZstDayTitles>
          </div>
        ))}
      </div>
    </>
  );
};

export default ViewGrid;
