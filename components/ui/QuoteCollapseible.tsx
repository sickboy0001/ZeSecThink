import { useState } from "react";

import { Button } from "./button";

type TypeProps = {
  inputText: string;
  length: number;
};

export const QuoteCollapseible = (props: TypeProps) => {
  const { inputText, length } = props;
  const [isOpenCollapse, setIsOpenCollapse] = useState<boolean>(false);
  console.log(inputText);
  return (
    <>
      <div>
        {!isOpenCollapse ? (
          <Button
            variant="ghost"
            size="sm"
            className="whitespace-pre-line  text-left py-1  text-xs"
            onClick={() => {
              setIsOpenCollapse(true);
            }}
          >
            {inputText.slice(0, length) + "..."}
          </Button>
        ) : (
          <div className="py-1.5">
            <Button
              variant="ghost"
              size="sm"
              className="whitespace-pre-line  text-left text-xs"
              onClick={() => {
                setIsOpenCollapse(false);
              }}
            >
              {inputText}
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
