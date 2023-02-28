import {
   Box,
   Button,
   TextField,
   useMediaQuery,
   useTheme,
} from '@mui/material';
import React from 'react';
import UnTextField from '../shared/forms/UnTextField';
import { Form } from '@unform/web';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../shared/contexts';
import ErrorAlert from '../shared/components/error-alert/ErrorAlert';
import { ENVIRONMENT } from '../shared/environment';

interface IbuscaEndereco {
   endereco: {
      logradouro: string;
      bairro: string;
      cidade: string;
      estado: string;
   };
}

const SignUp = () => {
   const theme = useTheme();
   const navigate = useNavigate();
   const {isLogado} = useAuthContext()
   const [errorAvisoCadastroOpen, setErrorAvisoCadastroOpen] = React.useState(false)
   React.useEffect(() =>{
      console.log(isLogado)
      if(isLogado){
         navigate('./tickets')
      }
   },[navigate, isLogado])

   const formRef = React.useRef<any>(null);

   const mobile = useMediaQuery(theme.breakpoints.down('sm'));

   const [buscaEndereco, setBuscaEndereco] = React.useState<IbuscaEndereco>({
      endereco: {
         logradouro: '',
         bairro: '',
         cidade: '',
         estado: '',
      },
   });

   const handleSubmitCadastro = (data: any) => {
      console.log(data);
      axios
         .post(`${ENVIRONMENT.BASE_URL}/cliente`, data)
         .then((response) => {
            console.log(response);
            if (response.status === 201 || response.status === 200) {
               navigate('/login')
            } else{
               setErrorAvisoCadastroOpen(true)
            }
         })
         .catch((error) => {
            console.log(error);
            setErrorAvisoCadastroOpen(true)
         });
   };

   const [buscaLogradouro, setbuscaLogradouro] = React.useState<
      string | undefined
   >();
   const [buscaCep, setBuscaCep] = React.useState<string | undefined>(``);

   const handleBuscaCEP = () => {
      console.log(buscaCep);

      axios(`https://viacep.com.br/ws/${buscaCep}/json`).then((data) => {
         console.log(data);
         buscaEndereco!.endereco.logradouro = data.data.logradouro;
         setbuscaLogradouro(data.data.logradouro);
         console.log('formRef', formRef);
         formRef!.current!.setFieldValue(
            'endereco.logradouro',
            data.data.logradouro,
         );
         formRef!.current!.setFieldValue(
            'endereco.cidade',
            data.data.localidade,
         );
         formRef!.current!.setFieldValue(
            'endereco.cep',
            data.data.cep.replace('-', ''),
         );
         formRef!.current!.setFieldValue('endereco.bairro', data.data.bairro);
         formRef!.current!.setFieldValue('endereco.uf', data.data.uf);
         console.log(buscaEndereco);
         console.log(buscaLogradouro);
      });
   };
   const handleBack = () => {
      navigate('/login');
   };
   return (
      <Form onSubmit={handleSubmitCadastro} ref={formRef}>
         <Box
            padding={2}
            height={'100%'}
            minHeight={'94vh'}
            display="flex"
            justifyContent={'center'}
            alignItems="center"
            flexDirection={'column'}
         >
            <Box width={'60%'} mb={2}>
               <UnTextField label="Razão Social" name="razaoSocial" />
            </Box>
            <Box width={'60%'} mb={2}>
               <UnTextField label="CNPJ" name="cnpj" />
            </Box>
            <Box width={'60%'} mb={2}>
               <UnTextField label="Senha" name="senha" />
            </Box>
            <Box width={'60%'} mb={2}>
               <UnTextField label="Responsável" name="responsavel" />
            </Box>
            <Box width={'60%'} mb={2}>
               <UnTextField label="Telefone" name="telefone" />
            </Box>
            <Box width={'60%'} mb={2}>
               <UnTextField label="Email" name="email" />
            </Box>
            <Box
               width={'60%'}
               mb={2}
               display={mobile ? 'block' : 'flex'}
               alignItems={'center'}
            >
               <Box
                  width={mobile ? '100%' : '50%'}
                  marginRight={1}
                  marginBottom={mobile ? 1 : 0}
               >
                  <TextField
                     fullWidth
                     onChange={(e) => {
                        setBuscaCep(e.target.value);
                     }}
                     value={buscaCep}
                     label="CEP"
                     name="cep"
                  />
               </Box>
               <Box width={mobile ? '100%' : '50%'}>
                  <Button
                     fullWidth
                     variant="contained"
                     color="primary"
                     onClick={handleBuscaCEP}
                  >
                     Buscar
                  </Button>
               </Box>
            </Box>
            <Box width={'60%'} display={'flex'}>
               <Box width={'50%'} mb={2} marginRight={1}>
                  <UnTextField label="Número" name="endereco.numero" />
               </Box>
               <Box width={'50%'}>
                  <UnTextField
                     label="Complemento"
                     name="endereco.complemento"
                  />
               </Box>
            </Box>
            <Box width={'60%'} mb={2}>
               <UnTextField disabled label="Rua" name="endereco.logradouro" />
            </Box>
            <Box width={'60%'} display={mobile ? 'block' : 'flex'}>
               <Box width={mobile ? '100%' : '50%'} mb={2} marginRight={1}>
                  <UnTextField disabled label="Cidade" name="endereco.cidade" />
               </Box>
               <Box width={mobile ? '100%' : '50%'} mb={2} marginRight={1}>
                  <UnTextField disabled label="Estado" name="endereco.uf" />
               </Box>
               <Box marginBottom={mobile ? 2 : 0}>
                  <UnTextField disabled label="Bairro" name="endereco.bairro" />
               </Box>
               <UnTextField name="endereco.cep" invisible={true} />
            </Box>
            <Box width={'60%'}>
               <ErrorAlert
                  alertText='Erro no cadastro, verifique as informações'
                  openAlert={errorAvisoCadastroOpen}
                  setOpenAlert={setErrorAvisoCadastroOpen}
               />
            </Box>
            <Box
               display={'flex'}
               justifyContent={'space-between'}
               width={mobile ? '60%' : '40%'}
            >
               <Button variant="contained" color="primary" onClick={handleBack}>
                  voltar
               </Button>
               <Button variant="contained" color="primary" type="submit">
                  Cadastrar
               </Button>
            </Box>
         </Box>
      </Form>
   );
};

export default SignUp;
