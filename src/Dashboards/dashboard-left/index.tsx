import React, { useEffect } from "react";
import clsx from "clsx";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
  alpha,
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from '@mui/material/Typography';
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {
  logout,
  panelUserLogout,
} from "../../actions/loginActions";
import { useDispatch } from "react-redux";
import HomeIcon from '@mui/icons-material/Home';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Tooltip,
} from "@material-ui/core";
import { Button } from "@material-ui/core";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Fade from "@material-ui/core/Fade";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 0,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    title: {
      flexGrow: 1,
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: "none",
    },
    drawer: {
      color: "#00bcd4",
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    dashbord: {
      color: "#fff",
      fontSize: "18px",
      fontWeight: "normal",
      padding: "20px 0px 10px 10px",
    },
    drawerOpen: {
      width: drawerWidth,
      background:"#00bcd4",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      background:"#00bcd4",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      backgroundColor: "#00bcd4",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      width: "80%",
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  })
);
interface Props {
  passwordStatus: boolean;
}

const SampleAcceDashboard: React.FC<Props> = ({
  passwordStatus,
}) => {
  let dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const [changePasswordModal, setchangePasswordModal] = React.useState(false);
  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [openRightMenu, setOpenRightMenu] = React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [anchorElUpdate, setAnchorElUpdate] = React.useState(null);
  const id = open ? "transitions-popper" : undefined;

  const handleClick = (event: any) => {
    setOpenRightMenu(true);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setOpenRightMenu(false);
  };



  const updatePassword = async () => {
    const body: any = {
      old_password: oldPassword,
      new_password: newPassword,
      confirm_password: confirmPassword,
    };
    // await dispatch(changePassword(body));
    setchangePasswordModal(false);
    dispatch(logout());
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleLogout = () => {
    dispatch(panelUserLogout());
    dispatch(logout());
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar style={{ backgroundColor: "#00bcd4" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            My Dashboard
          </Typography>
          <div>
            <Button
              variant="text"
              onClick={(e) => handleClick(e)}
              size="medium"
              endIcon={<KeyboardArrowDownIcon />}
              style={{ color: "#fff" }}
            >
             Welcome Abhishek
            </Button>
            <Menu
              id="fade-menu"
              open={openRightMenu}
              onClose={handleClose}
              TransitionComponent={Fade}
              anchorEl={anchorEl}
            >
              <MenuItem onClick={() => setchangePasswordModal(true)}>
                Change Password
              </MenuItem>
              <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
       {/* Change Password Modal Start*/}
        <Dialog
          open={changePasswordModal}
          onClose={() => setchangePasswordModal(false)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Change Password</DialogTitle>
          <DialogContent>
            <TextField
              id="name"
              placeholder="Old Password"
              type="password"
              fullWidth
              style={{
                width: "100%",
                margin: "0.3rem auto",
                padding: "14px !important",
              }}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <TextField
              id="name"
              placeholder="New Password"
              type="password"
              fullWidth
              style={{
                width: "100%",
                margin: "0.3rem auto",
                padding: "14px !important",
              }}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <TextField
              id="name"
              placeholder="Confirm Password"
              type="password"
              fullWidth
              style={{
                width: "100%",
                margin: "0.3rem auto",
                padding: "14px !important",
              }}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => updatePassword()} color="primary">
              Update
            </Button>
            <Button
              onClick={() => setchangePasswordModal(false)}
              color="primary"
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
         {/* Change Password Modal End*/}
        <div className={classes.toolbar}>
          <span className={classes.dashbord}>Dashboard</span>
          <IconButton onClick={handleDrawerClose} style={{ color: "#fff" }}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link to="/dash1">
            <ListItem>
              <Tooltip title="Home" arrow>
                <ListItemIcon>
                  <HomeIcon style={{ color: "#fff" }} />
                </ListItemIcon>
              </Tooltip>
              <ListItemText primary="Home"  style={{ color: "#fff" }} />
            </ListItem>
          </Link>
          </List>
        <Divider />
        <List>
          <ListItem button >
            <Tooltip title="Logout" arrow>
              <ListItemIcon>
                <ExitToAppIcon style={{ color: "#fff" }} />
              </ListItemIcon>
            </Tooltip>
            <ListItemText primary="Logout" style={{ color: "#fff" }} />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};
const mapStateToProps = (state: any) => ({
  passwordStatus: state.loginReducer.passwordStatus,
});

export default connect(mapStateToProps, {
})(SampleAcceDashboard);
