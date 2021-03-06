import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import slash from 'slash2';
import themePluginConfig from './themePluginConfig';
import proxy from './proxy';
import webpackPlugin from './plugin.config';
const { pwa } = defaultSettings; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION, REACT_APP_ENV } = process.env;
const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site';
const plugins = [
  ['umi-plugin-antd-icon-config', {}],
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
          workboxPluginMode: 'InjectManifest',
          workboxOptions: {
            importWorkboxFrom: 'local',
          },
        }
        : false, // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
      //   exclude: ['@babel/runtime', 'netlify-lambda'],
      // },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
];

if (isAntDesignProPreview) {
  // 针对 preview.pro.ant.design 的 GA 统计代码
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-72788897-6',
    },
  ]);
  plugins.push(['umi-plugin-antd-theme', themePluginConfig]);
}

export default {
  plugins,
  hash: true,
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'teacher', 'student'],
          routes: [
            {
              path: '/',
              redirect: '/welcome',
              authority: ['admin', 'user'],
            },
            {
              path: '/welcome',
              name: 'welcome',
              icon: 'smile',
              component: './Welcome',
              authority: ['admin', 'student', 'teacher'],
            }, // {
            //   path: '/admin',
            //   name: 'admin',
            //   icon: 'crown',
            //   component: './Admin',
            //   authority: ['admin', 'teacher'],
            //   routes: [
            //     {
            //       path: '/admin/sub-page',
            //       name: 'sub-page',
            //       icon: 'smile',
            //       component: './Welcome',
            //       authority: ['admin', 'student', 'teacher'],
            //     },
            //   ],
            // },
            // 课程信息
            {
              name: 'course',
              icon: 'smile',
              path: '/course',
              component: './course',
              authority: ['student', 'teacher'],
            }, //历史课程
            {
              name: 'history',
              icon: 'smile',
              path: '/historyCourse',
              component: './historyCourse',
              authority: ['student'],
            },
            {
              name: 'history',
              icon: 'smile',
              path: '/teacherHistoryCourse',
              component: './teacherHistoryCourse',
              authority: ['teacher'],
            },
            //添加课程
            {
              name: 'addCourse',
              icon: 'PlusOutlined',
              path: '/addCourse',
              component: './addCourse',
              authority: ['teacher'],
            }, //设置(选课)
            {
              name: 'set',
              icon: 'smile',
              path: 'set',
              authority: ['admin'],
              routes: [
                {
                  name: 'setTime',
                  icon: 'smile',
                  path: '/set/setTime',
                  component: './set/setTime',
                  authority: ['admin'],
                },
                {
                  name: 'setRoom',
                  icon: 'smile',
                  path: '/set/room',
                  component: './set/room',
                }
              ]
            }, 
             //审核课程
            {
              name: 'auditCourse',
              icon: 'smile',
              path: '/auditCourse',
              component: './auditCourse',
              authority: ['admin'],
            },//管理员历史课程
            {
              name: 'manageHistoryCourse',
              icon: 'smile',
              path: '/manageHistoryCourse',
              component: './manageHistoryCourse',
              authority: ['admin'],
            },//学院设置
            {
              name: 'setFaculty',
              icon: 'smile',
              path: '/SetFaculty',
              component: './SetFaculty',
              authority: ['admin'],
            },//账户管理
            {
              name: 'accounts',
              icon: 'smile',
              path: 'manage',
              authority: ['admin'],
              routes: [
                {
                  name: 'student',
                  icon: 'smile',
                  path: '/manage/studentManage',
                  component: './manage/studentManage',
                  authority: ['admin'],
                },
                {
                  name: 'teacher',
                  icon: 'smile',
                  path: '/manage/teacherManage',
                  component: './manage/teacherManage',
                  authority: ['admin'],
                },
                // {
                //   name: 'admin',
                //   icon: 'smile',
                //   path: '/manage/adminManage',
                //   component: './manage/adminManage',
                //   authority: ['admin'],
                // },
              
              ]
            },
             //个人信息
            {
              name: 'personInfo',
              icon: 'smile',
              path: '/personInfo',
              component: './personInfo',
            },
            {
              name: 'logout',
              icon: 'smile',
              path: '/path',
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
  },
  define: {
    REACT_APP_ENV: REACT_APP_ENV || false,
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, _, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  proxy: proxy[REACT_APP_ENV || 'dev'],
  chainWebpack: webpackPlugin,
};
