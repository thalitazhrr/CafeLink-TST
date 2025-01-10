import { Trip } from "./Trip";

export type TripPackage = {
    id: number;
    name: string;
    trips?: Trip[];
    location: string;
    pricePerPerson?: number;
  };
  