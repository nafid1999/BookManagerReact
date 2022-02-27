import './App.css';
import NavigationBar from './components/NavigationBar';
import Welcome from './components/Welcome';
import Footer from './components/Footer';
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from "./components/User/Login"
import Register from "./components/User/Register"
import { Container } from 'react-bootstrap';
import axios from "axios"
import {Provider} from "react-redux"
import {store} from "./services/store"
import UserList from './components/User/UserList';
import User from './components/User/User';


axios.defaults.baseURL = "http://localhost:8081/"
axios.defaults.headers.post['Accept'] = "application/json"
axios.defaults.headers.post['Content-Type'] = "application/json"

function App() {

  return (
    <Provider store={store}>
      <div className="">
            <Router>
              <NavigationBar />
              <Container>
                  <Switch>
                      <Route path="/"  exact component={Welcome} />
                      <Route path="/add-user" component={User} />
                      <Route path="/edit-user/:id" component={User} />
                      <Route path="/user-list" component={UserList} />
                      <Route path="/login" component={Login} />
                      <Route path="/register" component={Register} />
                  </Switch>
                </Container>
            </Router>
        <Footer />

      </div>
    </Provider>
  );
}

export default App;
