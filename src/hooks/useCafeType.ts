import { useApiWithToken } from "./useApi";
import CafeType from "@/types/CafeType";

export default function useCafeType() {
    const { loading, call } = useApiWithToken<CafeType[]>(import.meta.env.VITE_API_URL + "/api/cafe/cafe-types", { method: 'GET' });
    return { loading, call };
}