import { atom } from "nanostores";

export const $showWelcomeModal = atom<boolean>(true);

export function setShowWelcomeModal() {
  $showWelcomeModal.set(false);
}
