import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ListItemText from '@material-ui/core/ListItemText';

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [title1, setTitle] = React.useState();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e) => {
    setOpen(false);
if (e.target.innerText === "SAVE") {
    alert(title1)
    props.sendTitle(title1)
}
  };

  return (
    <div>
        {props.info === "" ?  <ListItemText  onClick={handleClickOpen} primary="Title"  secondary="Add tasks title"    />
:      <ListItemText  onClick={handleClickOpen} primary="Title"  secondary={props.info}    />
}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Title</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            placeholder={props.info}
            autoFocus
            margin="dense"
            id="name"
            label="Title"
            type="email"
            fullWidth
            multiline
            onChange={(e)=>setTitle(e.target.value)}
           
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button id="save" onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
