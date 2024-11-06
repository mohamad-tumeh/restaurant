import React from "react";
import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import { Item } from "../../types/Item";

interface ItemCardProps {
    item: Item;
    onAddToCart: (item: Item) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onAddToCart }) => (
    <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', '&:hover': { boxShadow: 6 } }}>
        <CardMedia component="img" height="200" image={item.image} alt={item.name} />
        <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="h6">{item.name}</Typography>
            {item.description && <Typography sx={{ minHeight: '50px' }}>{item.description}</Typography>}
            <Typography variant="body1">AED {item.price}</Typography>
        </CardContent>
        <Button variant="contained" color="primary" fullWidth onClick={() => onAddToCart(item)}>
            Add to Cart
        </Button>
    </Card>
);

export default ItemCard;
