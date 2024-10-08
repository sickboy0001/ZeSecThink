## 参考

### スタート！

https://note.com/libproc/n/n168e87864291
結果的には、複合になった・・・

### useState 周り、オブジェクトで管理

https://zenn.dev/yumix/articles/aad5753f1c9da6

```
// 初期値を設定
const [formData, setFormData] = useState<TypeZstPost>({
   ...defaultZstPost, // デフォルト値を展開
   ...zstPost, // 既知の値を上書き
});
```

## Supabase のテーブル追加したとき

以下再度実行する必要がある。  
テーブル一覧で、ロックが解除されたものが見れれば、OK

```SQL
grant usage on schema "public" to anon;
grant usage on schema "public" to authenticated;

GRANT SELECT, INSERT, UPDATE , DELETE ON ALL TABLES IN SCHEMA "public" TO authenticated;
GRANT SELECT, INSERT, UPDATE , DELETE ON ALL TABLES IN SCHEMA "public" TO anon;
```

## todo

- [x] getUserId use mail_to_id tables

- [ ] regist mail_to_id tables

- [x] console.log("todo:Update", columnname, id, checked) // フラグの更新

- [ ] ニックネームの編集　テーブル作成 UI 周り profile\edit\page.tsx

- [ ] CSV からのデータのインポート \components\importcsv\iCsvPage.tsx

## deploy

https://ze-sec-think.vercel.app/

## memo

### Supabase,CustomSMTP

#### SendGrid,Supabase つなぎ方

https://qiita.com/masakinihirota/items/23b128504d6c561e4525
SendGrid とは

#### 「Resend」も有効

https://zenn.dev/daimyo404/articles/3fefe4ef2d9500

#### 「Resend」も有効　こっちのほうが具体的

https://ritaiz.com/articles/setup-supabase-email-configuring-to-send-email-through-resendhttps://zenn.dev/hayato94087/articles/53c0c759a23a19

### Cant_resolve_github_vercel

NextJS デプロイ失敗について
https://qiita.com/tarian/items/f666bf5e8daf5e31a0de

Github の設定変更
https://qiita.com/sawadashota/items/aa312a3b7e2403448efe

「Module not found: Can't resolve '@/components/importcsv/ICsvPage'」NextJS、GitHub→Deploy 時のエラー
一度別名でファイル作成（名前の変更）その後 GitHub に一度上げる、
その後ファイル名をもとに戻すことで、github 上のファイル期待通りになる

### 日付周り

LOACAL:OK!!

```
export const getPosts 2024-08-09 00:00:00+09:00-2024-08-12 00:00:00+09:00
```

VERCEL:NG1:

```
const thisdaytz = toZonedTime(thisday, "Asia/Tokyo");
export const getPosts 2024-08-09 09:00:00+09:00-2024-08-12 09:00:00+09:00
```

VERCEL:NG2:

```
// const thisdaytz = toZonedTime(thisday, "Asia/Tokyo");
export const getPosts 2024-08-09 09:00:00+09:00-2024-08-12 09:00:00+09:00
```

VERCEL:OK:

```
thisday.setHours(0, 0, 0);
export const getPosts 2024-08-09 00:00:00000-2024-08-12 00:00:00000
```

### Vercel でのログの確認

クライアント側はブラウザ F12 で可能
Vscode では出ていた、サーバー側のログの確認方法
Logs -> Level/info -> 再読み込み（右上のもの）
これで、Vscode の出力と同じ内容がでる。

## 2024 年 7 月 22 日

- 中；優先度高タスク
  - 残：メールでの認証周り。
    - SendGrid との紐づけ、sendgrid が相性悪い？
  - 中：レスポンシブル UI の件
    - 済：メニュー
      - スマホでも見れるようにする
      - バーガーメニューへの展開必要
    - 中：ビュー
      - ５ｘ５、４ｘ４などでのエラー
      - 画面全体サイズなど固定している？
      - モーダル画面にも差異が出る。
    - モーダル画面の Shadcn 化
- 未：優先度中タスク
  - 権限毎の View
  - サマリ画面

### async

不要な「const ZstDayTitles = async () 」「 async」は想定外のエラーがでる・・・「Error: async/await is not yet supported 」

### supabase 採番用サロゲートキー用の権限

クエリの実行時に「permission denied for sequence 」が出た時の対応

```SQL
-- 構文
GRANT USAGE ON SEQUENCE [tablename]_[columnname] TO anon;
GRANT USAGE ON SEQUENCE [tablename]_[columnname] TO authenticated;

-- 例
GRANT USAGE ON SEQUENCE zst_post_id_seq TO anon;
GRANT USAGE ON SEQUENCE zst_post_id_seq TO authenticated;
```

### CSV ファイルの取り込み回り

