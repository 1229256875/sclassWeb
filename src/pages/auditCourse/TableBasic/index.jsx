import React, {useEffect, useState} from 'react';
import {Table, Divider, Radio, Button, message} from 'antd';
import styles from './index.less';
import {connect} from 'dva';


const Lists = (props) => {
    const [data, setData] = useState([]);
    const [load, setLoad] = useState(false);
    const [colums, setColums] = useState([])

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
            <Button disabled={props.role} onClick={() => selectCourse(record.id)}>重新审核</Button>
          </span>
        ),
      },
    ];

    const {dispatch} = props;

    const updateCourse = (course) => {
      console.log(course)
    }

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
      setLoad(true);
      dispatch({
        type: 'auditCourse/getCourseByUser',
      }).then(res => {
        setLoad(false);
      })


    }, []);

    useEffect(() => {
      if (props.auditList) {
        setData(props.auditList);
        setColums(columnAudit);
      }

    }, [props.auditList])

    const [selectionType, setSelectionType] = useState('audit');
    // getDataInfo();
    return (
      <div className={styles.container}>
        <div id="components-table-demo-basic">
          <Radio.Group
            onChange={({target: {value}}) => {
              change(value)
            }}
            value={selectionType}
          >
            <Radio value="audit">审核已通过</Radio>
            <Radio value="unAudit">未审核</Radio>
            <Radio value="rfAudit">已拒绝</Radio>
          </Radio.Group>
          <Divider/>
          <Table rowKey={'id'}
            columns={colums} dataSource={data} loading={load}/>
        </div>
      </div>
    );
  }
;

export default connect(({auditCourse}) => ({
  auditList: auditCourse.auditList,
  unAuditList: auditCourse.unAuditList,
  rfAuditList: auditCourse.rfAuditList,
}))(Lists);
// export default Lists;
