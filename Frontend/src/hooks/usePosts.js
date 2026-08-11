
import { useState, useEffect, useMemo, useCallback } from 'react';
import { showToast } from '../utils/toast';
import api from '../services/api';

export function usePosts() {

    const [categories, setCategories] = useState([]);
    const [posts, setPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [loading, setLoading] = useState(false);

    const fetchCategories = useCallback(async () => {
        try {
            const response = await api.get('/categories');

            const categoriesData = response.data.data || response.data;

            setCategories(
                Array.isArray(categoriesData) ? categoriesData : []
            );
        } catch (err) {
            const errorMessage =
                err.response?.data?.message ||
                'Failed to fetch categories.';

            showToast.error('Category Fetch Failed', errorMessage);
        }
    }, []);

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [postToEdit, setPostToEdit] = useState(null);

    // Delete confirmation state
    const [postToDelete, setPostToDelete] = useState(null);

    // Fetch all posts from backend API
    const fetchPosts = useCallback(async () => {
        setLoading(true);
        try {
            const response = await api.get('/posts');
            const postsData = response.data.data || response.data;
            setPosts(Array.isArray(postsData) ? postsData : []);
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to fetch posts.';
            showToast.error('Fetch Failed', errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPosts();
        fetchCategories();
    }, [fetchPosts, fetchCategories]);

    // Filtered posts based on search query and status filter
    const filteredPosts = useMemo(() => {
        return posts.filter((post) => {
            const title = post.title || '';
            const slug = post.slug || '';
            const author = post.author || '';
            const query = searchQuery.toLowerCase();

            const matchesSearch = 
                title.toLowerCase().includes(query) ||
                slug.toLowerCase().includes(query) ||
                author.toLowerCase().includes(query);
            
            const matchesStatus = statusFilter === 'All' || post.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [posts, searchQuery, statusFilter]);

    // Open Modal for Add or Edit
    const handleOpenModal = (post = null) => {
        setPostToEdit(post);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setPostToEdit(null);
        setIsModalOpen(false);
    };

    // Save Post (Create / Update via Backend API with Multipart Form Data)
    const handleSavePost = async (postData) => {
        setLoading(true);

        try {
            const postId =
                postData.id ||
                postData._id ||
                postToEdit?._id ||
                postToEdit?.id;

            const formData = new FormData();

            formData.append('title', postData.title || '');
            formData.append('slug', postData.slug || '');
            formData.append('excerpt', postData.excerpt || '');
            formData.append('content', postData.content || '');
            formData.append('category', postData.category || 'Technology');
            formData.append('author', postData.author || 'Subhro Mondal');
            formData.append('status', postData.status || 'Published');

            // New image
            if (postData.image instanceof File) {
                formData.append('image', postData.image);
            }

            // Debug
            // console.log('========== FORM DATA ==========');

            // for (const [key, value] of formData.entries()) {
            //     console.log(key, value);
            // }

            // console.log('================================');

            if (postId) {
                // UPDATE
                const response = await api.put(
                    `/posts/${postId}`,
                    formData
                );

                const updatedPost =
                    response.data.data || response.data;

                setPosts((prev) =>
                    prev.map((post) =>
                        post._id === postId || post.id === postId
                            ? updatedPost
                            : post
                    )
                );

                showToast.success(
                    'Post Updated',
                    'Blog post details updated successfully.'
                );
            } else {
                // CREATE
                const response = await api.post(
                    '/posts',
                    formData
                );

                const newPost =
                    response.data.data || response.data;

                setPosts((prev) => [newPost, ...prev]);

                showToast.success(
                    'Post Created',
                    'New blog post added successfully.'
                );
            }

            handleCloseModal();
            await fetchPosts();

            return true;

        } catch (err) {
            console.error('Save Post Error:', err);

            const errorMessage =
                err.response?.data?.message ||
                'Failed to save post details.';

            showToast.error(
                'Operation Failed',
                errorMessage
            );

            return false;

        } finally {
            setLoading(false);
        }
    };

    // Delete Post
    const handleDeletePost = async (id) => {
        try {
            await api.delete(`/posts/${id}`);
            setPosts((prev) => prev.filter((post) => post._id !== id && post.id !== id));
            setPostToDelete(null);
            showToast.success('Post Deleted', 'Blog post has been removed successfully.');
            return true;
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to delete post.';
            showToast.error('Action Failed', errorMessage);
            return false;
        }
    };

    return {
        posts: filteredPosts,
        categories,
        totalCount: posts.length,
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
        loading,
        isModalOpen,
        postToEdit,
        postToDelete,
        setPostToDelete,
        handleOpenModal,
        handleCloseModal,
        handleSavePost,
        handleDeletePost,
        refetchPosts: fetchPosts,
    };
}