export class OrdersOutput {
  orderId: string;
  menuItems: MenuItem[];
  tableNo: number;
  phoneNumber: string;
  name: string;
  amount: number;
  orderedTime: Date;
}

// tslint:disable-next-line: max-classes-per-file
export class MenuItem {
  item: string;
  quantity: number;
  price: number;
}
