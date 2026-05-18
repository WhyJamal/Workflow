import { cn } from "@/lib/utils";

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}

export function Container({ children, className }: ContainerProps) {
    return (
        <div className={cn("w-full flex items-center px-8 py-2 dark:bg-black", className)}>
            {children} 
        </div>
    );
}
// bg-[#33C240] 