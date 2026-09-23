import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { backendUrl, isLoggedin, userData } = useContext(AppContext);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoggedin) {
      toast.info('Please login first');
      navigate('/login');
      return;
    }

    const fetchPost = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/posts/${id}`);

        if (userData && data.author?._id !== userData._id) {
          toast.error('You are not authorized to edit this post');
          navigate(`/blog/${id}`);
          return;
        }

        setTitle(data.title);
        setContent(data.content);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to load post');
        navigate('/blog');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isLoggedin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error('Title and content are required');
      return;
    }

    setSubmitting(true);
    try {
      await axios.put(`${backendUrl}/api/posts/${id}`, {
        title: title.trim(),
        content: content.trim(),
      });
      toast.success('Post updated!');
      navigate(`/blog/${id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update post');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500 py-20">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-10 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Post</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={12}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full text-sm font-medium transition disabled:opacity-50"
            >
              {submitting ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={() => navigate(`/blog/${id}`)}
              className="px-6 py-2 rounded-full text-sm border border-gray-300 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
