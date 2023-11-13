import { ReactNode } from "react";
import TopBar from "./TopBar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="font-nunito">
      <TopBar />
      {children}
    </div>
  );
}
