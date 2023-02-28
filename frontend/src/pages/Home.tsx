import { Box, Button, Switch } from '@mui/material';
import React from 'react';
import {
   useAppThemeContext,
   useAuthContext,
} from '../shared/contexts';
import { DarkMode } from '@mui/icons-material';
import UnTextField from '../shared/forms/UnTextField';
import { Form } from '@unform/web';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ErrorAlert from '../shared/components/error-alert/ErrorAlert';
import { ENVIRONMENT } from '../shared/environment';
const Home = () => {
   const { toggleTheme, themeName } = useAppThemeContext();
   const { isLogadoMethod } = useAuthContext();

   const navigate = useNavigate();

   const [errorAvisoLoginOpen, setErrorAvisoLoginOpen] = React.useState(false)

   React.useEffect(() => {
      axios.get(`${ENVIRONMENT.BASE_URL}/test`).then((res)=>{ console.log('test',res)})
      const idInt = 32;
      fetch(`${ENVIRONMENT.BASE_URL}/cliente/${idInt}`)
      .then(res => res.json())
      .then(data => console.log(data))
   });

   const handleLogin = (data: any) => {
      console.log(data);
      axios.get(`${ENVIRONMENT.BASE_URL}/test`).then(response =>{
         console.log(response)
      })

      axios
         .post(`${ENVIRONMENT.BASE_URL}/session`, data)
         .then((response) => {
            console.log(response);
            if (response.status === 201 || response.status === 200) {
               localStorage.setItem(
                  'user_login',
                  JSON.stringify(response.data.id),
               );
               if (localStorage.getItem('user_login')) {
                  isLogadoMethod();
                  navigate('/tickets');
                  window.location.reload();
               }
            } else{
               setErrorAvisoLoginOpen(true)
            }
         })
         .catch((error) => {
            console.log(error)
            setErrorAvisoLoginOpen(true)
         });
   };

   const handleToCadastro = () => {
      navigate('/cadastro');
   };

   return (
      <Form onSubmit={handleLogin}>
         <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            height={'100%'}
            minHeight={'100vh'}
         >
            <Box>
               <UnTextField label="CNPJ" name="cnpj" type="text" />
               <Box marginTop={1}>
                  <UnTextField label="Senha" name="senha" type="password" />
               </Box>
               <Box
                  marginTop={1}
                  display={'flex'}
                  justifyContent={'space-between'}
               >
                  <Button
                     sx={{ width: '48%' }}
                     variant="contained"
                     color="primary"
                     onClick={handleToCadastro}
                  >
                     Cadastrar
                  </Button>
                  <Button
                     sx={{ width: '48%' }}
                     variant="contained"
                     color="primary"
                     type="submit"
                  >
                     Entrar
                  </Button>
               </Box>
               <Box
                  mt={2}
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
               >
                  <DarkMode color={'primary'} />
                  <Switch
                     onChange={toggleTheme}
                     checked={themeName === 'dark'}
                  />
               </Box>
               <Box>
                  <ErrorAlert
                  alertText='Erro no Login'
                  setOpenAlert={setErrorAvisoLoginOpen}
                  openAlert={errorAvisoLoginOpen}
                  />
               </Box>
            </Box>
         </Box>
      </Form>
   );
};

export default Home;
