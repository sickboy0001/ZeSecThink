import { readPostsCountByDate } from "@/app/actions/zstPosts/posts";
import { TypeHeatMapData } from "@/app/types/TypeHeatMap";

const getRawHeatMapData = async (
  user_id: number,
  from_at: Date,
  to_at: Date,
  tag_id?: number,
) => {
  const result = user_id
    ? await readPostsCountByDate(user_id, from_at, to_at, tag_id)
    : [];
  return result;
};

interface getHeatMapDataProp {
  user_id: number;
  from_at: Date;
  to_at: Date;
  tag_id?: number;
}

export const getHeatMapData = async (
  props: getHeatMapDataProp,
): Promise<TypeHeatMapData[]> => {
  const { user_id, from_at, to_at, tag_id } = props;

  const rawHeatMapData = await getRawHeatMapData(
    user_id,
    from_at,
    to_at,
    tag_id,
  );
  const result: TypeHeatMapData[] = [];
  if (rawHeatMapData && Array.isArray(rawHeatMapData)) {
    const heatMapData: TypeHeatMapData[] = rawHeatMapData.map((item) => ({
      date: item.current_at, // current_at を date として使用
      count: isNaN(item.count) ? 1 : item.count, // todo: ほかに問題ないか・・・取得時の並び自体NG？NaN の場合は 0 でフォールバック
    }));
    // 日付順にソート（任意）
    heatMapData.sort((a, b) => a.date.localeCompare(b.date));
    return heatMapData;
  }
  return [];
};
