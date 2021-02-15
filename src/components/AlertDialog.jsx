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
    console.log(props);
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
      {console.log(props)}
      {props.info.title === undefined ? "":
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
            <b>Desc: </b> {props.info.text} <br/>
            {console.log(new Date().getMonth)}
           <b>Created On: </b> {typeof(props.info.created) === "string" ? props.info.created : props.info.created.getDate() + "-"+(props.info.created.getMonth()+1) + "-"+(1900+props.info.created.getYear())}<br/>
           <b>Users Tagged: </b>{props.info.tagged.length === 0 ? "NO USERS TAGGED" : props.info.tagged.map((t,index)=>index!== 0 ? ", "+ t.name:t.name )}<br/>
           <b>Desc: </b> {props.info.text} <br/>

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
