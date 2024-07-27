"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";

const FormSchema = z.object({
  date_from: z.date({
    required_error: "A date of birth is required.",
  }),
  date_to: z.date({
    required_error: "A date of birth is required.",
  }),
});

interface propsType {
  fromAt: Date;
  toAt: Date;
  setFromAt: any;
  setToAt: any;
}
const ConditionInput = (props: propsType) => {
  const { fromAt, toAt, setFromAt, setToAt } = props;
  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      date_from: fromAt, // Set initial value for date_from
      date_to: toAt, // Set initial value for date_from
    },
    resolver: zodResolver(FormSchema),
  });

  //   console.log("ConditionInput fromAt", fromAt);
  //   console.log("ConditionInput   toAt", toAt);

  //   form.setValue("date_from", toAt);
  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("  function onSubmit", data);
    setFromAt(data.date_from);
    setToAt(data.date_to);
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
          <div className="flex px-2 items-center">
            <Label className="px-2 font-extrabold">Condition</Label>
            <FormField
              control={form.control}
              name="date_from"
              render={({ field }) => (
                <>
                  <FormItem className="">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value && field.value instanceof Date ? (
                              format(field.value, "yyyy/MM/dd")
                            ) : (
                              <span>Start-date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                </>
              )}
            />
            <div className="px-4"> - </div>
            <FormField
              control={form.control}
              name="date_to"
              render={({ field }) => (
                <>
                  <FormItem className="">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value && field.value instanceof Date ? (
                              format(field.value, "yyyy/MM/dd")
                            ) : (
                              <span>Start-date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                </>
              )}
            />
            <div className="px-2"></div>
            <Button variant={"outline"} className="" type="submit">
              Search
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ConditionInput;
