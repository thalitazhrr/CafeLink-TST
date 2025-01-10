import CoffeeType from "./CoffeeType";

export default interface Coffee {
    id: number;
    name: string;
    description: string;
    composition: string;
    imageUrl: string;
    price: number;
    type: CoffeeType;
}