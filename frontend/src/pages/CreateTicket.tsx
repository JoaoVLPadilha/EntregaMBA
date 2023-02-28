import {
   Box,
   Button,
   FormControl,
   InputLabel,
   MenuItem,
   OutlinedInput,
   Select,
   TextField,
   useMediaQuery,
   useTheme,
} from '@mui/material';
import React from 'react';
import UnTextField from '../shared/forms/UnTextField';
import UnAreaField from '../shared/forms/UnTextField';
import { Form } from '@unform/web';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SuccessAlert from '../shared/components/success-alert/SuccessAlert';
import ErrorAlert from '../shared/components/error-alert/ErrorAlert';
import { ENVIRONMENT } from '../shared/environment';
const CreateTicket = () => {
   const theme = useTheme();
   const formRef = React.useRef<any>(null);
   const navigate = useNavigate();
   const mobile = useMediaQuery(theme.breakpoints.down('sm'));
   let widthContainer = mobile ? '80%': '60%';
   const [optionsChamado, setOptionsChamado] = React.useState<
      { id: number; descricao: string }[]
   >([]);
   const [optionsCategoria, setOptionsCategoria] = React.useState<
      { id: number; descricao: string }[]
   >([]);
   const [tipoChamado, setTipoChamado] = React.useState<number>();
   const [categoria, setCategoria] = React.useState('');
   const [cnpjInput, setCnpjInput] = React.useState<string>('');
   const [fornecedorRazaoSocial, setFornecedorRazaoSocial] = React.useState('');

   const [openAviso, setOpenAviso] = React.useState(false);
   const [openErrorAviso, setOpenErrorAviso] = React.useState(false);
   const [openErrorCreateAviso, setOpenErrorCreateAviso] = React.useState(false);

   React.useEffect(() => {
      axios.get(`${ENVIRONMENT.BASE_URL}/tipo-chamado`).then((response) => {
         console.log(response);
         if (response.status === 200) setOptionsChamado(response.data);
      });
   }, [tipoChamado]);

   const handleTipoChamadoSelect = (e: any) => {
      console.log('e.target.value', e.target.value);
      setTipoChamado(e.target.value);
      formRef!.current!.setFieldValue('tipoChamadoId', e.target.value);
      axios
         .get(`${ENVIRONMENT.BASE_URL}/subcategoria-chamado/${e.target.value}`)
         .then((response) => {
            setOptionsCategoria(response.data);
            console.log(response);
         });
   };

   const handleBuscaCnpj = () => {
      let parseClientId;
      axios
         .get(`${ENVIRONMENT.BASE_URL}/fornecedor/?cnpj=${cnpjInput}`)
         .then((response) => {
            console.log(response)
            if(response.status === 200){

               console.log(response);
               setFornecedorRazaoSocial(response.data.razaoSocial);
               console.log(cnpjInput);
               formRef!.current!.setFieldValue('fornecedorId', response.data.id);
            }else{
               setOpenErrorAviso(true)
            }
         }).catch((error)=>{
            if(error){
               setOpenErrorAviso(true)
            }
         });
      const clientId = window.localStorage.getItem('user_login');
      if (typeof clientId === 'string') {
         parseClientId = parseInt(clientId);
      }
      formRef!.current!.setFieldValue('clienteId', parseClientId);
   };

   const handleSubmitTicket = (data: any) => {
      console.log('data', data);
      axios
         .post(`${ENVIRONMENT.BASE_URL}/chamado`, data)
         .then((response) => {
            console.log(response);
            if (response.status === 200 || response.status === 201) {
               setOpenAviso(true);
            } else{
               setOpenErrorCreateAviso(true)
            }
         })
         .catch((error) => {
            console.log(error);
            setOpenErrorCreateAviso(true)
         });
   };

   const handleVoltar = () => {
      navigate(-1);
   };

   // const getOptions = (tipoChamadoParam: any) => {
   //    axios
   //    .get(`${ENVIRONMENT.BASE_URL}/subcategoria-chamado/${tipoChamadoParam}`)
   //    .then((response) => {
   //       setOptionsCategoria(response.data);
   //       console.log(response);
   //    });
   // }

   return (
      <Form onSubmit={handleSubmitTicket} ref={formRef}>
         <Box
            padding={2}
            height={'100%'}
            minHeight={'100vh'}
            display="flex"
            justifyContent={'center'}
            alignItems="center"
            flexDirection={'column'}
         >
            <Box width={widthContainer}>
               <SuccessAlert
                  alertText='Ticket criado'
                  openAlert={openAviso}
                  setOpenAlert={setOpenAviso}
               />
               <ErrorAlert
                  alertText={'Erro ao criar o chamado'}
                  openAlert={openErrorCreateAviso}
                  setOpenAlert={setOpenErrorCreateAviso}
               />
            </Box>
            <Box width={widthContainer} mb={2}>
               <FormControl fullWidth>
                  <InputLabel id="tipoChamadoLabel">Tipo Chamado</InputLabel>
                  <Select
                     // defaultValue={optionsChamado[0]}
                     labelId="tipoChamadoLabel"
                     id="tipoChamadoId"
                     value={tipoChamado}
                     onChange={handleTipoChamadoSelect}
                     input={<OutlinedInput value={''} label="Tipo Chamado" />}
                  >
                     {optionsChamado.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                           {item.descricao}
                        </MenuItem>
                     ))}
                  </Select>
               </FormControl>
               <UnTextField
                  name="tipoChamadoId"
                  label="Tipo chamado"
                  invisible={true}
               />
            </Box>
            <Box width={widthContainer} mb={2}>
               <FormControl fullWidth>
                  <InputLabel id="categoria">Categoria</InputLabel>
                  <Select
                     defaultValue={''}
                     labelId="categoria"
                     // id="demo-simple-select"
                     value={categoria}
                     label="Categoria"
                     onChange={(e) => {
                        formRef!.current!.setFieldValue(
                           'subcategoriaChamadoId',
                           e.target.value,
                        );
                        setCategoria(e.target.value);
                     }}
                  >
                     {optionsCategoria.map((item) => {
                        return (
                           <MenuItem
                              key={item.id}
                              color={theme.palette.text.primary}
                              value={item.id}
                           >
                              {item.descricao}
                           </MenuItem>
                        );
                     })}
                  </Select>
                  <UnTextField
                     name="subcategoriaChamadoId"
                     label="Categoria"
                     invisible={true}
                  />
               </FormControl>
            </Box>
            <Box width={widthContainer} mb={2} display={'flex'} alignItems={'center'}>
               <Box width={'100%'} marginRight={1}>
                  <TextField
                     fullWidth
                     defaultValue={''}
                     value={cnpjInput}
                     onChange={(e) => {
                        setCnpjInput(e.target.value);
                        console.log(e.target.value);
                     }}
                     label="CNPJ Fornecedor"
                     name="cnpjBuscar"
                  />
               </Box>
               <Box>
                  <Button
                     variant="contained"
                     color="primary"
                     onClick={handleBuscaCnpj}
                  >
                     Buscar
                  </Button>
               </Box>
            </Box>
            <Box width={widthContainer}>
               <ErrorAlert setOpenAlert={setOpenErrorAviso} openAlert={openErrorAviso} alertText={'CNPJ Não encontrado'}/>
            </Box>
            <Box width={widthContainer} mb={2}>
               <TextField
                  disabled
                  fullWidth
                  value={fornecedorRazaoSocial}
                  onChange={(e) => {
                     setFornecedorRazaoSocial(e.target.value);
                     console.log(e.target.value);
                  }}
                  label="Razão Social Fornecedor"
                  name="razaoSocialFornecedor"
               />
            </Box>
            <Box width={widthContainer} mb={2}>
               <UnAreaField
                  fullWidth
                  id="outlined-multiline-static"
                  label="Descricao"
                  name="descricao"
                  multiline
                  rows={4}
                  placeholder="Descreva seu problema"
               />
            </Box>
            <Box display={'flex'} justifyContent={'space-between'} width={widthContainer}>
               <Box marginRight={0}>
                  <Button
                     variant="contained"
                     color="primary"
                     onClick={handleVoltar}
                  >
                     Voltar
                  </Button>
               </Box>
               <Box>
                  <Button variant="contained" color="primary" type="submit">
                     Criar Ticket
                  </Button>
               </Box>
            </Box>
            <UnTextField
                     invisible={true}
                     label="Id Fornecedor"
                     name="fornecedorId"
                  />
                  <UnTextField
                     invisible={true}
                     label="clienteId"
                     name="clienteId"
                  />
         </Box>
      </Form>
   );
};

export default CreateTicket;
