import { useContext } from "react";
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import { AuthContext } from "./context/authContext/authContext";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import ListList from "./pages/listList/ListList";
import Login from "./pages/login/Login";
import NewList from "./pages/newList/NewList";
import NewMovie from "./pages/newMovie/NewMovie";
import NewUser from "./pages/newUser/NewUser";
import Movie from "./pages/movie/Movie";
import MovieList from "./pages/movieList/MovieList";
import User from "./pages/user/User";
import UserList from "./pages/userList/UserList";
function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Switch>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        {user && (
          <>
            <Topbar />
            <div className="container">
              <Sidebar />
              <Route exact path="/">
                <Home />
              </Route>

              {/* Phần người dùng */}
              <Route path="/users">
                <UserList />
              </Route>
              <Route path="/user/:id">
                <User />
              </Route>
              <Route path="/newUser">
                <NewUser />
              </Route>

              {/* phần PHIM */}
              <Route path="/movies">
                <MovieList />
              </Route>
              <Route path="/movie/:id">
                <Movie />
              </Route>
              <Route path="/newmovie">
                <NewMovie />
              </Route>

              {/* DANH SÁCH */}
              <Route path="/lists" exact>
                <ListList />
              </Route>
              <Route path="/lists/:id">
                <List />
              </Route>
              <Route path="/newList">
                <NewList />
              </Route>
            </div>
          </>
        )}
        <Route>{!user && <Redirect to="/login" />} </Route>
      </Switch>
    </Router>
  );
}

export default App;
