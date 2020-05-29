import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { List, Card, Form, Input, Popconfirm, message, Table } from 'antd';
import styles from './index.less';
import { connect } from 'dva';
import moment from "moment";




const Edit = () => {

}

const TimeTable = (props) => {

  const [loading, setLoading] = useState(true);

  const { dispatch } = props;

  const [data, setData] = useState([])

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    getData()
  }, [])

  const getData = (name) => {
    if (dispatch) {
      dispatch({
        type: 'time/getLikeRoomName',
        payload: {
          likeName: name,
        }
      }).then((rst) => {
        setData(rst.data)
      })
    }
  }



  const [popconfirmTitle, setPopconfirmTitle] = useState('')


  const confirm = (e) => {
    if (dispatch) {
      dispatch({
        type: 'time/deleteRoomName',
        payload: {
          id: e,
        }
      }).then((rst) => {
        if (rst && rst.status === 200) {
          message.success('删除教室成功');
          getData();
        } else {
          message.error(rst.msg);
        }
      })
    }
  }


  const cancel = (e) => {
    // console.log(e);
    // message.error('Click on No');
  }

  const insertRoom = name => {
    if (dispatch) {
      dispatch({
        type: 'time/insertRoomName',
        payload: {
          roomName: name,
        }
      }).then((rst) => {
        if (rst && rst.status === 200) {
          message.success('添加教室成功');
          getData();
        } else {
          message.error(rst.msg);
        }
      })
    }
  }

  const [dataSource, setDataSource] = useState()


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
    }
  ]



  const { Search } = Input;
  return <PageHeaderWrapper content="这是一个展示课程信息的页面" className={styles.main}>
    <div style={{ marginBottom: 60 }}>
      <Search
        placeholder="搜索教室"
        enterButton="搜索"
        size="large"
        style={{ width: 300 }}
        onSearch={value => getData(value)}
      />
      <Search
        placeholder="添加新的教室"
        enterButton="添加"
        size="large"
        style={{ width: 300, marginLeft: 100 }}
        onSearch={value => insertRoom(value)}
      />
    </div>

    <Table
      dataSource={dataSource}
      columns={columns}
    > </Table>

  </PageHeaderWrapper>
};

const Fore = Form.create()(TimeTable)

export default connect()(Fore)
