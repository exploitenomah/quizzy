

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface AlertDialogueProps {
  open: boolean,
  handleToggleOpen: Function,
  title: string,
  content: string,
  agreeText: string,
  disagreeText: string,
  agreeBtnColor: 'warning'| 'info' | 'primary' | 'inherit' | 'success' 
}

const AlertDialog = ({
  open,
  handleToggleOpen,
  title,
  content,
  agreeText,
  disagreeText,
  agreeBtnColor
 }: AlertDialogueProps) => {

  return (
    <div>
      <Button variant="outlined" onClick={() => handleToggleOpen('open')}>
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={() => handleToggleOpen('close')}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            color='primary'
            size='large'
            onClick={() => handleToggleOpen('close')}>{disagreeText}</Button>
          <Button
            variant='contained'
            color={agreeBtnColor}
            size='large'
            onClick={() => handleToggleOpen('submit')} autoFocus>
            {agreeText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default AlertDialog