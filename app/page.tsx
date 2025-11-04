import Image from "next/image";
import MenuLeft from "@/components/MenuLeft";

export default function Home() {
  return (
    <div className="flex">
      <MenuLeft/>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Welcome to Ankiney Blog</h1>
      </div>
    </div>
  );
}
