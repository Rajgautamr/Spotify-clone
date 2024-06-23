import * as Dialog from "@radix-ui/react-dialog"
import { IoMdClose } from "react-icons/io";
interface ModalProps{
    isOpen:boolean;
    onChange:(open:boolean) => void;
    title: string;
    description:string;
    children: React.ReactNode;
}
const Modal: React.FC<ModalProps> = ({
    isOpen,
    onChange,
    title,
    description,
    children
}) => {
    return ( 
        <Dialog.Root 
        open={isOpen}
        defaultOpen={isOpen}
        onOpenChange={onChange}
        >
          <Dialog.Portal>
            <Dialog.Overlay className="bg-neutral-900/80 backdrop-blur-sm fixed inset-0"/>
            <Dialog.Content className="fixed drop-shadow-md border border-neutral-700 left-[50%] top-[20%] max-h-full h-full md:h-auto md:max-h-[85vh] w-full md:w-[90vw] md:max-w-[450px] translate-x-[-50%] translatr-y-[-50%] rounded-md bg-neutral-800 p-[25px] focus:outine-none sm:h-full"> 
            <Dialog.Title className="mb-4 text-xl font-bold text-center ">{title}</Dialog.Title>
            <Dialog.Description className="mb-5 text-sm leading-normal text-center">{description}</Dialog.Description>
            <div>
                {children}
            </div>
            <Dialog.Close asChild>
                <button className="text-neutral-400 hover:text-white absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] 
                appearance-none items-center justify-center rounded-full focus:outline-none ">
                    <IoMdClose/>
                </button>
            </Dialog.Close>
            </Dialog.Content>
            </Dialog.Portal>  
        </Dialog.Root>
     );
}
 
export default Modal;   