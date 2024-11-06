import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import { ArrowBack as ArrowBackIcon, ShoppingCart as ShoppingCartIcon } from "@mui/icons-material";

interface CartAppBarProps {
    isBack: boolean;
    navigate?: any;
    totalItemsInCart?: number;
}

const CartAppBar: React.FC<CartAppBarProps> = ({ isBack ,navigate, totalItemsInCart }) => (
    <AppBar position="static">
        <Toolbar>
            {isBack && (
                <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
                    <ArrowBackIcon />
                </IconButton>
            )}
            <Typography variant="h6" style={{ flexGrow: 1, textAlign: 'center' }}>
                In Room Dining
            </Typography>
            <IconButton color="inherit">
                <ShoppingCartIcon />
                <Typography variant="body2">{totalItemsInCart}</Typography>
            </IconButton>
        </Toolbar>
    </AppBar>
);

export default CartAppBar;
