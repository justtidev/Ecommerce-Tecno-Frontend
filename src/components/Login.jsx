import React, { useState, useContext, useEffect } from 'react';
/* import { AuthContext } from '../context/AuthContext'; */
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios"

const Login = () => {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
/*   const { login, token } = useContext(AuthContext); */
 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        contraseña,
    });
    console.log(response)
    if(response.data.ok) {
      alert( 'Inicio de sesión exitoso');
    
    const rol = response.data.usuario.rol;

    if (rol === 'Usuario') {
      // Redirigir a la página de usuario
      navigate('/')
    } else if (rol === 'Administrador') {
      // Redirigir a la página del administrador
     navigate('/admin/')
    } else {
      // Si el rol no es válido, mostramos un mensaje de error
      alert("error, no autorizado");
    }
  } else {
    alert('Error usuario o contraseña incorrecto');
  }
} catch (error) {
  console.log('Error al iniciar sesión:', error);
 
};
}

 
  return (
    <form className='' onSubmit={handleSubmit}>
      <input type="email" placeholder="Usuario" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="contraseña" placeholder="Contraseña" value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
      <button type="submit">Iniciar sesión</button>
    </form>
  );
};

export default Login;
