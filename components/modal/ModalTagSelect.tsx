"use client";

import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { TypeTagMas } from "@/app/types/tagTypes";
import { Button } from "../ui/button";
import { createTagMas } from "@/app/actions/Tag/TagMas";
import UserContext from "../user/UserContext";
import { deleteInsertZstTagLinks } from "@/app/actions/ZstTagLink/ZstTagLink";
import TagBadgeList from "../tags/TagBadgeList";

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

async function putTagLink(post_id: number, selectedTagMass: TypeTagMas[]) {
  await deleteInsertZstTagLinks({ post_id: post_id, tags: selectedTagMass });
}

interface propTypes {
  post_id: number;
  selectedTagMass: TypeTagMas[];
  setSelectedTagMass: (newTags: TypeTagMas[]) => void;
  favoriteTagMass: TypeTagMas[];
  normalTagMass: TypeTagMas[];
  showModal: Dispatch<SetStateAction<boolean>>;
  onTagUpdated: (updatedTag: TypeTagMas) => void; // コールバック関数を追加
}

const ModalTagSelect = (props: propTypes) => {
  const {
    post_id,
    selectedTagMass,
    setSelectedTagMass,
    favoriteTagMass,
    normalTagMass,
    showModal,
    onTagUpdated,
  } = props;

  const [inputText, setInputText] = useState<string>("");
  const [selectedTags, setSelectedTags] =
    useState<TypeTagMas[]>(selectedTagMass);
  const [favoriteTags, setFavoriteTags] = useState<TypeTagMas[]>([]);
  const [normalTags, setNormalTags] = useState<TypeTagMas[]>([]);

  //   normalTagMass
  //     ? normalTagMass.filter(
  //         (favoriteTag) =>
  //           !selectedTagMass.some(
  //             (selectedTag) => selectedTag.id === favoriteTag.id,
  //           ),
  //       )
  //     : [],
  // );

  useEffect(() => {
    const initializeFavoriteTags = () => {
      if (favoriteTagMass) {
        const filteredTags = favoriteTagMass.filter(
          (favoriteTag) =>
            !selectedTagMass.some(
              (selectedTag) => selectedTag.id === favoriteTag.id,
            ),
        );
        setFavoriteTags(filteredTags);
        console.log("ModalTagSelect:favoriteTags", filteredTags);
      } else {
        setFavoriteTags(favoriteTagMass);
        console.log("ModalTagSelect:favoriteTags", favoriteTagMass);
      }
    };

    initializeFavoriteTags();
  }, [favoriteTagMass, selectedTagMass]);

  useEffect(() => {
    const initializeFavoriteTags = () => {
      if (normalTagMass) {
        const filteredTags = normalTagMass.filter(
          (favoriteTag) =>
            !selectedTagMass.some(
              (selectedTag) => selectedTag.id === favoriteTag.id,
            ),
        );
        setNormalTags(filteredTags);
      } else {
        setNormalTags(normalTagMass);
      }
    };

    initializeFavoriteTags();
  }, [normalTagMass, selectedTagMass]);

  const user = useContext(UserContext);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const getMasTagFromTagName = (text: string) => {
    const lowerInputText = text.toLowerCase().trim();
    const selectedTag = selectedTagMass.find(
      (tag) => tag.tag_name.toLowerCase().trim() === lowerInputText,
    );
    if (selectedTag) {
      return selectedTag;
    }
    const favoriteTag = favoriteTagMass.find(
      (tag) => tag.tag_name.toLowerCase().trim() === lowerInputText,
    );
    if (favoriteTag) {
      return favoriteTag;
    }
    const normalTag = normalTagMass.find(
      (tag) => tag.tag_name.toLowerCase().trim() === lowerInputText,
    );
    if (normalTag) {
      return normalTag;
    }
    return null; // 一致するタグが見つからなかった場合は undefined を返す
  };

  const handleAddTag = async () => {
    // console.log("handleAddItem called", newItemName);
    if (inputText.trim() !== "") {
      //tagがあるかの確認

      const existingTag = getMasTagFromTagName(inputText);
      if (existingTag !== null) {
        // inputText が既にいずれかのタグリストに存在する場合の処理
        console.log(
          `"${inputText}" は ID: ${existingTag.tag_name} で既に存在します。`,
        );
        // 必要に応じて既存のタグを選択する処理などを実装できます
        handleRemoveFavoriteTag(existingTag);
        handleRemoveNormalTag(existingTag);

        setInputText(""); // Inputをクリア
        return;
      } else {
        //なければ追加
        const tempNewItem: TypeTagMas = {
          id: "", //使わないので空白でOK
          tag_name: inputText, // tagNameは入力された名前と同じとします
          name: inputText,
          description: inputText,
          visible_flg: true,
          favorite_flg: false,
          public_flg: true,
        };
        // //tagmas update
        const createdTag = await putTagMas(user?.userid ?? 0, tempNewItem);
        // //local data update main.sorce
        if (createdTag) {
          // local data update main.sorce
          const nowSelectedTags = [createdTag, ...selectedTags];
          setSelectedTags(nowSelectedTags);
          setSelectedTagMass(nowSelectedTags);

          handleRemoveFavoriteTag(createdTag);
          handleRemoveNormalTag(createdTag);

          // 登録されたタグの ID を利用できます
          console.log("登録されたタグ:", createdTag);
        }
      }

      //TagLinkの登録
      //SelectedTagsからの登録
      // console.log("--putTagLink start");
      // await putTagLink(post_id, selectedTags);
      setInputText(""); // Inputをクリア
    }
  };

  const handleRemoveSelectedTag = async (tagToRemove: TypeTagMas) => {
    const nowSelectedTags = selectedTags.filter(
      (tag) => tag.id !== tagToRemove.id,
    );
    setSelectedTagMass(nowSelectedTags);

    setSelectedTags(nowSelectedTags);
    if (favoriteTagMass.some((tag) => tag.id === tagToRemove.id)) {
      if (!favoriteTags.some((tag) => tag.id === tagToRemove.id)) {
        setFavoriteTags([...favoriteTags, tagToRemove]);
      }
    }
    if (normalTagMass.some((tag) => tag.id === tagToRemove.id)) {
      if (!normalTags.some((tag) => tag.id === tagToRemove.id)) {
        setNormalTags([...normalTags, tagToRemove]);
      }
    }

    await putTagLink(post_id, nowSelectedTags);
  };

  const handleRemoveFavoriteTag = async (tagToRemove: TypeTagMas) => {
    setFavoriteTags(favoriteTags.filter((tag) => tag.id !== tagToRemove.id));
    if (!selectedTags.some((tag) => tag.id === tagToRemove.id)) {
      setSelectedTags([...selectedTags, tagToRemove]);
      const nowSelectedTags = [...selectedTags, tagToRemove];
      setSelectedTagMass(nowSelectedTags);
      await putTagLink(post_id, nowSelectedTags);
    }
  };

  const handleRemoveNormalTag = async (tagToRemove: TypeTagMas) => {
    setNormalTags(normalTags.filter((tag) => tag.id !== tagToRemove.id));
    if (!selectedTags.some((tag) => tag.id === tagToRemove.id)) {
      setSelectedTags([...selectedTags, tagToRemove]);
      const nowSelectedTags = [...selectedTags, tagToRemove];
      setSelectedTagMass(nowSelectedTags);
      await putTagLink(post_id, nowSelectedTags);
    }
  };

  console.log("ModalTagSelect:favoriteTags.length", favoriteTags.length);
  console.log("ModalTagSelect:normalTags.length", normalTags.length);

  return (
    <div>
      <div className="">
        <div className="my-2 ">
          <Label className="text-sm bold font-bold ">Selected:</Label>

          {selectedTags.length > 0 ? (
            <TagBadgeList
              tags={selectedTags}
              type="sel"
              handelRemove={handleRemoveSelectedTag}
              afterIconType="minus"
            ></TagBadgeList>
          ) : (
            <label>none</label>
          )}
        </div>
        <hr />

        <div className="my-2 px-1 flex items-center">
          <Label htmlFor="tagInput" className="text-sm mr-2">
            Tag #
          </Label>
          <Input
            type="text"
            id="tagInput"
            value={inputText}
            className="text-sm w-34 mr-2"
            onChange={handleInputChange}
          />
          <Button onClick={handleAddTag} className="add-button text-sm">
            Add
          </Button>
        </div>
        <hr />
        <div className="my-2">
          <Label className="text-sm mr-2">Fav</Label>
          {favoriteTags.length > 0 ? (
            <TagBadgeList
              tags={favoriteTags}
              type="fav"
              handelRemove={handleRemoveFavoriteTag}
              afterIconType="plus"
            ></TagBadgeList>
          ) : (
            <label>none</label>
          )}
        </div>
        <hr />
        <div className="my-2">
          <Label className="text-sm mr-2">Tags</Label>
          {normalTags.length > 0 ? (
            <TagBadgeList
              tags={normalTags}
              type="nor"
              handelRemove={handleRemoveNormalTag}
              afterIconType="plus"
            ></TagBadgeList>
          ) : (
            <label>none</label>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalTagSelect;
