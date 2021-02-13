import React from 'react';
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
    const [noteStartDate, setStart] = React.useState("");
    const [noteEndDate, setEnd] = React.useState("");
    const [usersTagged, setUserTag] = React.useState([]);
    const [noteDescription, setDesc] = React.useState("");
    const [noteId, setId] = React.useState();
    const handleClickOpen = () => {
        setOpenFull(true);
    };

    const handleClose = async (e) => {
        setOpenFull(false);
        setUserTag([])
        if (e.target.innerText === "SAVE") {
            setOpenFull(false)
            setOpenUsers(false)
            setTitle("")
            setStart("")
            setEnd("")
            setUserTag([])
            setDesc("")
             setId(props.note.id)
             console.log(noteId)
                let note = {id:noteId, title: noteTitle, start_date: noteStartDate, end_date: noteEndDate, tagged_users: usersTagged, text: noteDescription }
            console.log(note)
              props.getNoteToEdit1(note)
        }
    };

    return (
        <div>
            <Tooltip title="Add Task">

                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    Edit
                </Button>
            </Tooltip>
            <Dialog fullScreen open={openFull} onClose={handleClose} TransitionComponent={Transition}>
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
                <List style={{ marginTop: '-5%' }}>
                    <ListItem button>
                        <TitleAlert info={props.note.title === "" ? noteTitle : props.note} sendTitle={(val) => setTitle(val)}></TitleAlert>

                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <DatesAlert start={props.note.start_date === "" ? noteStartDate : props.note.start_date} end={props.note.end_date === "" ? noteEndDate : props.note.end_date} sendDates={(valStart, valEnd) => {
                            setStart(valStart)
                            setEnd(valEnd)
                        }}></DatesAlert>
                    </ListItem>
                    <ListItem button>
                        <ListItemText onClick={() => { setOpenUsers(!openUsers) }} primary="Users Tagged" secondary={usersTagged.length === 0 ? "Tag a user on a task!" : usersTagged.map((user, index) =>
                            index === 0 ? user : ", " + user
                        )} />
                    </ListItem>
                    {props.note.tagged_users === undefined ? <ListItem button >
                        {openUsers === false ? "" :

                            <FormControlLabel
                                onClick={(e) => { e.target.checked === true ? setUserTag([...usersTagged, e.target.name]) : setUserTag(usersTagged.filter(item => e.target.name !== item)) }}
                                control={<Checkbox name="Nir" />}
                                label="Nir1"

                            />

                        }
                        {openUsers === false ? "" :

                            <FormControlLabel
                                onClick={(e) => { e.target.checked === true ? setUserTag([...usersTagged, e.target.name]) : setUserTag(usersTagged.filter(item => e.target.name !== item)) }}

                                control={<Checkbox name="Ely" />}
                                label="Ely1"
                            />

                        }
                    </ListItem> :

                        <ListItem button>
                          
                            {
                                props.note.tagged_users.map(user => <FormControlLabel
                                    onClick={(e) => { e.target.checked === true ? setUserTag([...usersTagged, e.target.name]) : setUserTag(usersTagged.filter(item => e.target.name !== item)) }}
                                    control={<Checkbox name={user} />}
                                    label={user}
                                    
                                />)

                            }
                        </ListItem>


                    }

                    <ListItem button>
                        <DescriptionAlert   setDescInParent={(description1) => setDesc(description1)} desc={props.note.text === "" ? noteDescription : props.note.text} style={{ height: '200px' }} />
                    </ListItem>
                 
                </List>

            </Dialog>
        </div>
    );
}
