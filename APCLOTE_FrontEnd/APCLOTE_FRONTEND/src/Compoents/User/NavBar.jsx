import React, { useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, logOut } from '../../State/Auth/Action';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { toast } from 'react-toastify';
import store from '../../Store/store';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from "@mui/icons-material/Close";
import Button from '@mui/material/Button';
import LogoutIcon from "@mui/icons-material/Logout";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const { auth } = useSelector(store => store);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [openProfile, setOpenProfile] = useState(false);
 

 

  // handle open/close of menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

   const handleProfileOpen = () => setOpenProfile(true);
  const handleProfileClose = () => setOpenProfile(false);

  const handleLogout = () => {
    dispatch(logOut())
    navigate("/")
  };
  useEffect(() => {
  dispatch(getUser())
  }, [dispatch])

  return (
    <Box sx={{ flexGrow: 1 ,position:"sticky",top:0,zIndex:100}}>
      <AppBar position="static" color="primary" >
        <Toolbar>
          {/* Menu Icon */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          {/* App Name */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'block', sm: 'block' } }}
          >
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
              <img src="/logo.png" alt="" className='w-[3rem] h-[3rem] rounded-full'/>
            </Link>
          </Typography>

          {/* Auth Button / User */}
          {localStorage.getItem("JWT")? (
            <div className="rounded-full p-3 bg-white text-blue-600 font-bold"
            onClick={handleProfileOpen}
            title='View Profile'
            >
              {auth?.user?.name[0]}
            </div>
          ) : (
            <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>
              Sign In
            </Link>
          )}
        </Toolbar>
      </AppBar>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
         <MenuItem onClick={handleMenuClose} component={Link} to="/allBatchs">
          View Courses
        </MenuItem>
        {auth?.user?.role=="ROLE_USER"&&(
          <>
           
        <Divider />
        <MenuItem onClick={handleMenuClose} component={Link} to="/myBatchs">
          Enrolled Courses
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose} component={Link} to="/myPOs">
          Purchase Orders
        </MenuItem>
          </>
        )}
        
        {console.log(auth?.user)}
        {auth?.user?.role=="ROLE_ADMIN"&&(
          <>
          
          <MenuItem onClick={handleMenuClose} component={Link} to="/addSubject">
            Add New Subject
        </MenuItem>
        <MenuItem onClick={handleMenuClose} component={Link} to="/createCourse">
         Create New Course
        </MenuItem>
        <MenuItem onClick={handleMenuClose} component={Link} to="/createBatch">
          Create New Batch
        </MenuItem>
        <MenuItem onClick={handleMenuClose} component={Link} to="/createLecturer">
         Create Lecturer
        </MenuItem>
        
        <MenuItem onClick={handleMenuClose} component={Link} to="/assign">
         Assign Lecturers To Batch
        </MenuItem>
        <MenuItem onClick={handleMenuClose} component={Link} to="/allLecturers">
            Lecturers
        </MenuItem>
        <MenuItem onClick={handleMenuClose} component={Link} to="/allStudents">
            Students
        </MenuItem>
        
          </>
        )}
        {auth?.user?.role=="ROLE_LECTURER"&&(
          <>
            <MenuItem onClick={handleMenuClose} component={Link} to="/lecturerBatchs">
          Assigned Batchs
        </MenuItem>
          </>
        )}

      </Menu>


      {/* User Details Dialog */}
      <Dialog
        open={openProfile}
        onClose={handleProfileClose}
        PaperProps={{
          sx: {
            borderRadius: 3,
            padding: 2,
            width: 350,
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontWeight: "bold",
          }}
        >
          User Details
          <IconButton onClick={handleProfileClose} color="error">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Typography variant="subtitle1">
            <strong>Name:</strong> {auth?.user?.name || "N/A"}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Email:</strong> {auth?.user?.email || "N/A"}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Address:</strong> {auth?.user?.address || "Not provided"}
          </Typography>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>




    </Box>
  );
};

export default NavBar;
