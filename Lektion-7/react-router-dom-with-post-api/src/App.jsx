import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Nav from './components/Nav.jsx';
import Posts from './pages/Posts.jsx';
import Post from './pages/Post.jsx';
import CreatePost from './pages/CreatePost.jsx';
import EditPost from './pages/EditPost.jsx';
import Contact from './pages/Contact.jsx';

function App() {
  return (
    <div className="App">
      {/* BrowserRouter enables component to use the routing capabilities  */}
      <BrowserRouter>
        <Nav />

        <Routes>
          {/* Home page */}
          <Route path="/" element={<Home />} />

          {/* Posts routes */}
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/create" element={<CreatePost />} />
          <Route path="/posts/:id" element={<Post />} />
          <Route path="/posts/:id/edit" element={<EditPost />} />

          {/* Contact page */}
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