CSSModel 利用
[大量データの CSV を高速でテーブル表示する](https://www.sukerou.com/2023/04/csv.html)

### DataTable/Tanstack Table

実体は「Tanstack Table」なので、こちらのサイト参考:GlobalFilter 実装について
[DevelopersIO/React で Tanstack Table 使っていろいろテーブルを操作してみる](https://dev.classmethod.jp/articles/introduce-tanstack-table/)

### 形態素解析

Kuromoji、形態素解析の利用

React + Kuromoji.js で形態素解析（Webpack の設定と辞書ファイルの配置）(https://qiita.com/piijey/items/a7ff20da2f7d7315abb0)

NextJS public の扱い

[【Next.js】静的な画像ファイルの取り扱い](https://qiita.com/P-man_Brown/items/ed564ae4ea3c8eacfd4f)

おおむねやりたかったこと説明してくれている
[React + kuromoji.js + D3-Cloud で WordCloud をブラウザに描画](https://takumon.com/wordcloud-with-kuromoji-d3cloud-react/)

```diff_javascript
- fontSizeMapper={fontSizeMapper}
+ fontSize={fontSizeMapper}
```

---

Kuromoji だとしっくりこない説あり。Yahoo 乗り換えも検討
Yahoo! JAPAN テキスト解析 Web API
HTTP リクエストでアクセスし、リクエストパラメータは xml で返されます。HTTP メソッドは GET でも POST でも可能です。
制限は 24 時間で 5 万件まで。1 リクエストの最大サイズ 10KB までとなっています。
サイズ４ K になっている模様（追記 7 月 28 日）

## 2024 年 8 月 2 日

### 形態素解析・他社サービスも検討

サービス名 料金プラン 無料利用枠 備考
Amazon Comprehend 1 文字あたり$0.0001（100 万文字あたり$100） 毎月 50,000 文字が無料 初回 12 ヶ月間適用
Google Cloud Natural Language API 1,000 文字あたり$1.00（1 ～ 1,000,000 文字） $300 の無料クレジット 初回登録時
Yahoo! JAPAN Web API 基本無料（詳細は要確認） - API キーの取得が必要
Rakuten RapidAPI - Rakuten MA Basic: 月額$0、1,000 リクエストまで無料 月 1,000 リクエストまで無料 追加リクエストは$0.01/リクエスト
A3RT Text Analysis API 無料 無制限 -
[Goo ラボ](https://labs.goo.ne.jp/api/) API 無料 無制限 利用登録が必要

### UI collapsibleTrigger

コンポーネント化するべきか悩む・・・(todo:20240729)
[【React】文章が長くなる時に collapse が必要か判定する方法](https://zenn.dev/someone7140/articles/a9e9190f29db06)

### 仕様

image_file_name = type-userid-public-fromymd-toymd
type:kuromoji / goolabtext / goolabkeyword
userid: 1-
public: 1:public 0:private
fromymd:20240701
totymd:20240701

## Features

- Works across the entire [Next.js](https://nextjs.org) stack
  - App Router
  - Pages Router
  - Middleware
  - Client
  - Server
  - It just works!
- supabase-ssr. A package to configure Supabase Auth to use cookies
- Styling with [Tailwind CSS](https://tailwindcss.com)
- Optional deployment with [Supabase Vercel Integration and Vercel deploy](#deploy-your-own)
  - Environment variables automatically assigned to Vercel project

## Demo

You can view a fully working demo at [demo-nextjs-with-supabase.vercel.app](https://demo-nextjs-with-supabase.vercel.app/).

## Deploy to Vercel

Vercel deployment will guide you through creating a Supabase account and project.

After installation of the Supabase integration, all relevant environment variables will be assigned to the project so the deployment is fully functioning.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-supabase&project-name=nextjs-with-supabase&repository-name=nextjs-with-supabase&demo-title=nextjs-with-supabase&demo-description=This%20starter%20configures%20Supabase%20Auth%20to%20use%20cookies%2C%20making%20the%20user's%20session%20available%20throughout%20the%20entire%20Next.js%20app%20-%20Client%20Components%2C%20Server%20Components%2C%20Route%20Handlers%2C%20Server%20Actions%20and%20Middleware.&demo-url=https%3A%2F%2Fdemo-nextjs-with-supabase.vercel.app%2F&external-id=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-supabase&demo-image=https%3A%2F%2Fdemo-nextjs-with-supabase.vercel.app%2Fopengraph-image.png&integration-ids=oac_VqOgBHqhEoFTPzGkPd7L0iH6)

The above will also clone the Starter kit to your GitHub, you can clone that locally and develop locally.

If you wish to just develop locally and not deploy to Vercel, [follow the steps below](#clone-and-run-locally).

## Clone and run locally

1. You'll first need a Supabase project which can be made [via the Supabase dashboard](https://database.new)

2. Create a Next.js app using the Supabase Starter template npx command

   ```bash
   npx create-next-app -e with-supabase
   ```

3. Use `cd` to change into the app's directory

   ```bash
   cd name-of-new-app
   ```

4. Rename `.env.local.example` to `.env.local` and update the following:

   ```
   NEXT_PUBLIC_SUPABASE_URL=[INSERT SUPABASE PROJECT URL]
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[INSERT SUPABASE PROJECT API ANON KEY]
   ```

   Both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` can be found in [your Supabase project's API settings](https://app.supabase.com/project/_/settings/api)

5. You can now run the Next.js local development server:

   ```bash
   npm run dev
   ```

   The starter kit should now be running on [localhost:3000](http://localhost:3000/).

> Check out [the docs for Local Development](https://supabase.com/docs/guides/getting-started/local-development) to also run Supabase locally.

## Feedback and issues

Please file feedback and issues over on the [Supabase GitHub org](https://github.com/supabase/supabase/issues/new/choose).

## More Supabase examples

- [Next.js Subscription Payments Starter](https://github.com/vercel/nextjs-subscription-payments)
- [Cookie-based Auth and the Next.js 13 App Router (free course)](https://youtube.com/playlist?list=PL5S4mPUpp4OtMhpnp93EFSo42iQ40XjbF)
- [Supabase Auth and the Next.js App Router](https://github.com/supabase/supabase/tree/master/examples/auth/nextjs)
