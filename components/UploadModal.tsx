"use client"
import { FieldValues , SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import Input from "./Input";
import { useState } from "react";
import useUploadModal from "@/hooks/useUploadModal";
const UploadModal = () => {
    const [isLoading, setisLoading] = useState();
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
     const onSubmit:SubmitHandler<FieldValues> = async () =>{
        //upload to supabase
     }

    return ( 
        <Modal
        title="Add a song"
        description="Upload a mp3 file"
        isOpen={uploadmodal.isOpen}
        onChange={onChange}
        >
            <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col gap-y-4">
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