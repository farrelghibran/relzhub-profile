"use client";
import { CopyIcon } from "lucide-react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDarkReasonable } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { copyContent } from "../lib/copy";

interface CodeEditorProps {
  fileName: string;
  codeString: string;
  className?: string;
  canCopy: boolean;
}

export default function CodeEditor(codeEditor: CodeEditorProps) {
  return (
    <div
      className={`w-full aspect-video border border-neutral-700 rounded-2xl cursor-pointer bg-neutral-800 ${codeEditor.className}`}
    >
      <div className="py-4 px-7 border-b border-neutral-700 flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-3 aspect-square rounded-full bg-red-500"></div>
          <div className="w-3 aspect-square rounded-full bg-yellow-500"></div>
          <div className="w-3 aspect-square rounded-full bg-green-500"></div>
        </div>
        <p className="text-neutral-400">{codeEditor.fileName}</p>
        {codeEditor.canCopy && (
          <button
            onClick={() => copyContent(codeEditor.codeString)}
            className="ml-auto text-neutral-50 text-xs flex items-center gap-2 bg-linear-270/srgb from-orange-600 to-red-600 hover:from-red-600 hover:to-orange-600 rounded-lg py-2 px-3 cursor-pointer hover:bg-neutral-600 transition ease duration-500"
          >
            <CopyIcon size={15} />
            Copy
          </button>
        )}
      </div>
      <div className="p-2">
        <div className="">
          <SyntaxHighlighter
            className="bg-transparent! scrollbar scrollbar-thumb-gray-400/60 hover:scrollbar-thumb-gray-500/90 scrollbar-track-transparent"
            showLineNumbers={true}
            language="lua"
            style={atomOneDarkReasonable}
          >
            {codeEditor.codeString}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}
