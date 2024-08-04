import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export default function useBookings() {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();
    const filterValue = searchParams.get("status") || "all";
    const filter = !filterValue || filterValue === "all" ? null : { field: "status", value: filterValue };
    // const filter = !filterValue || filterValue === "all" ? null : { field: "status", value: filterValue,method:"gte" };


    const sortByRaw = searchParams.get("sortBy") || "startDate-asc";
    const [field, direction] = sortByRaw.split("-");
    const sortBy = { field, direction };

    const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

    const { isPending, data: { data: BookingData, count } = {} } = useQuery({
        queryKey: ["bookings", filter, sortBy, page],
        queryFn: () => getBookings({ filter, sortBy, page }), // Wrap in a function

    });

    const pageCount = Math.ceil(count / PAGE_SIZE);
    if (page < pageCount)
        queryClient.prefetchQuery({
            queryKey: ["bookings", filter, sortBy, page + 1],
            queryFn: () => getBookings({ filter, sortBy, page: page + 1 }), // Wrap in a function
        });

    if (page > 1)
        queryClient.prefetchQuery({
            queryKey: ["bookings", filter, sortBy, page - 1],
            queryFn: () => getBookings({ filter, sortBy, page: page - 1 }), // Wrap in a function
        });

    return { BookingData, isPending, count };
}