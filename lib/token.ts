import { TypeToken } from "@/app/types/kuromoji";
import kuromoji from "kuromoji";

export const getTokens = async (text: string): Promise<TypeToken[]> => {
  return new Promise((resolve, reject) => {
    const dicPath = "/kuromoji/dic/";
    // const dicPath = path.resolve("/tmp/kuromoji/dic/");
    kuromoji.builder({ dicPath: dicPath }).build((err, tokenizer) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        const tokens = tokenizer.tokenize(text) as TypeToken[];
        resolve(tokens);
      }
    });
  });
};
