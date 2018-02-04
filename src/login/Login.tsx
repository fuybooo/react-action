import * as React from 'react';
import {Link} from 'react-router-dom';

export default class Login extends React.Component {

  render() {
    return (
      <div>
        <Link to={'/main'}>Login</Link>
      </div>
    );
  }
}