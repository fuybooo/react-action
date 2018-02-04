import * as React from 'react';
import './App.scss';
import Login from './login/Login';
import Main from './main/Main';
import RouteWithSubRoutes from './shared/RouteWithSubRoutes';
import Dashboard from './main/dashboard/Dashboard';
import User from './main/user/User';
import UserUser from './main/user/user-user/UserUser';
import UserDept from './main/user/user-dept/UserDept';
import {BrowserRouter as Router} from 'react-router-dom';

const routes = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/main',
    component: Main,
    routes: [
      {
        path: '/main/dashboard',
        component: Dashboard,
        exact: true
      },
      {
        path: '/main/user',
        component: User,
        routes: [
          {
            path: '/main/user/user',
            component: UserUser,
            exact: true
          },
          {
            path: '/main/user/dept',
            component: UserDept
          }
        ]
      }
    ]
  }
];

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route}/>
          ))}
        </div>
      </Router>
    );
  }
}

export default App;
