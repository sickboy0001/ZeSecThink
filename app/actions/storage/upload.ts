"use server";

import { createClient } from "@/utils/supabase/server";

export async function uploadImage(filePath: string, screenshotBuffer: Buffer) {
  const supabase = createClient();
  console.log("uploadImageZstPosts:", filePath);

  // ファイルの存在をHEADリクエストで確認
  const {
    data: { publicUrl },
  } = supabase.storage.from("zstposts").getPublicUrl(filePath);

  try {
    const response = await fetch(publicUrl, { method: "HEAD" });

    if (response.ok) {
      console.log(`File ${filePath} already exists.`);
      throw new Error("The resource already exists");
    } else if (response.status === 404) {
      // ファイルが存在しない場合にアップロード
      const { data, error } = await supabase.storage
        .from("zstposts")
        .upload(filePath, screenshotBuffer, {
          contentType: "image/png",
        });

      if (error) {
        throw new Error(error.message);
      }

      console.log("File uploaded successfully:", data);
      return data;
    } else {
      console.error(
        "Error checking file existence:",
        response.status,
        response.statusText
      );
      throw new Error(`Unexpected status: ${response.status}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error during upload process:", error.message);
      throw new Error(error.message);
    } else {
      console.error("An unexpected error occurred:", error);
      throw new Error("An unexpected error occurred");
    }
  }
}

export const uploadPublicUrlZstPosts = async (filePath: string) => {
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
