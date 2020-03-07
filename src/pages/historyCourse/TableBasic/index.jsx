import React, {useEffect, useState} from 'react';
import {Table, Divider, Tag, Button, message, Modal} from 'antd';
import styles from './index.less';
import {connect} from 'dva';


const Lists = (props) => {


  const [ModalText, setModalText] = useState('你将要进行退选课程操作,请确定您的操作');
  const [visible, setVisible] = useState(false);
  const [gradeVisible, setGradeVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [buttonText1, setButtonText1] = useState('退订');

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
    {
      title: '授课教师',
      dataIndex: 'teacher',
      key: 'teacher',
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
      title: '授课人数',
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
        {/*<a>Invite {record.courseName}</a>*/}
          {/*<Divider type="vertical"/>*/}
          {/*<a>Delete</a>*/}
          <Modal
            title="退课"
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
          ><p style={{}}>{ModalText}</p>
          </Modal>
          <Modal
            title="成绩"
            visible={gradeVisible}
            onOk={handleCancel}
            cancelButtonProps={{
              disabled: true,
            }}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
          ><p style={{}}>{ModalText}</p>
          </Modal>
          <Button onClick={() => showModal('你将要进行退选课程操作,请确定您的操作', record.id, record.state)}>{buttonText1}</Button>
      </span>
      ),
    },
  ];
  const hisColumns = [
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
      title: '操作',
      key: 'doing',
      dataIndex: 'do',
      render: (text, record) => (
        <span>
          <Button onClick={() => getGrade(record.id)}>成绩</Button>
          {/*<Button onClick={() => selectCourse(record.id)}>评价</Button>*/}
      </span>
      ),
    },
  ];
  const {dispatch} = props;

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

  const handleOk = () => {
    unsubscribe();
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 3000);
  };

  const showModal = (text, id, state) => {
    if (props.role) {
      if (state === 0) {
        message.info('课程未审核,请耐心等待管理员审核！')
      } else if (state === 1) {
        message.success('课程已经通过审核!')
      } else if (state === 2) {
        message.error('课程审核失败!')
      }
      // setVisible(true)
    } else {
      setVisible(true)
      // setConfirmLoading(false);
      setModalText(text)
    }
  };

  const showModalGrade = (text) => {
    setGradeVisible(true)
    setModalText(text)
  }

  const getGrade = (id) => {
    dispatch({
      type: 'courseList/getGrade',
      payload: id,
    })
      .then((rst) => {
        if (rst.status === 200) {
          if (rst.data.status === 200) {
            showModalGrade("您的课程得分为" + rst.data.data)
            // message.info("恭喜你,课程退订成功")
          } else {
            showModalGrade(rst.data.msg)
          }
        } else {
          showModalGrade("服务器错误")
        }
      })

  }

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false)
    setGradeVisible(false)
  };

  useEffect(() => {
    console.log(props)
    dispatch({
      type: 'courseList/getHistoryCourse',
    });
    if (props.role) {
      setButtonText1('查看状态')
    } else {
      setButtonText1('退订')
    }
  }, []);

  return <div className={styles.container}>
    <div id="components-table-demo-basic">
      <Table columns={columns}
             dataSource={props.disData}
             title={() => '当前选定课程'}
             pagination={false}
      />
      <Table columns={hisColumns}
             dataSource={props.data}
             title={() => '历史选定课程'}
        // hideOnSinglePage={true}
             pagination={true}
             defaultCurrent={1}
             defaultPageSize={10}
             total={100}
      />
    </div>
  </div>;
};

export default connect(({courseList}) => ({
  data: courseList.data,
  disData: courseList.disData,
  role: courseList.role,
}))(Lists);
// export default Lists;
