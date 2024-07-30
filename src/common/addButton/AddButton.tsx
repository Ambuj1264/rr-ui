import React from 'react';

interface AddButtonProps {
    type: "button" | "submit" | "reset";
    className?: string;
    onClick?: () => void;
    children: React.ReactNode;
}

const AddButton: React.FC<AddButtonProps> = ({ type, className, onClick, children }) => {
    return (
        <button type={type} className={className} onClick={onClick}>
            {children}
        </button>
    );
}

export default AddButton;
