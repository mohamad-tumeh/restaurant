import React from "react";
import { Button, Typography, Box } from "@mui/material";

interface QuantityControlProps {
    quantity: number;
    onChange: (amount: number) => void;
}

const QuantityControl: React.FC<QuantityControlProps> = ({ quantity, onChange }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
        <Button variant="outlined" onClick={() => onChange(-1)}>-</Button>
        <Typography variant="h6" sx={{ margin: '0 15px' }}>{quantity}</Typography>
        <Button variant="outlined" onClick={() => onChange(1)}>+</Button>
    </Box>
);

export default QuantityControl;
