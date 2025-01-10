import Coffee from "@/types/Coffee";
import { useApiWithToken } from "./useApi";

export default function useCoffee() {
    const { loading, call } = useApiWithToken<Coffee[]>(import.meta.env.VITE_API_URL + "/api/cafe/coffee/uniques", { method: 'GET' });
    return { loading, call };
}