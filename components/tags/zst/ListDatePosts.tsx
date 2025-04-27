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
}

const ListDatePosts = (props: propsListDatePost) => {
  const { favoriteTagMass, normalTagMass } = props;
  const [zstPosts, setZstPosts] = useState<TypeZstPostWithTags[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false); // ローディング状態を追加

  const dayCount = 14;
  const nowDate = new Date();
  const before2Week = new Date();
  before2Week.setDate(before2Week.getDate() - dayCount);

  const [postsWithTags, setPostsWithTags] = useState<TypeZstPostWithTags[]>([]);
  const [isPostsLoading, setIsPostsLoading] = useState<boolean>(false);

  const [toAt, setToAt] = useState<Date>(nowDate);
  const [fromAt, setFromAt] = useState<Date>(before2Week);

  const user = useContext(UserContext);

  // console.log("ListDatePost rendered", fromAt, toAt); // レンダリング確認

  // const fectchGetPosts = async () => {
  //   if (fromAt && toAt && user?.userid) {
  //     // user?.userid もチェック
  //     setIsLoading(true); // データ取得開始前にローディングを true に
  //     setZstPosts([]); // 既存の投稿をクリア（任意：ローディング中に古いリストを表示したくない場合）
  //     console.log("fetchGetPosts start", fromAt, toAt);
  //     try {
  //       const ThisZstPostsResult = await getPosts(user.userid, fromAt, toAt);
  //       setZstPosts(ThisZstPostsResult);
  //       console.log("fetchGetPosts success", ThisZstPostsResult.length);
  //     } catch (error) {
  //       console.error("投稿データの取得に失敗しました:", error);
  //       setZstPosts([]); // エラー時も空にする
  //     } finally {
  //       setIsLoading(false); // データ取得完了後（成功・失敗問わず）ローディングを false に
  //       console.log("fetchGetPosts end");
  //     }
  //   } else {
  //     // fromAt, toAt, user?.userid のいずれかが未定義の場合は何もしないか、初期状態にする
  //     setZstPosts([]);
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     fectchGetPosts();
  //   };

  //   fetchData();
  //   return () => {
  //     console.log("ListDatePost unmounting or dependency changed");
  //   };
  // }, [toAt, fromAt]);
  // ... userId チェック ...
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
  }, [fromAt, toAt, userId]);

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
