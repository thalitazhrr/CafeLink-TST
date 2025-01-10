import { useApiWithToken } from "./useApi";
import { useEffect, useState } from "react";

export default function useLikeCafe(cafeId: number) {
    const { loading: loading1, call: callToLike } = useApiWithToken<unknown>(import.meta.env.VITE_API_URL + "/api/Favorites/" + cafeId, { method: 'POST' });
    const { loading: loading2, call: callToDislike } = useApiWithToken<unknown>(import.meta.env.VITE_API_URL + "/api/Favorites/" + cafeId, { method: 'DELETE' });
    const { loading: loading3, call: callToCheck } = useApiWithToken<boolean>(import.meta.env.VITE_API_URL + "/api/Favorites/check/" + cafeId, { method: 'GET' });
    const [loading, setLoading] = useState(loading1 || loading2 || loading3);
    useEffect(() => {
        if (loading1 || loading2 || loading3) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [loading1, loading2, loading3]);
    return { loading, callToLike, callToDislike, callToCheck };
}