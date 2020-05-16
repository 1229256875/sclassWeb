import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Spin, Table, Button, Modal, Form, Input } from 'antd';
import styles from './index.less';
import Tablee from './Tablee'
import { connect } from 'dva';
import moment from "moment";




const Edit = () => {

}

const TimeTable = (props) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  //对话框 
  const [visible, setVisible] = useState(false);
  //对话框 loding
  const [confirmLoading, setConfirmLoading] = useState(false);

  //对话框 form 表单 数据
  const [modData, setModData] = useState({})

  const { dispatch, form } = props;

  
  const layout = {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 12
    }
  };

  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 12
    }
  };

  const columns = [
    {
      title: '年份',
      dataIndex: 'timeName'
    },
    {
      title: '开始选课时间',
      dataIndex: 'startTime',
      render: data => {
        return <span defaultValue={moment(parseInt(data))} />;
      }
    },
    {
      title: '结束选课时间',
      dataIndex: 'endTime',
      render: data => {
        return <span defaultValue={moment(parseInt(data))} />;
      }
    },
    {
      title: '开课时间',
      dataIndex: 'startClassTime',
      render: data => {
        return <span defaultValue={moment(parseInt(data))} />;
      }
    },
    {
      title: '操作',
      dataIndex: 'sad',
      render: (text, record) => {

        return <Button onClick={() => { buttonOnClick(record) }}>修改</Button>
      }
    }
  ]

  const buttonOnClick = (data) =>{
    setModData(data)
    setVisible(true)

    console.log('no', modData)
    
    console.log('a', data)
  }

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'time/getTime',
      }).then((rst) => {
        setData(rst.data.data)
      })
    }
  }, [])



  const handleCancel = () => {
    setVisible(false)

  }

  const onFinish = (value) => {
    value.preventDefault();

    props.form.validateFields((err, values) => {
      console.log('va', values)

    })
  }

  // useEffect(() =>{
  //   form.resetFields();
  // }, [modData])


  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const {getFieldDecorator} = form;
  return (
    <PageHeaderWrapper content="这是一个新页面，从这里进行开发！" className={styles.main}>
      <div
        style={{
          paddingTop: 10,
          textAlign: 'center',
        }}
      >
        {/* <Tablee /> */}

        <Table columns={columns}
          rowKey={'id'}
          dataSource={data}
        />
        <Spin spinning={loading} size="large"></Spin>
        <Modal
          title="修改时间"
          visible={visible}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          footer = {null}
        >
          <Form
            form={form}
            {...layout}
            name="basic"
            initialValues={{modData}}
            onSubmit={onFinish}
            style={{
              width: 500
            }}
          >
            <Form.Item
              label="年份: "
              name="timeName"
              rules={[
                {
                  required: true,
                  message: "请输入课题名称!"
                }
              ]}
              size={300}
            >
              {getFieldDecorator('timeName')(
            <Input placeholder="请输入授课课程名称"/>
          )}
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="修改">
                提交
            </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageHeaderWrapper>
  );
};

const Fore = Form.create()(TimeTable)

export default connect()(Fore)
