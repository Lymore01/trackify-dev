import SyntaxHighlighter from "react-syntax-highlighter";
import { monokaiSublime } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function CodeDisplay({ codeString }: { codeString: string }) {
  return (
    <div className="mt-2 w-full bg-[#2E3440] text-white rounded-md p-2 overflow-x-auto">
  <SyntaxHighlighter language="json" style={monokaiSublime} customStyle={{ background: "transparent" }}>
    {codeString}
  </SyntaxHighlighter>
</div>
  );
}
