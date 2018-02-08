import * as React from 'react';
import RouteWithSubRoutes from '../../shared/RouteWithSubRoutes';

export default class Games extends React.Component<any, any> {

  render() {
    return (
      <div>
        {this.props.routes.map((route: any, i: number) => (
          <RouteWithSubRoutes key={i} {...route}/>
        ))}
      </div>
    );
  }
}