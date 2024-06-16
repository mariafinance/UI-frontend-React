import React from 'react';
import './App.css';
import NavbarColored from './Components/NavbarColored';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes';



export default function App() {
  return (
    <Router>
      <div className="App">
        <NavbarColored />
        <div className="pt-5"> {/* Bootstrap class for padding-top */}
          <AppRoutes />
        </div>
      </div>
    </Router>
  )
};
