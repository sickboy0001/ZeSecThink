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
import { toast } from "@/components/ui/use-toast";
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
import Result from "./result";
import { getTokenAnalyseKuromoji } from "@/lib/token";
import { TypeWordCount } from "@/app/types/wordCloud";

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

const TextAnalysePage = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const [result, setResult] = useState("");
  const [text, setText] = useState("");
  const [dataTextAnalyse, setDataTextAnalyse] = useState<any[]>([]);
  const [dataKeywordAnalyse, setDataKeywordAnalyse] = useState<any[]>([]);
  const [dataKuromoji, setDataKuromoji] = useState<any[]>([]);

  const analyseText = async (text: string) => {
    if (text === "") {
      return "";
    }
    setText(text);
    // const newTextData = await getTokenAnalyseTextGoo(text);
    // // setResult(JSON.stringify(newResult, null, 2));
    // setDataTextAnalyse(newTextData);

    // const newKeywordData = await getTokenAnalyseKeywordGoo(text);
    // setDataKeywordAnalyse(newKeywordData);

    // const newDataD3data = await getTokenAnalyseKuromoji(text);
    // setDataKuromoji(newDataD3data);

    // setResult(JSON.stringify(newKeywordData, null, 2));
  };

  const handleClick = () => {
    const fetch = async () => {
      const fromAt = new Date("2024-07-21");
      const toAt = new Date("2024-07-27");
      fromAt.setHours(0, 0, 0);
      toAt.setHours(0, 0, 0);
      if (fromAt === toAt) {
        return;
      } else {
        // console.log(fromAt, toAt);
        const nowZstPosts = await getDataLocal(USER_ID, fromAt, toAt);

        if (nowZstPosts.length == 0) {
          return;
        }
        // 効率的な文字列結合
        const text = nowZstPosts.reduce(
          (acc, each) => acc + each.title + "\n" + each.content + "\n",
          ""
        );
        await analyseText(text);
      }
    };
    fetch();
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await analyseText(data.text);
  }
  return (
    <div>
      <div className="flex flex-col w-full max-w-6xl mx-auto prose text-left prose-blue">
        <p className="text-center">形態素解析をいろいろ試してみるページ</p>
        <div className="w-full mx-auto">
          <Collapsible className="border border-black-700 py-2 px-2  rounded my-1">
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
              <Button variant="outline" onClick={handleClick} className="my-2">
                20240721-20240727
              </Button>
            </CollapsibleContent>
          </Collapsible>
          <Collapsible className="border border-black-700 py-2 px-2  rounded my-1">
            <CollapsibleTrigger className="font-extrabold">
              Request_text
            </CollapsibleTrigger>
            <CollapsibleContent>
              <pre>{text}</pre>
            </CollapsibleContent>
          </Collapsible>
          <Result data={dataKuromoji} title={"Kuromoji-result"}></Result>
          <Result data={dataTextAnalyse} title={"TextAnalyse-result"}></Result>
          <Result
            data={dataKeywordAnalyse}
            title={"KeywordAnalyse-result"}
          ></Result>
        </div>
        {/* <pre>{result}</pre> */}
      </div>
    </div>
  );
};

export default TextAnalysePage;
