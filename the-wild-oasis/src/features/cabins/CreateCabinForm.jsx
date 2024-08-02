import Input from "../../ui/input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import {useForm} from "react-hook-form";
import FormRow from "../../ui/FormRow";
import {useEditCabin} from "./useEditCabin";
import {useCreateCabin} from './useCreateCabin';
function CreateCabinForm({cabinToEdit,onClose}) {
    const {id: editId, ...editCabin} = cabinToEdit || {};
    const {createCabin, isCreating} = useCreateCabin();
    const {editCabin1, isEditing} = useEditCabin();
    const isEditSession = Boolean(editId);
    const {register, handleSubmit, getValues, formState, reset} = useForm({
        defaultValues: isEditSession ? editCabin : {},
    });
    const {errors} = formState;
    const isWorking = isCreating || isEditing;
    const onSubmit = (data) => {
        const image = typeof data.image === "string" ? data.image : data.image[0];
        if (isEditSession) editCabin1({newCabinData: {...data, image}, id: editId},{
            onSuccess: () => {
                onClose?.();
            },
        });
        else {
            console.log(data);
            createCabin(
                {...data, image: data.image[0]},
                {
                    onSuccess: () => {
                        reset();
                        onClose?.();
                    },
                }
            );
        }
    };
    function onError(err) {
        console.log(err);
    }
    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <FormRow label="Cabin name" error={errors?.name?.message}>
                <Input
                    type="text"
                    id="name"
                    {...register("name", {
                        required: "This Field is required",
                    })}
                    disabled={isWorking}
                />
            </FormRow>

            <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
                <Input
                    type="number"
                    id="maxCapacity"
                    disabled={isWorking}
                    {...register("maxCapacity", {
                        required: "This field is required",
                        min: {
                            value: 1,
                            message: "Capacity should be at least 1",
                        },
                    })}
                />
            </FormRow>

            <FormRow label="Regular price" error={errors?.regular_Price?.message}>
                <Input
                    type="number"
                    id="regular_Price"
                    disabled={isWorking}
                    {...register("regular_Price", {
                        required: "This field is required",
                        min: {
                            value: 1,
                            message: "Price should be at least 1",
                        },
                    })}
                />
            </FormRow>

            <FormRow label="Discount" error={errors?.discount?.message}>
                <Input
                    type="number"
                    id="discount"
                    defaultValue={0}
                    disabled={isWorking}
                    {...register("discount", {
                        required: "Can't be empty, make it at least 0",
                        validate: (value) =>
                            getValues().regular_Price >= value || "Discount should be less than regular price",
                    })}
                />
            </FormRow>

            <FormRow label="Description for website" error={errors?.description?.message}>
                <Textarea
                    type="number"
                    id="description"
                    defaultValue=""
                    disabled={isWorking}
                    {...register("description", {required: "This field is required"})}
                />
            </FormRow>

            <FormRow label="Cabin photo" error={errors?.image?.message}>
                <FileInput
                    disabled={isWorking}
                    id="image"
                    accept="image/*"
                    type="file"
                    {...register("image", {required: isEditSession ? false : "This field is required"})}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button
                onClick={()=>onClose?.()} variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button disabled={isWorking}>{isEditSession ? "Update Cabin" : "Add cabin"}</Button>
            </FormRow>
        </Form>
    );
}
export default CreateCabinForm;
