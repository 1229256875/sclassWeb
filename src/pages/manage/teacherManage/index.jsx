import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { List, Card, Form, Input, message, Table, Row, Button, Modal, Select, Col, Popconfirm } from 'antd';
import styles from './index.less';
import { connect } from 'dva';
import moment from "moment";




const Edit = () => {

}

const TimeTable = (props) => {

  const [loading, setLoading] = useState(true);

  const { dispatch } = props;

  const [data, setData] = useState([])
  const [visible, setVisivle] = useState(false)
  const [formData, setFormData] = useState()
  const [facultyList, setFacultyList] = useState()

  const [openListFaculty, setopenListFaculty] = useState()

 
  const [visibleqwe, setVisibleqwe] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {

    getData()
    getFacultyInfo({ type: 0 })
  }, [])

  const getData = (val) => {

    if (dispatch) {
      dispatch({
        type: 'user/getTeacher',
        payload: {
          ...val,
          type: 1
        },
      }).then((rst) => {
        setData(rst)
      })
    }
  }

  const getFacultyInfo = (e) => {
    dispatch({
      type: 'faculty/getFacultyInfo',
      payload: e,
    }).then(rst => {
      setFacultyList(rst.data)
    })
  }


  useEffect(() =>{
    props.form.resetFields()
  }, [formData])

  useEffect(() => {
    getSelectOne()
  }, [facultyList])

  const getSelectOne = e => {
    let info = []
    facultyList && facultyList.map(item => {
      info.push(<Option value={item.id}>{item.facultyName}</Option>)
    })
    setopenListFaculty(info)
  }

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '邮箱',
      dataIndex: 'emil',
    },
    {
      title: '电话',
      dataIndex: 'phone',
    },
    {
      title: '学院',
      dataIndex: 'facultyName',
    },
    {
      title: '操作',
      dataIndex: 'info',
      render: (info, record) => {

        return <div>
          <Button onClick={() => {
            setFormData(record)
            setVisivle(true)
          }}>修改</Button>

          <Popconfirm
            title={`是否要删除: ${record.name}`}
            onConfirm={() =>deleteUser(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button style={{
              marginLeft: 15
            }} type={'danger'}>删除</Button>
          </Popconfirm>
        </div>
      }
    }
  ]


  const deleteUser = e => {
    let val = {
      id: e,
      type: 1,
    }
    dispatch({
      type: 'login/deleteUser',
      payload: val
    }).then(rst => {
      if (rst && rst.status === 200) {
        message.success('删除成功')
        getData()
      } else {
        message.error(rst.msg)
      }
    })
  }


  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      const value = {
        ...values,
        id: formData.id,
        type: formData.type,
        facultyId: typeof values.facultyName === "number" ? values.facultyName : null,
      }
      if (!err) {
        console.log('Received values of form: ', value);
        dispatch({
          type: 'login/updateMeInfo',
          payload: value
        }).then(rst => {
          if (rst && rst.status === 200) {
            message.success('修改成功')
            getData()
            handleCancel()
          } else {
            message.error(rst && rst.msg)
          }
        })
      }
    });
  };

  const addTeacher = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      const value = {
        ...values,
        facultyId: typeof values.facultyName === "number" ? values.facultyName : null,
        type: 1,
      }
      if (!err) {
        console.log('Received values of form: ', value);
        dispatch({
          type: 'login/register',
          payload: value
        }).then(rst => {
          if (rst && rst.status === 200) {
            message.success('添加成功')
            getData()
            handleCancel()
          } else {
            message.error(rst && rst.msg)
          }
        })
      }
    });
  };


  const handleOk = e => {

  };

  const handleCancel = e => {
    setVisivle(false)
    setVisibleqwe(false)
    props.form.resetFields(() => {['code']})

  };

  const { getFieldDecorator } = props.form;





  const { Search } = Input;
  return <PageHeaderWrapper className={styles.main}>
    <div style={{ marginBottom: 60 }}>

      <Row>
        <Button onClick={() => setVisibleqwe(true)}>添加教师</Button>
        <Button>批量导入教师</Button>
      </Row>
      <Row>
        <Search
          placeholder="请输入姓名"
          onSearch={value => {
            let val = {
              name: value
            }
            getData(val)
          }}
          style={{ width: 200 }}
        />
        <Search
          placeholder="请输入学院"
          onSearch={value => {
            let val = {
              facultyName: value
            }
            getData(val)
          }}
          style={{ width: 200 }}
        />


      </Row>
    </div>

    <Table
      dataSource={data}
      columns={columns}
      rowKey={'id'}
    > </Table>

    <Modal
      title="修改学生信息"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        style={{
          marginLeft: 60
        }}
        layout={'inline'} onSubmit={handleSubmit}>

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
        <br />
        <Form.Item label="学院" >
          {getFieldDecorator('facultyName', {
            initialValue: formData && formData.facultyName,
            rules: [
              {
                required: true,
                message: '请选择学院!',
              },
            ],
          })(<Select >{openListFaculty}</Select>)}
        </Form.Item>
        <br />
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
    </Modal>

    <Modal
      title="添加学生"
      visible={visibleqwe}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        style={{
          marginLeft: 60
        }}
        layout={'inline'} onSubmit={addTeacher}>

        <Form.Item label="账号">
          {getFieldDecorator('code', {
            rules: [
              {
                required: true,
                message: '请输入',
              },
            ],
          })
            (<Input
              style={{
                width: '100%',
              }} />)}
        </Form.Item>


        <Form.Item label="姓名">
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '请输入姓名',
              },
            ],
          })(<Input />)}
        </Form.Item>

        <Form.Item label={'邮箱'} >
          {getFieldDecorator('emil', {
          })(<Input />)}
        </Form.Item>


        <Form.Item label="电话" >
          {getFieldDecorator('phone', {
          })(<Input />)}
        </Form.Item>
        <br />
        <Form.Item label="学院" >
          {getFieldDecorator('facultyName', {
            rules: [
              {
                required: true,
                message: '请输入学院!',
              },
            ],
          })(<Select style={{
            width: 170,
          }} >{openListFaculty}</Select>)}
        </Form.Item>
        <br />
        <Row>
          <Col span={5}></Col>
          <Col span={6}>
            <Form.Item style={{
              marginTop: 20
            }}>
              <Button type="primary" htmlType="submit">
                添加
        </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>


  </PageHeaderWrapper>
};

const Fore = Form.create()(TimeTable)

export default connect()(Fore)
