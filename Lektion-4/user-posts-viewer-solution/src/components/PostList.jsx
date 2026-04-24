import React from 'react';

/**
 * PostList Component
 * - Tar emot posts array via props
 * - Renderar en lista med inlägg
 * - Visar title och body för varje inlägg
 */

function PostList({ posts }) {
    if (posts.length === 0) {
        return <div className="no-posts">No posts found</div>;
    }

    return (
        <div className="post-list">
            {posts.map(post => (
                <div key={post.id} className="post-item">
                    <h3 className="post-title">{post.title}</h3>
                    <p className="post-body">{post.body}</p>
                </div>
            ))}
        </div>
    );
}

export default PostList;
