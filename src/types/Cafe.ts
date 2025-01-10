import CafeType from "./CafeType";
import Coffee from "./Coffee";

export default interface Cafe {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    types: CafeType[];
    coffees: Coffee[];
    priceAverage: number;
    districtAddress: string;
    cityAddress: string;
    provinceAddress: string;
    fullAddress: string;
    specials: string[];
    likeCount: number;
    isLiked: boolean;
}