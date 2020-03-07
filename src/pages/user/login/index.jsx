import React from 'react';
import FormNormalLogin from './FormNormalLogin';
import styles from './index.less'

const Login = () => {
  return (
    <>
      <div className={styles.login}>
        <FormNormalLogin/>
      </div>
    </>
  );
};

export default Login;
