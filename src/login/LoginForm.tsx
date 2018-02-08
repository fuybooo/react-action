import * as React from 'react';
import { Form, Icon, Input, Checkbox, Button } from 'antd';
interface LoginFormProps {
  form: any;
  history?: any;
  onClickSubmit: Function;
}
export default class LoginForm extends React.Component<LoginFormProps, any> {

  handleSubmit(e: any) {
    e.preventDefault();
    // this.props.form.validateFields((err: any, values: any) => {
    //   if (!err) {
    //     console.log(`Received values from form `, values);
    //   }
    // });
    // 测试环境不验证,直接跳转路由
    this.props.history.push('/main/dashboard');
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.props.onClickSubmit.bind(this)} className={'login-form'}>
        <Form.Item>
          {
            getFieldDecorator('userName', {
              rules: [{
                required: true,
                message: 'Please input you username!'
              }]
            })(
              <Input prefix={<Icon type={'user'} className={'input-icon'}/>} placeholder={'Username'}/>
            )
          }
        </Form.Item>
        <Form.Item>
          {
            getFieldDecorator('password', {
              rules: [{
                required: true,
                message: 'Please input you password!'
              }]
            })(
              <Input prefix={<Icon type={'lock'} className={'input-icon'}/>} type={'password'} placeholder={'Password'}/>
            )
          }
        </Form.Item>
        <Form.Item>
          {
            getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true
            })(
              <Checkbox>Remember me</Checkbox>
            )
          }
          <a className={'fr'}>Forgot password</a>
          <Button type={'primary'} htmlType={'submit'} className={'w'}>Log in</Button>
        </Form.Item>
      </Form>
    );
  }
}