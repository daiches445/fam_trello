import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function AlertDialogSlide(props) {
  const [open, setOpen] = React.useState(false);
  const name = React.useState(props.name)
 
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.handleClose()
  };

  return (
    <div>
      <Button color="primary" onClick={handleClickOpen}>
        {name}
      </Button>
      {props.info.title === "" ? "":
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{props.info.title} </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <h2 style={{fontSize:'1.2ch'}}>Desc</h2>{props.info.text}<br/>
            <h2 style={{fontSize:'1.2ch'}}>Users Tagged</h2>{props.info.tagged === undefined ? "NO USERS TAGGED" : props.info.tagged.map((user,index)=>index != 0 ? ", " + user.name:user.name)}<br/>
            {console.log(props.info.tagged)}
            <h2 style={{fontSize:'1.2ch'}}>Date Created</h2> {props.info.created}<br/>
           

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
      }
    </div>
  );
}
