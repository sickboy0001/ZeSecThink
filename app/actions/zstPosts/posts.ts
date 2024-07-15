"use server";

import { createClient } from "@/utils/supabase/server";
import { TypeZstDay, TypeZstPost } from "@/app/types/zstTypes";
import { getJpTimeZoneFromUtc } from "@/lib/utilsDate";
import { Identifier } from "typescript";

export const getPosts = async (
  user_id: number | undefined,
  from_at: Date,
  to_at: Date
) => {
  const supabase = createClient();
  const { data: res, error } = await supabase
    .from("zst_post")
    .select("*")
    .eq("user_id", user_id)
    .gte("current_at", getJpTimeZoneFromUtc(from_at))
    .lte("current_at", getJpTimeZoneFromUtc(to_at))
    .order("current_at", { ascending: true }) // 最初のソート条件: 昇順
    .order("write_start_at", { ascending: true }) // 次のソート条件: 降順;
    .order("update_at", { ascending: true }); // 次のソート条件: 降順;

  if (error) {
    console.log(error);
    return [];
  }

  // 日時フィールドをDateオブジェクトに変換
  const posts = res.map((item: any) => ({
    ...item,
    current_at: new Date(item.current_at),
    write_start_at: new Date(item.write_start_at),
    write_end_at: new Date(item.write_end_at),
    create_at: new Date(item.create_at),
    update_at: new Date(item.update_at),
  }));

  // console.log("zstposts/posts/getPosts:", res);
  return posts;
};

export const updateZstPost = async ({
  params,
}: {
  params: { ZstPost: TypeZstPost };
}) => {
  const { ZstPost } = params;

  const supabase = createClient();

  const update_at = getJpTimeZoneFromUtc(new Date());

  const { error: putError } = await supabase
    .from("zst_post")
    .update({
      title: ZstPost.title,
      content: ZstPost.content,
      update_at: update_at,
    })
    .eq("id", ZstPost.id.toString());
  if (putError) {
    console.log("■■■■データの登録失敗", putError);
  }
  return;
};

export const createZstPost = async ({
  params,
}: {
  params: { ZstPost: TypeZstPost };
}) => {
  const { ZstPost } = params;
  // console.log("createZstPost", ZstPost);
  // 日本時間に変換
  const current_at = getJpTimeZoneFromUtc(ZstPost.current_at);
  const write_start_at = getJpTimeZoneFromUtc(ZstPost.write_start_at);
  const write_end_at = getJpTimeZoneFromUtc(ZstPost.write_end_at);
  const create_at = getJpTimeZoneFromUtc(ZstPost.create_at);
  const update_at = getJpTimeZoneFromUtc(ZstPost.update_at);
  const supabase = createClient();
  try {
    const { data: res, error } = await supabase.from("zst_post").insert([
      {
        user_id: ZstPost.user_id,
        current_at: current_at,
        title: ZstPost.title,
        content: ZstPost.content,
        second: ZstPost.second,
        public_flg: ZstPost.public_flg,
        public_content_flg: ZstPost.public_content_flg,
        delete_flg: ZstPost.delete_flg,
        write_start_at: write_start_at,
        write_end_at: write_end_at,
        create_at: create_at,
        update_at: update_at,
      },
    ]);
    if (error) {
      console.log("■■■■データの登録失敗", error);
    }
  } catch (error) {
    console.log("■■■■データの登録失敗", error);
  }
};

