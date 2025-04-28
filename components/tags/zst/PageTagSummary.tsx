"use client";
import UserContext from "@/components/user/UserContext";
import React, { useContext, useEffect, useState } from "react";
import { getTagMasOrder } from "../GetTagMasOrder";
import { TypeTagMas } from "@/app/types/tagTypes";
import TagHoverable from "../TagHoverable";
import ActivityViewTagDetail from "./ActivityViewTagDetail";
import ActivityViewDashboard from "./ActivityViewDashboard";
import ActivityViewTimeline from "./ActivityViewTimeline";

const PageTagSummary = () => {
  const [selectedTagMas, setSelectedTagMas] = useState<TypeTagMas | undefined>(
    undefined,
  );
  const [selectedType, setSelectedType] = useState<string>("timeline");
  const [selectedPostsDateAt, setSelectedPostsDateAt] = useState<string>("");

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
  const handleTagClickFromDashboard = (tag: TypeTagMas) => {
    // allTagMass から最新のタグ情報を見つける (必須ではないが、念のため)
    const found = allTagMass?.find((t) => t.id === tag.id);
    if (found) {
      setSelectedTagMas(found);
      setSelectedType("tag"); // ★ 表示タイプを 'tag' (詳細表示) に切り替え
    } else {
      // 見つからない場合も、渡されたタグ情報で設定するフォールバック
      setSelectedTagMas(tag);
      setSelectedType("tag");
    }
  };

  const handlePostHeatmapClickFromDashboard = (date: string, count: number) => {
    console.log("handlePostHeatmapClickFromDashboard", date, count);
    // 2025/3/16 12
    setSelectedPostsDateAt(date);
    setSelectedTagMas(undefined);
    setSelectedType("timeline");
  };

  return (
    <div className="p-4 flex flex-col lg:flex-row w-full">
      <div className="w-full lg:flex-grow lg:pr-4 lg:border-r lg:border-b-0 border-b mb-4 lg:mb-0 min-w-0">
        <h2 className="text-lg font-semibold mb-2">Tag-List</h2>
        <div className="flex flex-row lg:flex-col mb-2">
          {" "}
          {/* lg以上で縦、それ以外で横 */}
          <div
            key="summary"
            onClick={() => {
              setSelectedTagMas(undefined);
              setSelectedType("summary");
            }}
          >
            <div className="flex flex-wrap items-center ">
              <TagHoverable
                key={"summary_Tag"}
                tag={null}
                type={"fav"}
                tagName="Dashboard"
                tooltipName="summary"
                tooltipDescription="summary"
                isSelected={selectedType === "summary"}
                addpreSharp={false}
              />
            </div>
          </div>
          <div
            key="timeline"
            onClick={() => {
              setSelectedTagMas(undefined);
              setSelectedType("timeline");
            }}
          >
            <div className="flex flex-wrap items-center ">
              <TagHoverable
                key={"all_Tag"}
                tag={null}
                type={"fav"}
                tagName="Timeline"
                tooltipName="List"
                tooltipDescription="List"
                isSelected={selectedType === "all"}
                addpreSharp={false}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap lg:block border-t pt-2 mt-2">
          {allTagMass &&
            allTagMass.map((tag) => (
              <div
                key={tag.id}
                className={`py-1 cursor-pointer`}
                onClick={() => {
                  const found = allTagMass.find((t) => t.id === tag.id);
                  setSelectedTagMas(found);
                  setSelectedType("tag");
                }}
              >
                <div className="flex flex-wrap items-center ">
                  <TagHoverable
                    key={tag.id}
                    tag={tag}
                    type={"sel"}
                    isSelected={selectedTagMas?.id === tag.id}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="w-[750px] flex-shrink-0 pl-4">
        {selectedType === "tag" && selectedTagMas ? (
          <ActivityViewTagDetail
            selectedTagMas={selectedTagMas}
            favoriteTagMass={favoriteTagMass}
            normalTagMass={normalTagMass}
          ></ActivityViewTagDetail>
        ) : selectedType === "summary" && allTagMass ? (
          <ActivityViewDashboard
            tagMass={allTagMass}
            onTagClick={handleTagClickFromDashboard}
            onPostHeatmapClick={handlePostHeatmapClickFromDashboard}
          ></ActivityViewDashboard>
        ) : selectedType === "timeline" && allTagMass ? (
          <ActivityViewTimeline
            favoriteTagMass={favoriteTagMass}
            normalTagMass={normalTagMass}
            selectedPostsDateAt={selectedPostsDateAt}
          ></ActivityViewTimeline>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default PageTagSummary;
