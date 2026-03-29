import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreateBlog from './pages/CreateBlog';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BlogDetail from './pages/BlogDetail';
import EditBlog from './pages/EditBlog';

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateBlog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/updateBlog/:id" element={<EditBlog />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
