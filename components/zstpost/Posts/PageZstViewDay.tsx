"use client";
import React, { useContext, useEffect, useState } from "react";
import { TypeZstPostWithTags } from "@/app/types/zstTypes";
import { addDays, format } from "date-fns";
import {
  GetDateFromyyyyMMdd,
  GetDateTimeFormat,
  GetyyyyMMddJpFromDate,
} from "@/lib/utilsDate";
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
  CalendarIcon,
  GridIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import UserContext from "@/components/user/UserContext";
import { toZonedTime } from "date-fns-tz";
import { getPosts } from "@/app/actions/zstPosts/posts";

import DialogAdd from "./DialogAdd";
import { urlViewPostDay, urlViewPostGrid } from "@/constants/url";
import ZstDDayTitles from "./zstDDayTitles";
import { getTagMasOrder } from "@/components/tags/GetTagMasOrder";
import { TypeTagMas } from "@/app/types/tagTypes";
import { readPostsWithTags } from "@/app/actions/zstPosts/postswithtag";

interface propTypes {
  datestring: string;
  className: string;
}
const PageZstiewDay = (props: propTypes) => {
  const { className, datestring } = props;
  const [zstPosts, setZstPosts] = useState<TypeZstPostWithTags[]>([]);
  const [showEdit, setShowEdit] = useState(false);
  const [favoriteTagMass, setFavoriteTagMass] = useState<TypeTagMas[]>([]);
  const [normalTagMass, setNormalTagMass] = useState<TypeTagMas[]>([]);
  const user = useContext(UserContext);

  const putZstPosts = (post: TypeZstPostWithTags, actionType: string) => {
    console.log(actionType, post);
    switch (actionType.toLowerCase()) {
      case "update":
        const newZstPosts = zstPosts.map((p) => (p.id === post.id ? post : p));
        setZstPosts(newZstPosts);
        // console.log("putZstPosts:actionType", newZstPosts);
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
  useEffect(() => {
    const fetch = async () => {
      const thisdt = GetDateFromyyyyMMdd(datestring);
      const thisdttz = toZonedTime(thisdt, "Asia/Tokyo");
      const userId = user?.userid || 0;

      try {
        const ThisZstPosts = await readPostsWithTags(
          userId, // ★ userId を使用
          thisdttz,
          thisdttz,
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
  }, [datestring]);

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetchData Start");
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
      console.log("PageZstiewDay:FavoriteTagMass.length", sortedTagMas.length);
    } else {
      console.warn("タグデータの取得に失敗しました。");
      setFavoriteTagMass([]); // デフォルトで空の配列を設定
      setNormalTagMass([]);
    }
  };
  const basedate = GetDateFromyyyyMMdd(datestring);
  const datebefore = GetyyyyMMddJpFromDate(addDays(basedate, -1));
  const dateafter = GetyyyyMMddJpFromDate(addDays(basedate, 1));

  const isSunday = basedate.getDay() === 0;
  const isSatday = basedate.getDay() === 6;

  return (
    <div className="px-3 py-3">
      <div className="flex py-3  w-full">
        <div className="flex  flex-wrap w-full items-center ">
          <div className="text-gray-900 text-lg px-2 py-2 font-extrabold">
            <div
              className={` ${isSunday ? "text-red-500" : ""} ${
                isSatday ? "text-blue-500" : ""
              }`}
            >
              {GetDateTimeFormat(basedate, "yyyy/M/d(E)")}
            </div>
          </div>
          <div className="px-3 text-gray-500 font-semibold ">
            [
            {String(
              zstPosts.filter(
                (f) =>
                  String(new Date(f.current_at).toDateString()) ===
                    String(basedate.toDateString()) && !f.delete_flg,
              ).length,
            )}
            /10]
          </div>

          <div className="flex ">
            <Button className="underline" variant="outline">
              <a href={`${urlViewPostDay}`}>today</a>
            </Button>
            <Button className="" variant="outline" size="icon">
              <a href={`${urlViewPostDay}?date=${datebefore}`}>
                <DoubleArrowLeftIcon className="h-4 w-4" />
              </a>
            </Button>
            <Button className="" variant="outline" size="icon">
              <a href={`${urlViewPostDay}?date=${dateafter}`}>
                <DoubleArrowRightIcon className="h-4 w-4" />
              </a>
            </Button>
            <div>
              <DialogAdd
                showEdit={showEdit}
                setShowEdit={setShowEdit}
                date={basedate}
                putZstPosts={putZstPosts}
              ></DialogAdd>
            </div>
          </div>
        </div>
        <div className="flex flex-row-reverse ">
          <div>
            <Button className="" variant="outline" size="icon">
              <a href={`${urlViewPostGrid}/`}>
                <GridIcon className="h-4 w-4" />
              </a>
            </Button>
          </div>
          <div>
            <Button className="" variant="outline" size="icon">
              <a href={`${urlViewPostDay}`}>
                <CalendarIcon className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      <ZstDDayTitles
        className={className}
        zstPosts={zstPosts}
        date={basedate}
        putZstPosts={putZstPosts}
        favoriteTagMass={favoriteTagMass}
        normalTagMass={normalTagMass}
      ></ZstDDayTitles>
    </div>
  );
};

export default PageZstiewDay;
