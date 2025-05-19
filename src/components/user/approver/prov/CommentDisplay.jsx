import React, { useState } from 'react'

const CommentDisplay = ({ comment, evaluateId, onEdit }) => {

  const r_comment = comment.map((item) => ({
    id: item.id,
    evaluateId: item.evaluateId,
    comment_text: item.comment_text,
    userId: item.userId,
    careatedAt: item.careatedAt,
    updatedAt: item.updatedAt
  }))

  const [isEditing, setIsEditing] = useState(false);
  const [editInput, setEditInput] = useState(
    r_comment.map(rm1=>
      rm1.evaluateId === evaluateId
        ? rm1.comment_text
        : null
    ),evaluateId
);

  const handleUpdate = () => {
    if (editInput.trim()) {
      onEdit(editInput.trim());
      setIsEditing(false);
    }
  };

  return (
    <div>
      {isEditing ? (
        <>
          <textarea
            value={editInput}
            onChange={(e) => setEditInput(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button
            onClick={handleUpdate}
            className="mt-2 bg-green-500 text-white px-4 py-1 rounded"
          >
            Save
          </button>
        </>
      ) : (
        <>
          {
            r_comment.map((item)=>
                item.evaluateId === evaluateId 
                  ? <p  className="p-2 border bg-gray-100 rounded">{item.comment_text}</p>
                  : ''
            )
          }
            
          <button
            onClick={() => setIsEditing(true)}
            className="mt-2 bg-yellow-500 text-white px-4 py-1 rounded"
          >
            Edit
          </button>
        </>
      )}
    </div>
  )
}

export default CommentDisplay
