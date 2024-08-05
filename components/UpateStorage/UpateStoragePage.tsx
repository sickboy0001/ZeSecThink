"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import {
  getTokenAnalyseKeywordGoo,
  getTokenAnalyseTextGoo,
} from "@/app/actions/gooapi/gooApi";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { TypeZstPost } from "@/app/types/zstTypes";
import { getPosts } from "@/app/actions/zstPosts/posts";
// import Result from "./result";
import { v4 as uuidv4 } from "uuid";

import domtoimage from "dom-to-image";
import { createClient } from "@/utils/supabase/client";
import { UploadElementText } from "@/app/actions/storage/cloudImage";

const USER_ID = 1;
const FormSchema = z.object({
  text: z.string().min(10, {
    message: "must be at least 10 characters.",
  }),
});

async function getDataLocal(
  userid: number,
  from_at: Date,
  to_at: Date
): Promise<TypeZstPost[]> {
  const result = await getPosts(userid, from_at, to_at);
  return result;
}
//zstposts

const UpdateStroagePage = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const [result, setResult] = useState("");
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const thistext =
      data.text.repeat(3) + "\n" + new Date().toLocaleTimeString();

    setText(thistext);
    const imageUrl = await UploadElementText(thistext);

    console.log("Image URL(client):", imageUrl);
    setImageUrl(imageUrl);
  }
  async function handleSave() {
    const imgbase = document.getElementById("text_plan");
    if (imgbase === null) {
      return;
    }
    const dataUrl = await domtoimage.toPng(imgbase, {
      width: imgbase.clientWidth,
      height: imgbase.clientHeight,
    });

    // console.log("handlesave: hre ", dataUrl);
    const response = await fetch(dataUrl);
    const file = await response.blob();
    const filepath = `images/${uuidv4()}.png`;

    const supabase = createClient();
    const { data, error } = await supabase.storage
      .from("zstposts")
      .upload(filepath, file, {
        contentType: "image/png",
      });

    if (error) {
      console.error("Error uploading file:", error.message);
    }

    const { data: strageData } = supabase.storage
      .from("zstposts")
      .getPublicUrl(filepath);
    const imageUrl = strageData.publicUrl;
  }
  return (
    <div>
      <div className="flex flex-col w-full max-w-6xl mx-auto prose text-left prose-blue">
        <p className="text-center">形態素解析をいろいろ試してみるページ</p>
        <div className="w-full mx-auto">
          <Collapsible
            open={true}
            className="border border-black-700 py-2 px-2  rounded my-1"
          >
            <CollapsibleTrigger className="font-extrabold">
              対象指定
            </CollapsibleTrigger>
            <CollapsibleContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-full space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="text"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Input</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us a little bit about yourself"
                            className="resize-none w-full h-40"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" variant="outline">
                    Submit
                  </Button>
                </form>
              </Form>
            </CollapsibleContent>
          </Collapsible>
          <Collapsible className="border border-black-700 py-2 px-2  rounded my-1">
            <CollapsibleTrigger className="font-extrabold">
              Request_text
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div id="text_plan">
                <div className="bg-gray-100">
                  <pre className="whitespace-pre-wrap">{text}</pre>
                </div>
              </div>
              <Button type="submit" variant="outline" onClick={handleSave}>
                Save
              </Button>
            </CollapsibleContent>
          </Collapsible>
          <Collapsible className="border border-black-700 py-2 px-2  rounded my-1">
            <CollapsibleTrigger className="font-extrabold">
              Supabase(upload disp)
            </CollapsibleTrigger>
            <CollapsibleContent>
              {imageUrl && (
                <div>
                  <p>Generated Image:</p>
                  <img src={imageUrl} alt="Generated" />
                </div>
              )}
            </CollapsibleContent>
          </Collapsible>
        </div>
        {/* <pre>{result}</pre> */}
      </div>
    </div>
  );
};
export default UpdateStroagePage;
