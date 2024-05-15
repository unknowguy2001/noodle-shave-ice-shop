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

export function removeMenu(index: number) {
  let copyOrders: OrderDetails = { ...$orderDetail.get() };

  const editedMenu = copyOrders.menus.filter((cur, id) => {
    return id !== index;
  });
  copyOrders.menus = editedMenu;

  addOrder(copyOrders);
}
