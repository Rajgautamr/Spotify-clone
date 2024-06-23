"use client"
import useLoadImage from "@/hooks/useLoadImage";
import Image from "next/image";
import { Song } from "@/types";
import PlayButton from "./PlayButton";
interface SongItemProps{
    data:Song;
    onClick:(id:string) => void;
};

const SongItem: React.FC<SongItemProps> = ({
    data,
    onClick
}) =>{
    const imgPath = useLoadImage(data);
    return ( 
        <div onClick={() => onClick(data.id)} className="relative group flex flex-col rounded-md items-center justify-center overflow-hidden gap-x-4 bg-neutral-400/5 cusrsor-pointer hover:bg-neutral-400/10 transistion p-3">
            <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
                <Image className="object-cover" src={imgPath || `/images/liked.png`} fill alt="Img" />
            </div>
            <div className="flex flex-col items-start w-full pt-4 gap-y-1">
                <p>{data.title}</p>
                <p className="text-neutral-400 text-sm pb-4 w-full truncate">By {data.author}</p>
            </div>
            <div className="absolute bottom-24 right-5">
                <PlayButton/>
            </div>
        </div>
     );
}
 
export default SongItem;