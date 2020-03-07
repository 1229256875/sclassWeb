import React, {useState} from 'react';
import {Button, Radio, Icon, message} from 'antd';
import styles from './index.less';

const addFaculty = () => {

  const [size, setSize] = useState(true);

  const addFaculty = () => {
    message.error("你好呀");
  };


  return <div>
    <div>
      <Button onClick={addFaculty} type="primary">
        添加学院
      </Button>
    </div>
  </div>
};

export default addFaculty

