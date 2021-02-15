import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default function SimpleSnackbar(props) {
  const [open, setOpen] = React.useState();

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    if(event === null ? "" :event.target.innerText === "UNDO"){
        props.setUndo(true)
        return
    }
    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={props.open1}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Note Deleted"
        action={
          <React.Fragment>
              {console.log(props)}
              {props.progress1 !== undefined ? props.progress1 : "" }
            <Button id="UNDO" color="secondary" size="small" onClick={handleClose}>
              UNDO
            </Button>
           
          </React.Fragment>
        }
      />
    </div>
  );
}
