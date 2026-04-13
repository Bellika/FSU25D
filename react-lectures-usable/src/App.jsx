import './App.css'
import Jsx from './components/1.JSX/Jsx'
import Comment from './components/2.ComponentsAndProps/comment/Comment'

function App() {

  {/* Object belongs to lecture "2. Components and Props" */}
  const comment = {
    date: new Date(),
    text: 'I hope you enjoy learning React! Allthough its pretty confusing',
    author: {
      name: 'Gandalf',
      avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnM9puG0_-QuKcdciM_yeEbwUhaKY-YmeCeQ&s'
    }
  };

  return (
    <div className="App">
     
      {/* 2. Components and Props */}
      {/* 
      <Comment 
        author={comment.author}
        text={comment.text}
        date={comment.date}
      /> */}

      {/* 1. JSX examples */}
      {/* <Jsx /> */}
    </div>
  )
}

export default App
