"use client";
import React, { useContext, useEffect, useState } from "react";
import { getRandom10SamplePosts, getTagsZstStateDatas } from "../sampledata";
import PostItem from "./PostItem";
//@uiw/react-heat-map https://github.com/uiwjs/react-heat-map
import UserContext from "@/components/user/UserContext";
import HeatMapPost from "@/components/zstpost/pageSummary/HeatMapPost";
import { TypeZstPost } from "@/app/types/zstTypes";

const PageState = () => {
  // const heatMapData = getTagsZstStateDatas();
  const [zstPostData, setZstPostData] = useState<TypeZstPost[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const nowZstPostData = await getRandom10SamplePosts();
      setZstPostData(nowZstPostData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <HeatMapPost></HeatMapPost>
      <div>
        {zstPostData.map((post) => (
          <div key={post.id} className="border p-4 rounded shadow">
            <PostItem key={post.id} post={post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageState;
