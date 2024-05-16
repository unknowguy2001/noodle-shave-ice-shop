"use client";
import Card from "@/components/card";
import WelcomeModal from "@/components/welcome-modal";
import { useEffect, useState } from "react";

export default function Home() {
  useEffect(() => {
    (document.getElementById("my_modal_1")! as HTMLFormElement).showModal();
  });
  return (
    <main className="flex flex-col h-[600px] overflow-auto">
      <WelcomeModal></WelcomeModal>
      <Card />
    </main>
  );
}
