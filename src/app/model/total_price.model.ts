// To parse this data:
//
//   import { Convert } from "./file";
//
//   const totalPrice = Convert.toTotalPrice(json);

export interface TotalPrice {
  OID:         number;
  total_price: number;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toTotalPrice(json: string): TotalPrice[] {
      return JSON.parse(json);
  }

  public static totalPriceToJson(value: TotalPrice[]): string {
      return JSON.stringify(value);
  }
}
