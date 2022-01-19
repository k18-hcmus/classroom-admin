import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, Box, Avatar, Button } from '@mui/material'
import styled from '@emotion/styled'
import { useHistory } from 'react-router-dom'
import AccountPopover from './AccountPopover'
const HeaderWrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
})
const HeaderWrapperRight = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})
const MyAppBar = styled(AppBar)({
  backgroundColor: '#ffffff',
  color: 'black',
})

const Header = ({ children }) => {
  return (
    <Box sx={{ flexGrow: 1, mb: 7 }}>
      <MyAppBar position="static">
        <Toolbar
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <HeaderWrapperRight>
            <AccountPopover />
          </HeaderWrapperRight>
        </Toolbar>
      </MyAppBar>
    </Box>
  )
}

export default Header
