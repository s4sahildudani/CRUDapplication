
import './App.css';
import {BrowserRouter ,Routes ,Route} from "react-router-dom";
import Home from './pages/Home';
import MaterialUI from './pages/MaterialUI';
function App() {
  return (
    <div className="App"> 
       <BrowserRouter>
         <Routes>
          <Route path='/'  element={<Home />} />
          <Route path='/materialui'  element={<MaterialUI />} />
         </Routes>
       </BrowserRouter>
    </div>
  );
}
export default App;