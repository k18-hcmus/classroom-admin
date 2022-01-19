import React, { useState } from 'react'
import {
  ListItemText,
  ListItemIcon,
  Box,
  Typography,
  Tooltip,
  ListItemButton,
  Divider,
  List,
  Drawer,
  Button,
  Avatar,
} from '@mui/material'
import {
  Class as ClassIcon,
  Menu as MenuIcon,
  Person as PersonIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
} from '@mui/icons-material'

import { useHistory } from 'react-router-dom'

const drawerWidthOpen = 290
const paddingIconButton = 10
const marginIconButton = 14
const iconFontSize = 20
const drawerWidthClose =
  (paddingIconButton + marginIconButton) * 2 + iconFontSize

export default function TemporaryDrawer() {
  const history = useHistory()
  const [open, setOpen] = useState(false)

  const itemClass = [
    {
      text: 'Classes',
      icon: <ClassIcon />,
      path: '/manage-classrooms',
    },
    {
      text: 'Admins',
      icon: <AdminPanelSettingsIcon />,
      path: '/manage-admins',
    },
    {
      text: 'Users',
      icon: <PersonIcon />,
      path: '/manage-users',
    },
  ]

  const toggleDrawer = () => {
    setOpen((prevState) => !prevState)
  }

  const drawerContent = (
    <Box
      sx={{
        position: 'static',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          height: '42px',
          width: 'auto',
          backgroundColor: 'transparent',
          margin: '12px 14px',
          padding: '12px 0px',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Button
          sx={{ display: open ? 'none' : { xs: 'none', sm: 'flex' } }}
          onClick={() => history.push('/')}
        >
          <Box
            sx={{
              flexShrink: 0,
              display: open ? 'none' : { xs: 'none', sm: 'initial' },
              marginBottom: '9px',
            }}
          >
            <Avatar src="/book-stack.png" sx="mr: 2px" />
          </Box>
          <Typography
            variant="h6"
            noWrap={true}
            gutterBottom
            sx={{
              display: open ? 'none' : { xs: 'none', sm: 'initial' },
              fontSize: '18px',
              fontWeight: 600,
              width: '154px',
              marginLeft: open ? '0px' : '8px',
              paddingBottom: '3px',
            }}
          >
            My Classroom
          </Typography>
        </Button>

        <Button
          onClick={toggleDrawer}
          sx={{
            minWidth: 'initial',
            padding: '10px',
            color: 'gray',
            borderRadius: '8px',
            backgroundColor: open ? 'transparent' : 'transparent',
            '&:hover': {
              backgroundColor: '#26284687',
            },
          }}
        >
          <MenuIcon
            sx={{ fontSize: '20px', color: open ? 'lightgray' : 'lightGray' }}
          ></MenuIcon>
        </Button>
      </Box>
      <Divider variant="middle" light={true} />

      <List dense={true}>
        {itemClass.map((key, index) => (
          <div key={index}>
            <Tooltip
              title={open ? key.text : ''}
              placement={'right'}
              componentsProps={{
                tooltip: {
                  sx: {
                    backgroundColor: 'gray',
                    color: 'white',
                    fontSize: '12px',
                    marginLeft: '22px !important',
                    boxShadow: '0px 0px 22px -2px rgba(0,0,0,0.20)',
                  },
                },
              }}
            >
              <ListItemButton
                sx={{
                  margin: '6px 14px',
                  padding: '10px',
                  borderRadius: '8px',
                  '&:hover': {
                    backgroundColor: '#26284687',
                  },
                }}
                onClick={() => history.push(`${key.path}`)}
              >
                <ListItemIcon sx={{ minWidth: '46px' }}>
                  {key.icon}
                </ListItemIcon>

                <ListItemText
                  primary={key.text}
                  primaryTypographyProps={{
                    variant: 'h6',
                  }}
                  sx={{
                    display: 'inline',
                    margin: '0px',
                    overflowX: 'hidden',
                    whiteSpace: 'nowrap',
                    minWidth: '126px',
                  }}
                />
              </ListItemButton>
            </Tooltip>
          </div>
        ))}
        <Divider variant="middle" light={true} />
      </List>
    </Box>
  )

  return (
    <div>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open
            ? { xs: '0px', sm: drawerWidthClose }
            : { xs: drawerWidthClose, sm: drawerWidthOpen },

          '& .MuiDrawer-paper': {
            overflowX: 'hidden',
            width: open
              ? { xs: '0px', sm: drawerWidthClose }
              : { xs: drawerWidthClose, sm: drawerWidthOpen },
            borderRight: '0px',
            borderRadius: '0px 16px 16px 0px',
            backgroundColor: '#FFF',
            boxShadow: '10px 0 5px -2px  rgb(0 0 0 / 20%)',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </div>
  )
}
