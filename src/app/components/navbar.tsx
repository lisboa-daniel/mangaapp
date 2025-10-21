'use client';
import * as React from 'react';

import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";
import { Logo } from "./logo";


import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Avatar, Container, Menu, MenuItem, Tooltip } from "@mui/material";
import TabLink from "./tabLink";

export function Navbar() {

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };


    const settings : Link[] = [
        {
            title: 'Logout',
            href: '/logout'
        }
    ]

    const links : Link[] = [
        {
            title: "List",
            href: "/list"
         
        },

        {
            title: "Profile",
            href: "/profile"
            
        },
        

    ];

    const active = usePathname();

    const router = useRouter();

    const navigateTo = (href : string) => {
        router.replace(href);
    }

    return (
        <div>
            <AppBar position="static"> 
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        
                        {/*  Mobile view */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', alignItems: 'center' } }}>
                            <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                            >
                            <MenuIcon  className='m-2'/>

                            </IconButton>

                            <a title="home" href="/" aria-label="home"><Logo className="mr-2"/></a>

                            
                            <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            
                            sx={{ display: { xs: 'block', md: 'none' } }}
                            >
                            {links.map((value, index) => (
                                <MenuItem key={index} onClick={() => {handleCloseNavMenu(); navigateTo(value.href); }} sx={{width: '400px'}}>
                                <Typography className='text-2xl' sx={{ textAlign: 'center', fontSize: '18px' }}>{value.title}</Typography>
                                </MenuItem>
                            ))}
                            </Menu>
                        </Box>

                        {/*  Desktop view */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', alignItems: 'center' } }}>
                      
                            
                            <a title="home" href="/" aria-label="home"><Logo className="mr-2"/></a>           
                            {links.map((value, index) => (

                            <span className="m-2" key={index}>
                                <Button
                                    
                                    onClick={() => navigateTo(value.href)}

                                    sx={{ my: 2, display: 'block', fontSize: '16px', color: "#eeeeee", margin:"0px" }}
                                >
                                    {value.title}
                                </Button>

                                <div className={`bg-foreground ${(active==value.href) ? 'w-full' : 'w-[0px]'} h-[4px] transition-all`}/>
                            </span>
                            ))} 
                            
                        
                        </Box>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                            </Tooltip>
                            <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                            >
                            {settings.map((value, index) => (
                                <MenuItem key={index} onClick={handleCloseUserMenu}>
                                <Typography sx={{ textAlign: 'center' }}>{value.title}</Typography>
                                </MenuItem>
                            ))}
                            </Menu>
                        </Box>
                        </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
       

}