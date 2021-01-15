import React,{useState,useEffect,useContext} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import {UserContext} from "../../Context/UserContext"
import DefaultComponent from './DefaultComponent';
import CreateElection from './CreateElection';
import AddVoters from './AddVoters';
import AddCandidates from "./AddCandidates";
import ResultsMonitor from "./ResultsMonitor";
import {Redirect} from "react-router-dom"

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function Navcomponent(Information) {
  const info=useContext(UserContext);
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [UserDetails,setUserDetails]=useState({
    Name: info.Details.name,
    Email: info.Details.email
  });

  const [LoggedOut,setLoggedOut]=useState(false);
  const [Display,setDisplay]=useState(<DefaultComponent/>)

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const LaunchCreateElection=()=>{
    setDisplay(<CreateElection/>);
  }

  const LaunchAddVoters=()=>{
setDisplay(<AddVoters/>);
  }

  const LaunchAddCandidates=()=>{
    setDisplay(<AddCandidates/>)
  }

  const LaunchMonitorResults=()=>{
    setDisplay(<ResultsMonitor/>);
  }

 

  return (
    <div className={classes.root}>
    {console.log(UserDetails.Name)}
    {LoggedOut ? <Redirect to="/"/>: ' '}
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
          {UserDetails.Name}
          </Typography>
          <Typography float="right" style={{marginLeft:'70%'}} variant="h6" noWrap>
          <a onClick={()=> {
           setLoggedOut(true);
          }}>Logout</a>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        
        { /* // {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => ( 
          //   <ListItem button key={text}>
          //     <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
          //     <ListItemText primary={text} />
          //   </ListItem>
      // ))} */}
      <List>
<>
          <ListItem button onClick={LaunchCreateElection}>
          <ListItemText>Create Election</ListItemText>
          </ListItem>
          <ListItem button onClick={LaunchAddCandidates}>
          <ListItemText>Add Candidates</ListItemText>
          </ListItem>
          <ListItem button onClick={LaunchMonitorResults}>
          <ListItemText>Monitor Results</ListItemText>
          </ListItem>
          <ListItem button onClick={LaunchAddVoters}>
          <ListItemText>Add Voters</ListItemText>
          </ListItem>
          <ListItem button>
          <ListItemText>Results</ListItemText>
          </ListItem>
          </>
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
      {/* main code goes here */}

        {Display}
      </main>
    </div>
  );
}