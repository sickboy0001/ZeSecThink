import { format as formatTz, toZonedTime } from "date-fns-tz";
import { format } from "date-fns-tz";
import { ja } from "date-fns/locale/ja";

export function GetDateFromyyyyMMdd(yyyyMMdd: string) {
  const year = parseInt(yyyyMMdd.substring(0, 4));
  const month = parseInt(yyyyMMdd.substring(4, 6)) - 1; // 月は0ベース
  const day = parseInt(yyyyMMdd.substring(6, 8));
  return new Date(year, month, day, 0, 0, 0, 0);
}

export function GetyyyyMMddJpFromDate(thisdate: Date) {
  return formatTz(thisdate, "yyyyMMdd", {
    timeZone: "Asia/Tokyo",
    locale: ja,
  });
}

export const getJpTimeZoneFromUtc = (datetime: Date) => {
  // console.log(datetime);
  const timeZone = "Asia/Tokyo";
  return formatTz(toZonedTime(datetime, timeZone), "yyyy-MM-dd HH:mm:ssXXX", {
    timeZone,
  });
};

export const GetStringPosgreDateTime = (date: Date) => {
  return GetFormatTz(date, "yyyy-MM-dd HH:mm:ss");
};

export const GetFormatTz = (date: Date, formatstring?: string) => {
  const thisformatestring = "yyyy/MM/dd HH:mm:ss";

  const execformatstring = !formatstring ? thisformatestring : formatstring;
  return formatTz(date, execformatstring, {
    timeZone: "Asia/Tokyo",
    locale: ja,
  });
};

export const GetDateTimeFormat = (date: Date, formatstring?: string) => {
  const thisformatestring = "yyyy/MM/dd HH:mm:ss";

  const execformatstring = !formatstring ? thisformatestring : formatstring;
  return formatTz(date, execformatstring, {
    locale: ja,
  });
};
