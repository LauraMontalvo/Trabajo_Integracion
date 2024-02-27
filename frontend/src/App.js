// Importa las librerías necesarias
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RegistroUsuario from './Components/Administracion/RegistroUsuario';
import LoginForm from './Views/Usuarios/LoginUsuario';
import LoginFormEmpresa from './Views/Empresa/LoginEmpresa';

import DetalleUsuario from './Views/Usuarios/DetalleUsuario';
import LoginAdminForm from './Views/Administrador/LoginAdmin';
import AdminConsola from './Views/Administrador/AdminConsola';
import Main from './Views/General/Main';
import EditarUsuario from './Components/Usuario/EditarUsuarioComp';
import * as constantes from './Models/Constantes';
import ListaUsuarios from './Views/Administrador/ListaUsuarios';
import DetalleEmpresa from './Views/Empresa/DetalleEmpresa';
import EditarEmpresa from './Components/Empresa/EditarEmpresaComp';
import LoadingModal from './Views/General/LoadingModal';
import ListaInstituciones from './Views/Administrador/ListaInstituciones';
import ListaEmpresas from './Views/Administrador/ListaEmpresas';
import PerfilEmpresa from './Views/General/Perfilempresa';
import PerfilUsuario from './Views/General/PerfilUsuario';
import InicioResumen from './Views/General/InicioResumen';
import ListaUsuariosResumen from './Views/General/ListaUsuariosResumen';
import ListaEmpresasResumen from './Views/General/ListaEmpresasResumen';
import ListaEmpleosResumen from './Views/General/ListaEmpleosResumen';
import ModuloReportes from './Views/Administrador/ModuloReportes/ModuloReportes';
import ListaPostulacionesAdmin from './Views/Administrador/ListaPostulacionesAdmin';
import BuscarEmpleo from './Views/Usuarios/BuscarEmpleo';
import RegistroUsuarioUS from './Components/Usuario/RegistrarUsuarioUS';
import ListaAdministradores from './Views/Administrador/ListaAdministradores';
import PerfilUsuarioAdmin from './Views/Administrador/PerfilUsuarioAdmin';
import PerfilEmpresaAdmin from './Views/Administrador/PerfilEmpresaAdmin';
import PerfilempresaUser from './Views/Usuarios/PerfilempresaUser';
import PerfilUsuarioEmpresa from './Views/Empresa/PerfilUsuarioEmpresa';
import ListaEmpresasExternas from './Views/Administrador/ListaEmpresasExternas';
import InicioResumenUsuario from './Views/Usuarios/InicioResumenUsuario';
import ListaEmpresasExternasUser from './Views/Usuarios/ListaEmpresasExternasUser';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = true; // O define el valor adecuado según tu lógica de autenticación

  useEffect(() => {
    // Lógica de simulación de carga
    const simulateAsyncLoad = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);  // Ajusta el tiempo de simulación según tus necesidades
    };

    simulateAsyncLoad();
  }, []);

  return (
    <Router>
      <>
        {isLoading ? (
          <LoadingModal />
        ) : (
          <Routes>
            <Route path={constantes.URL_PAGINA_PRINCIPAL} element={<Main />} />
            {/*Usuario*/}
            <Route path="/loginusuario" element={<LoginForm />} />
            <Route path="/detalleUsuario/:id" element={<DetalleUsuario isAuthenticated={isAuthenticated} />} />
            <Route path="/buscarEmpleos/:id" element={<BuscarEmpleo />} />
            <Route path="/perfilEmpresa/:id/:idEmpresa/" element={<PerfilempresaUser />} />
            <Route path="/resumenUsuario/:id/:usuario" element={<InicioResumenUsuario isAuthenticated={isAuthenticated} />} />
            <Route path="resumenUsuario/usuariosResumen/:id/:usuario" element={<ListaUsuariosResumen isAuthenticated={isAuthenticated}/>} />
            <Route path="resumenUsuario/empresasResumen/:id/:usuario" element={<ListaEmpresasResumen isAuthenticated={isAuthenticated}/>} />
            <Route path="resumenUsuario/empleosResumen/:id/:usuario" element={<ListaEmpleosResumen isAuthenticated={isAuthenticated} />} />
            <Route path="resumenUsuario/empresasexternas/:id/:usuario" element={<ListaEmpresasExternasUser isAuthenticated={isAuthenticated}/>} />

            {/*Empresa*/}
            <Route path="/empresa" element={<LoginFormEmpresa />} />
            <Route path="/detalleEmpresa/:id" element={<DetalleEmpresa />} />
            <Route path="/perfilUsuario/:id/:idUsuario/" element={<PerfilUsuarioEmpresa />} />
            <Route path="/resumen/:id/:usuario" element={<InicioResumen isAuthenticated={isAuthenticated} />} />
            <Route path="resumen/usuariosResumen/:id/:usuario" element={<ListaUsuariosResumen isAuthenticated={isAuthenticated}/>} />
            <Route path="resumen/empresasResumen/:id/:usuario" element={<ListaEmpresasResumen isAuthenticated={isAuthenticated}/>} />
            <Route path="resumen/empleosResumen/:id/:usuario" element={<ListaEmpleosResumen isAuthenticated={isAuthenticated} />} />

            {/*Admin*/}
            <Route path="/admin" element={<LoginAdminForm />} />
            <Route path="/admin/consola/:id" element={<AdminConsola />} />
            <Route path="/admin/consola/listaEmpresas/:id" element={<ListaEmpresas />} />
            <Route path="/admin/consola/listaEmpresasExternas/:id" element={<ListaEmpresasExternas />} />
            <Route path="/admin/consola/listaUsuarios/:id" element={<ListaUsuarios />} />
            <Route path="/admin/consola/listaPostulacionesAdmin/:id" element={<ListaPostulacionesAdmin />} />
            <Route path="/admin/consola/listaAdministradores/:id" element={<ListaAdministradores />} />
            <Route path="/admin/consola/listaInstituciones/:id" element={<ListaInstituciones />} />
            <Route path="/admin/consola/moduloReportes/:id" element={<ModuloReportes />} />
            <Route path="/admin/perfil-empresa/:id/:idEmpresa" element={<PerfilEmpresaAdmin />} />
         <Route path="/admin/perfilUsuario/:id/:idUsuario" element={<PerfilUsuarioAdmin />} />

            {/*General tanto clientes como empresas*/}
            <Route path="/perfil-empresa/:id/:idEmpresa/:usuario" element={<PerfilEmpresa />} />
            <Route path="/perfilUsuario/:id/:idUsuario/:usuario" element={<PerfilUsuario />} />
          
    
          </Routes>
        )}
      </>
    </Router>
  );
}

export default App;
