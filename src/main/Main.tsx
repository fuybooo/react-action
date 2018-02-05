import * as React from 'react';
import {Link} from 'react-router-dom';
import RouteWithSubRoutes from '../shared/RouteWithSubRoutes';

export default class Main extends React.Component<any, any> {

  render() {
    return (
      <div>
        <Link to={'/main/dashboard'}>dashboard</Link>
        <Link to={'/main/user/user'}>user</Link>
        <Link to={'/main/game'}>game</Link>
        {this.props.routes.map((route: any, i: number) => (
          <RouteWithSubRoutes key={i} {...route}/>
        ))}
      </div>
    );
  }
}