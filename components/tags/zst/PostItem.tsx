import React, { useState } from "react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { TypeZstPostSample } from "../sampledata";
import { DateToSystemTimezoneSetter } from "date-fns/parse/_lib/Setter";
import { TypeZstPost } from "@/app/types/zstTypes";

interface PostItemProps {
  post: TypeZstPost;
}

const PostItem = (props: PostItemProps) => {
  const { post } = props;
  const [isContentVisible, setIsContentVisible] = useState(false);

  const toggleContent = () => {
    setIsContentVisible(!isContentVisible);
  };

  const formatDateWithDay = (dateString: any) => {
    const date = new Date(dateString);
    return format(date, "yyyy年MM月dd日(EEE)", { locale: ja });
  };

  const formatDateWithDayColor = (dateString: any) => {
    const date = new Date(dateString);
    const dayOfWeek = date.getDay(); // 0:日, 1:月, 2:火, 3:水, 4:木, 5:金, 6:土

    if (dayOfWeek === 6) {
      // 土曜日
      return "text-blue-500 cursor-pointer";
    } else if (dayOfWeek === 0) {
      // 日曜日
      return "text-red-500 cursor-pointer";
    } else {
      return "text-gray-700 cursor-pointer"; // 平日のデフォルトの色
    }
  };

  return (
    <div key={post.id} className="border p-4 rounded shadow">
      <label
        className={formatDateWithDayColor(post.current_at)}
        onClick={toggleContent}
      >
        {formatDateWithDay(post.current_at)}
      </label>
      <label
        className="px-2 font-semibold cursor-pointer"
        onClick={toggleContent}
      >
        {post.title}
      </label>
      {isContentVisible && (
        <p className="mt-2 whitespace-pre-wrap">{post.content}</p>
      )}
    </div>
  );
};

export default PostItem;
