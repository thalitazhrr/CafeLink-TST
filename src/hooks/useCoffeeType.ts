import CoffeeType from "@/types/CoffeeType";
import { useApiWithToken } from "./useApi";

export default function useCoffeeType() {
    const { loading, call } = useApiWithToken<CoffeeType[]>(import.meta.env.VITE_API_URL + "/api/cafe/coffee-types", { method: 'GET' });
    return { loading, call };
}