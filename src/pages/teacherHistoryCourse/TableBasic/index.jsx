import React, { useEffect, useState } from 'react';
import { Table, Divider, Tag, Button, message, Modal, Tooltip, Form, Input, List, Card, InputNumber } from 'antd';
import styles from './index.less';
import { connect } from 'dva';
import { getGrade } from '@/api/api';


const Lists = (props) => {


  const [ModalText, setModalText] = useState('你将要进行退选课程操作,请确定您的操作');
  const [visible, setVisible] = useState(false);
  const [gradeVisible, setGradeVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [buttonText1, setButtonText1] = useState('退订');
  const [visibleSub, setVisibeSub] = useState(false)
  const [data, setData] = useState({})
  const [visibleSess, setVisibleSess] = useState(false)
  const [gradeData, setGradeData] = useState([])

  const columns = [
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
    // {
    //   title: '授课教师',
    //   dataIndex: 'teacher',
    //   key: 'teacher',
    // },
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
      title: '授课人数',
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
      title: '审核状态',
      key: 'state',
      dataIndex: 'state',
      render: (state, record) => {
        let a = ''
        let color = ''

        if (state === 0) {
          a = '未审核';
          color = '#2db7f5'
        } else if (state === 1) {
          a = '通--过';
          color = '#87d068'
        } else if (state === 2) {
          a = '未通过';
          color = '#f50'
        } else if (state === 3) {
          a = '已结课';
          color = '#87d068'
        }

        return <Tag color={color}>{a}</Tag>
      }
    },
    {
      title: '操作',
      key: 'doing',
      dataIndex: 'do',
      render: (text, record) => {



        return <div>
          <span>
            <a onClick={() => updateCourse(record)} style={{
              marginRight: 16
            }}>修改</a>

          </span>
          <span>
            <a onClick={() => deleteCourse(record.id)} style={{
              marginRight: 16
            }}>删除</a>

          </span>

          <span>
            <a onClick={() => session(record)} style={{
              marginRight: 16
            }}>结课</a>
          </span>
        </div>
      },
    },
  ];


  const hisColumns = [
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
      title: '授课教室',
      key: 'classroom',
      dataIndex: 'classroom',
    },
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
  ];
  const { dispatch } = props;

  const unsubscribe = () => {
    dispatch({
      type: 'courseList/unsubscribe',
    })
      .then((rst) => {
        if (rst.status === 200) {
          if (rst.data.status === 200) {
            // setModalText("恭喜你,课程退订成功")
            message.info("恭喜你,课程退订成功")
          } else {
            setModalText(rst.data.msg)
          }
        } else {
          setModalText("服务器错误")
        }
      });
  };

  const updateCourse = (course) => {

    setData(course)
    setVisibeSub(true)
  }

  const deleteCourse = (id) => {
    dispatch({
      type: 'course/deleteCourse',
      payload: {
        id: id,
      }
    }).then((rst) => {
      if (rst.status === 200) {
        if (rst.data.status === 200) {
          message.success("删除成功")
          getData();
        } else {
          message.error(rst.data.msg)
        }
      } else {
        message.error("服务器错误")
      }
    });
  }

  const session = (tar) => {
    console.log('tar', tar)
    const { state } = tar;
    if (state === 0) {
      message.error('课程尚未审核')
      return;
    }
    if (state === 2) {
      message.error('课程审核未通过')
      return;
    }
    //结课，设置成绩
    if (state === 1) {
      if (dispatch) {
        dispatch({
          type: 'course/updateCourseApproval',
          payload: {
            id: tar.id,
            state: 3,
          },
        }).then((rst) => {
          if (rst && rst.status === 200) {
            message.success('结课成功');
            getData();
          } else {
            message.error(rst.msg);
            return;
          }
        })
      }
    }

    //设置成绩
    setVisibleSess(true)
    getGradeInfo(tar.id)

  }

  const getGradeInfo = id => {
    if (dispatch) {
      dispatch({
        type: 'auditCourse/getSelectClassByCourseId',
        payload: {
          courseId: id,
        }
      }).then((rst) => {
        if (rst && rst.status === 200) {
          setGradeData(rst.data)
          console.log('ge', rst.data)
        } else {
          success.error(rst.msg)
          return;
        }
      })
    }
  }

  const handleOk = () => {
    unsubscribe();
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 3000);
  };



  const handleCancel = () => {
    setVisible(false)
    setGradeVisible(false)
    setVisibeSub(false)
    setVisibleSess(false)
    setTimeout(() =>{
    setGradeData([])
    }, 500)
  };

  useEffect(() => {

    getData();
  }, []);

  const getData = () => {
    dispatch({
      type: 'courseList/getHistoryCourse',
    });
  }


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
  const onFinish = (value) => {
    value.preventDefault();

    props.form.validateFields((err, values) => {
      if (!err && dispatch) {
        dispatch({
          type: 'course/updateCourse',
          payload: {
            id: data.id,
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



  const dealData = ( grade, id) => {


    let nowData = gradeData.map(item => {
      if (item.id === id){
        return {
          ...item,
          grade: grade,
        }
      }else{
        return item;
      }
    })

    setGradeData(nowData)
  }

  const flash = () =>{
    if (dispatch){
      dispatch({
        type: 'courseList/setGrade',
        payload: gradeData,
      }).then((rst) =>{
        if (rst && rst.status === 200){
          message.success('成绩设置成功')
          handleCancel()
        }else{
          message.success(rst.msg)
        }
       
      })
    }
  }

  const { form } = props;
  const { getFieldDecorator } = form;

  return <div className={styles.container}>
    <div id="components-table-demo-basic">
      <Table columns={columns}
        dataSource={props.disData}
        title={() => '当前发布课程'}
        pagination={false}
        rowKey={'id'}
      />
      <Table columns={hisColumns}
        dataSource={props.data}
        title={() => '历史发布课程'}
        // hideOnSinglePage={true}
        pagination={true}
        defaultCurrent={1}
        defaultPageSize={10}
        total={100}
        rowKey={'id'}
      />
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
              initialValue: data.courseName,
              // config
            })
              (<Input />
              )}
          </Form.Item>

          <Form.Item
            label='授课人数'
          >
            {getFieldDecorator('count', {
              initialValue: data.count,
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

      <Modal
        title="设置成绩"
        visible={visibleSess}
        confirmLoading={confirmLoading}
        onOk={flash}
        onCancel={handleCancel}
      >
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            // xl: 6,
            // xxl: 3,
          }}
          dataSource={gradeData}
          renderItem={item => {
            let { name, id } = item;
            let { code,grade } = item;
            let tt = '您是否要删除: ' + name;
            return <List.Item>
              <Card
                title={name}
                style={{ width: 150 }}
                size="small"
              >
                {code}
                <InputNumber
                  defaultValue={grade}
                  min={-1}
                  max={100}
                  onChange={(target) => {dealData(target, item.id)}} />
              </Card>
            </List.Item>
          }}
        />
      </Modal>
    </div>
  </div>;
};

const EditableFormTable = Form.create()(Lists);


export default connect(({ courseList }) => ({
  data: courseList.data,
  disData: courseList.disData,
  role: courseList.role,
}))(EditableFormTable);
// export default Lists;
