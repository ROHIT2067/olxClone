import Home from "./pages/home";
import { Routes, Route } from "react-router-dom";
import Details from "./components/details/details";
import Wishlist from "./pages/wishlist";

function App(){
  return <>
        <Routes>
    <Route  path='/' element={<Home/>}/>
    <Route path='/details/:productId' element={<Details/>}/>
    <Route path='/wishlist' element={<Wishlist/>}/>
   </Routes>
        </>
}
export default App
