import React from "react";

interface IProps {
    text: string;
    icon?: React.ReactNode;
    size?: number;
    onClick?: () => void;
}

const Button: React.FC<IProps> = ({ text, icon, size, onClick }) => {
    return (
        <button
            onClick={onClick}
            style={size ? { width: `${size}px` } : undefined}
            className="bg-black text-white rounded-lg p-2 flex items-center text-center h-full cursor-pointer"
        >
            {icon && <span className="mr-2">{icon}</span>}
            <p>{text}</p>
        </button>
    );
};

export default Button;