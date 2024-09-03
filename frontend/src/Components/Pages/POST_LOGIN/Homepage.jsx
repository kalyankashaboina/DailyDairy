import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Container, Button, Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const HomePage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f5f5f5' }}>
      {/* Header with Menu Button */}
      <AppBar position="static" sx={{ backgroundColor: '#6a11cb' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Daily Diary App
          </Typography>
          <Button color="inherit">Login</Button>
          <Button color="inherit">Sign Up</Button>
        </Toolbar>
      </AppBar>

      {/* Sidebar (Drawer) */}
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          <List>
            {['Home', 'My Entries', 'Profile', 'Settings'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Container
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          paddingY: 4,
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#6a11cb' }}
        >
          Welcome to Daily Diary!
        </Typography>
        <Typography
          variant="h5"
          sx={{ mb: 4, color: '#333' }}
        >
          Keep track of your daily thoughts and memories in one place.
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: '#6a11cb',
            '&:hover': {
              backgroundColor: '#1a5bb5',
            },
          }}
        >
          Get Started
        </Button>
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          backgroundColor: '#6a11cb',
          color: '#fff',
          py: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="body2">
          © 2024 Daily Diary App. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default HomePage;
