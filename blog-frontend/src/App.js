import {BrowserRouter,Routes,Route,} from "react-router-dom"
import Header from './Components/Navbar/Header';
import { Home,Blog,About,Contact,Login,Registration } from "./pages/page";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <Header/>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/blog" element={<Blog />}/>
      <Route path="/about" element={<About />}/>
      <Route path="/contact" element={<Contact />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/registration" element={<Registration />}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
