import react from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Search from './components/Search';
import ProductDetail from './components/ProductDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}
export default App;