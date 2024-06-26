import './App.css';
import Home from './Screens/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './Screens/Login';
import Signin from './Screens/Signin.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import { CartProvider } from './components/ContextReducer.js';
import MyOrder from './Screens/MyOrder.js';

function App() {
  return (
  
   <CartProvider>
    <Router>
    <div>
      <Routes>
        <Route exact path='/'element={<Home/>}/>
        <Route exact path='/Login'element={<Login/>}/>
        <Route exact path='/createuser'element={<Signin/>}/>
        <Route exact path='/MyOrder'element={<MyOrder />}/>
        
      </Routes>

    </div>

   </Router>
   </CartProvider>
  
  );
}

export default App;
