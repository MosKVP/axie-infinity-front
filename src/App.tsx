import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BreedingCalculator from "./pages/BreedingCalculator";
import NotFound from "./pages/NotFound";
import NavBar from "./layout/NavBar";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/breeding-calculator' element={<BreedingCalculator />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
