import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";

export function useEditCabin() {
    const queryClient = useQueryClient();
    
    const { mutate: editCabin1, isPending: isEditing } = useMutation({
        mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
        onSuccess: () => {
            alert("Cabin Edited Successfully");
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
        },
        onError: () => {
            alert("Error Editing Cabin");
        },
    });

    return { editCabin1, isEditing };
}
