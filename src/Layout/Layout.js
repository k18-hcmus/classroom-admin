import Drawer from './Drawer/Drawer'
import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { CssBaseline, Box } from '@mui/material'
import Header from './Header/Header'

const theme = createTheme()
const Layout = ({ children }) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Box sx={{ display: 'flex' }}>
          <Drawer />
          <Box
            component="main"
            sx={{
              padding: '8px',
              margin: '6px 14px',
              flexGrow: 1,
            }}
          >
            {children}
          </Box>
        </Box>
      </ThemeProvider>
    </>
  )
}

export default Layout
