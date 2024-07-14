import { format as formatTz } from "date-fns-tz";
import { ja } from "date-fns/locale/ja";

export function GetDateFromyyyyMMdd(yyyyMMdd:string){
  const year = parseInt(yyyyMMdd.substring(0, 4));
  const month = parseInt(yyyyMMdd.substring(4, 6)) - 1; // 月は0ベース
  const day = parseInt(yyyyMMdd.substring(6, 8));
  return new Date(year, month, day, 0, 0, 0, 0);
}

export function GetyyyyMMddJpFromDate(thisdate:Date){
  return formatTz(thisdate, "yyyyMMdd", {
    timeZone: "Asia/Tokyo",
    locale: ja,
  });

}