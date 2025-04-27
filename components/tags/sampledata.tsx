import { TypeTagMas } from "@/app/types/tagTypes";
import { TypeZstPost } from "@/app/types/zstTypes";

// export const getTagMas = (): TypeTagMas[] => [
//   {
//     id: "10",
//     tagName: "Notion",
//     name: "Notionについて",
//     description: "",
//     visible_flg: true,
//     favorite_flg: true,
//   },
//   {
//     id: "101",
//     tagName: "Work",
//     name: "",
//     description: "",
//     visible_flg: true,
//     favorite_flg: true,
//   },
//   {
//     id: "103",
//     tagName: "言語化",
//     name: "",
//     description: "",
//     visible_flg: true,
//     favorite_flg: true,
//   },
//   {
//     id: "11",
//     tagName: "ZSTA",
//     name: "ゼロ秒思考アプリ",
//     description: "",
//     visible_flg: true,
//     favorite_flg: true,
//   },
//   {
//     id: "12",
//     tagName: "ZSTA_REQ",
//     name: "ZSTA機能追加要望",
//     description: "",
//     visible_flg: true,
//     favorite_flg: true,
//   },
//   {
//     id: "13",
//     tagName: "ZSTA_TAG",
//     name: "ZSTATag機能",
//     description: "",
//     visible_flg: true,
//     favorite_flg: true,
//   },
//   {
//     id: "14",
//     tagName: "ZSTA_ZET",
//     name: "ZSTAツェッテルカルツエン",
//     description: "",
//     visible_flg: true,
//     favorite_flg: true,
//   },
// ];

export type TagZstStateData = {
  date: string;
  count: number;
};

// ユーティリティ：日付を文字列 (yyyy/MM/dd) に変換
const formatDate = (date: Date): string => {
  return date.toISOString().slice(0, 10).replace(/-/g, "/");
};

// サンプルデータ取得関数
export const getTagsZstStateDatas = (): TagZstStateData[] => {
  const result: TagZstStateData[] = [];

  const now = new Date();
  const oneYearAgo = new Date(now);
  oneYearAgo.setFullYear(now.getFullYear() - 1);

  // サンプル件数（例えば30件）
  const sampleCount = 30;

  for (let i = 0; i < sampleCount; i++) {
    // ランダムな日付（過去1年以内）
    const randomTime =
      oneYearAgo.getTime() +
      Math.random() * (now.getTime() - oneYearAgo.getTime());
    const randomDate = new Date(randomTime);

    // ランダムなカウント（1〜20）
    const count = Math.floor(Math.random() * 20) + 1;
    result.push({
      date: formatDate(randomDate),
      count,
    });
  }

  // 日付順にソート（任意）
  result.sort((a, b) => a.date.localeCompare(b.date));
  return result;
};

export const getRandom10SamplePosts = (): TypeZstPost[] => {
  const allPosts = getSampleZstPost();
  // 配列をシャッフルして先頭10件を取得
  const shuffledAndSliced = [...allPosts]
    .sort(() => Math.random() - 0.5)
    .slice(0, 10);

  const sortedPosts = shuffledAndSliced.sort((a, b) => {
    // ここで日付の比較を行う
    // 例：Dateオブジェクトとして比較する場合
    const dateA = new Date(a.current_at); // 'date' プロパティに日付文字列が入っていると仮定
    const dateB = new Date(b.current_at);
    return dateB.getTime() - dateA.getTime(); // 新しい方が大きい値を返す
  });

  // 配列をシャッフルして先頭10件を取得
  return sortedPosts.slice(0, 10);
};

export type TypeZstPostSample = {
  id: number;
  current_at: string;
  user_id: number;
  title: string;
  content: string;
};

