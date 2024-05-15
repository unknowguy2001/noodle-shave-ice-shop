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
  let copyOrder: OrderDetails = { ...$orderDetail.get() };

  const editedMenu = copyOrder.menus.filter((cur, id) => {
    return id !== index;
  });
  copyOrder.menus = editedMenu;

  addOrder(copyOrder);
}

export function updateMenu(
  index: number,
  editedTopping: { _id: string; name: string; price: number }[]
) {
  let copyOrder: OrderDetails = { ...$orderDetail.get() };

  const editedMenu = copyOrder.menus.map((cur, id) => {
    if (id === index) {
      cur.selectedToppings = editedTopping;
    }
    return cur;
  });

  copyOrder.menus = editedMenu;
  addOrder(copyOrder);
}
