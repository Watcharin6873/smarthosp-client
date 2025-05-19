import React, { useEffect, useState } from 'react'
import { Button, Form, Input } from 'antd'
import useGlobalStore from '../../../../store/global-store'


const { TextArea } = Input

const CommentForm = ({ evaluateId, onSubmit }) => {

    const [formAdd] = Form.useForm()

    

    const handleSubmit = (fieldValue) =>{
        onSubmit(fieldValue)
    }

    const onFinishFailed = (errorInfo) =>{
        console.log('ErrorInfo: ', errorInfo)
    }


    return (
        <>
            <Form
                form={formAdd}
                name='formAdd'
                onFinish={handleSubmit}
                onFinishFailed={onFinishFailed}
                layout='vertical'
            >
                <Form.Item
                    name='comment_text'
                    rules={[
                        {
                            required:true,
                            message:'กรุณากรอกความคิดเห็น'
                        }
                    ]}
                >
                    <TextArea placeholder='แสดงความคิดเห็นได้ที่นี่!' />
                </Form.Item>
                <Form.Item
                    name='evaluateId'
                    initialValue={evaluateId}
                    hidden={true}
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type='primary' size='small' htmlType='submit' block>
                        Comment
                    </Button>
                </Form.Item>
            </Form>
        </>

    )
}

export default CommentForm
