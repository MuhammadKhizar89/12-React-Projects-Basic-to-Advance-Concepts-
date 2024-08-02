import { useQuery } from "@tanstack/react-query";
import { getCabins as getCabinsAPI } from "../../services/apiCabins";
export function useCabins() {
    const {
        isLoading,
        data: cabins,
        error,
    } = useQuery({
        queryKey: ["cabins"],
        queryFn: getCabinsAPI,
    });

    return { isLoading, cabins, error };
}