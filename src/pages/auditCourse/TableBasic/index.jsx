import React, { useEffect, useState } from 'react';
import { Table, Divider, Radio, Button, message, Modal, Input, Form, Select, Tooltip } from 'antd';
import styles from './index.less';
import { connect } from 'dva';
import Model from '@/models/login';


const Lists = (props) => {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [colums, setColums] = useState([])
  const [modeData, setModeData] = useState({})
  const [sourseId, setSourseId] = useState(0)
  const [visibleSub, setVisibeSub] = useState(false)

  //对话框
  const [visible, setVisible] = useState(false)

  //对话框 loding
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [fromData, setFromData] = useState({})

  const [selectData, setSelectData] = useState([])

  const [saveAllRoom, setSaveAllRoom] = useState(null)

  const columnAudit = [
    {
      title: '课程名称',
      dataIndex: 'courseName',
      key: 'courseName',
      render: text => <a>{text}</a>,
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      key: 'startTime',
    },
    {
      title: '授课教师',
      dataIndex: 'teacher',
      key: 'teacher',
    },
    {
      title: '授课学年',
      dataIndex: 'courseYear',
      key: 'courseYear',
    },
    {
      title: '授课教室',
      key: 'classroom',
      dataIndex: 'classroom',
      // render: tags => (
      //   <span>
      //     {tags.map(tag => {
      //       let color = tag.length > 5 ? 'geekblue' : 'green';
      //
      //       if (tag === 'loser') {
      //         color = 'volcano';
      //       }
      //
      //       return (
      //         <Tag color={color} key={tag}>
      //           {tag.toUpperCase()}
      //         </Tag>
      //       );
      //     })}
      //   </span>
      // ),
    },
    {
      title: '选课人数',
      key: 'count',
      dataIndex: 'count',
    },
    {
      title: '操作',
      key: 'doing',
      dataIndex: 'do',
      render: (text, record) => (
        // console.log(record.id),
        <span>
          <a onClick={() => updateCourse(record)} style={{
            marginRight: 16
          }}>修改</a>
          {/*<Button onClick={showDeleteConfirm} type="dashed">Delete</Button>*/}
          {/*<Button disabled={props.role} onClick={() => selectCourse(record.id)}>选择</Button>*/}
        </span>
      ),
    },
  ];
  const columnUnAudit = [
    {
      title: '课程名称',
      dataIndex: 'courseName',
      key: 'courseName',
      render: text => <a>{text}</a>,
    },
    // {
    //   title: '开始时间',
    //   dataIndex: 'startTime',
    //   key: 'startTime',
    // },
    {
      title: '授课教师',
      dataIndex: 'teacher',
      key: 'teacher',
    },
    {
      title: '授课学年',
      dataIndex: 'courseYear',
      key: 'courseYear',
    },
    // {
    //   title: '授课教室',
    //   key: 'classroom',
    //   dataIndex: 'classroom',
      
    // },
    {
      title: '选课人数',
      key: 'count',
      dataIndex: 'count',
    },
    {
      title: '课程信息',
      key: 'info',
      dataIndex: 'info',
      render: (text, record) => {
        let less = '';
        if (text && text.length > 5) {
          less = text.substring(0, 5) + '...';
        } else {
          less = text;
        }
        return <Tooltip title={text}>
          <span>{less}</span>
        </Tooltip>

      }
    },
    {
      title: '操作',
      key: 'doing',
      dataIndex: 'do',
      render: (text, record) => (
        // console.log(record.id),
        <span>
          <Button disabled={props.role} onClick={() => selectCourse(record.id)}>审核</Button>
        </span>

      ),
    },
  ];


  const columnRfAudit = [
    {
      title: '课程名称',
      dataIndex: 'courseName',
      key: 'courseName',
      render: text => <a>{text}</a>,
    },
    // {
    //   title: '开始时间',
    //   dataIndex: 'startTime',
    //   key: 'startTime',
    // },
    {
      title: '授课教师',
      dataIndex: 'teacher',
      key: 'teacher',
    },
    {
      title: '授课学年',
      dataIndex: 'courseYear',
      key: 'courseYear',
    },
    // {
    //   title: '授课教室',
    //   key: 'classroom',
    //   dataIndex: 'classroom',
    // },
    {
      title: '选课人数',
      key: 'count',
      dataIndex: 'count',
    },
    {
      title: '课程信息',
      key: 'info',
      dataIndex: 'info',
      render: (text, record) => {
        let less = '';
        if (text && text.length > 5) {
          less = text.substring(0, 5) + '...';
        } else {
          less = text;
        }
        return <Tooltip title={text}>
          <span>{less}</span>
        </Tooltip>

      }
    },
    {
      title: '操作',
      key: 'doing',
      dataIndex: 'do',
      render: (text, record) => (
        // console.log(record.id),
        <span>
          <Button disabled={props.role} onClick={() => selectCourse(record.id)}>重新审核</Button>
        </span>
      ),
    },
  ];

  const { dispatch } = props;


  const handleCancel = () => {
    setVisible(false)
    setVisibeSub(false)
    setSelectData([])
    form.resetFields();
  }

  const audit = (type) => {
    if (dispatch) {
      dispatch({
        type: 'course/updateCourseApproval',
        payload: {
          id: sourseId,
          make: modeData,
          state: type,
        },
      }).then((rst) => {
        if (rst && rst.status === 200) {
          message.success('审核成功');
          getData();
          handleCancel();
          setSelectionType('audit');
        } else {
          message.error(rst.msg);
        }
      })
    }

  }




  const updateCourse = (course) => {
    if (saveAllRoom === null) {
      getSelect()
    }
    setFromData(course)
    setVisibeSub(true)
    return
  }

  const selectCourse = (courseId) => {
    setSourseId(courseId)

    setVisible(true)

  };

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  const change = (value) => {
    setSelectionType(value);
    if (value === 'audit') {
      setData(props.auditList);
      setColums(columnAudit)
    } else if (value === 'unAudit') {
      setData(props.unAuditList);
      setColums(columnUnAudit)
    } else if (value === 'rfAudit') {
      setData(props.rfAuditList);
      setColums(columnRfAudit)
    }
  };

  useEffect(() => {
    getData()
  }, []);

  const getData = () => {
    setLoad(true);
    dispatch({
      type: 'auditCourse/getCourseByUser',
    }).then(res => {
      setLoad(false);
    })
  }

  useEffect(() => {
    if (props.auditList) {
      setData(props.auditList);
      setColums(columnAudit);
    }

  }, [props.auditList])

  const getSelect = (name) => {
    if (dispatch) {
      dispatch({
        type: 'time/getLikeRoomName',
        payload: {
          likeName: name,
        }
      }).then((rst) => {
        setSaveAllRoom(rst.data)
        return rst.data;
      })
    }
  }

  const selectOnChange = e => {
    if (e === null) {
      return
    }
    
    if (saveAllRoom === null) {
      getSelect()
    }

    const result = saveAllRoom && saveAllRoom.filter(tag => { return tag.roomName.includes(e)});

    setSelectData(result)
  }


  const onFinish = (value) => {
    value.preventDefault();

    props.form.validateFields((err, values) => {
      if (!err && dispatch) {
        dispatch({
          type: 'course/updateCourse',
          payload: {
            id: fromData.id,
            classroomId: values.classroom === fromData.classroom ? null : values.classroom,
            count: values.count,
            courseNameId: values.courseName,
          },
        }).then((rst) => {
          if (rst && rst.status === 200) {
            message.success('修改成功')
            getData();
            handleCancel();
          } else {
            message.error(rst.msg)
          }
        })
      } else {
        console.log(err)
      }

    })
  }



  const [selectionType, setSelectionType] = useState('audit');
  // getDataInfo();

  const { form } = props;


  const { getFieldDecorator } = form;
  const { TextArea } = Input;
  const { Option } = Select;
  return (
    <div className={styles.container}>
      <div id="components-table-demo-basic">
        <Radio.Group
          onChange={({ target: { value } }) => {
            change(value)
          }}
          value={selectionType}
        >
          <Radio value="audit">审核已通过</Radio>
          <Radio value="unAudit">未审核</Radio>
          <Radio value="rfAudit">已拒绝</Radio>
        </Radio.Group>
        <Divider />
        <Table rowKey={'id'}
          columns={colums} dataSource={data} loading={load} />

        <Modal
          title="审核课程"
          visible={visible}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          footer={null}
        >

          <TextArea
            placeholder="如果拒绝请输入理由"
            onChange={e => setModeData(e.target.value)}></TextArea>
          <Button onClick={() => {
            audit(1)
          }}>同意</Button>
          <Button onClick={() => {
            audit(2)
          }}>拒绝</Button>

        </Modal>
        <Modal
          title="修改课程"
          visible={visibleSub}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          footer={null}
        >
          <Form
            {...layout}
            onSubmit={onFinish}
          >
            <Form.Item
              label='课程名称'
            >
              {getFieldDecorator('courseName', {
                initialValue: fromData.courseName,
                // config
              })
                (<Input />
                )}
            </Form.Item>

            <Form.Item
              label='授课教室'
            >
              {getFieldDecorator('classroom', {
                initialValue: fromData.classroom,
                // config
              })
                (<Select
                  showSearch
                  // value={this.state.value}
                  defaultActiveFirstOption={false}
                  showArrow={false}
                  filterOption={false}
                  onSearch={selectOnChange}
                  notFoundContent={'请输入数据进行查询'}
                  value='123'
                // onChange={selectOnChange}
                >
                  {selectData && selectData.map(d => (
                    <Option key={d.id} >{d.roomName}</Option>
                  ))
                  }
                </Select>
                )}
            </Form.Item>

            <Form.Item
              label='授课人数'
            >
              {getFieldDecorator('count', {
                initialValue: fromData.count,
                // config
              })
                (<Input />
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
    </div>
  );
};

const EditableFormTable = Form.create()(Lists);

export default connect(({ auditCourse }) => ({
  auditList: auditCourse.auditList,
  unAuditList: auditCourse.unAuditList,
  rfAuditList: auditCourse.rfAuditList,
}))(EditableFormTable);
// export default Lists;
