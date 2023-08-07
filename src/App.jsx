import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import List from './components/List'
import Form from './components/Form'
import store from './store/store'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';

import { Provider, useSelector, useDispatch, connect } from 'react-redux';
import './script/app';


function App() {

  return (
    <>
    <Container maxWidth="lg">
      <Provider store={store}>
        <div className="header">
          <h2>리액트 게시판</h2>
        </div>
        <List></List>
      </Provider>
    </Container>
    </>
  )
}

export default App
