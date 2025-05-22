import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', boxShadow: '2px 2px 8px rgba(0,0,0,0.1)' }}>
      {title && <h2>{title}</h2>}
      {children} 
    </div>
  );
};

export default Card;