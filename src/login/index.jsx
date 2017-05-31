import React, { Component, PropTypes } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { connect } from 'dva'
import Style from './login.less';

const FormItem = Form.Item;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      userMsg: {}
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const params = {
          name: values.name,
          password: values.password,
          zhuce: (id, user) => {
            this.props.saveUser({ id, user });
            window.location.href = `/#/${id}/app/`;
          }
        }
        this.props.queryUser({ ...params });
        //this.props.saveUser({ id: '131341313431', user: '蛮王' })
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={Style.loginBox}>
        <div className={Style.backImg}>
          <div className={Style.authBox}>
            <p>用户登录</p>
            <div className={Style.inputBox}>
              <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'Please input your username!' }]
                  })(
                    <Input prefix={<Icon type="user" style={{ fontSize: 20 }} />} placeholder="Username" />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }]
                  })(
                    <Input prefix={<Icon type="lock" style={{ fontSize: 20 }} />} type="password" placeholder="Password" />
                  )}
                </FormItem>
                <FormItem style={{ textAlign: 'center' }}>
                  <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: 160 }}>
                    登录
                  </Button>
                </FormItem>
              </Form>
            </div>
          </div>
          <div className={Style.logobox}>
            <div className={Style.logo} />
            <p style={{ textAlign: 'center', marginTop: 20 }}>技术支持联系电话：0571-85081207 </p>
          </div>
        </div>
      </div>
    )
  }
}
function mapStateToProps(state, ownProps) {
  return {
    userMsg: state.login.userMsg,
    data: state.login.data.data
  }
}
function dispatchToProps(dispatch) {
  return {
    saveUser(payload, params) {
      dispatch({
        type: 'login/saveUser',
        payload
      })
    },
    queryUser(payload, params) {
      dispatch({
        type: 'login/queryUser',
        payload
      })
    }
  }
}
export default connect(mapStateToProps, dispatchToProps)(Form.create()(App));
