import { TypeZstPost } from "@/app/types/zstTypes";
import { GetDateTimeFormat } from "@/lib/utilsDate";

export interface TypeDayChartSummary {
  date: string;
  avgchars: number;
  publicPostCount: number;
  privatePostCount: number;
  avgSec: number;
}

export const GetWeekChartSummary = (zstPosts: TypeZstPost[]) => {
  const dateZstPosts = zstPosts.map((each) => {
    return {
      date: GetDateTimeFormat(each.current_at),
      zstPost: each,
    };
  });

  // 日付ごとにデータをグループ化
  const groupedByDate: { [key: string]: TypeZstPost[] } = dateZstPosts.reduce(
    (acc, curr) => {
      acc[curr.date] = acc[curr.date] || [];
      acc[curr.date].push(curr.zstPost);
      return acc;
    },
    {} as { [key: string]: TypeZstPost[] }
  );

  // 各グループの平均値を計算
  const averages = Object.keys(groupedByDate).map((date) => {
    const zstPosts = groupedByDate[date];
    const avgchars =
      zstPosts.reduce((sum, zstpost) => sum + zstpost.content.length, 0) /
      zstPosts.length;
    const postcount = zstPosts.reduce((sum, value) => sum + 1, 0);
    // console.log(zstPosts);

    const publicPostCount = zstPosts.filter(
      (zstpost) => zstpost.public_flg
    ).length;
    // console.log(zstPosts);

    const avgSec =
      zstPosts.reduce((sum, zstPost) => sum + zstPost.second, 0) /
      zstPosts.length;

    const privatePostCount = zstPosts.filter(
      (zstpost) => !zstpost.public_flg
    ).length;
    // const privatePostCount = zstPosts
    // .filter((zstpost) => !zstpost.public_flg)
    // .reduce((sum, value) => sum + 1, 0);
    return {
      date,
      avgchars,
      publicPostCount,
      privatePostCount,
      avgSec,
    };
  });

  const sortedAverages = averages.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
  return sortedAverages;
};
