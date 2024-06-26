"use client"
import uniqid from "uniqid";
import { useRouter } from "next/navigation";
import { FieldValues , SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import Input from "./Input";
import { useState } from "react";
import useUploadModal from "@/hooks/useUploadModal";
import { toast } from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
const UploadModal = () => {
    const router = useRouter();
    const {user} = useUser();
    const supabaseClient = useSupabaseClient();
    const [isLoading, setisLoading] = useState(false);
    const uploadmodal = useUploadModal();
    const {register, handleSubmit, reset} = useForm<FieldValues>({
        defaultValues:{
            author:'',
            title:'',
            song: null,
            image:null,
        }
    })
    const onChange = (open:boolean) => {
        if(!open){
            reset();
            uploadmodal.onClose();
        }
    }
     const onSubmit:SubmitHandler<FieldValues> = async (values) =>{
        try{
            setisLoading(true);
            const imageFile = values.image?.[0];
            const songFile = values.song?.[0];
            if(!imageFile || !songFile || !user){
                toast.error("Missing Fields");
                return;
            }   
            const uniqID = uniqid();
            //upload song
            const {
                data: songData,
                error: songError,
            } = await supabaseClient
                .storage.
                from(`songs`)
                .upload(`song-${values.title}-${uniqID}`, songFile,{
                    cacheControl:`3600`,
                    upsert:false
                });
                if(songError){
                    return toast.error('Failed to upload song');
                }
                //upload image
                const {
                    data: imageData,
                    error: imageError,
                } = await supabaseClient
                    .storage.
                    from(`images`)
                    .upload(`image-${values.title}-${uniqID}`, imageFile,{
                        cacheControl:`3600`,
                        upsert:false
                    });
                    if(imageError){
                        return toast.error('Failed to upload image');
                    }
                    const {error: supabaseError} = await supabaseClient 
                        .from(`songs`).insert({
                            user_id : user.id,
                            title: values.title,
                            author: values.author,
                            img_path: imageData.path,
                            song_path: songData.path,
                        });
                        if(supabaseError){
                            setisLoading(false);
                            return toast.error(supabaseError.message);
                        }

                        router.refresh();
                        setisLoading(false);
                        toast.success(`Song uploaded successfully`);
                        reset();
                        uploadmodal.onClose();

        }catch(error){
            toast.error("Something went wrong");
        }finally{
            setisLoading(false);
        }
     }

    return ( 
        <Modal
        title="Add a song"
        description="Upload a mp3 file"
        isOpen={uploadmodal.isOpen}
        onChange={onChange}
        >
            <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col gap-y-">
                <Input
                    id="title"
                    disabled={isLoading}
                    {...register('title', {required: true})}
                    placeholder="Song Title"

                    />
                <Input
                    id="title"
                    disabled={isLoading}
                    {...register('author', {required: true})}
                    placeholder="Song Author"

                    />
                    <div>
                        <div className="pb-1">
                            Select a song file
                        </div>
                        <Input
                            id="song"
                            type="file"
                            accept=".mp3"
                            disabled={isLoading}
                            {...register('song', {required: true})}
                        />
                    </div>

                    <div>
                        <div className="pb-1">
                            Select an image
                        </div>
                        <Input
                            id="image"
                            type="file"
                            accept="image/*"
                            disabled={isLoading}
                            {...register('image', {required: true})}
                        />
                    </div>

                    <button type="submit" disabled={isLoading} className="w-full rounded-full bg-green-500 border border-transparant px-3 py-3 disabled:cursor-not-allowed disabled:opacity-50 text-black font-bold hover:opacity-75 transition"
                    >Submit</button>
            </form>
        </Modal>
     );
}
 
export default UploadModal;