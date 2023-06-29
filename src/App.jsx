import React, { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchScreen from './components/SearchScreen';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './pages/login';
import DashboardPage from './pages/dashboard';
import HomePage from './pages/home';


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path:"/login",
    element: <LoginPage />
  },
  {
    path:"/dashboard",
    element: <DashboardPage />
  }
]);
function App() {
  const [uniqueId, setUniqueId] = useState('');
  useEffect(() => {

  }, []);

  return (
    <div className="App">
          <RouterProvider router={router} />
      {/* <Header />
      {uniqueId ? (
        <Dashboard uniqueId={uniqueId} />
      ) : (
        <SearchScreen onUniqueIdChange={setUniqueId} />
      )}
      <Footer /> */}
    </div>
  );
}

export default App;