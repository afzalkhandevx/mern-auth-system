import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import CommentSection from '../components/CommentSection';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { backendUrl, userData } = useContext(AppContext);

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPost = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/posts/${id}`);
      setPost(data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load post');
      navigate('/blog');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Delete this post? This cannot be undone.')) return;
    try {
      await axios.delete(`${backendUrl}/api/posts/${id}`);
      toast.success('Post deleted');
      navigate('/blog');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete post');
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500 py-20">Loading...</p>;
  }

  if (!post) return null;

  const isAuthor = userData && post.author?._id === userData._id;

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-10 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <button
          onClick={() => navigate('/blog')}
          className="text-sm text-indigo-600 hover:text-indigo-800 mb-6"
        >
          ← Back to Blog
        </button>

        <h1 className="text-3xl font-bold text-gray-800 mb-3">{post.title}</h1>

        <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
          <span>By {post.author?.name || 'Unknown'}</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>

        <div className="text-gray-700 leading-relaxed whitespace-pre-wrap mb-6">
          {post.content}
        </div>

        {isAuthor && (
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button
              onClick={() => navigate(`/blog/edit/${post._id}`)}
              className="px-4 py-2 rounded-full text-sm border border-gray-300 hover:bg-gray-100 transition"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 rounded-full text-sm border border-red-300 text-red-600 hover:bg-red-50 transition"
            >
              Delete
            </button>
          </div>
        )}

        <CommentSection postId={post._id} />
      </div>
    </div>
  );
};

export default PostDetail;
