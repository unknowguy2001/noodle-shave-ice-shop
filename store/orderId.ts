import { atom } from "nanostores";

export type $orderDetailState = {};

export const $orderDetail = atom<OrderValue>({
  customerName: "",
  orderNumber: "",
  menus: [],
});

export function addOrder(order: OrderValue) {
  $orderDetail.set(order);
  return;
}
