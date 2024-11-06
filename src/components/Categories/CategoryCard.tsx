import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { Category } from "../../types/Category";

interface CategoryCardProps {
  category: Category;
  onCategoryClick: (categoryId: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onCategoryClick }) => {
  return (
    <Card
      onClick={() => onCategoryClick(category.id)}
      style={{
        cursor: 'pointer',
        position: 'relative',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        transition: 'transform 0.3s ease-in-out',
      }}
      sx={{
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={category.image}
        alt={category.display_name}
        sx={{
          objectFit: 'cover',
          filter: 'brightness(0.6)',
        }}
      />
      
      {category.is_closed === false && (
        <Box
          sx={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '0.875rem',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2">Opens at {category.opens_at}</Typography>
        </Box>
      )}

      <CardContent
        sx={{
          position: 'absolute',
          bottom: '0',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          padding: '12px 16px',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
          {category.display_name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
