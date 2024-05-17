interface OrderValue {
  _id: string;
  orderNumber: string;
  customerName: string;
  menus: Array<{
    menu: string;
    toppings: Array<{ _id: string }>;
  }>;
  totalPrice: number;
}
