import { Song } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadImage = (song:Song) => {
    const supabaseClient = useSupabaseClient(); 

    if(!song){
        return null;
    }
    
    const {data: imgData} = supabaseClient.storage.from(`images`).getPublicUrl(song.img_path);
    
    return imgData.publicUrl;
};
export default useLoadImage;