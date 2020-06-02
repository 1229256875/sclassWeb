import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  message,
  AutoComplete,
  Modal,
} from 'antd';
import styles from './index.less';
import { connect } from 'dva'

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const RegistrationForm = (props) => {

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const [confirmDirty, setConfirmDirty] = useState(false);
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const { dispatch } = props;
  const [formData, setFormData] = useState()
  const [visible, setVisible] = useState(false)

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      const value = {
        ...values,
        id: formData.id,
        type: formData.type,
      }
      if (!err) {
        console.log('Received values of form: ', values);
        dispatch({
          type: 'login/updateMeInfo',
          payload: value
        }).then(rst => {
          if (rst && rst.status === 200) {
            message.success('修改成功')
          } else {
            message.error(rst && rst.msg)
          }
        })
      }
    });
  };

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    if (dispatch) {
      dispatch({
        type: 'login/getUser'
      }).then(rst => {
        setFormData(rst)
      })
    }
  }
  const showModal = () => {
    setVisible(true)
  };

  const handleOk = e => {
    console.log(e);

  };

  const handleCancel = e => {
    setVisible(false)
  };



  const { getFieldDecorator } = props.form;

  const changePwd = e =>{
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      console.log(values)
    if (values.newPwd === values.newPwd1){

      if (values.newPwd.length < 6 ){
        message.error("密码长度为 6 ～ 16");
        return ;
      }
      
      dispatch({
        type: 'login/updatePwd',
        payload: values
      }).then(rst =>{
        if (rst && rst.status === 200){
          message.success('修改密码成功')
          handleCancel()
          
        }else{
          message.error(rst && rst.msg)
        }
      })
    }else{
      message.error('新密码两次输入不一致')
    }
    })
  }


  return <div>
    <Row>
      <Col span={2}></Col>
      <Col span={12}>
        <Button onClick={showModal}>修改密码</Button>
      </Col>
    </Row>

    <Form
      layout={'inline'} onSubmit={handleSubmit}>
      <Row style={{
        marginTop: 20
      }}>
        <Col span={4}></Col>
        <Col span={6} >
          <Form.Item label="账号">
            {getFieldDecorator('code', {
              initialValue: formData && formData.code,
              rules: [
                {
                  required: true,
                  message: '请输入',
                },
              ],
            })
              (<Input
                disabled={true}
                style={{
                  width: '100%',
                }} />)}
          </Form.Item>
        </Col>
      </Row>

      <Row style={{
        marginTop: 20
      }}>
        <Col span={4}></Col>
        <Col span={6}>
          <Form.Item label="姓名">
            {getFieldDecorator('name', {
              initialValue: formData && formData.name,
              rules: [
                {
                  required: true,
                  message: '请输入姓名',
                },
              ],
            })(<Input />)}
          </Form.Item>
        </Col>
      </Row>
      <Row style={{
        marginTop: 20
      }}>
        <Col span={4}></Col>
        <Col span={6}>
          <Form.Item label={'邮箱'} >
            {getFieldDecorator('emil', {
              initialValue: formData && formData.emil,
              rules: [
                {
                  required: true,
                  message: '请输入邮箱!',
                },
              ],
            })(<Input />)}
          </Form.Item>
        </Col>
      </Row>

      <Row style={{
        marginTop: 20
      }}>
        <Col span={4}></Col>
        <Col span={6}>
          <Form.Item label="电话" >
            {getFieldDecorator('phone', {
              initialValue: formData && formData.phone,
              rules: [
                {
                  required: true,
                  message: '请输入电话!',
                },
              ],
            })(<Input />)}
          </Form.Item>
        </Col>
      </Row>

      <Row style={{
        marginTop: 20
      }}>
        <Col span={4}></Col>
        <Col span={6}>
          <Form.Item label="班级" >
            {getFieldDecorator('className', {
              initialValue: formData && formData.className,
              rules: [
                {
                  required: false,
                  message: '请输入电话!',
                },
              ],
            })(<Input disabled={true} />)}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={5}></Col>
        <Col span={6}>
          <Form.Item style={{
            marginTop: 20
          }}>
            <Button type="primary" htmlType="submit">
              修改
        </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
    <Modal
      title="Basic Modal"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        onSubmit={changePwd}
        {...layout}
      >

        <Form.Item label="旧密码" >
          {getFieldDecorator('oldPwd', {
            
          })(<Input.Password placeholder="请输入旧密码" />)}
        </Form.Item>

        <Form.Item label="新密码" >
          {getFieldDecorator('newPwd', {
            
          })(<Input.Password placeholder="请输入新密码" />)}
        </Form.Item>

        <Form.Item label="新密码" >
          {getFieldDecorator('newPwd1', {
            
          })(<Input.Password placeholder="请再次输入新密码！" />)}
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit"
          > 修改密码</Button>
        </Form.Item>
      </Form>
    </Modal>
  </div>
}


const WrappedRegistrationForm = Form.create({
  name: 'personManage',
})(RegistrationForm);

const asd = () => {
  return <div className={styles.container}>
    <div id="components-form-demo-register">
      <WrappedRegistrationForm />
    </div>
  </div>
}

export default connect()(WrappedRegistrationForm)
