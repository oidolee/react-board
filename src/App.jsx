import './App.css'
import List from './components/List'
import store from './store/store'
import Container from '@mui/material/Container';
import Header from './components/Header'
import HeaderBg from './components/HeaderBg'
import CssBaseline from '@mui/material/CssBaseline';

import { Provider, useSelector, useDispatch, connect } from 'react-redux';
import './script/app';


function App() {
  const style = {
    minWidth:'800px'
    ,padding:0
  }
  const headerBgStyle = {
    position:'absolute'
    ,width:'100vw'
  }
  
  return (
    <>
    <HeaderBg></HeaderBg>
    <Container style={style}>
      <Header></Header>
      <CssBaseline />
      <Provider store={store}>
        <List></List>
      </Provider>
    </Container>
    </>
  )
}

export default App
