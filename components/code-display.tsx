import SyntaxHighlighter from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function CodeDisplay({ codeString }: { codeString: string }) {
  return (
    <div className="mt-2 w-full ">
      <SyntaxHighlighter language="javascript" style={nord}>
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
}
