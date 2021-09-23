import React from 'react';
import { Form, Input, Button } from 'antd';

const Login = () => {
    const [form] = Form.useForm();
    const onValuesChange = (data) => {
        console.log(data);
    }
    return (
        <div className="container">
            <h1>Login</h1>
            <Form
                form={form}
                layout="vertical"
                onValuesChange={onValuesChange}
            >
                <Form.Item label="Email">
                    <Input />
                </Form.Item>
                <Form.Item label="Password">
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary">Submit</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;