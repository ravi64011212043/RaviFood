// To parse this data:
//
//   import { Convert } from "./file";
//
//   const cart = Convert.toCart(json);

export interface Cart {
    CartID:  number;
    FID:     number;
    picture: string;
    name:    string;
    detail:  string;
    price:   number;
    amount:  number;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toCart(json: string): Cart[] {
        return JSON.parse(json);
    }

    public static cartToJson(value: Cart[]): string {
        return JSON.stringify(value);
    }
}
