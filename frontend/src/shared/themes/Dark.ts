import { createTheme, TextField } from '@mui/material';
import { red, blue, yellow } from '@mui/material/colors';
// Criando um tema novo com material UI
// Material UI tem diversas bibliotecas dentro dele
// Incluindo componentes, funções e etc.
// Para esse caso precisamos importar o createTheme e usar as configurações dele para criar um tema custom
// Para funcionar esse tema temos que envolver toda aplicação dentro de ThemeProvider como feiton o App.tsx
// it could be your App.tsx file or theme file that is included in your tsconfig.json
export const DarkTheme = createTheme({

   palette: {
      mode:'dark',
      text:{
         primary:'#fff'
      },
      primary: {
         main: red[600],
         dark: red[800],
         light: red[500],
         contrastText: '#fff',
      },
      secondary: {
         main: blue[800],
         dark: blue[900],
         light: blue[700],
         contrastText: '#fff',
      },
      background: {
         default: '#303134',
         paper: '#202124',
         // paper: '#202124',
      },
   },
   typography: {
      allVariants: {
        color: '#fff'
      }
   }
});
