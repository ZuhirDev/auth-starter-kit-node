import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from '@/routes/router';
import { Toaster } from 'sonner';
import React from 'react'

const App = () => {
  return (
    <div>
        <Toaster expand position="top-right" />
        <RouterProvider router={router} />
        
    </div>
  )
}

export default App;
