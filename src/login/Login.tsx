import * as React from 'react';
import LoginForm from './LoginForm';
import { Form, Row, Col } from 'antd';
import './login.scss';

export default class Login extends React.Component {

  render() {
    const WrappedLoginForm = Form.create()(LoginForm);
    return (
      <div className={'login-page'}>
        <Row>
          <Col
            xs={{span: 22, offset: 1}}
            sm={{span: 20, offset: 2}}
            md={{span: 16, offset: 4}}
            lg={{span: 12, offset: 6}}
            xl={{span: 8, offset: 8}}
            xxl={{span: 6, offset: 9}}
          >
            <div className={'login-box'}>
              <h1 className={'tac'}>XX管理系统登录界面</h1>
              <WrappedLoginForm/>
            </div>
          </Col>
          {/*<Button type={'primary'}>测试按钮</Button>*/}
          {/*<Link to={'/main/dashboard'}>Login</Link>*/}
        </Row>
      </div>
    );
  }
}