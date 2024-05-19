interface OrderValue {
  _id: string;
  orderNumber: string;
  customerName: string;
  menus: Array<{
    menu: { _id: string; name: string };
    toppings: Array<{ _id: string; name: string; price: number }>;
  }>;
  totalPrice: number;
}
