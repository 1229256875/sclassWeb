import React from 'react';
import {Form, Icon, Input, Button, Checkbox, message} from 'antd';
import {connect} from 'dva';
import styles from './index.less';

const error = (rst) => {
  if (rst.status !== 200 || rst.data.status !== 200) {
    if (rst.status !== 200) {
      message.error(rst.data);
    } else if (rst.data.status !== 200) {
      message.error(rst.data.msg);
    }
  }
};


@connect(() => ({}))
class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    const {dispatch} = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'login/login',
          payload: values,
        })
          .then((rst) => {
              error(rst);
            },
          );
      }
    });
  };

  usernameChange = () => {
    const code = this.props.form.getFieldValue('username');
    const {dispatch} = this.props;
    dispatch({
      type: 'login/verifyCode',
      payload: code,
    }).then(function (rst) {
      console.log(rst);
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: '请输入你的学号!',
              },
            ],
          })(
            <Input
              prefix={
                <Icon
                  type="user"
                  style={{
                    color: 'rgba(0,0,0,.25)',
                  }}
                />
              }
              placeholder="请输入学号"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '请输入你的密码!',
              },
            ],
          })(
            <Input
              // onClick={this.usernameChange}
              prefix={
                <Icon
                  type="lock"
                  style={{
                    color: 'rgba(0,0,0,.25)',
                  }}
                />
              }
              type="password"
              placeholder="请输入密码"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot" href="">
            忘记密码
          </a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({
  name: 'normal_login',
})(NormalLoginForm);
export default () => (
  <div className={styles.container}>
    <div id="components-form-demo-normal-login">
      <WrappedNormalLoginForm/>
    </div>
  </div>
);
