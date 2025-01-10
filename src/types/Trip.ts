import { ActivityType } from "./ActivityType";
import { Photo } from "./Photo";

export type Trip = {
    id: number;
    name: string;
    description: string;
    price: number;
    catatan: string;
    photos?: Photo[];
    activityTypes?: ActivityType[];
    duration: string;
    location: string;
    itinerary: string[];
  };
  