import React from 'react'
import {Link} from 'react-router-dom';

function Post({post}) {
  return (
    <article>      
        <Link to={`/posts/${post.id}`}><h2>{post.title}</h2></Link>
        
        <p>{post.body}</p>
    </article>
  )
}

export default Post