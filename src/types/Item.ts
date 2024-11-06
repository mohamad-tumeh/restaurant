import { ExtraOption } from "./ExtraOption";

export interface Item {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    quantity?: number;
    extrasWithOptions?: ExtraOption[];
}