import React from 'react'

const Post = ({title, content}) => {
  return (
    <div>
        <h3>{title}</h3>
        <p>{content}</p>
    </div>
  )
}

export default Post