import React from 'react';
import { ButtonComponent } from '../../components/button/ButtonComponent';
import { useNavigate } from 'react-router-dom';

export const NewAnalysis = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/chatPage', { state: { fromNewAnalysis: true } });
  };

  return (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
  <ButtonComponent text="Add New Analysis" onClick={handleClick} />
</div>

  );
};
