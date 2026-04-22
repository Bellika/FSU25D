const UserInfo = ({author}) => {
  return (
    <section className="author-info">
        <i>
            {author.fullname}
            <br />
            <img src={author.image} alt="profile image" height="50"/>
        </i>
    </section>
  )
}

export default UserInfo
