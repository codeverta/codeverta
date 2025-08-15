import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  language: string;
  code: string;
}

export const CodeBlock = ({ language, code }: CodeBlockProps) => {
  return (
    <SyntaxHighlighter language={language} style={vscDarkPlus} showLineNumbers>
      {code}
    </SyntaxHighlighter>
  );
};
