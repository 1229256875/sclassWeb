import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Spin, Table, Button, Modal, Form, Input, DatePicker, message } from 'antd';
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
  const [modData, setModData] = useState({});

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
        if (data || data.length > 0) {
          let times = moment(parseInt(data)).format("YYYY-MM-DD HH:mm:ss");
          return <span> {times} </span>;
        }
        return <span>未知</span>

      }
    },
    {
      title: '结束选课时间',
      dataIndex: 'endTime',
      render: data => {
        if (data || data.length > 0) {
          let times = moment(parseInt(data)).format("YYYY-MM-DD HH:mm:ss");
          return <span> {times} </span>;
        }
        return <span>未知</span>
      }
    },
    {
      title: '开课时间',
      dataIndex: 'startClassTime',
      render: data => {
        if (data || data.length > 0) {
          let times = moment(parseInt(data)).format("YYYY-MM-DD");
          return <span> {times} </span>;
        }
        return <span>未知</span>
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

  const buttonOnClick = (data) => {
    setModData(data)
    setVisible(true)


  }

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    if (dispatch) {
      dispatch({
        type: 'time/getTime',
      }).then((rst) => {
        setData(rst.data.data)
      })
    }
  }


  const handleCancel = () => {
    setVisible(false)
    form.resetFields();
  }

  const onFinish = (value) => {
    value.preventDefault();

    props.form.validateFields((err, values) => {
      if (!err && dispatch) {
        dispatch({
          type: 'time/updateTimes',
          payload: {
            id: modData.id,
            timeName: values.timeName,
            startTime: values.endTime ? values.endTime[0].valueOf() : null,
            endTime: values.endTime ? values.endTime[1].valueOf() : null,
            startClassTime: values.startClassTime ? values.startClassTime.valueOf() : null,
          },
        }).then((rst) => {
          if (rst && rst.status === 200){
            message.success('修改成功')
            getData();
            handleCancel();
          }else{
            message.error(rst.msg)
          }
        })
      }else{
        console.log(err)
      }

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

  const { getFieldDecorator } = form;
  const { RangePicker } = DatePicker;

  const rangeConfig = {
    rules: [{ type: 'array',  message: 'Please select time!' }],
  };

  const config = {
    rules: [{ type: 'object',  message: 'Please select time!' }],
  };
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
          footer={null}
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <Form
            form={form}
            {...layout}
            name="basic"
            onSubmit={onFinish}
            style={{
              width: 500
            }}
          >
            <Form.Item
              label="年份: "
              size={300}
            >
              {getFieldDecorator('timeName', {
                initialValue: modData.timeName
              })
                (<Input disabled placeholder="年份" />)}
            </Form.Item>

            <Form.Item
              label='选课时间: '
              size={300}
            >
              {getFieldDecorator('endTime', {
                // initialValue: modData.endTime
                // initialValue: moment(parseInt(modData.endTime)),
                rangeConfig
              })(
                <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />,
              )}
            </Form.Item>



            <Form.Item
              label="开课时间: "
              size={300}
            >
              {getFieldDecorator('startClassTime', {
                initialValue: modData.startClassTime ? moment(parseInt(modData.startClassTime)) : null,
                config
              })
                (<DatePicker />
                )}
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
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
