import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { CarritoProvider, CarritoContext } from './context/CarritoContext.jsx'; 
import Login from './components/Login';
import Register from './components/Register';
import ProtectedPage from './components/ProtectedPage';
import 'react-toastify/dist/ReactToastify.css';


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
import CuponesIndex from './admin/cupones.jsx/index.jsx';
import FormularioCupones from './admin/cupones.jsx/formulario.jsx';
/* function ProtectedRoute({ children }) {
  const { token } = React.useContext(AuthContext);
  return token ? children : <Navigate to="/login" />;
} */

function App() {
  return (
<CarritoProvider>
    < Router>
      <Routes>

        <Route path="/"
          element={<Home />} />

        <Route path="detalleProducto/:id"
          element={<DetalleProducto />} />
      
  


        {/*  Administrador */}
        <Route path="/admin"
          element={<LayoutAdmin />} />

        <Route path="admin/dashboard"
          element={<Dashboard />} />

<Route path="admin/cupones"
          element={<CuponesIndex />} />

<Route path="admin/cupones/:id"
          element={<FormularioCupones />} />

        <Route path="admin/producto"
          element={<ProductoIndex />} />

        <Route path="admin/producto/:id"
          element={<FormularioProducto />} />
        <Route path="admin/categoria"
          element={<CategoriaIndex />} />

        <Route path="admin/categoria/:id"
          element={<FormularioCategoria />} />

        <Route path="admin/imagen"
          element={<ImagenIndex />} />

        <Route path="admin/imagen/:id"
          element={<FormularioImagen />} />

        <Route path="admin/usuario"
          element={<UsuarioIndex />} />
       
        <Route path="admin/usuario/:id"
          element={<FormularioUsuario />} />
       
        <Route path="admin/imagen/prod/:id"
          element={<FormularioImagen />} />

<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />


        {/* <Route path="/protected" element={<ProtectedRoute><ProtectedPage /></ProtectedRoute>} /> */}



      </Routes>
    </Router>
    
    </CarritoProvider>


  );
}

export default App;
