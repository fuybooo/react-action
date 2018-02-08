import * as React from 'react';
import LoginForm from './LoginForm';
import { Form, Row, Col } from 'antd';
import './login.scss';
export interface LoginProps {
  history: any;
}
export default class Login extends React.Component<LoginProps, any> {
  constructor(props: LoginProps) {
    super(props);
  }
  submitLoginForm(e: any) {
    e.preventDefault();
    this.props.history.push('/main/dashboard');
  }
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
              <WrappedLoginForm onClickSubmit={this.submitLoginForm.bind(this)}/>
            </div>
          </Col>
          {/*<Button type={'primary'}>测试按钮</Button>*/}
          {/*<Link to={'/main/dashboard'}>Login</Link>*/}
        </Row>
        <p className={'tac mt20'}>Design @2018</p>
      </div>
    );
  }
}