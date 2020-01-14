import React,{useEffect} from "react";
import {connect} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from 'react-bootstrap'
import Menu from "@material-ui/core/Menu";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import MenuItem from "@material-ui/core/MenuItem";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Badge from "@material-ui/core/Badge";
import {getNotification} from '../../../actions/productActions'


const ITEM_HEIGHT = 48;

function Notify(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

 useEffect(()=>{
  props.getNotification();
},[])




  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  let options=[];
  if(props.data){
     options = props.data.map(notification=>{
    return <div><span class="avatar" style={{backgroundColor:'#6D00A6'}}>N</span>{notification.message}</div>;
  })
  }

  return (
    <div>
      <div
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Badge badgeContent={props.resu?props.resu:0} color="secondary">
          <NotificationsIcon />
        </Badge>
        <div className='d-inline d-lg-none'>Notifications</div>
      </div>
      
      <Menu 
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 7.5,
            width: 370,

          }
        }}
        
      >
      
      <Navbar expand="md"  bg='white' className='desktop-hover sticky-top ' >
      <div style={{marginLeft:'40%'}}>Notification</div>
      </Navbar>
    
        {options.map(option => (
          
          <MenuItem
            key={option}
            selected={option === "Pyxis"}
            onClick={handleClose}
            style={{fontSize:'12px'}}
          >
            {option}
          </MenuItem>
         
        ))}
      </Menu>
    </div>
  );
}
 const mapStateToProps=(state)=>{
   if(state.products.notification){
     return{data:state.products.notification.notifications,
    resu:state.products.notification.result}
   }
 }
export default connect(mapStateToProps,{getNotification})(Notify)