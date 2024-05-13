import { atom } from "nanostores";

export const $totalPrice = atom<number>(0);

export function setTotalPrice(price: number) {
  $totalPrice.set(price);
}
