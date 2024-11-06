import React, { useState, useContext, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { useQuery } from "react-query";
import { fetchItems } from "../api";
import { Item } from "../types/Item";
import CartAppBar from "../components/Items/CartAppBar";
import SearchBar from "../components/Global/SearchBar";
import ItemCard from "../components/Items/ItemCard";
import { AppBar, Box, Button, Container, Divider, Grid, Toolbar, Typography } from "@mui/material";
import CustomDialog from "../components/Global/CustomDialog";
import CustomSnackbar from "../components/Global/CustomSnackbar";
import Status from "../components/Global/Status";
import QuantityControl from "../components/Items/QuantityControl";
import ExtrasOptions from "../components/Items/ExtrasOptions";

const ItemsPage: React.FC = () => {
    const { categoryId } = useParams<{ categoryId: string }>();
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [extrasTotal, setExtrasTotal] = useState(0);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const { cart, addItemToCart } = useContext(CartContext)!;
    const navigate = useNavigate();

    const { data: items, isLoading, error } = useQuery(
        ['items', categoryId],
        () => fetchItems(categoryId!),
        {
            enabled: !!categoryId,
            staleTime: 5 * 60 * 1000,
            cacheTime: 10 * 60 * 1000,
        }
    );

    const filteredItems = useMemo(() => {
        return items?.filter((item: Item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [items, searchTerm]);

    const handleAddToCart = (item: Item) => {
        setSelectedItem(item);
        setQuantity(1);
        setExtrasTotal(0);
    };

    const handleConfirmAddToCart = () => {
        if (selectedItem) {
            addItemToCart(selectedItem, quantity, extrasTotal);
            setOpenSnackbar(true);
            setSelectedItem(null);
        }
    };

    const handleCloseDialog = () => setSelectedItem(null);

    const handleSnackbarClose = useCallback(
        (event?: React.SyntheticEvent | Event, reason?: string) => {
            if (reason === 'clickaway') return;
            setOpenSnackbar(false);
        },
        []
    );

    const handleQuantityChange = (amount: number) => {
        setQuantity(prevQuantity => Math.max(1, prevQuantity + amount));
    };

    const totalItemsInCart = useMemo(
        () => cart.items.reduce((sum, item) => sum + (item.quantity || 1), 0),
        [cart.items]
    );

    const totalPrice = useMemo(
        () => cart.items.reduce((sum, item) => sum + (item.quantity || 1) * item.price, 0),
        [cart.items]
    );

    if (isLoading) return <Status status="loading" message="Loading items..." />;

    if (error) return <Status status="error" message="An error occurred!" onRetry={() => window.location.reload()} />;

    if (!items || items.length === 0) return <Status status="empty" message="No items available." />;

    return (
        <Box>
            <CartAppBar isBack={true} navigate={navigate} totalItemsInCart={totalItemsInCart} />
            <SearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <Divider />

            <Container sx={{ marginTop: '10px', marginBottom: '10px'}}>
                <Grid container spacing={2}>
                    {filteredItems?.map((item: Item) => (
                        <Grid item xs={12} sm={6} md={4} key={item.id}>
                            <ItemCard item={item} onAddToCart={handleAddToCart} />
                        </Grid>
                    ))}
                </Grid>

                <CustomDialog
                    open={Boolean(selectedItem)}
                    onClose={handleCloseDialog}
                    title={selectedItem?.name || ""}
                    content={
                        <>
                            {selectedItem?.image && (
                                <img
                                    src={selectedItem.image}
                                    alt={selectedItem.name}
                                    style={{ width: '100%', marginBottom: '15px' }}
                                />
                            )}
                            <Typography variant="body1" gutterBottom>{selectedItem?.description}</Typography>
                            <Typography variant="h6" gutterBottom>{`Price: AED ${selectedItem?.price ?? 0}`}</Typography>
                            <QuantityControl quantity={quantity} onChange={handleQuantityChange} />
                            {selectedItem?.extrasWithOptions && (
                                <ExtrasOptions extras={selectedItem.extrasWithOptions} />
                            )}
                            <Typography variant="h6" gutterBottom>{`Total: AED ${(selectedItem?.price ?? 0) * quantity + extrasTotal}`}</Typography>
                        </>
                    }
                    actions={
                        <>
                            <Button onClick={handleCloseDialog} color="secondary">Close</Button>
                            <Button variant="contained" color="primary" onClick={handleConfirmAddToCart}>Add to Cart</Button>
                        </>
                    }
                />
            </Container>
            <AppBar
                position="sticky"
                color="primary"
                sx={{ bottom: 0, left: 0, right: 0 }}
            >
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Typography>{`Items in Cart: ${totalItemsInCart}`}</Typography>
                    <Typography>{`Total: AED ${totalPrice.toFixed(2)}`}</Typography>
                </Toolbar>
            </AppBar>

            <CustomSnackbar
                open={openSnackbar}
                message="Item added to cart!"
                onClose={handleSnackbarClose}
                severity="success"
            />
        </Box>
    );
};

export default ItemsPage;
