import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import PageHeader from "../components/Common/PageHeader";

export default function MainLayout({ children }) {
  const [open, setOpen] = useState(false);

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
          backgroundColor: "#F4FBF7",
          height: "calc(100vh - 80px)",
          width: "auto",
          overflowY: "auto",
          overflowX: "hidden",
          boxSizing: "border-box",
        }}
      >
        {children}
      </main>
    </>
  );
}
