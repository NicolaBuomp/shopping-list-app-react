import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
    return (
        <div
            className={`
        bg-white dark:bg-gray-800 
        p-6 
        rounded 
        shadow-2xl 
        dark:text-gray-100
        ${className}
      `}
        >
            {children}
        </div>
    );
};

export default Card;
