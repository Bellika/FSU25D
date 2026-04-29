import React from 'react'
import { Link } from 'react-router-dom'
import Post from './Post.jsx';

function PostList({ posts, onDelete }) {
    if (!posts.length) {
        return <div><p>No posts found</p></div>;
    }

    return (
        <div>
            <section>
                {posts.map(post => (
                    <div key={post.id}>
                        <Link to={`/posts/${post.id}`}>
                            <Post post={post} />
                        </Link>
                    </div>
                ))}
            </section>
        </div>
    )
}

export default PostList
