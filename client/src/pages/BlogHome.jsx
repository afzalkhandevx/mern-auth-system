import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const BlogHome = () => {
  const { backendUrl, isLoggedin, userData } = useContext(AppContext);
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/api/posts`, {
        params: { page, limit: 5, search },
      });
      setPosts(data.posts);
      setTotalPages(data.totalPages);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  };

  const stripAndTrim = (html, len = 150) => {
    const text = html.replace(/<[^>]+>/g, '');
    return text.length > len ? text.slice(0, len) + '...' : text;
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-10 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Blog</h1>
          {isLoggedin && (
            <button
              onClick={() => navigate('/blog/create')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full text-sm font-medium transition"
            >
              + New Post
            </button>
          )}
        </div>

        <form onSubmit={handleSearchSubmit} className="flex gap-2 mb-8">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search posts..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            type="submit"
            className="bg-gray-800 hover:bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-medium transition"
          >
            Search
          </button>
        </form>

        {loading ? (
          <p className="text-center text-gray-500 py-10">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-500 py-10">No posts found.</p>
        ) : (
          <div className="space-y-5">
            {posts.map((post) => (
              <div
                key={post._id}
                onClick={() => navigate(`/blog/${post._id}`)}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md p-6 cursor-pointer transition border border-gray-100"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h2>
                <p className="text-gray-600 text-sm mb-3">{stripAndTrim(post.content)}</p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>By {post.author?.name || 'Unknown'}</span>
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-4 py-2 rounded-full text-sm border border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 rounded-full text-sm border border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogHome;