export const getPostsDummy = async () => {
  // const res = await prisma.start_type.findMany({orderBy:{display_order:'asc'}});
  // return res;
  const res: TypeZstDay[] = [
    {
      date: new Date(2024, 6 - 1, 21, 0, 0, 0, 0),
      zstContent: [
        {
          title: "電子ペーパー",
          public_flg: false,
          content_public_flg: true,
          content: `使おうとすると結構コスト高い模様。富士通のやつがしっかりしているが、４，５万要件としては、PC、スマホへの連携必須。充電能力 大きさ、A4がベスト
いろんな会社が出している模様。継続して情報集めたほうがいいと思います。,
カラーリング　黒に白で書くより、紙（ホワイトボード）に記載のイメージがいい
nuboardにしてて、写真撮って共有のほうが楽ではないか説は残ると思います。`,
        },
        {
          title: "０秒思考　書評",
          public_flg: false,
          content_public_flg: true,
          content: `鍛えるすべを提示するもの。
そのための手順を具体的に提示
再利用、生産力のアップには直結しないが、随時の判断力、思考力を上げることに特化している。
思考力鍛えるトレーニングという意識は今までなかったので、有用なツール化も
誰でも目指せるトレーニングというのはありがたい。
ツール化することで、より、簡易にトレーニングしやすくなるのではないか？
再利用についてはデータでの作業が得意なので、データ化するメリット
個人情報についてはどうするか・・・DBの時点で暗号化は入れるかどうか
構造は基本２段階　タイトル、コンテンツ（５，６）、コンテンツに補足、補足は必須ではない想定
データ化するのなら、履歴は残したほうがいい
繰り返して読むことも視野にいれる！`,
        },
      ],
    },
    {
      date: new Date(2024, 7 - 1, 1, 0, 0, 0, 0),
      zstContent: [
        {
          title: "週初め",
          public_flg: false,
          content_public_flg: true,
          content: `そこまで仕事は重くない予定
生産活動頑張れれば
でなく頑張るのほうがいいのかな。敬意もあるから。デプロイするか…
やっぱりデプロイ画面遠になるのなんとかしたい`,
        },
        {
          title: "変な夢見た",
          public_flg: false,
          content_public_flg: true,
          content: `本能のままに生きる夢見た。欲望度合いが高かった,
求めてるってことかな,
自分が本当に求めてるものわかるかも,
どれだけ本能に忠実かも見えること期待`,
        },
        {
          title: "白髪染め",
          public_flg: false,
          content_public_flg: true,
          content: `
synossかカットで白髪染めするかバランス試行中
今はカット白髪染め後三週間目からsynoss使ってる
面倒さはそこまで出ないけど、期待通り染まってるかは気になるなぁ
染めるときは、週二三程度
synoss一本にする手もあると悩み中
カット代カラーある時の値段もきつい`,
        },
      ],
    },
    {
      date: new Date(2024, 7 - 1, 2, 0, 0, 0, 0),
      zstContent: [
        {
          title: "縦のライン　動くの優先で広める理由",
          public_flg: false,
          content_public_flg: true,
          content: `
作って動くことを優先する
動き出してから育てる。
サイズ可能性のパターンへ持っていくのは苦労する説
戦ってみるかな、あのパターンは悪くない
価値があることもすぐわかる`,
        },
      ],
    },
    {
      date: new Date(2024, 7 - 1, 9, 0, 0, 0, 0),
      zstContent: [
        {
          title: "next、servet、client",
          public_flg: false,
          content_public_flg: true,
          content: `
コレは沼にハマる",
サーバーサイド中心でコンポーネントでクライアント
usestate使えないの、サーバー側では
react自体、やっぱりClientに特化してるんだなと`,
        },
        {
          title: "九仞の功を一簣に虧く",
          public_flg: false,
          content_public_flg: true,
          content: `キュウジンノコウヲいっきにカク
かっこいい日本語、使いたくなる日本語
たまにあるよな。
騙されてもいいから使ってみたくなる
こんな情緒的になる日本語好きだ`,
        },
      ],
    },
    {
      date: new Date(2024, 7 - 1, 10, 0, 0, 0, 0),
      zstContent: [
        {
          title: "コンポーネントは",
          public_flg: false,
          content_public_flg: true,
          content: `細かくすればするほど悩んだときのつまりは小さくて済む
どの程度までするかは悩むがとめどなくていいかな、
名前付けのルールに縛られるかもしれないけど経験優先で`,
        },
        {
          title: "明日の休み",
          public_flg: false,
          content_public_flg: true,
          content: `雨ヤバそうなので引きこもりかな。
ハズレの日もたまにはある。看過予習する時間潰すかも
自分のために時間使うで十分説がある`,
        },
      ],
    },
    {
      date: new Date(2024, 7 - 1, 11, 0, 0, 0, 0),
      zstContent: [
        {
          title: "心の病",
          public_flg: false,
          content_public_flg: true,
          content: `大きさはわからない
だれにも、本人にも、本人でも気づけていないことがある。
どういう対応がベストか？最大限の対応がベストか？リスク考慮しての対応がベストか`,
        },
        {
          title: "関数化、libの範囲",
          public_flg: false,
          content_public_flg: true,
          content: `範囲妥当性は悩みどころ
実装した経験から適切に持っていくのがゴール
やってみて程度見て見直しも有効`,
        },
      ],
    },
    {
      date: new Date(2024, 7 - 1, 13, 0, 0, 0, 0),
      zstContent: [
        {
          title: "シンプルから行くか、画面優先から行くか…",
          public_flg: false,
          content_public_flg: true,
          content: `メール認証から行くか、プロチューから行くか
シンプルなのは前者なのでそっちから行く予定、一月以内の再挑戦なので問題はない想定です`,
        },
        {
          title: "notionの出力",
          public_flg: false,
          content_public_flg: true,
          content: `csvはありがたいが、コメントがないのは辛い
試しといたらよかったと
こまめに直していくか、いい方法ないか検討すること`,
        },
        {
          title: "繰り返しが有用",
          public_flg: false,
          content_public_flg: true,
          content: `納得いかないので繰り返しのシナリオ調整
何がどうなるかは不明だがやってみること
結果出すことが大事`,
        },
        {
          title: "Buildの問題",
          public_flg: false,
          content_public_flg: true,
          content: `結果としてはクライアントでCookie使わずにすること。
長かったけどグッキー使う限りsgはngということは学んだ。
あとは横展開。prismaどうするかな…`,
        },
        {
          title: "UI専念",
          public_flg: false,
          content_public_flg: true,
          content: `専念できる、懸念してた部分はクリアできてる印象。
priama使うかどうか、、、通常のサンプルあるし使わないのが有効かも
prima使うならサーバーから定義持って来る術確認必要
Prisma妥当な方法なさそう。ソースベースなんかなぁ。再現性担保する上では妥当`,
        },
      ],
    },
  ];
  return res;
};
