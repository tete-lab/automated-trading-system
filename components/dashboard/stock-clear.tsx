
import { Button } from "@/components/ui/button";

interface StockClearProps {
    onClear: (e?: React.MouseEvent) => void; // 이벤트 매개변수를 선택적으로 받도록 수정
    className?: string;
    size?: "sm" | "default" | "lg";
    variant?: "outline" | "ghost" | "default";
    children?: React.ReactNode;
}

export function StockClear({
                               onClear,
                               className = "",
                               size = "sm",
                               variant = "outline",
                               children = "✕"
                           }: StockClearProps) {

    const handleClick = (e: React.MouseEvent) => {
        onClear(e);
    };

    return (
        <Button
            variant={variant}
            size={size}
            onClick={handleClick}
            className={`text-gray-500 hover:text-gray-700 hover:bg-gray-50 ${className}`}
        >
            {children}
        </Button>
    );
}