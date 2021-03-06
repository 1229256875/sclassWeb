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
      title: '选课/已选人数',
      key: 'count',
      dataIndex: 'count',
      render: (text, record) =>{

      return <span>{record.count}/{record.selectCount}</span>
      }
    },
    {
      title: '操作',
      key: 'doing',
      dataIndex: 'do',
      render: (text, record) => {
        // console.log(record.id),
        return <Button disabled={props.role} onClick={() => selectCourse(record.id)}>选择</Button>
      }
    },
  ];

  const { dispatch } = props;

  const selectCourse = (courseId) => {
    dispatch({
      type: 'courseList/selectCourse',
      payload: {
        courseId,
      }
    }).then((rst) => {
      if (rst.status === 200) {
        if (rst.data.status === 200) {
          message.info("恭喜你,选课成功")
        } else {
          message.error(rst.data.msg)
        }
      } else {
        message.error("服务器错误")
      }
    });
  };

  useEffect(() => {
    dispatch({
      type: 'courseList/getDataInfo',
    });
  }, []);

  // getDataInfo();
  return <div className={styles.container}>
    <div id="components-table-demo-basic">
      <Table columns={columns} dataSource={props.data} />
    </div>
  </div>;
}
  ;

export default connect(({ courseList }) => ({
  data: courseList.data,
  role: courseList.role,
}))(Lists);
// export default Lists;
