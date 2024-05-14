interface OrderDetails {
  orderNumber: string;
  menus: Array<{
    _id: string;
    name: string;
    price: number;
    selectedToppings: Array<{ _id: string; name: string; price: number }>;
  }>;
}
