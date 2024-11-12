import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import axios from 'axios';
import App from './App.jsx'
import Home from './Home.jsx';
import Dashboard from './admin/Dashboard.jsx';
import LayoutAdmin from './admin/LayoutAdmin.jsx';
import ImagenIndex from "./admin/imagen/index.jsx";
import FormularioImagen from './admin/imagen/formulario.jsx';
import CategoriaIndex from './admin/categoria/index.jsx';
import FormularioCategoria from './admin/categoria/formulario.jsx';
import ProductoIndex from './admin/producto/index.jsx';
import FormularioProducto from './admin/producto/formulario.jsx';
import UsuarioIndex from './admin/usuario/index.jsx';
import FormularioUsuario from './admin/usuario/formulario.jsx';
import DetalleProducto from './components/DetalleProducto.jsx';

import './index.css'

axios.defaults.baseURL = 'http://localhost:3000';
//axios.defaults.baseURL = 'https://libros-arg.com';
/*axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
axios.defaults.headers.common['Content-Type'] = 'application/json'; */


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      
    ]
  },
  
    {
      path: "detalleProducto/:id",
      element: <DetalleProducto />,
    },

  

  {
    path: "/admin",    
    element: <LayoutAdmin />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "producto",
        element: <ProductoIndex />,
      },
      {
        path: "producto/:id",
        element: <FormularioProducto />,
      },
      {
        path: "categoria",
        element: <CategoriaIndex />,
      },
      {
        path: "categoria/:id",
        element: <FormularioCategoria />,
      },
      {
        path: "imagen",
        element: <ImagenIndex />,
      },
      {
        path: "imagen/:id",
        element: <FormularioImagen />,
      },
      {
        path: "usuario",
        element: <UsuarioIndex />,
      },
      {
        path: "usuario/:id",
        element: <FormularioUsuario />,
      },
      {
        path: "imagen/prod/:id",
        element: <FormularioImagen />,
      },     
    ],
  },
    
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}  />
    
   
  
  </StrictMode>,
)

