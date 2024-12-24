import { ReactNode } from "react";

export interface SocialButtonProps {
    icon: ReactNode;
    text: string;
    onClick?: () => void;
}

export interface InputFieldProps {
    label: string;
    type?: string;
    id: string;
    hasIcon?: boolean;
    iconSrc?: string;
    className?: string;
}
