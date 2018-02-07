import * as React from 'react';
import { Form, Icon, Input } from 'antd';
// const FormItem = Form.Item;
interface LoginFormProps {
  form: any;
}
export default class LoginForm extends React.Component<LoginFormProps, any> {

  handleSubmit(e: any) {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        console.log(`Received values from form ${values}`);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className={'login-form'}>
        <Form.Item>
          {
            getFieldDecorator('userName', {
              rules: [{
                required: true,
                message: 'Please input you username!'
              }]
            })(
              <Input prefix={<Icon type={'user'} style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder={'Username'}/>
            )
          }
        </Form.Item>
      </Form>
    );
  }
}