import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import {
   AppThemeProvider,
   AuthProvider,
   DrawerProvider,
} from './shared/contexts';
import LeftDrawer from './shared/components/drawer/LeftDrawer';

export const App = () => {
   return (
      <AppThemeProvider>
         <AuthProvider>
            <DrawerProvider>
               <BrowserRouter>
                  <LeftDrawer>
                     <AppRoutes />
                  </LeftDrawer>
               </BrowserRouter>
            </DrawerProvider>
         </AuthProvider>
      </AppThemeProvider>
   );
};
