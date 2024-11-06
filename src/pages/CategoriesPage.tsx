import React, { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCategories } from "../api";
import { Category } from "../types/Category";
import Status from "../components/Global/Status";
import SearchBar from "../components/Global/SearchBar";
import CartAppBar from "../components/Items/CartAppBar";
import CategoryCard from "../components/Categories/CategoryCard";
import { Container, Divider, Grid } from "@mui/material";

const CategoriesPage: React.FC = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    const { data: categories, isLoading, error } = useQuery(
        "categories",
        fetchCategories,
        {
            staleTime: 5 * 60 * 1000,
            cacheTime: 10 * 60 * 1000,
        }
    );

    const filteredCategories = useMemo(() => {
        return categories?.filter((category: Category) =>
            category.display_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [categories, searchTerm]);

    const handleCategoryClick = useCallback((categoryId: string) => {
        navigate(`/items/${categoryId}`);
    }, [navigate]);

    const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    }, []);

    if (isLoading) return <Status status="loading" message="Loading categories..." />;
    if (error) return <Status status="error" message="An error occurred!" onRetry={() => window.location.reload()} />;
    if (!categories || categories.length === 0) return <Status status="empty" message="No categories available." />;

    return (
        <div>
            <CartAppBar isBack={false} />

            <SearchBar value={searchTerm} onChange={handleSearchChange} />
            <Divider />

            <Container sx={{ marginTop: '10px', marginBottom: '10px' }}>
                <Grid container spacing={2}>
                    {filteredCategories?.map((category: Category) => (
                        <Grid item xs={12} sm={6} md={4} key={category.id}>
                            <CategoryCard category={category} onCategoryClick={handleCategoryClick} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    );
};

export default CategoriesPage;
