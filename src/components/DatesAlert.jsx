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
  const [start_date, setStart] = React.useState();
  const [end_date, setEnd] = React.useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e) => {
    setOpen(false);
    alert(start_date)
if (e.target.innerText === "SAVE") {
    props.sendDates(start_date,end_date)
}
  };

  return (
    <div>
        {props.info === "" ?  <ListItemText  onClick={handleClickOpen} primary="Title"  secondary="Add tasks title"    />
:      <ListItemText  onClick={handleClickOpen} primary="Dates"  secondary={props.start + "  -  "+ props.end}    />
}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Dates</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
            <TextField
    id="start_date"
    label="From"
    type="date"
    defaultValue="2017-05-24"
    InputLabelProps={{
      shrink: true,
    }}
    onChange={(e)=>setStart(e.target.value)}
  />

<TextField
   
    id="end_date"
    label="Until"
    type="date"
    defaultValue="2017-05-24"
    InputLabelProps={{
      shrink: true,
    }}
    onChange={(e)=>setEnd(e.target.value)}
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
