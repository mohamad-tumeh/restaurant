import React from "react";
import { Box, Typography, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { ExtraOption } from "../../types/ExtraOption";

interface ExtrasOptionsProps {
    extras: ExtraOption[] | undefined;
}

const ExtrasOptions: React.FC<ExtrasOptionsProps> = ({ extras }) => (
    <Box>
        {extras?.map(extra => (
            <Box key={extra.extra_id} sx={{ marginBottom: '15px', backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '8px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="subtitle1">{extra.name}</Typography>
                    {extra.is_required && <Typography color="error">Required</Typography>}
                </Box>
                <RadioGroup>
                    {extra.option.map(option => (
                        <FormControlLabel
                            key={option.id}
                            value={option.id}
                            control={<Radio />}
                            label={`${option.name} (${option.currency} ${option.price})`}
                        />
                    ))}
                </RadioGroup>
            </Box>
        ))}
    </Box>
);

export default ExtrasOptions;
