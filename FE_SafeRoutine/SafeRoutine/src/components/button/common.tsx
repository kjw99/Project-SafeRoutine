import React from 'react';
import { Button } from '@mui/material';

interface ConfirmButtonProps {
  buttonText: string;
}

const CommonButton: React.FC<ConfirmButtonProps> = ({ buttonText }) => {
  return (
    <Button variant="contained" color="primary" >
    {buttonText}
    </Button>
  );

};

export default CommonButton;