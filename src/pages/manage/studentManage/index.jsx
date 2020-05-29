import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { List, Card, Form, Input, Popconfirm, message, Table, Row, Button, Modal, Col, Select } from 'antd';
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

  const [classList, setClassList] = useState()

  const [openListFaculty, setopenListFaculty] = useState()

  const [openClass, setOpenClass] = useState()

  const [visibleqwe, setVisibleqwe] = useState(false)


  const { Option } = Select;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    getData()
    getFacultyInfo({ type: 0 })
  }, [])

  const getData = (vals) => {

    let val = {
      ...vals,
      type: 2,
    }

    if (dispatch) {
      dispatch({
        type: 'user/getStudent',
        payload: val,
      }).then((rst) => {
        setData(rst)
      })
    }
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
      title: '专业',
      dataIndex: 'className',
    },
    {
      title: '年份',
      dataIndex: 'year',
    },
    {
      titile: '操作',
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
      type: 2,
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

  const getFacultyInfo = (e) => {
    dispatch({
      type: 'faculty/getFacultyInfo',
      payload: e,
    }).then(rst => {
      setFacultyList(rst.data)
    })
  }

  const addTeacher = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      const value = {
        ...values,
        facultyId: typeof values.facultyName === "number" ? values.facultyName : null,
        type: 2,
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



  useEffect(() => {
    getSelectTow()
  }, [classList])

  const getSelectTow = e => {
    let info = []
    classList && classList.map(item => {
      info.push(<Option value={item.id}>{item.facultyName}</Option>)
    })
    setOpenClass(info)
  }



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



  const handleOk = e => {
    props.form.resetFields()
    setVisibleqwe(true)
  };

  useEffect(() =>{
    props.form.resetFields()
  }, [formData])

  const handleCancel = e => {
    setVisivle(false)
    setVisibleqwe(false)
  };

  const { getFieldDecorator } = props.form;

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      const value = {
        ...values,
        id: formData.id,
        type: formData.type,
        facultyId: typeof values.facultyName === "number" ? values.facultyName : null,
        classId: typeof values.className === "number" ? values.className : null,
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


  const facultyOnChange = e =>{

    dispatch({
      type: 'faculty/getFacultyInfo',
      payload: {
        parentId: e,
      },
    }).then(rst => {
      setClassList(rst.data)
    })
  }



  const { Search } = Input;
  return <PageHeaderWrapper className={styles.main}>
    <div style={{ marginBottom: 60 }}>
      <Row>

        <Button onClick={handleOk}>添加学生</Button>
        <Button>批量导入学生</Button>
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
        <Search
          placeholder="请输入专业"
          onSearch={value => {
            let val = {
              className: value
            }
            getData(val)
          }}
          style={{ width: 200 }}
        />
        <Search
          placeholder="请输入入学年份"
          onSearch={value => {
            let val = {
              year: value
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
    />

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
<br/>
        <Form.Item label="学院" >
          {getFieldDecorator('facultyName', {
            initialValue: formData && formData.facultyName,
            rules: [
              {
                required: true,
                message: '请输入学院!',
              },
            ],
          })(<Select onChange={facultyOnChange}>{openListFaculty}</Select>)}
        </Form.Item>
<br/>

        <Form.Item label="专业" >
          {getFieldDecorator('className', {
            initialValue: formData && formData.className,
            rules: [
              {
                required: true,
                message: '请输入电话!',
              },
            ],
          })(<Select>{openClass}</Select>)}
        </Form.Item>
        <br />
        <Form.Item label='年份'>
          {getFieldDecorator('year', {
            initialValue: formData && formData.year,
            rules: [
              {
                required: true,
                message: '请输入学年!',
              },
            ],
          })(<Select >
            <Option value="2020">2020</Option>
            <Option value="2019">2019</Option>
            <Option value="2018">2018</Option>
            <Option value="2017">2017</Option>
            <Option value="2016">2016</Option>
          </Select>)}
        </Form.Item>
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
        <Form.Item label="学院">
          {getFieldDecorator('facultyName', {
            initialValue: formData && formData.facultyName,
            rules: [
              {
                required: true,
                message: '请选择学院!',
              },
            ],
          })(<Select onChange={facultyOnChange}
            style={{
              width: 170
            }}>{openListFaculty}</Select>)}
        </Form.Item>
<br/>

        <Form.Item label="专业" >
          {getFieldDecorator('className', {
            initialValue: formData && formData.className,
            rules: [
              {
                required: true,
                message: '请输入电话!',
              },
            ],
          })(<Select style={{
            width: 170
          }}>{openClass}</Select>)}
        </Form.Item>
        <br />
        <Form.Item label='年份'>
          {getFieldDecorator('year', {
            initialValue: formData && formData.year,
            rules: [
              {
                required: true,
                message: '请输入学年!',
              },
            ],
          })(<Select style={{
            width: 170
          }} defaultValue="2020">
            <Option value="2020">2020</Option>
            <Option value="2019">2019</Option>
            <Option value="2018">2018</Option>
            <Option value="2017">2017</Option>
            <Option value="2016">2016</Option>
          </Select>)}
        </Form.Item>
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
