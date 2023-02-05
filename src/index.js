import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter, Routes, Route
} from 'react-router-dom';
import { AppProvider } from './App';
import './index.css';
import Home from './pages/Home';
import About from "./pages/About";
import ShowBooks from "./components/ShowBooks/Booklist";
import Details from "./components/Details/details";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="about" element={<About />} />
          <Route path="book" element={<ShowBooks />} />
          <Route path="/book/:id" element={<Details />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AppProvider>
);