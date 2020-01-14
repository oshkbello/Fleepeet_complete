import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Icon } from "antd";

import { Link } from "react-router-dom";
import TopNav from "./TopNav";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

function ResponsiveDrawer(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [admin, setAdmin] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div style={{ backgroundColor: "lightblack", height: "100%" }}>
      <div style={{ backgroundColor: "white" }} className={classes.toolbar}>
        <Link to="/">
          <img
            className="mt-2 ml-3"
            src="images/logo/flipeetLogo1.png"
            style={{ width: 150, height: 65 }}
            alt=""
          />
        </Link>
      </div>
      <Divider />
      <Typography className='ml-3'>Main</Typography>
      {}
      <List>
        <Link to="/" id="clr">
          <ListItem button>
            <ListItemIcon>
              <Icon type="home" id="clr" />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>
        <Link to="/dashboard" id="clr">
          <ListItem button>
            <ListItemIcon>
              <Icon type="dashboard" id="clr" />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </Link>
        <Link to="/myProducts" id="clr">
          <ListItem button>
            <ListItemIcon>
              <Icon type="shopping-cart" id="clr" />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItem>
        </Link>
        <Link to="/purchaserequests" id="clr">
          <ListItem button>
            <ListItemIcon>
              <Icon type="import" id="clr" />
            </ListItemIcon>
            <ListItemText primary="Request Received" />
          </ListItem>
        </Link>
        <Link to="/purchaserequestsent" id="clr">
          <ListItem button>
            <ListItemIcon>
              <Icon type="export" id="clr" />
            </ListItemIcon>
            <ListItemText primary="Request Sent" />
          </ListItem>
        </Link>
        <Link to="/mytransactions" id="clr">
          <ListItem button>
            <ListItemIcon>
              <Icon type="transaction" id="clr" />
            </ListItemIcon>
            <ListItemText primary="Transactions" />
          </ListItem>
        </Link>
        <Link to="/referfriend" id="clr">
          <ListItem button>
            <ListItemIcon>
              <Icon type="usergroup-add" id="clr" />
            </ListItemIcon>
            <ListItemText primary="Refer Friend" />
          </ListItem>
        </Link>
      </List>
      {props.auth.role === "admin" ? (
        <div>
        <Divider />
        <Typography className='ml-3'>Admin</Typography>
        <List>
        <Link to="/manageUsers" id="clr">
            <ListItem button>
              <ListItemIcon>
                <Icon type="usergroup-add" id="clr" />
              </ListItemIcon>
              <ListItemText primary="Manage Users" />
            </ListItem>
          </Link>
          <Link to="/createAdmin" id="clr">
            <ListItem button>
              <ListItemIcon>
                <Icon type="user" id="clr" />
              </ListItemIcon>
              <ListItemText primary="Create Admin" />
            </ListItem>
          </Link>
          <Link to="/manageSiteContent" id="clr">
            <ListItem button>
              <ListItemIcon>
                <Icon type="pic-right" id="clr" />
              </ListItemIcon>
              <ListItemText primary="Manage Site Content" />
            </ListItem>
          </Link>
          <Link to="/managePurchaseRequests" id="clr">
            <ListItem button>
              <ListItemIcon>
                <Icon type="file-sync" id="clr" />
              </ListItemIcon>
              <ListItemText primary="Manage Purchase Requests" />
            </ListItem>
          </Link>
          <Link to="/userComplaints" id="clr">
            <ListItem button>
              <ListItemIcon>
                <Icon type="file-text" id="clr" />
              </ListItemIcon>
              <ListItemText primary="User Complaints" />
            </ListItem>
          </Link>
          <Link to="/dashboardBlogPosts" id="clr">
            <ListItem button>
              <ListItemIcon>
                <Icon type="form" id="clr" />
              </ListItemIcon>
              <ListItemText primary="Manage Blog" />
            </ListItem>
          </Link>
          <Link to="/manageFAQ" id="clr">
            <ListItem button>
              <ListItemIcon>
                <Icon type="question-circle" id="clr" />
              </ListItemIcon>
              <ListItemText primary="Manage FAQ" />
            </ListItem>
          </Link>
        </List>
        </div>
    ) : null}
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <TopNav onClick={handleDrawerToggle} />
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content} style={{ marginTop: "81px" }}>
        {props.children}
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {

  container: PropTypes.instanceOf(
    typeof Element === "undefined" ? Object : Element
  )
};

const mapStateToProps = state => (
  {
    auth: state.loginUser.currentUser
  }
);
export default connect(mapStateToProps)(ResponsiveDrawer);
