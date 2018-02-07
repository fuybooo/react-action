import * as React from 'react';
import { Button } from 'antd';
import {Link} from 'react-router-dom';
// import LoginForm from './LoginForm';

export default class Login extends React.Component {

  render() {
    // const WrappedLoginForm = Form.create()(LoginForm);
    return (
      <div>
        {/*<WrappedLoginForm/>*/}
        <Button type={'primary'}>测试按钮</Button>
        <Link to={'/main/dashboard'}>Login</Link>
      </div>
    );
  }
}