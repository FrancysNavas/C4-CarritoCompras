import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Confirmar() {
  const [open, setOpen] = React.useState(false);
  const [snackBar, setSnackBar] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onConfirm = () => {
    handleClose();
    
    //Hacer validaciones
    setSnackBar(true);
  }

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackBar(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Finalizar compra</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirmación
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            ¿ Confirma la compra ?
          </Typography>
          <Button onClick={onConfirm}>Confirmar</Button>
        </Box>
      </Modal>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={snackBar} autoHideDuration={6000} onClose={handleCloseSnackBar}>
            <Alert onClose={handleCloseSnackBar} severity="success" sx={{ width: '100%' }}>
            Compra exitosa!
            </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
}