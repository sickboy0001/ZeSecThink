"use client";
import UserContext from "@/components/user/UserContext";
import React, { useContext, useEffect, useState } from "react";
import { getTagMasOrder } from "../GetTagMasOrder";
import { TypeTagMas } from "@/app/types/tagTypes";
import SummaryTagId from "./SummaryTagId";
import TagHoverable from "../TagHoverable";
import SummaryList from "./SummaryList";
import SummaryTest from "./SummaryTest";
import Summary from "./Summary";

const PageTagSummary = () => {
  const [selectedTagMas, setSelectedTagMas] = useState<TypeTagMas | undefined>(
    undefined,
  );
  const [selectedType, setSelectedType] = useState<string>("summary");

  const [allTagMass, setAllTagMass] = useState<TypeTagMas[]>();
  const [favoriteTagMass, setFavoriteTagMass] = useState<TypeTagMas[]>([]);
  const [normalTagMass, setNormalTagMass] = useState<TypeTagMas[]>([]);
  const to_at = new Date();
  const from_at = new Date();
  from_at.setFullYear(to_at.getFullYear() - 1);
  const id = 0;
  const user = useContext(UserContext);

  // const user = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      setFavoriteNormatTagMass();
    };
    fetchData();
  }, []); // 空の依存配列は、コンポーネントのマウント時に一度だけ実行

  const setFavoriteNormatTagMass = async () => {
    const { sortedTagMas: sortedTagMas, normalTagMas: normalTagMas } =
      await getTagMasOrder({
        user_id: user?.userid ?? 0,
      });
    const allTags = [...(sortedTagMas || []), ...(normalTagMas || [])]; // sortedTagMas と normalTagMas を結合
    const foundTag = allTags.find((tag) => Number(tag.id) === Number(id));
    if (foundTag) {
      setSelectedTagMas(foundTag);
    }
    setAllTagMass(allTags);
    setFavoriteTagMass(sortedTagMas);
    setNormalTagMass(normalTagMas);
  };

  return (
    <div className="p-4 flex">
      {/* 左ペイン: AllTagMass のリスト */}
      <div className="w-1/4 pr-4 border-r">
        <h2 className="text-lg font-semibold mb-2">Tag-List</h2>
        <ul>
          <li
            key="summary"
            className={`py-1 cursor-pointer ${
              selectedType === "summary" ? "font-bold text-blue-500" : ""
            }`}
            onClick={() => {
              setSelectedTagMas(undefined);
              setSelectedType("summary");
            }}
          >
            Summary
          </li>
          <li
            key="all"
            className={`py-1 cursor-pointer ${
              selectedType === "all" ? "font-bold text-blue-500" : ""
            }`}
            onClick={() => {
              setSelectedTagMas(undefined);
              setSelectedType("all");
            }}
          >
            List
          </li>

          <li
            key="test"
            className={`py-1 cursor-pointer ${
              selectedType === "test" ? "font-bold text-blue-500" : ""
            }`}
            onClick={() => {
              setSelectedTagMas(undefined);
              setSelectedType("test");
            }}
          >
            Test
          </li>

          {allTagMass &&
            allTagMass.map((tag) => (
              <li
                key={tag.id}
                className={`py-1 cursor-pointer ${
                  selectedTagMas?.id === tag.id ? "font-bold text-blue-500" : ""
                }`}
                onClick={() => {
                  const found = allTagMass.find((t) => t.id === tag.id);
                  setSelectedTagMas(found);
                  setSelectedType("tag");
                }}
              >
                <div className="flex flex-wrap">
                  #{tag.tag_name}
                  <TagHoverable key={tag.id} tag={tag} type={"sel"} />
                </div>
              </li>
            ))}
        </ul>
      </div>

      {/* 右ペイン: 選択されたタグの詳細 */}
      <div className="w-3/4 pl-4">
        {selectedType === "tag" && selectedTagMas ? (
          <SummaryTagId
            selectedTagMas={selectedTagMas}
            favoriteTagMass={favoriteTagMass}
            normalTagMass={normalTagMass}
          ></SummaryTagId>
        ) : selectedType === "summary" && allTagMass ? (
          <Summary tagMass={allTagMass}></Summary>
        ) : selectedType === "all" && allTagMass ? (
          <SummaryList
            favoriteTagMass={favoriteTagMass}
            normalTagMass={normalTagMass}
          ></SummaryList>
        ) : selectedType === "test" && allTagMass ? (
          <SummaryTest
            favoriteTagMass={favoriteTagMass}
            normalTagMass={normalTagMass}
          ></SummaryTest>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default PageTagSummary;
