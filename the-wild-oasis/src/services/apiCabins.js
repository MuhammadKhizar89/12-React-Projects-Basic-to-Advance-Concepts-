import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {

    const { data, error } = await supabase
        .from('cabins')
        .select('*')
    if (error) console.log(error.message)
    return data;
}


export async function createEditCabin(newCabin, id) {
    // Check if the image path already starts with the Supabase URL
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

    // Generate a new image name
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");

    // Define the image path based on whether the image path already starts with the Supabase URL
    const imagePath = hasImagePath
        ? newCabin.image
        : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    // Create or Edit Cabin
    let query = supabase.from("cabins");

    if (!id) {
        // Insert new cabin
        query = query.insert([
            { ...newCabin, image: imagePath }
        ]);
    } else {
        // Update existing cabin
        query = query
            .update(
                { ...newCabin, image: imagePath }
            )
            .eq('id', id);
    }

    // Execute the query and get the result
    const { data, error } = await query.select().single();

    if (error) {
        throw new Error(error.message);
    }

    // Upload the image if it's a new image
    if (!hasImagePath) {
        const { error: storageError } = await supabase.storage.from("cabin-images")
            .upload(imageName, newCabin.image);

        // If an error occurs during image upload, delete the cabin data
        if (storageError) {
            await supabase
                .from('cabins')
                .delete()
                .eq('id', data.id);

            console.log(storageError);
            throw new Error("Image not uploaded and cabin not created");
        }
    }

    return data;
}
export async function deleteCabin(id) {

    const { status, error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', id)
    if (error) console.log(error.message)

    return status;
}