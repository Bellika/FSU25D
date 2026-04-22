import './App.css'
import Header from './components/header'
import Main from './components/Main'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'

function App() {
  return (
    <div id="container">
        <Header />
        
        <div id="content">
          <Sidebar />
          <Main />
        </div>

        <Footer />
    </div>
  )
}

export default App
