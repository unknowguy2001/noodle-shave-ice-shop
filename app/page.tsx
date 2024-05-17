"use client";
import Card from "@/components/card";
import WelcomeModal from "@/components/welcome-modal";
import {
  $showWelcomeModal,
  setShowWelcomeModal,
} from "@/store/showWelcomeModal.store";
import { useStore } from "@nanostores/react";
import { useEffect, useState } from "react";

export default function Home() {
  const isShowWelcomeModal = useStore($showWelcomeModal);
  useEffect(() => {
    if (isShowWelcomeModal) {
      (document.getElementById("my_modal_1")! as HTMLFormElement).showModal();
      setShowWelcomeModal();
    }
  }, []);
  return (
    <main className="flex flex-col h-[600px] overflow-auto">
      <WelcomeModal></WelcomeModal>
      <Card />
    </main>
  );
}
