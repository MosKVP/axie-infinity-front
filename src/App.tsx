import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import NavBar from "./layout/NavBar";
import BreedingCalculator from "./pages/breedingCalculator";
import Footer from "./layout/Footer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <ToastContainer />
      <div className='container'>
        <Routes>
          <Route path='/' element={<BreedingCalculator />} />
          <Route path='/breeding-calculator' element={<BreedingCalculator />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
