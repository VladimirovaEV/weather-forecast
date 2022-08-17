import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import MainComponent from "../layout/mainComponent";
import NavBar from "../components/navBar";
import Login from "../layout/login";
import SelectedPage from "../layout/selectedPage";
import AuthProvider from "../hooks/useAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "../components/protectedRoute";
import Logout from "../layout/logOut";
import FavoriteProvider from "../hooks/useFavorite";

function App() {
    return (
        <>
            <AuthProvider>
                <FavoriteProvider>
                    <NavBar />
                    <Switch>
                        <ProtectedRoute path="/selectedPage" component={SelectedPage}/>
                        <Route path="/login/:type?" component={Login}/>
                        <Route path="/logout" component={Logout}/>
                        <Route path="/" exact component={MainComponent}/>
                        <Redirect to="/" />
                    </Switch>
                </FavoriteProvider>
            </AuthProvider>
            <ToastContainer />
        </>
    );
}
export default App;
