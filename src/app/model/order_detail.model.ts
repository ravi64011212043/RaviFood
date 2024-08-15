// To parse this data:
//
//   import { Convert } from "./file";
//
//   const orderDetail = Convert.toOrderDetail(json);

export interface OrderDetail {
  picture: string;
  name:    string;
  detail:  string;
  amount:  number;
  price:   number;
  total:   number;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toOrderDetail(json: string): OrderDetail[] {
      return JSON.parse(json);
  }

  public static orderDetailToJson(value: OrderDetail[]): string {
      return JSON.stringify(value);
  }
}
