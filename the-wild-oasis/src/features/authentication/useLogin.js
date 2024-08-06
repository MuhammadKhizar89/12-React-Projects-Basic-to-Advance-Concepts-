import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";

export function useLogin() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate: login, isPending } = useMutation({
        mutationFn: ({ email, password }) => loginApi({ email, password }),
        onSuccess: (user) => {
            navigate("/", { replace: true })
            queryClient.setQueryData(["user"], user.user)
        },
        onError: (err) => alert(err.message),
    });
    return { login, isPending };

}