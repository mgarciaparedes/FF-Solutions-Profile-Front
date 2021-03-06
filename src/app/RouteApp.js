import React from "react";
// import "../assets/scss/custom.scss";
import { Switch, Route, Redirect } from "react-router-dom";
import { withRouter } from "react-router";

//Aquí importamos módulo que permite guardar las variables de sesión en la aplicación
import AppProvider from "../components/AppContext";

/*Views*/
import { Login } from "./views/Login/index";
import { CreateProfile } from "./views/CreateProfile/index";
import { Error404 } from "./views/Error404";
// import { Dashboard } from "./views/Dashboard/index";
// import { Help } from "./views/Help";
// import { AdvancedTools } from "./views/AdvancedTools/index";
// import { EditProfile } from "./views/EditProfile/index";
// import { ForgotPassword } from "./views/ForgotPassword/index";
// import { UserName } from "./views/UserName/index";
// import { ActivateLinkedProfile } from "./views/ActivateLinkedProfile";


/*Componente para el manejo de rutas de la app*/
const RouteApp = () => {
  return (
    <>
      <AppProvider>
        <Switch>
          <Route exact path="/login" component={() => <Login />} />
          <Route
            exact
            path="/create-profile"
            component={() => <CreateProfile />}
          />
          {/* <Route exact path="/edit-profile" component={() => <EditProfile />} />
          <Route
            exact
            path="/forgot-password"
            component={() => <ForgotPassword />}
          />
          <Route exact path="/advanced-tools" component={() => <AdvancedTools />} />
          <Route exact path="/dashboard" component={() => <Dashboard />} />
          <Route exact path="/help" component={() => <Help />} /> */}

          {/*Con esto obtenemos el user del stdcompany/username y redireccionamos al login porque es una "/"" sola*/}
          
          {/* <Route
            exact
            path="/:params"
            component={(params) => <UserName {...params} />}
          />
          <Route
            exact
            path="/activateLinkedProfile/:params"
            component={(params) => <ActivateLinkedProfile {...params} />}
          /> */}
          <Route exact path="/" render={() => <Redirect to="/login" />} />
          <Route path="*" component={() => <Error404 />} />
        </Switch>
      </AppProvider>
    </>
  );
};
export default withRouter(RouteApp);