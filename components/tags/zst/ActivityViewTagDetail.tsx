"use client";

import { useContext, useEffect, useState } from "react";
import TagAcitveHeatMap from "./TagAcitveHeatMap";
import UserContext from "@/components/user/UserContext";
import { TypeTagMas } from "@/app/types/tagTypes";
import TagHoverable from "../TagHoverable";
import { TypeZstPost, TypeZstPostWithTags } from "@/app/types/zstTypes";
import { readPostsWithTagConditionTagId } from "@/app/actions/zstPosts/postswithtag";
import ZstTitleAction from "@/components/zstpost/Posts/zstTitleAction";

interface propsActivityViewTagDetail {
  selectedTagMas: TypeTagMas;
  favoriteTagMass: TypeTagMas[];
  normalTagMass: TypeTagMas[];
}

const ActivityViewTagDetail = (props: propsActivityViewTagDetail) => {
  const { selectedTagMas, favoriteTagMass, normalTagMass } = props;
  const [zstPosts, setZstPosts] = useState<TypeZstPostWithTags[]>([]);

  const to_at = new Date();
  const from_at = new Date();
  from_at.setFullYear(to_at.getFullYear() - 1);

  const user = useContext(UserContext);

  useEffect(() => {
    // console.log("zstPosts has changed:", zstPosts.slice(0, 2));
    const fetch = async () => {
      fectchGetPostsWithTag();
    };
    fetch();
  }, [selectedTagMas.id]);
  const fectchGetPostsWithTag = async () => {
    try {
      // readPostsWithTagConditionTagId は TypeZstPostWithTags[] を返すように修正済み
      console.log("fectchGetPostsWithTag", Number(selectedTagMas.id));
      const ThisZstPostsResult = await readPostsWithTagConditionTagId(
        user?.userid,
        Number(selectedTagMas.id),
        from_at,
        to_at,
      );

      console.log("TagIdSummary fetch success", ThisZstPostsResult.length);
      setZstPosts(ThisZstPostsResult);
    } catch (error) {
      // ★ try...catch でエラーを捕捉
      console.error("投稿データの取得中にエラーが発生しました:", error);
      setZstPosts([]); // エラー時も空にする
    } finally {
      // setIsLoading(false);
      console.log(
        "SummaryTagId fetch end for tagId:",
        Number(selectedTagMas.id),
      );
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

  if (!selectedTagMas) {
    return "";
  }
  return (
    <div className="w-3/4 pl-4">
      <div>
        <div className="flex flex-wrap">
          <div className="p-2 text-lg"> {selectedTagMas.name}</div>
          <div className="p-2 text-lg">
            <TagHoverable
              key={selectedTagMas.id}
              tag={selectedTagMas}
              type={"sel"}
            />
          </div>
        </div>
        <div>
          {`${from_at.toLocaleDateString()} - ${to_at.toLocaleDateString()}`}
        </div>
        <TagAcitveHeatMap
          tag_id={Number(selectedTagMas.id)}
          from_at={from_at}
          to_at={to_at}
          tooltipId={`heatmapIdFavorite-${selectedTagMas.id}`}
          key={`favorite-tag-${selectedTagMas.id}`}
          color="blue"
        />
      </div>
      <div>
        {zstPosts.length > 0 &&
          zstPosts.map((post, index) => (
            <div key={post.id}>
              <ZstTitleAction
                zstPost={post}
                favoriteTagMass={favoriteTagMass}
                normalTagMass={normalTagMass}
                titlePreYmd={true}
                putZstPosts={putZstPosts}
                visibleTagLink={false}
              ></ZstTitleAction>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ActivityViewTagDetail;
