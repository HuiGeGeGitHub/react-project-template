import React, { memo, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Input, Form, Button, Checkbox, Icon, Tooltip} from "antd";
import { axios } from "../../utils/tools";
import "./Login.scss";
export interface LoginProps {
    setDraft: Function;
}
const WrappedNormalLoginForm: any = Form.create({ name: 'normal_login' })(NormalLoginForm);
const Login = memo(function Login(props: LoginProps) {
    return (
        <div className="loginWrap">
            <div className="loginForm">
                <p className="title">AI虚拟主播后台管理系统</p>
                <section className="inputWrap">
                    <WrappedNormalLoginForm {...props} />
                </section>
            </div>
        </div>
    );
});
function NormalLoginForm (props) {
    const { history } = props
    const { getFieldDecorator } = props.form;
    return (
        <Form onSubmit={e => {
            e.preventDefault()
            props.form.validateFields((err, values) => {
                if(err){
                    return false
                }
                let { password, username, remember } = values
                history.replace('/manage/solution')
            })
        }} 
        className="login-form">
            <Form.Item>
                {getFieldDecorator("username", {
                    rules: [
                        {
                            required: true,
                            message: "请输入账户!"
                        },
                        {
                            type: 'string',
                            message: '请输入合法名称!',
                        },
                        {
                            max: 20,
                            message: '最多输入20字符!',
                        },
                    ]
                })(
                    <Input
                        prefix={
                            <Icon
                                type="user"
                                style={{ color: "rgba(0,0,0,.25)" }}
                            />
                        }
                        maxLength={20}
                        allowClear
                        size="large"
                        placeholder="账户"
                    />
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator("password", {
                    rules: [
                        {
                            required: true,
                            message: "请输入您的密码!"
                        },
                        {
                            max: 15,
                            message: '密码最多输入15字符!',
                        },
                    ]
                })(
                    <Input
                        size="large"
                        maxLength={15}
                        prefix={
                            <Icon
                                type="lock"
                                style={{ color: "rgba(0,0,0,.25)" }}
                            />
                        }
                        allowClear
                        type="password"
                        placeholder="密码"
                    />
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator("remember", {
                    valuePropName: "checked",
                    initialValue: true
                })(<Checkbox>自动登录</Checkbox>)}
                <Tooltip placement="top" title='请联系开发人员更改'>
                    <span className="login-form-forgot">
                        忘记密码
                    </span>
                </Tooltip>
            </Form.Item>
            <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="login-form-button"
            >
                登录
            </Button>
        </Form>
    )
}
function validateToPassword(rule, value) {
    if(value.length > 10) {
        return false
    }
}
export default connect(state => {
    return {};
})(Login);
