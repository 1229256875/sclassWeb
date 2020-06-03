import { getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet } from 'react-helmet';
import Link from 'umi/link';
import React from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import logo from '../assets/logo.svg';
// import golang from '../assets/golangioc.png'
import styles from './UserLayout.less';
// import './font/iconfont.css'

const UserLayout = props => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    breadcrumb,
    formatMessage,
    ...props,
  });
  const height = document.body.clientHeight
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container} style={{height: height}}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
              <svg t="1591188936311" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2186" width="50" height="50"><path d="M160.402 361.165h162.835v162.834H160.402V361.165zM339.418 362.597h162.835v162.835H339.418V362.597zM518.435 362.597h162.834v162.835H518.435V362.597zM697.45 361.165h162.835v162.834H697.451V361.165zM158.896 554.694H321.73V717.53H158.896V554.694zM338.532 555.41h162.835v162.835H338.532V555.411zM518.168 555.41h162.835v162.835H518.168V555.411zM697.805 554.694h162.834V717.53H697.805V554.694zM160.402 737.991h162.835v162.835H160.402V737.99zM339.546 737.991h162.835v162.835H339.546V737.99zM518.69 737.991h162.835v162.835H518.69V737.99zM697.835 737.991H860.67v162.835H697.835V737.99z" fill="#2c2c2c" p-id="2187"></path><path d="M838.389 179.411h-56.326V120.05c0-33.571-27.312-60.883-60.884-60.883h-26.096c-33.572 0-60.884 27.312-60.884 60.883v59.362H389.348V120.05c0-33.571-27.313-60.883-60.884-60.883h-26.096c-33.572 0-60.884 27.312-60.884 60.883v59.362h-54.166c-48.87 0-88.628 39.759-88.628 88.629v597.694c0 48.87 39.76 88.629 88.628 88.629h651.07c48.87 0 88.628-39.759 88.628-88.629V268.04c0.001-48.87-39.757-88.629-88.627-88.629z m-163.025-57.073c0-11 8.95-19.951 19.951-19.951h26.095c11.002 0 19.953 8.95 19.953 19.951v131.566c0 11.001-8.951 19.952-19.953 19.952h-26.095c-11.001 0-19.951-8.95-19.951-19.952V122.338z m-394.788 0c0-11 8.951-19.951 19.953-19.951h26.095c11.002 0 19.951 8.95 19.951 19.951v131.566c0 11.001-8.95 19.952-19.951 19.952h-26.095c-11.002 0-19.953-8.95-19.953-19.952V122.338z m606.19 747.574c0 26.77-21.702 48.473-48.473 48.473H184.98c-26.77 0-48.473-21.703-48.473-48.473V343.606h750.26v526.306z" fill="#2c2c2c" p-id="2188"></path></svg>
                <span className={styles.title}>选课系统</span>
              </Link>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default connect(({ settings }) => ({ ...settings }))(UserLayout);
