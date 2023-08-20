import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const defaultTheme = createTheme();

export default function HeaderBg() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          position:'absolute',
          width:'100vw',
          zIndex:'-1',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '20vh',
          backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        }}
      >
        <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm" >
          <Typography variant="h3" component="h2" gutterBottom style={{textAlign:'center', fontWeight:'600'}}>
            리액트 게시판
          </Typography>
        </Container>
   
      </Box>
    </ThemeProvider>
  );
}