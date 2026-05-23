import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logOut } from "../../State/Auth/Action";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const isLoggedIn = Boolean(localStorage.getItem("JWT"));

  const [anchorEl, setAnchorEl] = useState(null);
  const [openProfile, setOpenProfile] = useState(false);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileOpen = () => setOpenProfile(true);
  const handleProfileClose = () => setOpenProfile(false);

  const handleLogout = () => {
    dispatch(logOut());
    handleProfileClose();
    navigate("/");
  };

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <Box sx={{ flexGrow: 1, position: "sticky", top: 0, zIndex: 100 }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          borderRadius: 0,
          background: "linear-gradient(135deg, rgba(79,70,229,0.96), rgba(6,182,212,0.9))",
          backdropFilter: "blur(18px)",
          borderBottom: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 18px 40px rgba(79, 70, 229, 0.18)",
        }}
      >
        <Toolbar
          sx={{
            minHeight: { xs: "68px !important", sm: "72px !important", md: "76px !important" },
            gap: { xs: 1, sm: 1.25, md: 1.5 },
            width: { xs: "100%", sm: "min(1280px, calc(100% - 1.5rem))", md: "min(1280px, calc(100% - 2rem))" },
            mx: "auto",
            px: { xs: 1.25, sm: 0 },
          }}
        >
          <IconButton
            size="medium"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
            sx={{
              mr: { xs: 0, sm: 0.5, md: 1 },
              border: "1px solid rgba(255,255,255,0.14)",
              backgroundColor: "rgba(255,255,255,0.08)",
              flexShrink: 0,
              width: { xs: 42, sm: 44 },
              height: { xs: 42, sm: 44 },
              "&:hover": { backgroundColor: "rgba(255,255,255,0.16)" },
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              minWidth: 0,
              display: "block",
            }}
          >
            <Link
              to="/"
              style={{
                color: "white",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                minWidth: 0,
              }}
            >
              <Box
                component="img"
                src="/logo.png"
                alt="APCLOTE"
                sx={{
                  width: { xs: 44, sm: 48, md: 52 },
                  height: { xs: 44, sm: 48, md: 52 },
                  borderRadius: { xs: 2, sm: 2.5 },
                  border: "1px solid rgba(255,255,255,0.3)",
                  objectFit: "cover",
                  flexShrink: 0,
                }}
              />
              <Box sx={{ minWidth: 0 }}>
                <Box
                  sx={{
                    fontFamily: '"Space Grotesk", sans-serif',
                    fontWeight: 700,
                    fontSize: { xs: "0.98rem", sm: "1.06rem", md: "1.1rem" },
                    letterSpacing: "0.05em",
                    lineHeight: 1.1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  APCLOTE
                </Box>
                <Box
                  sx={{
                    display: { xs: "none", md: "block" },
                    fontSize: "0.8rem",
                    opacity: 0.82,
                    lineHeight: 1.3,
                    whiteSpace: "nowrap",
                  }}
                >
                  Learn, teach, and grow in one place
                </Box>
              </Box>
            </Link>
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: { xs: 0.75, sm: 1, md: 1.25 },
              flexShrink: 0,
            }}
          >
            {isLoggedIn && (
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Button
                  component={Link}
                  to="/chat"
                  startIcon={<ChatBubbleOutlineIcon />}
                  sx={{
                    color: "white",
                    border: "1px solid rgba(255,255,255,0.35)",
                    borderRadius: "999px",
                    px: 1.7,
                    py: 0.9,
                    textTransform: "none",
                    fontWeight: 700,
                    backgroundColor: "rgba(255,255,255,0.1)",
                    whiteSpace: "nowrap",
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.18)" },
                  }}
                >
                  Chat
                </Button>
                <Button
                  component={Link}
                  to="/mentor"
                  startIcon={<PsychologyAltIcon />}
                  sx={{
                    color: "white",
                    border: "1px solid rgba(255,255,255,0.35)",
                    borderRadius: "999px",
                    px: 1.7,
                    py: 0.9,
                    textTransform: "none",
                    fontWeight: 700,
                    backgroundColor: "rgba(255,255,255,0.1)",
                    whiteSpace: "nowrap",
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.18)" },
                  }}
                >
                  AI Mentor
                </Button>
              </Box>
            )}

            {isLoggedIn ? (
              <Box
                sx={{
                  width: { xs: 42, sm: 46, md: 48 },
                  height: { xs: 42, sm: 46, md: 48 },
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#f0f9ff",
                  color: "#4338ca",
                  fontWeight: 800,
                  border: "1px solid rgba(255,255,255,0.5)",
                  boxShadow: "0 10px 24px rgba(15,23,42,0.18)",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
                onClick={handleProfileOpen}
                title="View Profile"
              >
                {auth?.user?.name?.[0]?.toUpperCase() || "U"}
              </Box>
            ) : (
              <Button
                component={Link}
                to="/login"
                sx={{
                  color: "#312e81",
                  backgroundColor: "white",
                  borderRadius: "999px",
                  px: { xs: 1.8, sm: 2.4 },
                  py: 0.9,
                  textTransform: "none",
                  fontWeight: 800,
                  whiteSpace: "nowrap",
                  boxShadow: "0 10px 24px rgba(15,23,42,0.14)",
                  "&:hover": { backgroundColor: "#eef2ff" },
                }}
              >
                Sign In
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        PaperProps={{
          sx: {
            mt: 1.5,
            borderRadius: 3,
            minWidth: { xs: 240, sm: 260 },
            border: "1px solid rgba(79,70,229,0.12)",
            boxShadow: "0 20px 60px rgba(26, 35, 33, 0.16)",
            overflow: "hidden",
          },
        }}
      >
        <MenuItem onClick={handleMenuClose} component={Link} to="/allBatchs">
          View Courses
        </MenuItem>

        {isLoggedIn && (
          <>
            <Divider sx={{ display: { md: "none" } }} />
            <MenuItem
              onClick={handleMenuClose}
              component={Link}
              to="/chat"
              sx={{ display: { md: "none" }, gap: 1.25 }}
            >
              <ChatBubbleOutlineIcon fontSize="small" />
              Chat
            </MenuItem>
            <MenuItem
              onClick={handleMenuClose}
              component={Link}
              to="/mentor"
              sx={{ display: { md: "none" }, gap: 1.25 }}
            >
              <PsychologyAltIcon fontSize="small" />
              AI Mentor
            </MenuItem>
          </>
        )}

        {auth?.user?.role === "ROLE_USER" && (
          <>
            <Divider />
            <MenuItem onClick={handleMenuClose} component={Link} to="/dashboard">
              Dashboard
            </MenuItem>
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

        {auth?.user?.role === "ROLE_ADMIN" && (
          <>
            <Divider />
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

        {auth?.user?.role === "ROLE_LECTURER" && (
          <>
            <Divider />
            <MenuItem onClick={handleMenuClose} component={Link} to="/lecturerBatchs">
              Assigned Batchs
            </MenuItem>
          </>
        )}
      </Menu>

      <Dialog
        open={openProfile}
        onClose={handleProfileClose}
        PaperProps={{
          sx: {
            borderRadius: 3,
            padding: 2,
            width: { xs: "calc(100vw - 32px)", sm: 350 },
            maxWidth: 350,
            border: "1px solid rgba(79,70,229,0.12)",
            boxShadow: "0 22px 60px rgba(24,34,32,0.16)",
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

        <DialogContent
          dividers
          sx={{
            display: "grid",
            gap: 1.3,
            background: "linear-gradient(180deg, rgba(248,250,255,0.92), rgba(238,242,255,0.84))",
          }}
        >
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
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{
              borderRadius: "999px",
              px: 3,
              py: 1.1,
              textTransform: "none",
              fontWeight: 700,
              background: "linear-gradient(135deg, #dc2626, #ef4444)",
            }}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NavBar;
