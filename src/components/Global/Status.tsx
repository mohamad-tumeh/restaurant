import React from "react";
import { CircularProgress, Typography, Box, Button } from "@mui/material";
import ErrorIcon from '@mui/icons-material/Error';
import EmptyIcon from '@mui/icons-material/RemoveShoppingCart';
import { status } from "../../types/status";

interface StatusProps {
  status: status;
  message?: string; 
  onRetry?: () => void; 
}

const Status: React.FC<StatusProps> = ({ status, message, onRetry }) => {
  let content;

  switch (status) {
    case 'loading':
      content = (
        <Box textAlign="center">
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            {message || 'Loading...'}
          </Typography>
        </Box>
      );
      break;
    case 'error':
      content = (
        <Box textAlign="center" sx={{ color: 'error.main' }}>
          <ErrorIcon sx={{ fontSize: 80 }} />
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            {message || 'An error occurred!'}
          </Typography>
          {onRetry && (
            <Button
              variant="contained"
              color="secondary"
              sx={{ marginTop: 2 }}
              onClick={onRetry}
            >
              Retry
            </Button>
          )}
        </Box>
      );
      break;
    case 'empty':
      content = (
        <Box textAlign="center" sx={{ color: 'text.secondary' }}>
          <EmptyIcon sx={{ fontSize: 80 }} />
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            {message || 'No data available.'}
          </Typography>
        </Box>
      );
      break;
    default:
      content = null;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        padding: 3,
        backgroundColor: 'background.default',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      {content}
    </Box>
  );
};

export default Status;
