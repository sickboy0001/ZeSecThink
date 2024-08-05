"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import LocalWordCloud from "../localWordCloud/LocalWordCloud";

interface TypeCloudWord {
  text: string;
  value: number;
}

interface TypeProps {
  title: string;
  data: TypeCloudWord[];
}

const Result = (props: TypeProps) => {
  const { data, title } = props;

  const wordpowlist = data.map(
    (each) => each.text + "[" + "*".repeat(each.value) + "] "
  );
  return (
    <Collapsible className="border border-black-700 py-2 px-2  rounded my-1">
      <CollapsibleTrigger className="font-extrabold">
        {title}
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="flex  flex-wrao items-start">
          <div className="flex-shrink-0">
            <div className="w-[500px] min-w-[380px] h-[500px] min-h-[380px]">
              <LocalWordCloud data={data} />
              {/* <WordCloud
                data={data}
                fontSize={fontSizeMapper}
                font={fontFamily}
              /> */}
            </div>
          </div>
          <div className="flex-grow ml-1 flex items-center">{wordpowlist}</div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default Result;
