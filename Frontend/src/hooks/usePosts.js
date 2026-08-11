
import { useState, useMemo } from 'react';
import { showToast } from '../utils/toast';

const INITIAL_POSTS = [
    {
        id: '1',
        title: 'Mastering React and Vite for Fast Development',
        slug: 'mastering-react-and-vite',
        excerpt: 'Learn how to set up a lightning-fast modern web development environment using Vite and React.',
        category: 'Technology',
        author: 'Subhro Mondal',
        status: 'Published',
        publishDate: '2026-06-10',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100'
    },
    {
        id: '2',
        title: 'Top 10 Productivity Tips for Remote Developers',
        slug: 'top-10-productivity-tips',
        excerpt: 'Simple daily habits to boost your focus, coding speed, and overall well-being while working from home.',
        category: 'Lifestyle',
        author: 'John Doe',
        status: 'Draft',
        publishDate: '2026-06-12',
        image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=100'
    }
];

export function usePosts(initialPosts = INITIAL_POSTS) {
    
    const [posts, setPosts] = useState(initialPosts);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [loading, setLoading] = useState(false);

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [postToEdit, setPostToEdit] = useState(null);

    // Delete confirmation state
    const [postToDelete, setPostToDelete] = useState(null);

    // Filtered posts based on search query and status filter
    const filteredPosts = useMemo(() => {
        return posts.filter((post) => {
            const matchesSearch = 
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.author.toLowerCase().includes(searchQuery.toLowerCase());
            
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

    // Save Post (Create / Update)
    const handleSavePost = (postData) => {
        if (postData.id || postToEdit?.id) {
            // Edit existing post
            const targetId = postData.id || postToEdit.id;
            setPosts((prev) =>
                prev.map((post) => (post.id === targetId ? { ...post, ...postData, id: targetId } : post))
            );
            showToast.success('Post Updated', 'Blog post details updated successfully.');
        } else {
            // Add new post
            const newPost = {
                ...postData,
                id: Date.now().toString(),
                publishDate: new Date().toISOString().split('T')[0],
            };
            setPosts((prev) => [newPost, ...prev]);
            showToast.success('Post Created', 'New blog post added successfully.');
        }
        handleCloseModal();
    };

    // Delete Post
    const handleDeletePost = (id) => {
        setPosts((prev) => prev.filter((post) => post.id !== id));
        setPostToDelete(null);
        showToast.success('Post Deleted', 'Blog post has been removed successfully.');
    };

    return {
        posts: filteredPosts,
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
    };
}