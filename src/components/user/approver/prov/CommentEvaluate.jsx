import React, { useState } from 'react'
import { Button, Input } from 'antd'


const { TextArea } = Input

const CommentEvaluate = ({id}) => {
    const [comment, setComment] = useState("")
    const [isEditing, setIsEditing] = useState(true);

    const handleConfirm = () => {
        if (comment.trim() !== "") {
            setIsEditing(false);
        }
    }

    const handleEdit = () => {
        setIsEditing(true);
    };

    return (
        <>
            {isEditing ? (
                <>
                    <div className='mb-1'>
                        <TextArea
                            className='w-full p-2 border rounded'
                            rows={2}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="พิมพ์ความคิดเห็นที่นี่..."
                        />
                    </div>
                    <div className='mb-1'>
                        <Button
                            type='primary'
                            size='small'
                            onClick={handleConfirm}
                        >
                            บันทึก
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    <div className="p-2 bg-gray-100 border rounded">{comment}</div>
                    <Button
                        className="bg-yellow-500 text-white rounded mt-1"
                        onClick={handleEdit}
                        size='small'
                    >
                        แก้ไข
                    </Button>
                </>
            )}

        </>

    )
}

export default CommentEvaluate
