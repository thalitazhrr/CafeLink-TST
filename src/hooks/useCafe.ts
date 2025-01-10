    import { useApiWithToken } from "./useApi";
    import Cafe from "@/types/Cafe";

    export default function useCafe(is_all = false) {
        const { loading, call } = useApiWithToken<Cafe[]>(import.meta.env.VITE_API_URL + "/api/cafe" + (is_all ? '/all' : ''), { method: 'GET' });
        return { loading, call };
    }