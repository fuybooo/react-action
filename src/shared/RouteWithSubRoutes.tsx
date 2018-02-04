import * as React from 'react';
import {Route} from 'react-router-dom';
export default class RouteWithSubRoutes extends React.Component<any, any> {
  render() {
    return (
      <Route exact={this.props.exact} path={this.props.path} render={props => (
        <this.props.component {...props} routes={this.props.routes}/>
      )}/>
    );
  }
}