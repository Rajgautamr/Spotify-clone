"use client"

import AuthModal from "@/components/AuthModal";
import { useEffect, useState } from "react";
import UploadModal from "@/components/UploadModal";

const ModalProvider = () => {
    const [isMounted , setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    },[]);
    if (!isMounted) {
        return null;
    }
    return ( 
        <>
        <AuthModal/>
        <UploadModal/>
        </>
     );
}
 
export default ModalProvider;