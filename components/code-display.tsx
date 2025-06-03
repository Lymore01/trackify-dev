"use client";

import { Copy, CopyCheck } from "lucide-react";
import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monokaiSublime } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function CodeDisplay({
  codeString,
  language = "typescript",
}: {
  codeString: string;
  language?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative mt-2 w-full bg-[#2E3440] dark:bg-accent/30 rounded-md p-2 overflow-x-auto">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 z-10 p-2 text-xs rounded-md bg-background text-foreground hover:bg-accent transition cursor-pointer"
        aria-label="Copy code"
        type="button"
      >
        {copied ? <CopyCheck size={16}/> : <Copy size={16}/>}
    </button>
      <SyntaxHighlighter
        language={language}
        style={monokaiSublime}
        customStyle={{ background: "transparent" }}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
}

// Trackify_dev

