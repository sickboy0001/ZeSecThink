const getIncludelLinkHtmlFromText = (text: string, length: number) => {
  let regExp = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/gi;
  let result = text;
  const matchs = text.match(regExp);
  if (matchs != null) {
    for (let i = 0; i < matchs.length; i++) {
      const replaceMatch = getTextShort(matchs[i], length);
      // console.log(matchs[i], replaceMatch);
      result = result.replace(matchs[i], getHtmlLink(matchs[i], replaceMatch));
    }
  }

  return result;
};

const getHtmlLink = (to: string, text: string) => {
  const result = `<a href="${to}" style="color:gray;">${text}</a>`;
  // const result = `<a href="${to}" style="color:gray;">${text}</a>`;
  // className="text-gray-400">
  //<a href="https://www.notion.so/1b6692c29cbe810f9a6cec4131a8e68e?pvs=4" style="{{color:&quot;gray&quot;}}">https://www.notion.so/1b6692c2...</a>
  return result;
};
const getTextShort = (original: string, maxLength: number) => {
  return original.length > maxLength
    ? original.substring(0, maxLength) + "..."
    : original;
};
export default getIncludelLinkHtmlFromText;