export const getSampleZstPost = (): TypeZstPost[] => {
  return [
    {
      id: 1,
      current_at: new Date("2025/01/01"),
      user_id: 1,
      title: "睡眠",
      content: "test",
      second: 0, // 例として追加
      public_flg: true, // 例として追加
      public_content_flg: false, // 例として追加
      delete_flg: false, // 例として追加
      write_start_at: new Date(),
      write_end_at: new Date(),
      create_at: new Date(),
      update_at: new Date(),
    },
    {
      id: 2,
      user_id: 1,
      current_at: new Date("2025/02/01"),
      title: "言語化ノート",
      content: "test",
      second: 0, // 例として追加
      public_flg: true, // 例として追加
      public_content_flg: false, // 例として追加
      delete_flg: false, // 例として追加
      write_start_at: new Date(),
      write_end_at: new Date(),
      create_at: new Date(),
      update_at: new Date(),
    },

    {
      id: 3,
      user_id: 1,
      current_at: new Date("2025/03/01"),
      title: "AIについて",
      content: "test",
      second: 0, // 例として追加
      public_flg: true, // 例として追加
      public_content_flg: false, // 例として追加
      delete_flg: false, // 例として追加
      write_start_at: new Date(),
      write_end_at: new Date(),
      create_at: new Date(),
      update_at: new Date(),
    },

    {
      id: 4,
      user_id: 1,
      current_at: new Date("2025/01/11"),
      title: "必要性の検討必要",
      content: "test",
      second: 0, // 例として追加
      public_flg: true, // 例として追加
      public_content_flg: false, // 例として追加
      delete_flg: false, // 例として追加
      write_start_at: new Date(),
      write_end_at: new Date(),
      create_at: new Date(),
      update_at: new Date(),
    },
    {
      id: 5,
      user_id: 1,
      current_at: new Date("2025/03/07"),
      title: "相談役とは",
      content: "test",
      second: 0, // 例として追加
      public_flg: true, // 例として追加
      public_content_flg: false, // 例として追加
      delete_flg: false, // 例として追加
      write_start_at: new Date(),
      write_end_at: new Date(),
      create_at: new Date(),
      update_at: new Date(),
    },
    {
      id: 6,
      user_id: 1,
      current_at: new Date("2025/01/13"),
      title: "何に悩んでいるのか・・・",
      content: "test",
      second: 0, // 例として追加
      public_flg: true, // 例として追加
      public_content_flg: false, // 例として追加
      delete_flg: false, // 例として追加
      write_start_at: new Date(),
      write_end_at: new Date(),
      create_at: new Date(),
      update_at: new Date(),
    },

    {
      id: 7,
      user_id: 1,
      current_at: new Date("2025/01/14"),
      title: "これはサンプルデータの1つ目です。",
      content: "test",
      second: 0, // 例として追加
      public_flg: true, // 例として追加
      public_content_flg: false, // 例として追加
      delete_flg: false, // 例として追加
      write_start_at: new Date(),
      write_end_at: new Date(),
      create_at: new Date(),
      update_at: new Date(),
    },
    {
      id: 2900,
      user_id: 1,
      current_at: new Date("2025/04/02"),
      title: "ジム用の靴",
      content: `ひとまず買ってみる。
帰り寄れる状態がベスト
小さくなるかどうかはポイントかと`,
      second: 0, // 例として追加
      public_flg: true, // 例として追加
      public_content_flg: false, // 例として追加
      delete_flg: false, // 例として追加
      write_start_at: new Date(),
      write_end_at: new Date(),
      create_at: new Date(),
      update_at: new Date(),
    },
    {
      id: 2901,
      user_id: 1,
      current_at: new Date("2025/04/03"),
      title: "ゼロ秒思考アプリ機能追加ツェッテルカステン",
      content: `画面案作成
ER検討
ツェッテルカステンの、単語整理
選択画面の多様化
MDでの保存機能`,
      second: 0, // 例として追加
      public_flg: true, // 例として追加
      public_content_flg: false, // 例として追加
      delete_flg: false, // 例として追加
      write_start_at: new Date(),
      write_end_at: new Date(),
      create_at: new Date(),
      update_at: new Date(),
    },
    {
      id: 2902,
      user_id: 1,
      current_at: new Date("2025/04/03"),
      title: "ゼロ秒思考アプリ機能追加コントリビュートチャート",
      content: `実装の可否試してみる事、ソース的にはjsで行けそうな気がする
ステータス画面、公開画面に展開して誰でも見える様に
施行している様子見えるようにする`,
      second: 0, // 例として追加
      public_flg: true, // 例として追加
      public_content_flg: false, // 例として追加
      delete_flg: false, // 例として追加
      write_start_at: new Date(),
      write_end_at: new Date(),
      create_at: new Date(),
      update_at: new Date(),
    },

    {
      id: 2910,
      user_id: 1,
      current_at: new Date("2025/04/03"),
      title: "今日の「言語化ノート」",
      content: `昼飯かな、、、仕事では喋らずに済んだ気がする
タスク多いのはメンドイ、、まあ、金貰ってるからと呟く
割合可視化できる仕組みは作りたいかも`,
      second: 0, // 例として追加
      public_flg: true, // 例として追加
      public_content_flg: false, // 例として追加
      delete_flg: false, // 例として追加
      write_start_at: new Date(),
      write_end_at: new Date(),
      create_at: new Date(),
      update_at: new Date(),
    },
    {
      id: 2911,
      user_id: 1,
      current_at: new Date("2025/04/03"),
      title: "ツェッテルカステン タグとリンクの違いは？",
      content: `タグとリンクの違いは？
タグ→メモを見つけるためのへのトリガー
リンク→Output作成時に見やすくするための情報
タグ編集時：簡単に調整できること。ぶれないようにすること。変更が容易に
リンク編集時：既存のメモと作成しようとするパーラメントノートの紐づけ
ある程度簡易に調整必要、リンクと並びこみリンクは必要かと
並びも整理必要かと
タグ編集画面：簡単に追加削除できること。FleetingNote、LiteratureNoteなどに結びつく、
将来性のために、PermanentNoteにも結び付く`,
      second: 0, // 例として追加
      public_flg: true, // 例として追加
      public_content_flg: false, // 例として追加
      delete_flg: false, // 例として追加
      write_start_at: new Date(),
      write_end_at: new Date(),
      create_at: new Date(),
      update_at: new Date(),
    },
    {
      id: 2912,
      user_id: 1,
      current_at: new Date("2025/04/03"),
      title: "Notionの限界とメリット",
      content: `Notionの限界とメリット整理したい
トップページまでのリンク容易、そのベース自体も自由に編集できる
DB使っての微妙な表現が難しい
グラフ、チャート、カウントしての表、グループ化など
アウトプット、api使っての連携は容易`,
      second: 0, // 例として追加
      public_flg: true, // 例として追加
      public_content_flg: false, // 例として追加
      delete_flg: false, // 例として追加
      write_start_at: new Date(),
      write_end_at: new Date(),
      create_at: new Date(),
      update_at: new Date(),
    },
    {
      id: 2913,
      user_id: 1,
      current_at: new Date("2025/04/03"),
      title: "青髪＋白髪＋スーツ",
      content: `五十代ぐらいの人、なんかの罰ゲームかと思った
新鮮だった気がする
まあ、間違えたパターンかと
注目集まるから違う世界見える説`,
      second: 0, // 例として追加
      public_flg: true, // 例として追加
      public_content_flg: false, // 例として追加
      delete_flg: false, // 例として追加
      write_start_at: new Date(),
      write_end_at: new Date(),
      create_at: new Date(),
      update_at: new Date(),
    },
    {
      id: 2920,
      user_id: 1,
      current_at: new Date("2025/04/04"),
      title: "ツェツテルカステンのタグ",
      content: `情報整理が目的と思えば、ゼロ秒思考のメモにガッチャンコするのは有用
それでかつ興味あることへの追求具合もわかるようにすればなおさら
最終的にはツェッテルカステンにすると思うけど、タグの紐づけは先行して実装
最初からあったほうがと思ってたし`,
      second: 0, // 例として追加
      public_flg: true, // 例として追加
      public_content_flg: false, // 例として追加
      delete_flg: false, // 例として追加
      write_start_at: new Date(),
      write_end_at: new Date(),
      create_at: new Date(),
      update_at: new Date(),
    },
  ];
};
/**
  id: number;
  user_id: number;
  current_at: Date;
  title: string;
  content: string;
 */
