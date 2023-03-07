import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid gray',
  boxShadow: 24,
  p: 4,
};

const ModalWindow = ({ stats }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>More stats</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Pokemon stats
          </Typography>

          {stats.map((stat) => {
            const statName = stat.stat.name;
            const statValue = stat.base_stat;
            return (
              <Box key={statName}>
                <Typography id="modal-modal-description" variant="body1" sx={{ fontWeight: 700, pr: '5px', display: 'inline-block' }}>
                  {statName}
                  :
                </Typography>
                <Typography id="modal-modal-description" variant="subtitle2" sx={{ display: 'inline-block' }}>
                  {statValue}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Modal>
    </div>
  );
};

export default ModalWindow;
