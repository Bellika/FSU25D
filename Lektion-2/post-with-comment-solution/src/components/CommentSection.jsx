import UserInfo from './UserInfo'

const CommentSection = ({comment}) => {
  return (
    <section id="comment-section">
        <h2>Comment Section</h2>
        <article className="comment">
        <p>
            {comment.content}
            <br />
            <i>{comment.date.toLocaleDateString()}</i>
        </p>

        <UserInfo author={comment.author} />
        </article>
    </section>
  )
}

export default CommentSection
