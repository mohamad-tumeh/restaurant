import React from "react";
import { Box, InputBase, Toolbar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => (
    <Toolbar>
        <Box sx={{ flexGrow: 1, margin: '0 16px', display: 'flex', alignItems: 'center', backgroundColor: '#f1f1f1', borderRadius: '4px' }}>
            <Box sx={{ padding: '0 16px', display: 'flex', alignItems: 'center' }}>
                <SearchIcon />
            </Box>
            <InputBase 
                value={value} 
                onChange={onChange} 
                placeholder="Search for Items..." 
                sx={{ color: 'inherit', width: '100%' }} 
            />
        </Box>
    </Toolbar>
);

export default SearchBar;
