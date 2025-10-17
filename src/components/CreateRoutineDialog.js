import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Box,
  Typography,
} from '@mui/material';
import { FolderOpen, FitnessCenter } from '@mui/icons-material';

export default function CreateRoutineDialog({ open, onClose, onCreateRoutine }) {
  const [routineName, setRoutineName] = useState('');
  const [isFolder, setIsFolder] = useState(false);

  const handleCreate = () => {
    if (routineName.trim()) {
      onCreateRoutine(routineName, isFolder);
      setRoutineName('');
      setIsFolder(false);
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { bgcolor: '#1e293b', color: '#e2e8f0', borderRadius: 3 },
      }}
    >
      <DialogTitle>
        <Typography fontWeight={700} color="#f8fafc">
          Create New {isFolder ? 'Folder' : 'Routine'}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box display="flex" justifyContent="center" gap={2} my={3}>
          <ToggleButtonGroup
            exclusive
            value={isFolder ? 'folder' : 'routine'}
            onChange={(e, val) => setIsFolder(val === 'folder')}
          >
            <ToggleButton
              value="routine"
              sx={{
                px: 3,
                py: 1.5,
                color: '#e2e8f0',
                '&.Mui-selected': {
                  background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
                  color: '#fff',
                },
              }}
            >
              <FitnessCenter sx={{ mr: 1 }} /> Routine
            </ToggleButton>
            <ToggleButton
              value="folder"
              sx={{
                px: 3,
                py: 1.5,
                color: '#e2e8f0',
                '&.Mui-selected': {
                  background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
                  color: '#fff',
                },
              }}
            >
              <FolderOpen sx={{ mr: 1 }} /> Folder
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <TextField
          fullWidth
          variant="outlined"
          label={`Enter ${isFolder ? 'folder' : 'routine'} name`}
          value={routineName}
          onChange={(e) => setRoutineName(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleCreate()}
          InputLabelProps={{ style: { color: '#94a3b8' } }}
          InputProps={{
            style: { color: '#f1f5f9', borderColor: '#475569' },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#475569' },
              '&:hover fieldset': { borderColor: '#60a5fa' },
              '&.Mui-focused fieldset': { borderColor: '#3b82f6' },
            },
          }}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} sx={{ color: '#94a3b8' }}>
          Cancel
        </Button>
        <Button
          onClick={handleCreate}
          disabled={!routineName.trim()}
          sx={{
            background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
            color: '#fff',
            fontWeight: 600,
            px: 3,
            '&:hover': { opacity: 0.9 },
            '&.Mui-disabled': { opacity: 0.4 },
          }}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
