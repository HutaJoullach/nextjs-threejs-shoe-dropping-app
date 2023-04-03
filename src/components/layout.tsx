import type { PropsWithChildren } from "react";
import Navbar from "./navbar";

export const PageLayout = (props: PropsWithChildren) => {
  return (
    <main className="flex h-screen justify-center">
      <div className="h-full w-full overflow-y-scroll md:max-w-7xl">
        <Navbar />
        {props.children}
      </div>
    </main>
  );
};
