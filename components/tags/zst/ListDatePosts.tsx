"use client";
import { getPosts } from "@/app/actions/zstPosts/posts";
import { TypeTagMas } from "@/app/types/tagTypes";
import { TypeZstPostWithTags } from "@/app/types/zstTypes";
import { Button } from "@/components/ui/button";
import UserContext from "@/components/user/UserContext";
import ZstTitleAction from "@/components/zstpost/Posts/zstTitleAction";
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import React, { useCallback, useContext, useEffect, useState } from "react";
import ListPosts from "./ListPosts";
import { readPostsWithTags } from "@/app/actions/zstPosts/postswithtag";

interface propsListDatePost {
  favoriteTagMass: TypeTagMas[];
  normalTagMass: TypeTagMas[];
  listDatePostAtString: string;
}

const ListDatePosts = (props: propsListDatePost) => {
  const { favoriteTagMass, normalTagMass, listDatePostAtString } = props;
  const [zstPosts, setZstPosts] = useState<TypeZstPostWithTags[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false); // ローディング状態を追加
  const dayCount = 14; // 日付移動の間隔
  // --- ↓↓↓ 日付計算ヘルパー関数を修正 --- ↓↓↓
  const calculateDateRange = (baseDateString: string | null | undefined) => {
    // null や undefined も考慮
    let targetDate: Date = new Date();
    let isValidDateString = false;

    // baseDateString が有効な文字列かチェック
    if (
      baseDateString &&
      typeof baseDateString === "string" &&
      baseDateString.trim() !== ""
    ) {
      try {
        // yyyy/MM/dd 形式をパースできるようにハイフンに置換
        const parsedDate = new Date(baseDateString.replace(/\//g, "-"));
        // getTime() が NaN でないことを確認
        if (!isNaN(parsedDate.getTime())) {
          targetDate = parsedDate;
          isValidDateString = true;
        }
      } catch (e) {
        // パース中にエラーが発生した場合 (通常は起こりにくい)
        console.error("Error parsing date string:", baseDateString, e);
      }
    }

    // 有効な日付文字列が渡されなかった場合 (空文字列を含む) は、現在の日付を基準にする
    if (!isValidDateString) {
      targetDate = new Date(); // デフォルトは今日
    }

    const toDate = new Date(targetDate);
    const fromDate = new Date(targetDate);
    // 基準日から dayCount 日前を計算
    fromDate.setDate(fromDate.getDate() - dayCount);
    // 時刻を 00:00:00 に設定
    fromDate.setHours(0, 0, 0, 0);
    toDate.setHours(0, 0, 0, 0);
    return { fromDate, toDate };
  };
  // --- ↑↑↑ 日付計算ヘルパー関数を修正 --- ↑↑↑

  useEffect(() => {
    console.log("listDatePostAtString changed:", listDatePostAtString);
    const { fromDate, toDate } = calculateDateRange(listDatePostAtString);
    setFromAt(fromDate);
    setToAt(toDate);
    // この state 更新が fetchPostsData の再実行をトリガーする
  }, [listDatePostAtString]);
  // --- ↑↑↑ listDatePostAtString 変更時に fromAt, toAt を更新 --- ↑↑↑

  const [postsWithTags, setPostsWithTags] = useState<TypeZstPostWithTags[]>([]);
  const [isPostsLoading, setIsPostsLoading] = useState<boolean>(false);

  const initialDates = calculateDateRange(listDatePostAtString);
  const [fromAt, setFromAt] = useState<Date>(initialDates.fromDate);
  const [toAt, setToAt] = useState<Date>(initialDates.toDate);
  const user = useContext(UserContext);

  const userId = user?.userid || 0;
  const fetchPostsData = useCallback(async () => {
    setIsPostsLoading(true);
    try {
      const result = await readPostsWithTags(userId, fromAt, toAt); // ★ ここで呼び出す
      setPostsWithTags(result);
      // console.log("fetchPostsData success", result);
    } catch (error) {
      /* ... */
    } finally {
      setIsPostsLoading(false);
    }
  }, [listDatePostAtString, userId]);

  useEffect(() => {
    fetchPostsData();
  }, [fetchPostsData]);

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
      // console.warn(`Unknown action type: ${actionType}`);
    }
  };

  const moveBackward = () => {
    if (isLoading) return;

    const newFromAt = new Date(fromAt);
    newFromAt.setDate(newFromAt.getDate() - dayCount);
    setFromAt(newFromAt);

    const newToAt = new Date(toAt);
    newToAt.setDate(newToAt.getDate() - dayCount);
    setToAt(newToAt);
  };

  const moveForward = () => {
    if (isLoading) return;
    const newFromAt = new Date(fromAt);
    newFromAt.setDate(newFromAt.getDate() + dayCount);
    setFromAt(newFromAt);

    const newToAt = new Date(toAt);
    newToAt.setDate(newToAt.getDate() + dayCount);
    setToAt(newToAt);
  };

  return (
    <div>
      <div className="h3 font-bold mb-2">List</div>
      <div className="flex items-center  mb-2">
        <Button
          onClick={moveBackward}
          variant="outline" // または "secondary" など
          className="mr-2"
        >
          <DoubleArrowLeftIcon className="mr-1 h-4 w-4" />{" "}
        </Button>
        <div>
          {fromAt?.toLocaleDateString()} - {toAt?.toLocaleDateString()}
        </div>
        <Button
          onClick={moveForward}
          variant="outline" // または "secondary" など、好みのスタイルを選択
          className="ml-2" // マージンは className で指定
        >
          <DoubleArrowRightIcon className="ml-1 h-4 w-4" />{" "}
        </Button>
      </div>
      <ListPosts
        zstPosts={zstPosts}
        postWithTags={postsWithTags}
        favoriteTagMass={favoriteTagMass}
        normalTagMass={normalTagMass}
        putZstPosts={putZstPosts}
        isLoading={isLoading}
      ></ListPosts>
    </div>
  );
};

export default ListDatePosts;
