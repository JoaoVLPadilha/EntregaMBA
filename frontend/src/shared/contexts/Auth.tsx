import { createContext, useState, useContext } from 'react';
interface IAuthContextData {
   isLogado: boolean;
   isLogadoMethod: () => void;
 }

export const AuthContext = createContext({} as IAuthContextData);

interface IAuthProivder {
   children?: React.ReactNode | JSX.Element[];
}

export const useAuthContext = () => {
   return useContext(AuthContext);
 };
export const AuthProvider: React.FC<IAuthProivder> = ({ children }) => {
   const [isLogado, setIsLogado] = useState<boolean>(false);
   // const []
   
   const isLogadoMethod = () => {
      const userToken = localStorage.getItem("user_login");
      if(userToken){
         setIsLogado(true)
      }
    }
   

   return <AuthContext.Provider value={{isLogadoMethod, isLogado}}>{children}</AuthContext.Provider>;
};
