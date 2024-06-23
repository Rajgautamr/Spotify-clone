import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import useAuthModal from "@/hooks/useAuthModal";

interface ButtonProps 
extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
const Button =  forwardRef< HTMLButtonElement, ButtonProps>(({
    className,
    children,
    disabled,
    type="button", 
    ...props
}, ref) =>{
    const trigger = useAuthModal();
    return (
        <button onClick={trigger.onOpen}type={type} className={twMerge('w-full rounded-full bg-green-500 border border-transparant px-3 py-3 disabled:cursor-not-allowed disabled:opacity-50 text-black font-bold hover:opacity-75 transition',
            className
        )}  disabled={disabled} ref={ref}>
            {children} 
        </button>
    )
})
Button.displayName = "Button";
export default Button;