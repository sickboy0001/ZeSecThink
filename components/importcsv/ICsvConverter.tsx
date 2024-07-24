import React, { useContext, useEffect, useRef, useState } from "react";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import { TableProp } from "./TypeTable";
import { ImportOrderContent } from "@/constants/importData";
import { convertFormAction } from "@/app/actions/importcsv/Convert";
import UserContext from "../user/UserContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

function ICsvConverter({ columns, data }: TableProp) {
  const user = useContext(UserContext);
  const [fileSummary, setFileSummary] = useState<string>("");
  const [log, setLog] = useState<string | undefined>("no-log");
  const [startLog, setStartLog] = useState<string | undefined>("");
  const [endLog, setEndLog] = useState<string | undefined>("");
  const [rawLog, setRawLog] = useState<string | undefined>("");
  // const [user, setUser] = useState(contextUser);

  useEffect(() => {
    const fetch = async () => {
      if (Array.isArray(data)) {
        const thisFileSummary = "Row_Count:" + String(data.length);
        setFileSummary(thisFileSummary);
      }
    };
    fetch();
  }, [data]);

  useEffect(() => {
    const fetch = async () => {
      const thisstartlog = log
        ?.split("\n")
        .filter((line) => !line.startsWith("info[sub]"))[0];
      const thisendlog = log
        ?.split("\n")
        .filter((line) => !line.startsWith("info[sub]"))[1];
      setRawLog(log);
      setStartLog(thisstartlog);
      setEndLog(thisendlog);
    };
    fetch();
  }, [log]);

  const formAction = async () => {
    try {
      console.log("client:", data);
      const result = await convertFormAction(user, data);
      setLog(result?.join("\n"));
    } catch (error) {
      console.error("Error while converting CSV:", error);
      // エラーを適切に処理する (例: ユーザーにエラーメッセージを表示する)
    }
  };

  return (
    <div>
      <div className="whitespace-pre-wrap">{fileSummary}</div>
      <div>
        「コンバート」押下で以下のデータを取り込みます。日付とタイトルが同じものは取り込みません。
      </div>

      <form action={formAction}>
        <div>
          <button className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            コンバート csv to database
          </button>
        </div>
      </form>
      {log && (
        <div>
          <div className="whitespace-pre-wrap">{startLog}</div>
          <div className="whitespace-pre-wrap">{endLog}</div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="rawlog">
              <AccordionTrigger>rawlog</AccordionTrigger>
              <AccordionContent>
                <div className="whitespace-pre-wrap">{rawLog}</div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Table>
            <TableHeader>
              <TableRow>
                {ImportOrderContent.map((cellrule, key) => (
                  <TableHead key={key}>{cellrule[0]}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((datarow) => (
                <TableRow>
                  {ImportOrderContent.map((cellrule, key) => (
                    <TableCell key={key}>
                      <div className="whitespace-pre-wrap">
                        {datarow[cellrule[1]]}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

export default ICsvConverter;
