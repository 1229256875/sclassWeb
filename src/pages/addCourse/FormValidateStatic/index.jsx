import React from 'react';
import {Form, Input, DatePicker, Cascader, Button, message, Select,  Col} from 'antd';
import styles from './index.less';
import {connect} from 'dva';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 5,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 12,
    },
  },
};

const AddCourse = (props) => {
  const {getFieldValue} = props.form;
  const {getFieldDecorator} = props.form;

  const submit = (e) => {
    e.preventDefault();
    const {dispatch} = props;
    props.form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'course/addCourse',
          payload: values,
        }).then((rst) => {
          if (rst.status === 200) {
            if (rst.data.status === 200) {
              message.success('添加课程成功,留意审批结果');
            } else {
              message.error(rst.data.msg);
            }
          } else {
            message.error(rst.data)
          }
        });
      }
    });
  }

  const options = [
    {
      code: '2016',
      name: '2016',
    },
    {
      code: '2017',
      name: '2017',
    },
    {
      code: '2018',
      name: '2018',
    },
    {
      code: '2019',
      name: '2019',
    },
    {
      code: '2020',
      name: '2020',
    }
  ];

  return (
    <div className={styles.container}>
      <Form onSubmit={submit} {...formItemLayout}
      >
        <Form.Item
          //名称
          label="课程名称"
          //input框状态
          validateStatus=''
          //input内部 状态
          hasFeedback={false}
          //input下部分提示
          help=''
        >
          {getFieldDecorator('courseName')(
            <Input placeholder="请输入授课课程名称"/>
          )}
        </Form.Item>

        <Form.Item
          label="授课人数"
        >
          {getFieldDecorator('count')(
            <Input placeholder="请输入授课人数" id="count"/>
          )}
        </Form.Item>

        <Form.Item
          label="授课学年"
        >
          {getFieldDecorator('courseYear')(
            <Select defaultValue="2020" style={{width: 120}}>
              <Option value="2019">2019</Option>
              <Option value="2018">2018</Option>
              <Option value="2017">2017</Option>
              <Option value="2016">2016</Option>
            </Select>
          )}
        </Form.Item>

       <Col span={5} style={{ textAlign: 'right' }}>
          <Button htmlType="submit" className="login-form-button">
            添加
          </Button>
       </Col>
      </Form>
    </div>)
}

const courseFrom = Form.create()(AddCourse);

export default connect()(courseFrom)
