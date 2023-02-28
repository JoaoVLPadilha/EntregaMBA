import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import CreateTicket from '../pages/CreateTicket';
import SignUp from '../pages/SignUp';
import { useAuthContext } from '../shared/contexts';
import { useEffect } from 'react';

interface IPrivate {
  Item?:React.ReactNode;
  statusLogado: boolean
}

const Private: React.FC<IPrivate> = ({ Item, statusLogado }) => {
  const logado = statusLogado;
  return logado === true ? <div>{Item}</div> : <SignUp/>
}

export const AppRoutes = () => {
  useEffect(() =>{
    isLogadoMethod()
  },[])
  const {isLogado, isLogadoMethod} = useAuthContext();
  return (
    <Routes>
      <Route path="/login" element={<Home/>} />
      <Route path="/tickets" element={<Private statusLogado={isLogado} Item={<Dashboard/>}/>} />
      {/* <Route path="/tickets" element={<Dashboard/>} /> */}
      <Route path="/create-ticket" element={<CreateTicket/>} />

      <Route path="/cadastro" element={<SignUp/>} />

      <Route path="*" element={<Navigate to="/tickets" />} />
    </Routes>
  );
}