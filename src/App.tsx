import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import NavBar from "./layout/NavBar";
import BreedingCalculator from "./pages/breedingCalculator";
import Footer from "./layout/Footer";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
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
