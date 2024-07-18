"use client";
import React, { useState } from "react";
import { Textarea } from "../ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ICsvTextInput from "./ICsvTextInput";
import Papa from "papaparse";
import ICsvConfirm from "./ICsvConfirm";

export const formSchema = z.object({
  rawcsvlocal: z.string(),
});

const ICsvPage = () => {
  const [mode, setMode] = useState(0);
  const [rawcsv, setRowcsv] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rawcsvlocal: "",
    },
  });

  function onInputPlanTextSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setRowcsv(values.rawcsvlocal);
    setMode(1);
  }

  function onRegistSubmit() {
    console.log("onRegistSubmit");
    setMode(2);
  }

  return (
    <>
      {mode == 0 && (
        <>
          <div>ICsvPageInputText</div>
          <div>
            <ICsvTextInput
              form={form}
              onSubmit={onInputPlanTextSubmit}
            ></ICsvTextInput>
          </div>
        </>
      )}
      {mode == 1 && (
        <>
          <div>confirem</div>
          <div>
            <ICsvConfirm onSubmit={onRegistSubmit} rawcsv={rawcsv} />
          </div>
          <div>
            <div className="whitespace-pre-wrap">{rawcsv}</div>

            {/* <ICsvTextInput form={form} onSubmit={onSubmit}></ICsvTextInput> */}
          </div>
          <div>{rawcsv}</div>
          {/* <pre>{propsstring}</pre> */}
        </>
      )}
    </>
  );
};

export default ICsvPage;
