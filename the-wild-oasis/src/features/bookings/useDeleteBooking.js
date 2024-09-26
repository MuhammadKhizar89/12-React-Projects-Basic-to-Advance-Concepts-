import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingAPI} from "../../services/apiBookings";
export function useDeleteBooking(){
const queryClient = useQueryClient();
    const {isPending:isDeleting, mutate:deleteBooking} = useMutation({
        mutationFn: deleteBookingAPI,
        onSuccess: () => {
            alert("Booking Deleted Successfully");
            queryClient.invalidateQueries({
                queryKey: ["bookings"],
            });
        },
        onError: () => {
            alert("Error  Deleting Booking ");

        },
    });
    return {isDeleting, deleteBooking};
}