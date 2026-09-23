import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';

const CommentSection = ({ postId }) => {
  const { backendUrl, isLoggedin, userData } = useContext(AppContext);

  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchComments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/comments/${postId}`);
      setComments(data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load comments');
    }
  };

  useEffect(() => {
    if (postId) fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    if (!isLoggedin) {
      toast.info('Please login to comment');
      return;
    }

    setSubmitting(true);
    try {
      const { data } = await axios.post(`${backendUrl}/api/comments/${postId}`, {
        content: text.trim(),
      });
      setComments((prev) => [data, ...prev]);
      setText('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to post comment');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await axios.delete(`${backendUrl}/api/comments/${commentId}`);
      setComments((prev) => prev.filter((c) => c._id !== commentId));
      toast.success('Comment deleted');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete comment');
    }
  };

  return (
    <div className="mt-10">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Comments ({comments.length})
      </h3>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={isLoggedin ? 'Write a comment...' : 'Login to comment'}
          disabled={!isLoggedin}
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400 disabled:bg-gray-100"
        />
        <button
          type="submit"
          disabled={!isLoggedin || submitting}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full text-sm font-medium transition disabled:opacity-50"
        >
          Post
        </button>
      </form>

      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-sm text-gray-400">No comments yet. Be the first!</p>
        ) : (
          comments.map((c) => (
            <div key={c._id} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">
                  {c.author?.name || 'Unknown'}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </span>
                  {userData && c.author?._id === userData._id && (
                    <button
                      onClick={() => handleDelete(c._id)}
                      className="text-xs text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-600">{c.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
