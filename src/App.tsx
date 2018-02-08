import * as React from 'react';
import './App.scss';
import RouteWithSubRoutes from './shared/RouteWithSubRoutes';
import {BrowserRouter as Router} from 'react-router-dom';
import {Switch} from 'react-router';
import routes from './routes';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route}/>
          ))}
        </Switch>
      </Router>
    );
  }
}

export default App;
