interface MenuValue {
  _id: string;
  name: string;
  image: string;
  toppings: Array<{
    id: string;
    name: string;
    icon: string;
  }>;
  price: Number;
  description: string;
}
