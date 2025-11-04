import MenuLeft from "@/components/MenuLeft";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function Home() {
  const codeString = `
// 🚀 Keep pushing forward!
// Every line of code brings you closer to mastery.
// Don't wait for inspiration — code creates it.
// Remember: even the best developers once Googled "how to center a div".
// 💻 Keep building, keep learning, keep growing.

function stayMotivated() {
  console.log("🔥 Never stop improving!");
  console.log("💪 You’ve got this!");
}

stayMotivated();
`;
  return (
    <div className="flex">
      <MenuLeft />
      <div className="p-4 w-full">
        <h1 className="text-2xl font-bold">Welcome to Ankiney Blog</h1>
        <SyntaxHighlighter language="javascript" style={vs2015}>
          {codeString}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
