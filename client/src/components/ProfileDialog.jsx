import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  Avatar,
  Divider,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import HistoryIcon from '@mui/icons-material/History';

const ProfileDialog = ({ open, onClose, user, onHistoryClick }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          background: 'linear-gradient(135deg, #6A1B9A 0%, #8E24AA 100%)',
          color: '#FFFFFF',
          fontWeight: 'bold',
          fontSize: '20px',
        }}
      >
        My Profile
      </DialogTitle>
      <DialogContent sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <Avatar
            sx={{
              backgroundColor: '#FFD6E8',
              color: '#6A1B9A',
              fontWeight: 'bold',
              fontSize: '32px',
              width: 80,
              height: 80,
              mb: 2,
            }}
          >
            {user?.name?.charAt(0).toUpperCase()}
          </Avatar>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              color: '#6A1B9A',
              textAlign: 'center',
            }}
          >
            {user?.name}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <PersonIcon sx={{ color: '#6A1B9A', fontSize: 24 }} />
          <Box>
            <Typography variant="caption" sx={{ color: '#999999' }}>
              Full Name
            </Typography>
            <Typography variant="body2" sx={{ color: '#333333', fontWeight: 500 }}>
              {user?.name}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <EmailIcon sx={{ color: '#6A1B9A', fontSize: 24 }} />
          <Box>
            <Typography variant="caption" sx={{ color: '#999999' }}>
              Email
            </Typography>
            <Typography variant="body2" sx={{ color: '#333333', fontWeight: 500 }}>
              {user?.email}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <PhoneIcon sx={{ color: '#6A1B9A', fontSize: 24 }} />
          <Box>
            <Typography variant="caption" sx={{ color: '#999999' }}>
              Phone Number
            </Typography>
            <Typography variant="body2" sx={{ color: '#333333', fontWeight: 500 }}>
              {user?.phone}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />
      </DialogContent>
      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button
          variant="outlined"
          startIcon={<HistoryIcon />}
          sx={{
            borderColor: '#6A1B9A',
            color: '#6A1B9A',
            fontWeight: 'bold',
            borderRadius: '20px',
            '&:hover': {
              backgroundColor: '#F5E6FF',
            },
          }}
          onClick={() => {
            onHistoryClick();
            onClose();
          }}
        >
          Booking History
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#6A1B9A',
            color: '#FFFFFF',
            fontWeight: 'bold',
            borderRadius: '20px',
            '&:hover': {
              backgroundColor: '#8E24AA',
            },
          }}
          onClick={onClose}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProfileDialog;
