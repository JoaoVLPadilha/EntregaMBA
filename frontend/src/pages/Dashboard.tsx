import { Box, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import Add from '../shared/components/add/Add';
import Cases from '../shared/components/cases/Cases';
import Navbar from '../shared/components/navbar/NavBar';
import axios from 'axios';
import { ENVIRONMENT } from '../shared/environment';

interface Iticket {
   tipoChamado: String;
   chamadoId: string;
   subcategoriaChamado: string;
   descricao: string;
}
interface ICliente {
   bairro: string;
   cep: string;
   cidade: string;
   cnpj: string;
   complemento: string;
   email: string;
   enderecoId: number;
   id: number;
   logradouro: string;
   numero: string;
   razaoSocial: string;
   responsavel: string;
   senhaId: string;
   telefone: string;
   uf: string;
}
const Dashboard = () => {
   const theme = useTheme();
   const mobile = useMediaQuery(theme.breakpoints.down('sm'));
   const [tickets, setTickets] = React.useState<Iticket[]>();
   const [cliente, setCliente] = React.useState<ICliente>();

   React.useEffect(() => {
      // const idCliente = window.localStorage.getItem('user_login');
      // if (typeof idCliente === 'string') {
      //    const idInt = parseInt(idCliente);
      //    axios
      //       .get(`${ENVIRONMENT.BASE_URL}/cliente/${idInt}`)
      //       .then((response) => {
      //          console.log('Cliente', response);
      //          if (response.statusText === 'OK') setCliente(response.data);
      //       });

      //    axios
      //       .get(`${ENVIRONMENT.BASE_URL}/chamados/${idInt}`,{
      //          headers: {'mode': 'no-cors'}
      //       })
      //       .then((response) => {
      //          console.log(response);
      //          setTickets(response.data);
      //       });
      // }
   }, []);

   // if (tickets)
      return (
         <Box width={'100%'} minHeight={'100vh'}>
            {/* <Navbar razaoSocial={cliente?.razaoSocial} /> */}
            <Navbar razaoSocial={'Yakult'} />
            {/* <Box padding={2} display={mobile ? 'block': 'flex'}> */}
            <Box
               padding={2}
               display={mobile ? 'block' : 'grid'}
               gridTemplateColumns={'1fr 1fr'}
               gap={2}
               position={'relative'}
            >
               {/* {tickets.map((ticket) => { */}
                  {/* return ( */}
                     <Cases
                        key={1}
                        tipoChamado={'Financeiro'}
                        idChamado={'2'}
                        categoria={'Valor do boleto incorreto'}
                        descricao={'Valor da NFE divergênte do boleto, por favor correção do valor do boleto como também acompanhar a data de vencimento com o envio do boleto com valor correto '}
                        // key={ticket.chamadoId}
                        // tipoChamado={ticket.tipoChamado}
                        // idChamado={ticket.chamadoId}
                        // categoria={ticket.subcategoriaChamado}
                        // descricao={ticket.descricao}
                     />
                     <Cases
                        key={1}
                        tipoChamado={'Financeiro'}
                        idChamado={'2'}
                        categoria={'Valor do boleto incorreto'}
                        descricao={'Valor da NFE divergênte do boleto, por favor correção do valor do boleto como também acompanhar a data de vencimento com o envio do boleto com valor correto '}
                        // key={ticket.chamadoId}
                        // tipoChamado={ticket.tipoChamado}
                        // idChamado={ticket.chamadoId}
                        // categoria={ticket.subcategoriaChamado}
                        // descricao={ticket.descricao}
                     />
                     <Cases
                        key={1}
                        tipoChamado={'Financeiro'}
                        idChamado={'2'}
                        categoria={'Valor do boleto incorreto'}
                        descricao={'Valor da NFE divergênte do boleto, por favor correção do valor do boleto como também acompanhar a data de vencimento com o envio do boleto com valor correto '}
                        // key={ticket.chamadoId}
                        // tipoChamado={ticket.tipoChamado}
                        // idChamado={ticket.chamadoId}
                        // categoria={ticket.subcategoriaChamado}
                        // descricao={ticket.descricao}
                     />
                     <Cases
                        key={1}
                        tipoChamado={'Financeiro'}
                        idChamado={'2'}
                        categoria={'Valor do boleto incorreto'}
                        descricao={'Valor da NFE divergênte do boleto, por favor correção do valor do boleto como também acompanhar a data de vencimento com o envio do boleto com valor correto '}
                        // key={ticket.chamadoId}
                        // tipoChamado={ticket.tipoChamado}
                        // idChamado={ticket.chamadoId}
                        // categoria={ticket.subcategoriaChamado}
                        // descricao={ticket.descricao}
                     />
                     <Cases
                        key={1}
                        tipoChamado={'Financeiro'}
                        idChamado={'2'}
                        categoria={'Valor do boleto incorreto'}
                        descricao={'Valor da NFE divergênte do boleto, por favor correção do valor do boleto como também acompanhar a data de vencimento com o envio do boleto com valor correto '}
                        // key={ticket.chamadoId}
                        // tipoChamado={ticket.tipoChamado}
                        // idChamado={ticket.chamadoId}
                        // categoria={ticket.subcategoriaChamado}
                        // descricao={ticket.descricao}
                     />
                     <Cases
                        key={1}
                        tipoChamado={'Financeiro'}
                        idChamado={'2'}
                        categoria={'Valor do boleto incorreto'}
                        descricao={'Valor da NFE divergênte do boleto, por favor correção do valor do boleto como também acompanhar a data de vencimento com o envio do boleto com valor correto '}
                        // key={ticket.chamadoId}
                        // tipoChamado={ticket.tipoChamado}
                        // idChamado={ticket.chamadoId}
                        // categoria={ticket.subcategoriaChamado}
                        // descricao={ticket.descricao}
                     />
                  {/* ); */}
               {/* })} */}
               <Add />
            </Box>
         </Box>
      );
   // else {
   //    return null;
   // }
};

export default Dashboard;
