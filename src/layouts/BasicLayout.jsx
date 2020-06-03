/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout, {DefaultFooter} from '@ant-design/pro-layout';
import React, {useEffect} from 'react';
import {Link} from 'umi';
import {connect} from 'dva';
import {Icon, Result, Button} from 'antd';
import {formatMessage} from 'umi-plugin-react/locale';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import {isAntDesignPro, getAuthorityFromRouter} from '@/utils/utils';
const logo = <svg t="1591188936311" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2186" width="48" height="48"><path d="M160.402 361.165h162.835v162.834H160.402V361.165zM339.418 362.597h162.835v162.835H339.418V362.597zM518.435 362.597h162.834v162.835H518.435V362.597zM697.45 361.165h162.835v162.834H697.451V361.165zM158.896 554.694H321.73V717.53H158.896V554.694zM338.532 555.41h162.835v162.835H338.532V555.411zM518.168 555.41h162.835v162.835H518.168V555.411zM697.805 554.694h162.834V717.53H697.805V554.694zM160.402 737.991h162.835v162.835H160.402V737.99zM339.546 737.991h162.835v162.835H339.546V737.99zM518.69 737.991h162.835v162.835H518.69V737.99zM697.835 737.991H860.67v162.835H697.835V737.99z" fill="#ffffff" p-id="2187" data-spm-anchor-id="a313x.7781069.0.i4" class="selected"></path><path d="M838.389 179.411h-56.326V120.05c0-33.571-27.312-60.883-60.884-60.883h-26.096c-33.572 0-60.884 27.312-60.884 60.883v59.362H389.348V120.05c0-33.571-27.313-60.883-60.884-60.883h-26.096c-33.572 0-60.884 27.312-60.884 60.883v59.362h-54.166c-48.87 0-88.628 39.759-88.628 88.629v597.694c0 48.87 39.76 88.629 88.628 88.629h651.07c48.87 0 88.628-39.759 88.628-88.629V268.04c0.001-48.87-39.757-88.629-88.627-88.629z m-163.025-57.073c0-11 8.95-19.951 19.951-19.951h26.095c11.002 0 19.953 8.95 19.953 19.951v131.566c0 11.001-8.951 19.952-19.953 19.952h-26.095c-11.001 0-19.951-8.95-19.951-19.952V122.338z m-394.788 0c0-11 8.951-19.951 19.953-19.951h26.095c11.002 0 19.951 8.95 19.951 19.951v131.566c0 11.001-8.95 19.952-19.951 19.952h-26.095c-11.002 0-19.953-8.95-19.953-19.952V122.338z m606.19 747.574c0 26.77-21.702 48.473-48.473 48.473H184.98c-26.77 0-48.473-21.703-48.473-48.473V343.606h750.26v526.306z" fill="#ffffff" p-id="2188"></path></svg>
const noMatch = (
  <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary">
        <Link to="/user/login">Go Login</Link>
      </Button>
    }
  />
);

/**
 * use Authorized check all menu item
 */
const menuDataRender = menuList =>
  menuList.map(item => {
    const localItem = {...item, children: item.children ? menuDataRender(item.children) : []};
    return Authorized.check(item.authority, localItem, null);
  });

const defaultFooterDom = (
  <DefaultFooter
    copyright="振华培训机构"
    links={[
      {
        key: 'Ant Design Pro',
        title: 'Ant Design Pro',
        href: 'https://pro.ant.design',
        blankTarget: true,
      },
      {
        key: 'github',
        title: <Icon type="github"/>,
        href: 'https://github.com/ant-design/ant-design-pro',
        blankTarget: true,
      },
      {
        key: 'Ant Design',
        title: 'Ant Design',
        href: 'https://ant.design',
        blankTarget: true,
      },
    ]}
  />
);

const footerRender = () => {
  if (!isAntDesignPro()) {
    return defaultFooterDom;
  }

  return (
    <>
      {defaultFooterDom}
      <div
        style={{
          padding: '0px 24px 24px',
          textAlign: 'center',
        }}
      >
        <a href="https://www.netlify.com" target="_blank" rel="noopener noreferrer">
          <img
            src="https://www.netlify.com/img/global/badges/netlify-color-bg.svg"
            width="82px"
            alt="netlify logo"
          />
        </a>
      </div>
    </>
  );
};

const BasicLayout = props => {
  const {
    dispatch,
    children,
    settings,
    location = {
      pathname: '/',
    },
  } = props;
  /**
   * constructor
   */

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  }, []);
  /**
   * init variables
   */

  const handleMenuCollapse = payload => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  }; // get children authority

  const logout = () =>{
    if (dispatch){
      dispatch({
        type: 'login/logout',
      })
    }
  };

  const authorized = getAuthorityFromRouter(props.route.routes, location.pathname || '/') || {
    authority: undefined,
  };
  return (
    <ProLayout
      logo={logo}
      menuHeaderRender={(logoDom, titleDom) => (
        <Link to="/">
          {logoDom}
          {titleDom}
        </Link>
      )}
      onCollapse={handleMenuCollapse}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl || menuItemProps.children || !menuItemProps.path) {
          return defaultDom;
        }
        if (menuItemProps.path.includes("/path")) {
          return <a onClick={logout}> {defaultDom}</a>
        }
        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      breadcrumbRender={(routers = []) => [
        {
          path: '/',
          breadcrumbName: formatMessage({
            id: 'menu.home',
            defaultMessage: 'Home',
          }),
        },
        ...routers,
      ]}
      itemRender={(route, params, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? (
          <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
        ) : (
          <span>{route.breadcrumbName}</span>
        );
      }}
      //底部显示
      footerRender={footerRender}
      //
      menuDataRender={menuDataRender}
      //显示数据映射
      formatMessage={formatMessage}
      // rightContentRender={() => <RightContent/>}
      {...props}
      {...settings}
    >
      <Authorized authority={authorized.authority} noMatch={noMatch}>
        {children}
      </Authorized>
    </ProLayout>
  );
};

export default connect(({global, settings}) => ({
  collapsed: global.collapsed,
  settings,
}))(BasicLayout);
