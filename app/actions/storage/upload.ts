"use server";

import { createClient } from "@/utils/supabase/server";

export async function uploadImage(filePath: string, base64Data: string) {
  const supabase = createClient();
  const propsdata = Buffer.from(base64Data, "base64");
  // console.log("uploadImage:filePath:", filePath);
  const { data, error } = await supabase.storage
    .from("zstposts")
    .upload(filePath, propsdata, {
      contentType: "image/png", // コンテンツタイプを指定
    });

  if (error) {
    throw new Error(error.message);
  }

  // console.log("File uploaded successfully:", data);
  return data;
}

export const uploadedPublicUrl = async (filePath: string) => {
  const supabase = createClient();
  const { data: storageData } = supabase.storage
    .from("zstposts")
    .getPublicUrl(filePath);
  const imageUrl = storageData.publicUrl;
  console.log(
    "uploadPublicUrlZstPosts:isExistPUblicUrl:",
    await isExistPublicUrl(imageUrl)
  );
  return imageUrl;
};

export const deleteFile = async (filePath: string) => {
  const supabase = createClient();

  const { error } = await supabase.storage.from("zstposts").remove([filePath]);

  if (error) {
    console.error("Error deleting file:", error.message);
    return false;
  }

  console.log("File deleted successfully");
  return true;
};

// export const uploadImageZstPosts = async (
//   filePath: string,
//   screenshotBuffer: Buffer
// ) => {
//   console.log("uploadImageZstPosts:", filePath);
//   const supabase = createClient();
//   // Supabaseにアップロード
//   const { data, error } = await supabase.storage
//     .from("zstposts")
//     .upload(filePath, screenshotBuffer, {
//       contentType: "image/png",
//     });
//   if (error) {
//     throw new Error(error.message);
//   }
// };

export const isExistPublicUrl = async (publicUrl: string) => {
  try {
    const response = await fetch(publicUrl, { method: "HEAD" });

    if (response.ok) {
      console.log(`File ${publicUrl} exists.`);
      return true;
    } else if (response.status === 404) {
      console.log(`File ${publicUrl} does not exist.`);
      return false;
    } else {
      console.error(
        "Error checking file existence:",
        response.status,
        response.statusText
      );
      return null;
    }
  } catch (error) {
    console.error("Error checking file existence:", error);
    return null;
  }
};
