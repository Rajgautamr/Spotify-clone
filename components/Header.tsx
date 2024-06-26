"use client"
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft , RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiPlus, BiSearch } from "react-icons/bi";
import Button from './Button';
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import AuthModal from "./AuthModal";
import { FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import useUploadModal from "@/hooks/useUploadModal";

interface HeaderProps {
    children:React.ReactNode;
    className?:string;
}
const Header :React.FC<HeaderProps>= ({
    children,
    className,
}) => {
    const uploadModal = useUploadModal();
    const redirectToSearch = () => {
        router.push('/search');
    };
    const redirectToHome = () => {
        router.push('/');
    };
    const authModal = useAuthModal();
    const router =useRouter();
    const supabaseClient = useSupabaseClient();
    const { user} = useUser();
    const handleLogout = async () =>{
        const {error} = await supabaseClient.auth.signOut();
        router.refresh();
        if (error) {
            toast.error(error.message);
        }else {
            toast.success('Logged out!')
        }
           }
           const onclick = () =>{
            if(!user){
                return authModal.onOpen();
            }
    
            return uploadModal.onOpen();
        };
    
    return ( 
        <div className={twMerge('h-fit bg-gradient-to-b from-emerald-800 p-6 ', className)}>
            <div className="w-full mb-4 flex item-center justify-between">
                <div className="hidden md:flex gap-x-2 itmes-center">
                    <button onClick={() => router.back()} className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition">
                        <RxCaretLeft className="text-white" size={52}/>
                    </button>
                    <button onClick={() => router.forward()} className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition">
                        <RxCaretRight className="text-white" size={52}/>
                    </button>
                </div>
                <div className="flex md:hidden gap-x-2 items-center">
                    <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
                        <HiHome onClick={redirectToHome} className="text-black" size={20}/>
                    </button>
                    <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
                        <BiSearch onClick={redirectToSearch} className="text-black" size={20}/>
                    </button>
                    <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
                        <BiPlus onClick={onclick} className="text-black" size={20}/>
                    </button>
                </div>
                <div className="flex justify-between items-center gap-x-4">
                    {user ?(
                        <div className="flex gap-x-4 items-center">
                            <button onClick={handleLogout} className="w-full rounded-full bg-white border border-transparant px-5 py-3 disabled:cursor-not-allowed disabled:opacity-50 text-black font-bold hover:opacity-75 transition"
                            >Logged In</button>
                            <button onClick={() => router.push('/account')} className="rounded-full p-4 bg-white flex items-center justify-center hover:opacity-75 transition">
                                <FaUserAlt className="text-black" size={20}/>
                            </button>
                            </div>
                    ): (
                        <>
                            <div>
                                <Button  className="bg-transparent text-neutral-300 font-medium border-none">
                                    Sign In
                                </Button>
                            </div>
                            <div>
                                <Button  className="bg-white px-6 py-2">
                                    Login
                                </Button>
                            </div>
                        </>)}
                </div>
            </div>
            {children}
        </div>
     );
}
 
export default Header;