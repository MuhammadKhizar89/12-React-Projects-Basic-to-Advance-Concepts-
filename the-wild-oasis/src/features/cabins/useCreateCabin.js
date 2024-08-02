import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
export function useCreateCabin() {
    const queryClient = useQueryClient();
    const {
        mutate: createCabin,
        isPending: isCreating,
    } = useMutation({
        mutationFn: createEditCabin,
        onSuccess: () => {
            alert("Cabin Created Successfully");
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
        },
        onError: () => {
            alert("Error Creating Cabin");
        },
    });
    return { createCabin, isCreating };
}