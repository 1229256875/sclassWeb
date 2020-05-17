import React, { useEffect, useState } from 'react';
import { Table, Divider, Tag, Button, message } from 'antd';
import styles from './index.less';
import { connect } from 'dva';


const Lists = (props) => {



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
      render: tar => {
        if (tar && tar.length !== 0) {
          return <span>{tar}</span>
        } else {
          return <span>未知</span>
        }
      }
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
          <Button onClick={() => selectCourse(record.id)}>删除</Button>
        </span>
      ),
    },
  ];

  const { dispatch } = props;

  const selectCourse = (courseId) => {
    dispatch({
      type: 'course/deleteCourse',
      payload: {
        id: courseId,
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
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    dispatch({
      type: 'course/getHistCouAdmin',
    });
  }


  // getDataInfo();
  return <div className={styles.container}>
    <div id="components-table-demo-basic">
      <Table columns={columns} dataSource={props.historyCourseData} />
    </div>
  </div>;
}

export default connect(({ course }) => ({
  historyCourseData: course.historyCourseData,
  count: course.count,
}))(Lists);
// export default Lists;
