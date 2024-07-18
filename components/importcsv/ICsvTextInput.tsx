"use client";
import React from "react";
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
import { formSchema } from "./iCsvPage";

interface propType {
  form: ReturnType<typeof useForm<z.infer<typeof formSchema>>>;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}

const ICsvTextInput = ({ form, onSubmit }: propType) => {
  return (
    <>
      <div>ICsvPageInputText</div>

      <div className="flex ...">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="rawcsvlocal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>rawcsv</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="shadcn"
                      className="text-base w-96"
                      rows={10}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default ICsvTextInput;
