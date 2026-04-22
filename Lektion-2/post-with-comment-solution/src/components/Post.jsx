import { useState } from 'react'
import CommentSection from './CommentSection'
import UserInfo from './UserInfo'

const Post = ({post, comment}) => {
  const [displayComments, setDisplayComments] = useState(true)

  return (
    <article id="post">
        <h1>{post.headline}</h1>
        <i>{post.date.toLocaleDateString()}</i>
        <p>{post.content}</p>

        <UserInfo author={post.author}/>

        <br />
        <button onClick={() => setDisplayComments(!displayComments)}>
          Show/hide comments
        </button>
        {displayComments && <CommentSection comment={comment} />}
    </article>
  )
}

export default Post
