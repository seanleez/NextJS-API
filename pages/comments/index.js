import { useState } from 'react';

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState([]);

  const fetchComments = async () => {
    const response = await fetch('/api/comments');
    const data = await response.json();
    setComments(data);
  };

  const postComments = async () => {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ comment }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log(data);
    fetchComments();
  };

  const deleteComment = async (commentId) => {
    const response = await fetch(`/api/comments/${commentId}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    console.log(data);
    fetchComments();
  };

  return (
    <>
      <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
      <button onClick={postComments}>Post Comment</button>
      <button onClick={fetchComments}>Fetch Comments</button>
      {
        <div>
          {comments.map((comment) => {
            return (
              <div>
                <h1>{comment.text}</h1>
                <button onClick={() => deleteComment(comment.id)}>Delete</button>
              </div>
            );
          })}
        </div>
      }
    </>
  );
};

export default Comments;
