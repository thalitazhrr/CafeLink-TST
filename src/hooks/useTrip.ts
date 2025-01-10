import { TripPackage } from "@/types/TripPackage";
import { useApiWithToken } from "./useApi";

export default function useTrip() {
    const {loading, call} = useApiWithToken<TripPackage[]>(import.meta.env.VITE_BUCKET_QUEST_API + '/api/Package', {method: 'GET'});
    return {loading, call};
}