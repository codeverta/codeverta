import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  atomDark,
  tomorrow,
  prism,
  twilight,
  solarizedlight,
  dracula,
  vscDarkPlus,
} from "react-syntax-highlighter/dist/cjs/styles/prism";

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
