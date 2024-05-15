import { atom } from "nanostores";

export type $orderDetailState = {};

export const $orderDetail = atom<OrderDetails>({
  orderNumber: "",
  menus: [],
});

export function addOrder(order: OrderDetails) {
  $orderDetail.set(order);
  return;
}
