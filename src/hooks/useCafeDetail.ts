import { useApiWithToken } from "./useApi";
import Cafe from "@/types/Cafe";

export default function useCafeDetail(id: number) {
    const { loading, call } = useApiWithToken<Cafe>(import.meta.env.VITE_API_URL + "/api/cafe/" + id, { method: 'GET' });
    return { loading, call };
}