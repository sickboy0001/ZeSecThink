"use client";
import React, { useContext, useEffect, useState } from "react";
import { TypeZstPostWithTags } from "@/app/types/zstTypes";
import { addDays } from "date-fns";
import { GetyyyyMMddJpFromDate } from "@/lib/utilsDate";
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
  GridIcon,
  CalendarIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

import UserContext from "@/components/user/UserContext";
import { getPosts } from "@/app/actions/zstPosts/posts";
import ViewGrid from "./ViewGrid";
import { urlViewPostDay, urlViewPostGrid } from "@/constants/url";
import { getTagMasOrder } from "@/components/tags/GetTagMasOrder";
import { TypeTagMas } from "@/app/types/tagTypes";
import { readPostsWithTags } from "@/app/actions/zstPosts/postswithtag";

interface propTypes {
  rows: number;
  cols: number;
  basedate: Date;
  dates: Date[];
  fromAt: Date;
  toAt: Date;
}
const PageZstViewGrid = (props: propTypes) => {
  const { rows, cols, basedate, dates, fromAt, toAt } = props;
  const [zstPosts, setZstPosts] = useState<TypeZstPostWithTags[]>([]);
  const user = useContext(UserContext);

  const [favoriteTagMass, setFavoriteTagMass] = useState<TypeTagMas[]>([]);
  const [normalTagMass, setNormalTagMass] = useState<TypeTagMas[]>([]);

  // console.log("ZstPageViewGrid:start");

  const basedateafter = GetyyyyMMddJpFromDate(addDays(basedate, rows * cols));
  const basedatebefore = GetyyyyMMddJpFromDate(addDays(basedate, -rows * cols));
  const basedatestr = GetyyyyMMddJpFromDate(basedate);
  const basedatetoday = GetyyyyMMddJpFromDate(new Date());
  let nowRows = rows;
  let nowCols = cols;

  useEffect(() => {
    // console.log("zstPosts has changed:", zstPosts.slice(0, 2));
    const fetch = async () => {
      const userId = user?.userid || 0;
      const ThisZstPosts = await getPosts(user?.userid, fromAt, toAt);
      setZstPosts(ThisZstPosts);
      try {
        const ThisZstPosts = await readPostsWithTags(
          userId, // ★ userId を使用
          fromAt,
          toAt,
        );
        setZstPosts(ThisZstPosts); // ★ これでOK
        console.log("PageZstiewDay fetch success", ThisZstPosts.length);
        // console.log(
        //   "PageZstiewDay fetch success tagIds:",
        //   ThisZstPosts[0].tagIds.length,
        // );
      } catch (error) {
        console.error("PageZstiewDay fetch error:", error);
        setZstPosts([]); // エラー時も空にする
      }
    };
    fetch();
  }, [fromAt, toAt]);

  useEffect(() => {
    const fetchData = async () => {
      setFavoriteNormatTagMass();
    };

    fetchData();
  }, []);

  const setFavoriteNormatTagMass = async () => {
    console.log("setFavoriteNormatTagMass Start");
    const { sortedTagMas: sortedTagMas, normalTagMas: normalTagMas } =
      await getTagMasOrder({
        user_id: user?.userid ?? 0,
      });
    if (sortedTagMas) {
      setFavoriteTagMass(sortedTagMas);
      setNormalTagMass(normalTagMas);
    } else {
      console.warn("タグデータの取得に失敗しました。");
      setFavoriteTagMass([]); // デフォルトで空の配列を設定
      setNormalTagMass([]);
    }
  };

  const putZstPosts = (post: TypeZstPostWithTags, actionType: string) => {
    console.log(actionType, post);
    switch (actionType.toLowerCase()) {
      case "update":
        setZstPosts((prevPosts) =>
          prevPosts.map((p) => (p.id === post.id ? post : p)),
        );
        break;
      case "insert":
        setZstPosts((prevPosts) => [post, ...prevPosts]);
        break;
      case "delete":
        setZstPosts((prevPosts) => prevPosts.filter((p) => p.id !== post.id));
        break;
      default:
        console.warn(`Unknown action type: ${actionType}`);
    }
  };

  return (
    // <UserContext.Provider value={nowUser}>
    <div className="px-3 py-3">
      <div className="flex flex-row py-3 items-center ">
        <div className="flex  flex-wrap  items-center w-full">
          <div className="text-gray-900 text-lg px-2 py-2 font-bold underline">
            {dates[0].toLocaleDateString()}
          </div>
          <div className=" flex items-center">
            <Button className="underline" variant="outline">
              <a
                href={`${urlViewPostGrid}?basedate=${basedatetoday}&cols=${cols}&rows=${rows}`}
              >
                today
              </a>
            </Button>
            <Button className="" variant="outline" size="icon">
              <a
                href={`${urlViewPostGrid}?basedate=${basedatebefore}&cols=${cols}&rows=${rows}`}
              >
                <DoubleArrowLeftIcon className="h-4 w-4" />
              </a>
            </Button>
            <Button className="" variant="outline" size="icon">
              <a
                href={`${urlViewPostGrid}?basedate=${basedateafter}&cols=${cols}&rows=${rows}`}
              >
                <DoubleArrowRightIcon className="h-4 w-4" />
              </a>
            </Button>
          </div>
          <div>
            <Button className="underline" variant="outline">
              <a
                href={`${urlViewPostGrid}?basedate=${basedatestr}&cols=${1}&rows=${3}`}
              >
                1x3
              </a>
            </Button>
            <Button className="underline" variant="outline">
              <a
                href={`${urlViewPostGrid}?basedate=${basedatestr}&cols=${3}&rows=${3}`}
              >
                3x3
              </a>
            </Button>
            <Button className="underline" variant="outline">
              <a
                href={`${urlViewPostGrid}?basedate=${basedatestr}&cols=${4}&rows=${4}`}
              >
                4x4
              </a>
            </Button>
            {/* <Button className="underline" variant="outline">
              <Link
                href={`/zstPosts/view/grid/?basedate=${basedatestr}&cols=${5}&rows=${5}`}
              >
                5x5
              </Link>
            </Button> */}
          </div>
        </div>
        <div className="flex flex-row-reverse">
          <div className="flex flex-row">
            <div>
              <Button className="" variant="outline" size="icon">
                <a href={`${urlViewPostDay}`}>
                  <CalendarIcon className="h-4 w-4" />
                </a>
              </Button>
            </div>
            <div>
              <Button className="" variant="outline" size="icon">
                <a
                  href={`${urlViewPostGrid}?basedate=${basedateafter}&cols=${cols}&rows=${rows}`}
                >
                  <GridIcon className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex"></div>
      <div className="flex"></div>
      <ViewGrid
        rows={nowRows}
        cols={nowCols}
        basedate={basedate}
        className={""}
        dates={dates}
        zstPosts={zstPosts}
        putZstPosts={putZstPosts}
        normalTagMass={normalTagMass}
        favoriteTagMass={favoriteTagMass}
      ></ViewGrid>
    </div>
    // </UserContext.Provider>
  );
};

export default PageZstViewGrid;
