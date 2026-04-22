import React from 'react';

/**
 * PostList Component
 *
 * TODO:
 * 1. Ta emot posts via props
 * 2. Om posts.length === 0, rendera: <div className="no-posts">No posts found</div>
 * 3. Annars, rendera en <div className="post-list">
 * 4. Använd .map() för att loopa genom posts
 * 5. För varje post, rendera:
 *    - <div key={post.id} className="post-item">
 *    - <h3 className="post-title">{post.title}</h3>
 *    - <p className="post-body">{post.body}</p>
 */

function PostList({ posts }) {
    // TODO: Implementera komponenten
    return (
        <div className="post-list">
            <p>TODO: Implementera PostList enligt instruktionerna ovan</p>
        </div>
    );
}

export default PostList;
