import React from 'react'
import Avatar from './Avatar';
import UserInfo from './UserInfo';

const Comment = ({author, text, date}) => {
    return (
        <div className="Comment">
         {/* Version 1: before reafactoring */}
          {/* <div className="UserInfo">
            <img className="Avatar"
              src={author.avatarUrl}
              alt={author.name}
            />
            <div className="UserInfo-name">
              {author.name}
            </div>
          </div> */}

          {/* Version 2: refactoring to avator componentbefore reafactoring */}
          {/* <div className="UserInfo">
           <Avatar author={author} />
            <div className="UserInfo-name">
              {author.name}
            </div>
          </div> */}


          {/* Version 3: Reafcotr userinfo */}
  
          <UserInfo author={author} />
          <div className="Comment-text">
            {text}
          </div>
          <div className="Comment-date">
            {formatDate(date)}
          </div>
        </div>
    );
}

function formatDate(date) {
    return date.toLocaleDateString();
}

export default Comment