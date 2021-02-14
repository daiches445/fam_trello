import React ,{ useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import PostAddIcon from '@material-ui/icons/PostAdd';
import DescriptionAlert from './DescriptionAlert'
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Tooltip from '@material-ui/core/Tooltip';
import TitleAlert from './TitleAlert'
import DatesAlert from './DatesAlert'


const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function  FullScreenDialog(props)   {
    const classes = useStyles();
    const [openFull, setOpenFull] = React.useState(false);
    const [openUsers, setOpenUsers] = React.useState(false);
    const [noteTitle, setTitle] = React.useState("");
    const [usersTagged, setUserTag] = React.useState([]);
    const [noteDescription, setDesc] = React.useState("");
    const [noteId, setId] = React.useState();

    const handleClickOpen = () => {
        setOpenFull(true);
    };

    const handleClose = async (e) => {
        setOpenFull(false);
        
        if (e.target.innerText === "SAVE") {
            let note = { title: noteTitle,created:props.note.created,tagged: usersTagged, text: noteDescription }
            console.log(note)
              props.getNoteToEdit1(note)

            setOpenFull(false)
            setOpenUsers(false)
            setTitle("")
            setUserTag([])
            setDesc("")
             console.log(noteId)
        }
    };

 

    return (
        <div>
  
                <Button color="primary" onClick={handleClickOpen}>
                    Edit
                </Button>
           
            <Dialog  open={openFull} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar style={{ minHeight: "0", marginTop: '-2%', right: '1%' }} className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Edit Note
            </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            save
            </Button>
                    </Toolbar>
                </AppBar>
                {props.note === undefined ? "":
                <List style={{ marginTop: '-5%' }}>
                    <ListItem button>
                        <TitleAlert info={props.note === "" ? noteTitle : props.note.title} sendTitle={(val) => setTitle(val)}></TitleAlert>

                    </ListItem>
                    <Divider />

                    <ListItem button>
                        <ListItemText onClick={() => { setOpenUsers(!openUsers) }} primary="Users Tagged" secondary={usersTagged.length === 0 ? "Tag a user on a task!" : usersTagged.map((user, index) =>
                            index === 0 ? user.name : ", " + user.name
                            
                        )} />
                    </ListItem>
                    {console.log(usersTagged)}
                    {props.family.members === undefined ? " ":

                        <ListItem button>
                            {
                                props.family.members.map(user => <FormControlLabel
                                    onClick={(e) => { e.target.checked === true ? setUserTag([...usersTagged,{username:e.target.name,name:e.target.id}]) : setUserTag(usersTagged.filter(item => e.target.id !== item.name)) }}
                                    control={<Checkbox  name={user.username} id = {user.name} />}
                                    label={user.name}
                                  
                                />)
                            }
                        </ListItem>


                    }

                    <ListItem button>
                        <DescriptionAlert   setDescInParent={(description1) => setDesc(description1)} desc={props.note.text === "" ? noteDescription : props.note.text} style={{ height: '200px' }} />
                    </ListItem>
                 
                </List>
            }
            </Dialog>
            
        </div>
    );
}
