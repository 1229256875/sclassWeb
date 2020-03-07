import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import styles from './index.less';
import TableBasic from './TableBasic';

const Class = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <PageHeaderWrapper content="这是一个展示课程信息的页面" className={styles.main}>
      <TableBasic />
      {/*<div*/}
      {/*  style={{*/}
      {/*    paddingTop: 100,*/}
      {/*    textAlign: 'center',*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <Spin spinning={loading} size="large"></Spin>*/}
      {/*</div>*/}
    </PageHeaderWrapper>
  );
};

export default Class;
