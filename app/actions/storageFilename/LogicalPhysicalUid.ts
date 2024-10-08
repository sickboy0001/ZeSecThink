"use server";

import { getJpTimeZoneFromUtc } from "@/lib/utilsDate";
import { createClient } from "@/utils/supabase/server";
import { deleteFile, uploadedPublicUrl } from "../storage/upload";

const domain = "zstposts";
const dir = "images";

export const deleteLogiclPhysicalUidWithFile = async (
  logicalFilepath: string
) => {
  //Table登録されているかの確認
  const thisUid = await GetLogicalPhysicalUid(logicalFilepath);

  if (!thisUid) {
    console.error(
      "Logical to physical UID mapping not found[delete].",
      logicalFilepath
    );
    return;
  }
  console.log(thisUid.create_at);

  const filepathname = thisUid.dir + "/" + thisUid.physical_filename;
  const path = await uploadedPublicUrl(filepathname);

  await deleteFile(path);
  await deleteLogicalPhysicalUid(logicalFilepath);
};

export const GetLogicalPhysicalUid = async (logical_filename: string) => {
  // console.log("GetLogicalPhysicalUid:start");
  const result = await selectLogical(logical_filename);
  console.log("GetLogicalPhysicalUid:end", result);
  return result;
};

export const deleteLogicalPhysicalUid = async (logical_filename: string) => {
  // console.log("GetLogicalPhysicalUid:start");
  const result = await deleteLogical(logical_filename);
  console.log("deleteLogicalPhysicalUid:end", result);
  return result;
};

export const registLogicalPhysicaluid = async (
  logical_filename: string,
  physical_filename: string
) => {
  const physicalFilenamesbefore = await selectLogical(logical_filename);
  // console.log("registLogicalPhysicaluid", physicalFilenamesbefore);
  await deleteData(logical_filename);

  // const physicalFilenames = await selectLogical(logical_filename);
  // console.log(physicalFilenames);
  await insertData(logical_filename, physical_filename);
};

const insertData = async (
  logical_filename: string,
  physical_filename: string
) => {
  const supabase = createClient();
  const now = getJpTimeZoneFromUtc(new Date());
  const delete_flg = 0;

  try {
    const { data: res, error } = await supabase
      .from("logical_physical_uid")
      .insert([
        {
          logical_filename: logical_filename,
          domain: domain,
          dir: dir,
          physical_filename: physical_filename,
          delete_flg: delete_flg,
          create_at: now,
          update_at: now,
        },
      ]);
    if (error) {
      console.log("データの登録失敗", error);
    }
  } catch (error) {
    console.log("データの登録失敗", error);
  }
};

const deleteData = async (logical_filename: string) => {
  const supabase = createClient();

  try {
    const { data: res, error } = await supabase
      .from("logical_physical_uid")
      .delete()
      .eq("domain", domain)
      .eq("dir", dir)
      .eq("logical_filename", logical_filename);

    if (error) {
      console.log("deleteLogicalPhysicalUid:error", error);
    }
  } catch (error) {
    console.log("deleteLogicalPhysicalUid:error", error);
  }
};

// return : { logical_filename: 'goolabtext-1-1-20240728-20240803' }
const selectLogical = async (logical_filename: string) => {
  const supabase = createClient();
  console.log("selectLogical:start");
  console.log("selectLogicalPhysicalUid:logical_filename:", logical_filename);
  try {
    const { data: res, error } = await supabase
      .from("logical_physical_uid")
      .select("*")
      .eq("domain", domain)
      .eq("dir", dir)
      .eq("logical_filename", logical_filename)
      .single();

    if (error) {
      console.log("selectLogical:error", error);
    }
    // res : { logical_filename: 'goolabtext-1-1-20240728-20240803' }
    console.log("selectLogicalPhysicalUid:return:", res);
    return res;
  } catch (error) {
    console.log("deleteLogicalPhysicalUid:error", error);
  }
};

const deleteLogical = async (logical_filename: string) => {
  const supabase = createClient();

  try {
    const { error } = await supabase
      .from("logical_physical_uid")
      .delete()
      .eq("domain", domain)
      .eq("dir", dir)
      .eq("logical_filename", logical_filename);

    if (error) {
      console.log("deleteLogical:error", error.message);
      return false;
    }

    console.log("deleteLogical:success");
    return true;
  } catch (error) {
    console.log("deleteLogical:catch error", error);
    return false;
  }
};
