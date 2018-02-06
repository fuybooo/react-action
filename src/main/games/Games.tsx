import * as React from 'react';
import {Link} from 'react-router-dom';
import RouteWithSubRoutes from '../../shared/RouteWithSubRoutes';

export default class Games extends React.Component<any, any> {

  render() {
    return (
      <div>
        <Link to={'/main/game/tic-tac-toe'}>Tic-Tac-Toe</Link>
        <Link to={'/main/game/tetris'}>Tetris</Link>
        {this.props.routes.map((route: any, i: number) => (
          <RouteWithSubRoutes key={i} {...route}/>
        ))}
      </div>
    );
  }
}