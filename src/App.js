import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Chat from './components/Chat'
import Login from './components/Login';
import Header from './components/Header';
import styled from 'styled-components'
import Sidebar from './components/Sidebar'
import React, {useEffect,useState} from 'react'
import db from './firebase'
import {auth, provider} from './firebase'



function App() {
  const [rooms,setRooms] = useState([])
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))// initialize user


  // function to get the rooms
  const getChannels = () =>{
      db.collection('rooms').onSnapshot((snapshot) => {
          setRooms(snapshot.docs.map((doc) => {
              return {id:doc.id,name:doc.data().name};
          }))
      })
  }


  const signOut = () =>{
    auth.signOut().then(() => {
      setUser(null);// remove from state
      localStorage.removeItem('user') //remove from localStorage
    })


  }
  useEffect(() => {
      getChannels()
  },[]);
console.log("user in app" , user)
  
  return (
    <div className="App">
      
      
        <Router>
            {
              !user ? 
              <Login setUser = {setUser}/>
              :
            <Container>
                
                <Header signOut= {signOut} user={user}/>        
                <Main>
                  <Sidebar rooms={rooms}/>
                  <Switch>
                    <Route path='/room/:channelId'>
                        <Chat/>
                    </Route>
                    <Route path='/'>
                      Select or Create a Channel
                    </Route>
                  </Switch>
                </Main>
            </Container>
           }
        </Router>
        
    </div>
  );
}

export default App;

const Container = styled.div`
  width:100%;
  height:100vh;
  display:grid;
  grid-template-rows: 38px auto;
`

const Main = styled.div`
 background : white;
 display:grid;
 grid-template-columns:260px auto
`
