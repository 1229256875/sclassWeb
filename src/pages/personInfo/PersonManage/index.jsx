import React, {useState} from 'react';
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';
import styles from './index.less';

const {Option} = Select;
const AutoCompleteOption = AutoComplete.Option;
const residences = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

const RegistrationForm = (props) => {

  const [confirmDirty, setConfirmDirty] = useState(false);
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();
    // this.props.form.validateFieldsAndScroll((err, values) => {
    //   if (!err) {
    //     console.log('Received values of form: ', values);
    //   }
    // });
  };

  const handleConfirmBlur = e => {
    const {value} = e.target;
    // this.setState({
    //   confirmDirty: this.state.confirmDirty || !!value,
    // });
  };

  const compareToFirstPassword = (rule, value, callback) => {
    const {form} = props;

    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  const validateToNextPassword = (rule, value, callback) => {
    const {form} = props;

    // if (value && this.state.confirmDirty) {
    //   form.validateFields(['confirm'], {
    //     force: true,
    //   });
    // }

    callback();
  };

  const handleWebsiteChange = value => {
    let autoCompleteResult;

    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }

    this.setState({
      autoCompleteResult,
    });
  };


  const {getFieldDecorator} = props.form;

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 12,
      },
      sm: {
        span: 12,
      },
    },
    wrapperCol: {
      xs: {
        span: 12,
      },
      sm: {
        span: 12,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 12,
        offset: 0,
      },
      sm: {
        span: 12,
        offset: 0,
      },
    },
  };
  const prefixSelector = getFieldDecorator('prefix', {
    initialValue: '86',
  })(
    <Select
      style={{
        width: 70,
      }}
    >
      <Option value="86">+86</Option>
      <Option value="87">+87</Option>
    </Select>,
  );
  const websiteOptions = autoCompleteResult.map(website => (
    <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
  ));

  return <div>
    <Form layout={'inline'} {...formItemLayout} onSubmit={handleSubmit}>
      <Form.Item label="E-mail" style={{
        marginTop: 20,
        marginLeft: 20,
      }}>
        {getFieldDecorator('email', {
          rules: [
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ],
        })(<Input style={{
            width: '100%',
          }}/>)}
      </Form.Item>
      <Form.Item label="Password" hasFeedback
                 style={{
                   marginLeft: 50,
                   marginTop: 20,
                 }}>
        {getFieldDecorator('password', {
          rules: [
            {
              required: true,
              message: 'Please input your password!',
            },
            {
              validator: validateToNextPassword,
            },
          ],
        })(<Input.Password/>)}
      </Form.Item>
      <br/>
      <Form.Item label="Confirm Password" hasFeedback
                 style={{
                   marginTop: 20,
                   marginLeft: 20,
                 }}>
        {getFieldDecorator('confirm', {
          rules: [
            {
              required: true,
              message: 'Please confirm your password!',
            },
            {
              validator: compareToFirstPassword,
            },
          ],
        })(<Input.Password onBlur={handleConfirmBlur}/>)}
      </Form.Item>
      <Form.Item style={{
        marginLeft: 50,
        marginTop: 20,
      }}
                 label={
                   <span>
              Nickname&nbsp;
                     <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
                 }
      >
        {getFieldDecorator('nickname', {
          rules: [
            {
              required: true,
              message: 'Please input your nickname!',
              whitespace: true,
            },
          ],
        })(<Input/>)}
      </Form.Item>
      <br/>
      <Form.Item label="Habitual Residence"
                 style={{
                   marginTop: 20,
                   marginLeft: 20,
                 }}>
        {getFieldDecorator('residence', {
          initialValue: ['zhejiang', 'hangzhou', 'xihu'],
          rules: [
            {
              type: 'array',
              required: true,
              message: 'Please select your habitual residence!',
            },
          ],
        })(<Cascader options={residences}/>)}
      </Form.Item>
      <Form.Item label="Phone Number"
                 style={{
                   marginLeft: 50,
                   marginTop: 20,
                 }}>
        {getFieldDecorator('phone', {
          rules: [
            {
              required: true,
              message: 'Please input your phone number!',
            },
          ],
        })(
          <Input
            addonBefore={prefixSelector}
            style={{
              width: '100%',
            }}
          />,
        )}
      </Form.Item>
      <br/>
      <Form.Item label="Website" style={{
        marginTop: 20,
        marginLeft: 20,
      }}>
        {getFieldDecorator('website', {
          rules: [
            {
              required: true,
              message: 'Please input website!',
            },
          ],
        })(
          <AutoComplete
            dataSource={websiteOptions}
            onChange={handleWebsiteChange}
            placeholder="website"
          >
            <Input/>
          </AutoComplete>,
        )}
      </Form.Item>
      {/*<Form.Item label="Captcha" extra="We must make sure that your are a human."*/}
      {/*           style={{*/}
      {/*             marginLeft: 50,*/}
      {/*             marginTop: 20,*/}
      {/*           }}>>*/}
      {/*  <Row gutter={8}>*/}
      {/*    <Col span={12}>*/}
      {/*      {getFieldDecorator('captcha', {*/}
      {/*        rules: [*/}
      {/*          {*/}
      {/*            required: true,*/}
      {/*            message: 'Please input the captcha you got!',*/}
      {/*          },*/}
      {/*        ],*/}
      {/*      })(<Input/>)}*/}
      {/*    </Col>*/}
      {/*    <Col span={12}>*/}
      {/*      <Button>Get captcha</Button>*/}
      {/*    </Col>*/}
      {/*  </Row>*/}
      {/*</Form.Item>*/}
      {/*<Form.Item {...tailFormItemLayout}>*/}
      {/*  {getFieldDecorator('agreement', {*/}
      {/*    valuePropName: 'checked',*/}
      {/*  })(*/}
      {/*    <Checkbox>*/}
      {/*      I have read the <a href="">agreement</a>*/}
      {/*    </Checkbox>,*/}
      {/*  )}*/}
      {/*</Form.Item>*/}
      <br/>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          修改
        </Button>
      </Form.Item>
    </Form>
  </div>
}


const WrappedRegistrationForm = Form.create({
  name: 'personManage',
})(RegistrationForm);

export default () => (
  <div className={styles.container}>
    <div id="components-form-demo-register">
      <WrappedRegistrationForm/>
    </div>
  </div>
);
