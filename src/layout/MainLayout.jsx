import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import PageHeader from "../components/Common/PageHeader";

export default function MainLayout({ children }) {
  const [open, setOpen] = useState(false);
  <main
  style={{
    marginLeft: open ? 240 : 70,
    marginTop: 80,            
    padding: 16,

    backgroundColor: "#ffffff",

    height: "calc(100vh - 80px)",
    width: `calc(100vw - ${open ? 240 : 70}px)`,

    overflowY: "auto",      
    boxSizing: "border-box",
  }}
>
  {children}
</main>
  return (
    <>
      <Sidebar open={open} setOpen={setOpen} />
      <PageHeader open={open} setOpen={setOpen} />

      <main
        style={{
          marginLeft: open ? 240 : 70,
          marginTop: 80,
          padding: 16,
          transition: "all 0.3s ease",

          /* 🔥 IMPORTANT FIX */
          backgroundColor: "#ffffff",
          minHeight: "calc(100vh - 80px)",
          width: `calc(100vw - ${open ? 240 : 70}px)`,
          boxSizing: "border-box",
        }}
      >
        {children}
      </main>
    </>
  );
}
