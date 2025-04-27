"use client";

import React, { useContext, useEffect, useState } from "react";
import { PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import UserContext from "@/components/user/UserContext";
import { TypeTagMas, TypeTagOrder } from "@/app/types/tagTypes";
// import { getTagMas } from "../sampledata";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createTagMas, deleteTagMas } from "@/app/actions/Tag/TagMas";
import { createUpdateTagOrder, readTagOrder } from "@/app/actions/Tag/TagOrder";
import TagFavList from "./TagFavList";
import TagSortableItem from "./tagSortableItem";
import DialogTagLink from "../link/DialogTagLink";
import { getTagMasOrder } from "../GetTagMasOrder";

const generateId = () => Math.random().toString(36).substring(2, 15);

async function removeTagmas(id: number) {
  await deleteTagMas(id);
}

async function putTagMas(user_id: number, newItem: TypeTagMas) {
  if (user_id !== 0) {
    const createdTags = await createTagMas(
      user_id,
      newItem.tag_name,
      newItem.name,
      newItem.description,
      newItem.visible_flg,
      newItem.favorite_flg,
      newItem.public_flg,
    );
    return createdTags?.[0] || null; // 登録された最初のタグを返す
  }
  return null;
}

async function putTagOrder(user_id: number, newOrder: string) {
  //make order string from tagMass
  const idsString = newOrder;
  //set type
  const type = "fav";
  const result = await createUpdateTagOrder({
    userId: user_id,
    type,
    tagIds: idsString,
  });
}

const PageTagList = () => {
  const [tagMass, setTagMass] = useState<TypeTagMas[]>([]);
  const [normalTagMass, setNormalTagMass] = useState<TypeTagMas[]>([]);
  const [selectedTagMass, setSelectedTagMass] = useState<TypeTagMas[]>([]);
  const [tagOrder, setTagOrder] = useState<string>("");

  const [newItemName, setNewItemName] = useState("");
  const user = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      setFavoriteNormatTagMass();
    };

    fetchData();
  }, [user?.userid]); // 空の依存配列は、コンポーネントのマウント時に一度だけ実行
  // 編集中のアイテム情報

  const setFavoriteNormatTagMass = async () => {
    const { sortedTagMas: sortedTagMas, normalTagMas: normalTagMas } =
      await getTagMasOrder({
        user_id: user?.userid ?? 0,
      });
    if (sortedTagMas) {
      // console.log(nowTagMass);
      setTagMass(sortedTagMas);
      // console.log(nownormalTagMas);
      setNormalTagMass(normalTagMas);
      setTagOrder(sortedTagMas.map((item) => String(item.id)).join(","));

      //debug:dummydata
      const numberOfTagsToSelect = Math.floor(sortedTagMas.length / 4);
      const shuffledTags = [...sortedTagMas].sort(() => Math.random() - 0.5);
      const nowSelectedTagMas = shuffledTags.slice(0, numberOfTagsToSelect);
      setSelectedTagMass(nowSelectedTagMas);
    } else {
      // API リクエストが失敗した場合やデータが存在しない場合は、
      // 空の配列やエラー処理を行うことができます。
      console.warn("タグデータの取得に失敗しました。");
      setTagMass([]); // デフォルトで空の配列を設定
    }
  };
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // 少し動かしてから反応
      },
    }),
  );
  const handelPutTagOrder = (newOrder: string) => {
    putTagOrder(user?.userid ?? 0, newOrder);
    setTagOrder(newOrder);
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewItemName(event.target.value);
  };

  const handleAddItem = async () => {
    // console.log("handleAddItem called", newItemName);
    if (newItemName.trim() !== "") {
      const tempNewItem: TypeTagMas = {
        id: generateId(),
        tag_name: newItemName, // tagNameは入力された名前と同じとします
        name: newItemName,
        description: "",
        visible_flg: true,
        favorite_flg: true, // デフォルトでfalseにしておきます
        public_flg: true,
      };
      //tagmas update
      const createdTag = await putTagMas(user?.userid ?? 0, tempNewItem);
      //local data update main.sorce
      if (createdTag) {
        // local data update main.sorce
        var newTagMas = [createdTag, ...tagMass];

        setTagMass(newTagMas);
        // 登録されたタグの ID を利用できます
        console.log("登録されたタグのID:", createdTag.id);

        const newOrder = newTagMas.map((each) => each.id).join(",");
        putTagOrder(user?.userid ?? 0, newOrder);

        // ここで登録された ID を使った処理を行うことができます
      }

      setNewItemName(""); // Inputをクリア
    }
  };
  const remakeSort = async (tag: TypeTagMas) => {
    //対象がFavoriteかどうか？
    let tagOrderIds = tagOrder.split(",");
    const tagIdExists = tagOrderIds.includes(String(tag.id)); // tag.id を文字列に変換して比較
    if (tag.favorite_flg) {
      console.log("tag.favorite_flg true");
      console.log(tagOrderIds);
      if (!tagIdExists) {
        tagOrderIds.push(String(tag.id));
      }
      console.log(tagOrderIds);
    } else {
      // fav=false の場合
      console.log("tag.favorite_flg false");
      if (tagIdExists) {
        tagOrderIds = tagOrderIds.filter((id) => id !== String(tag.id));
      }
    }
    const newOrder = tagOrderIds.join(",");

    putTagOrder(user?.userid ?? 0, newOrder);

    setFavoriteNormatTagMass();

    // setTagOrder(newOrder);
  };
  const handleTagOrderChange = (newOrder: TypeTagMas[]) => {
    setTagMass(newOrder);
  };
  const handleDelete = async (id: number) => {
    console.log("handleDelete", id);
    await removeTagmas(id);
    setFavoriteNormatTagMass();
  };

  // console.log(tagMass);
  return (
    <div style={{ maxWidth: 900, margin: "40px auto" }}>
      {/* <div>
        TagSeletItem
        <DialogTagLink
          post_id={Number("1")}
          post_title=""
          selectedTagMass={selectedTagMass}
          setSelectedTagMass={setSelectedTagMass}
          favoriteTagMass={tagMass}
          normalTagMass={normalTagMass}
        ></DialogTagLink>
      </div> */}
      <h2 style={{ fontWeight: "bold", marginBottom: "8px" }}>新規</h2>
      <div className="flex items-center mb-4">
        <Input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="新しいタグ名"
          value={newItemName}
          onChange={handleInputChange}
        />
        <Button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2 focus:outline-none focus:shadow-outline text-sm"
          onClick={handleAddItem}
        >
          追加
        </Button>
      </div>
      <TagFavList
        tagMass={tagMass}
        setTagMass={setTagMass}
        onTagOrderChange={handleTagOrderChange}
        setTagOrder={handelPutTagOrder}
        remakeSort={remakeSort}
        handleDelete={handleDelete}
      ></TagFavList>
      <hr />
      {/* アイテムリスト */}
      {normalTagMass.map((item) => (
        <TagSortableItem
          key={item.id}
          tagMas={item}
          sortedAction={false}
          remakeSort={remakeSort}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default PageTagList;
