// To parse this data:
//
//   import { Convert } from "./file";
//
//   const orderCustomer = Convert.toOrderCustomer(json);

export interface OrderCustomer {
  OID:         number;
  amount:      number;
  total_price: number;
  name:        string;
  firstname:   string;
  lastname:    string;
  address:     string;
  phone:       number;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toOrderCustomer(json: string): OrderCustomer[] {
      return JSON.parse(json);
  }

  public static orderCustomerToJson(value: OrderCustomer[]): string {
      return JSON.stringify(value);
  }
}
