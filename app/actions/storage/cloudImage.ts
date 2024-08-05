"use server";

import { TypeWordCount } from "@/app/types/wordCloud";
import puppeteer from "puppeteer";
import { v4 as uuidv4 } from "uuid";
import { uploadImage, uploadPublicUrlZstPosts } from "./upload";

interface propType {
  data: TypeWordCount[];
}

export const UploadElementText = async (text: string) => {
  const text2 = getTestData();
  const screenshotBuffer = await getScreenshotBuffer(text2);

  // pathの作成
  const filename = getFileName("goolabtext", 1, 1, "20240723", "20240723");
  const filePath = getFilePath(filename);

  const beforeUrl = await uploadPublicUrlZstPosts(filePath);
  if (!beforeUrl) {
    // imgのアップロード
    await uploadImage(filePath, screenshotBuffer);
  }

  // imgのパスの取得
  const result = await uploadPublicUrlZstPosts(filePath);

  console.log("export const UploadElementText :", result);

  return result;
};

const getFilePath = (filename: string) => {
  return `images/${filename}`;
};

const getFileName = (
  type: string,
  userid: number,
  isPublic: number,
  fromYmd: string,
  toYmd: string
) => {
  // type:kuromoji / goolabtext / goolabkeyword
  // userid: 1-
  // public: 1:public 0:private
  // fromymd:20240701
  // totymd:20240701
  return (
    type +
    "-" +
    userid.toString() +
    "-" +
    isPublic.toString() +
    "-" +
    fromYmd +
    "-" +
    toYmd +
    ".png"
  );
};

const getScreenshotBuffer = async (wordcounts: TypeWordCount[]) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(getPageContetString(wordcounts));

  await page.waitForSelector("svg");

  const element = await page.$("svg");
  if (!element) {
    throw new Error("Element not found");
  }

  const screenshotBuffer = await element.screenshot({ encoding: "binary" });
  await browser.close();

  return screenshotBuffer as Buffer;
};

const getPageContetString = (wordcounts: TypeWordCount[]) => {
  return `
    <html>
      <head>
        <style>
          body { background-color: white; padding: 20px; }
        </style>
        <script src="https://d3js.org/d3.v4.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/d3-cloud@1.2.5/build/d3.layout.cloud.js"></script>
      </head>
      <body>
        <div id="wordcloud"></div>
        <script>
          const words = ${JSON.stringify(
            wordcounts.map((word) => ({ text: word.text, size: word.value }))
          )};
          // カラフルな色を生成する関数
          function getRandomColor() {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
              color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
          }

          const layout = d3.layout.cloud()
            .size([500, 500])
            .words(words)
            .padding(5)
            .rotate(() => ~~(Math.random() * 180) - 90 )
            .font("Meiryo")
            .fontSize(d => d.size)
            .on("end", draw);
            
          layout.start();

          function draw(words) {
            d3.select("#wordcloud")
              .append("svg")
                .attr("width", layout.size()[0])
                .attr("height", layout.size()[1])
              .append("g")
                .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
              .selectAll("text")
                .data(words)
              .enter().append("text")
                .style("font-size", d => d.size + "px")
                .style("font-family", "Meiryo")
                //.style("fill", d => getRandomColor())  // 各単語にランダムな色を設定
                .style("fill", () => getRandomColor()) // Apply random color
                .attr("text-anchor", "middle")
                .attr("transform", d => "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")")
                .text(d => d.text);
          }
        </script>
      </body>
    </html>
  `;
};
const getTestData = () => {
  const text2 = [
    { text: "JavaScript", value: 40 },
    { text: "TypeScript", value: 30 },
    { text: "React", value: 50 },
    { text: "Next.js", value: 20 },
    { text: "Node.js", value: 45 },
    { text: "GraphQL", value: 25 },
    { text: "HTML", value: 35 },
    { text: "CSS", value: 38 },
    { text: "Webpack", value: 28 },
    { text: "Babel", value: 22 },
    { text: "Jest", value: 15 },
    { text: "Testing", value: 32 },
    { text: "Redux", value: 27 },
    { text: "MobX", value: 18 },
    { text: "Tailwind", value: 25 },
    { text: "Styled-Components", value: 12 },
    { text: "Sass", value: 30 },
    { text: "Less", value: 18 },
    { text: "ES6", value: 34 },
    { text: "Functional Programming", value: 22 },
  ];
  return text2;
};
