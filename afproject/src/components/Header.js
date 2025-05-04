import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery,
  Tooltip
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Brightness4,
  Brightness7,
  AccountCircle,
  Public
} from '@mui/icons-material';

const pages = ['Home', 'Discover', 'Compare', 'Statistics'];

function Header({ toggleDarkMode, isDarkMode }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen((prev) => !prev);
  };

  const navItems = (
    <>
      {pages.map((page) => (
        <Button
          key={page}
          href={`/${page.toLowerCase()}`}
          color="inherit"
          sx={{ textTransform: 'none', mx: 1 }}
        >
          {page}
        </Button>
      ))}
    </>
  );

  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: 'linear-gradient(135deg, #0f172a, #1e3a8a, #9333ea)',
          color: '#f1f5f9',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Star background layer */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 0,
            backgroundImage:
              'radial-gradient(white 1px, transparent 1px), radial-gradient(white 1px, transparent 1px)',
            backgroundSize: '30px 30px',
            backgroundPosition: '0 0, 15px 15px',
            opacity: 0.05,
            animation: 'moveStars 60s linear infinite',
            '@keyframes moveStars': {
              from: { backgroundPosition: '0 0, 15px 15px' },
              to: { backgroundPosition: '1000px 1000px, 1015px 1015px' },
            },
          }}
        />

        <Toolbar sx={{ position: 'relative', zIndex: 1 }}>
          {/* Logo */}
          <Public sx={{ fontSize: 30, color: '#22d3ee', mr: 1 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
            World<span style={{ color: '#f472b6' }}>Explorer</span>
          </Typography>

          {/* Desktop Navigation */}
          {!isMobile && navItems}

          {/* Icons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title="Notifications">
              <IconButton color="inherit">
                <NotificationsIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Toggle light/dark mode">
              <IconButton onClick={toggleDarkMode} color="inherit">
                {isDarkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Profile">
              <IconButton color="inherit">
                <AccountCircle />
              </IconButton>
            </Tooltip>
            {isMobile && (
              <IconButton edge="end" color="inherit" onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
        <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
          <List>
            {pages.map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton component="a" href={`/${text.toLowerCase()}`}>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default Header;
