interface ToolItem {
  name: string;
  image: string;
  route: string;
}

export const tools: readonly ToolItem[] = [
  {
    name: "JSON 格式化",
    image: "img/json-tree-viewer.svg",
    route: "json",
  },
  {
    name: "Base64 编解码",
    image: "img/base64-encoder-decoder.svg",
    route: "base64",
  },
  {
    name: "URL 编解码",
    image: "img/url-encoder-decoder.svg",
    route: "url",
  },
  {
    name: "平语近人编解码",
    image: "img/pingyu.png",
    route: "xi",
  },
];
