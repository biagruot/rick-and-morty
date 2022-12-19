import React from "react";

function Layout({ children }: any) {
  return (
    <div className="flex flex-col justify-center items-center">
      <main className="py-10 w-full">{children}</main>
    </div>
  );
}

export default Layout;
