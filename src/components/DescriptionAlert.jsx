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
  const [description, setDescription] = React.useState();

  const handleClickOpen = (e) => {
    setOpen(true);
  };

  const handleClose = (e) => {
    setOpen(false);
    if (e.target.innerText === "SAVE") {
      console.log(description);
      
      props.setDescInParent(description)
    }
  };

  return (
    <div>
      <ListItemText size  onClick={handleClickOpen} primary="Description" secondary={props.desc === "" ? "Add tasks decription" : props.desc.substring(0,(props.desc.length < 5 ? props.desc.length/2:5)) + "..."} />
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Description</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Description"
            type="email"
            fullWidth
            multiline
            rows={5}
            onChange={(e)=>setDescription(e.target.value)}
            placeholder={props.desc}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
