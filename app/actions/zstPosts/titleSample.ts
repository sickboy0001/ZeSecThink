"use server";
import { getJpTimeZoneFromUtc } from "@/lib/utilsDate";
import { createClient } from "@/utils/supabase/server";

interface insertTitleSampleType {
  title: string;
}
export const insertTitleSample = async (props: insertTitleSampleType) => {
  const { title } = props;
  const supabase = createClient();

  const create_at = getJpTimeZoneFromUtc(new Date());
  try {
    const { data: res, error } = await supabase
      .from("zst_title_sample")
      .insert([
        {
          title: title,
          create_at: create_at,
        },
      ]);
    if (error) {
      console.log("insertTitleSample:faild", error);
    }
  } catch (error) {
    console.log("insertTitleSample:faild", error);
  }
};

export const selectRandomTitleSample = async (count: number) => {
  // console.log("selectSampleTitle:", title);
  const supabase = createClient();
  const { data: res, error } = await supabase
    .from("random_zst_title_sample")
    .select("*")
    .limit(count);

  if (error) {
    console.log(error);
    return [];
  }
  // console.log("selectSampleTitle:", res);
  return res;
};

export const selectAllTitleSample = async () => {
  // console.log("selectSampleTitle:", title);
  const supabase = createClient();
  const { data: res, error } = await supabase
    .from("zst_title_sample")
    .select("*");

  if (error) {
    console.log(error);
    return [];
  }
  // console.log("selectSampleTitle:", res);
  return res;
};
export const selectSampleTitle = async (title: string) => {
  // console.log("selectSampleTitle:", title);
  const supabase = createClient();
  const { data: res, error } = await supabase
    .from("zst_title_sample")
    .select("*")
    .eq("title", title)
    .limit(1)
    .single();

  if (error) {
    console.log(error);
    return [];
  }
  // console.log("selectSampleTitle:", res);
  return res;
};
