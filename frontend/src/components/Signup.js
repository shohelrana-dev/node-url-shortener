import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, Divider } from 'antd';
import apiEndpoints from '../api-endpoints';

const Signup = () => {

    const [errors, setErrors] = useState([]);

    const submitForm = (data) => {
        axios.post(apiEndpoints.signup, { ...data })
            .then(res => {
                setErrors([]);
                console.log(res.data);
            })
            .catch(err => {
                setErrors(err.response.data.errors);
            });
    }

    console.log(errors);

    return (
        <div className="container">
            <div style={{ maxWidth: '350px', margin: 'auto' }}>
                <Divider />
                <h1 className="text-center">Signup</h1>
                <Divider />
                <Form
                    layout="vertical"
                    onFinish={submitForm}
                    style={{ background: '#cccccc2e', padding: '25px' }}
                >
                    <Form.Item label="Name" name="name">
                        <Input name="name" />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                        <Input name="email" />
                    </Form.Item>
                    <Form.Item label="Password" name="password">
                        <Input name="password" />
                    </Form.Item>
                    <Form.Item label="Confirm Password" name="confirmPassword">
                        <Input name="confirmPassword" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Signup;