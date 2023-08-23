import supabase, { supabaseUrl } from "./supabase"

export async function getCabins() {

    const { data: cabins, error } = await supabase
        .from('cabins')
        .select('*')
    if (error) {
        console.error(error)
        throw new Error('Cabins could not be loaded')
    }
    return cabins
}


// 创建以及更新一个cabin
export async function createEditCabin(newCabin, id) {


    // 看图片有没有改变
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

    // 1、设置图片名称 以及 图片路径
    const imageName = `cabin-${Math.random()}-${newCabin.image.name}`.replaceAll(
        "/",
        ""
    );
    const imagePath = hasImagePath
        ? newCabin.image
        : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;


    let query = supabase.from("cabins");

    // A) create创建

    if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

    // B) Edit更新
    if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);


    const { data, error } = await query.select().single()

    if (error) {
        console.error(error)
        throw new Error('Cabin could not be created')
    }

    // 2、上传图片到Storage
    if (hasImagePath) return data
    const { error: storageError } = await supabase.storage
        .from('cabin-images')
        .upload(imageName, newCabin.image)

    // 3、删除图片上传错误的情况下的cabin
    if (storageError) {
        await supabase
            .from('cabins')
            .delete()
            .eq('id', data.id)
        console.log(storageError)
        throw new Error('Cabin image could not be uploaded and the cabin was not created')
    }

    return data
}

export async function deleteCabin(id) {
    const { data, error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', id)

    if (error) {
        console.error(error)
        throw new Error('Cabin could not be deleted')
    }
    return data
}