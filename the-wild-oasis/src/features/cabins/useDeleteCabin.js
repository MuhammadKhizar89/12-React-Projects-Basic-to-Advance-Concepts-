import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin as deleteCabinAPI} from "../../services/apiCabins";
export function useDeleteCabin(){
const queryClient = useQueryClient();
    const {isPending:isDeleteing, mutate:deleteCabin} = useMutation({
        mutationFn: deleteCabinAPI,
        onSuccess: () => {
            toast.success("Always at the bottom.", {
                position: "bottom-center",
            });
            alert("Cabin Deleted Successfully");
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
        },
        onError: () => {
            toast.error("Error");
        },
    });
    return {isDeleteing, deleteCabin};
}