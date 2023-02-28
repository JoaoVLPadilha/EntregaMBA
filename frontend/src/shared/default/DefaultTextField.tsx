import React from 'react';
import { TextField, TextFieldProps, styled } from '@mui/material';
import { useAppThemeContext } from '../contexts';

type IDefaultTextField = TextFieldProps & {
   label: string;
   name: string;
   type?: string;
   fontFamily?: string;
   className?: string;
   value?: string;
}
const DefaultTextField: React.FC<IDefaultTextField> = ({
   label,
   name,
   type = 'text',
   fontFamily = 'Roboto',
   className,
   value,
   ...rest
}) => {

   const {themeName} = useAppThemeContext()


   const DTextField = styled(TextField)({
      '& label.Mui-focused': {
         color: '#EB3936',
      },
      '& .MuiInput-underline:after': {
         borderBottomColor: 'green',
      },
      '& .MuiOutlinedInput-root': {
         // '& fieldset': {
         //    borderColor: themeName === 'dark' ?'#CCCCCC': '#aaa',
         // },
         '&:hover fieldset': {
            borderColor: '#e53935',
         },
         '&.Mui-focused fieldset': {
            borderColor: '#EB3936',
         },
      },
   });

   return (
      <DTextField
         label={label}
         className={className}
         name={name}
         type={type}
         value={value}
         inputProps={{ style: { fontFamily: fontFamily} }}
         fullWidth={true}
         onChange={(e) =>{console.log(e.target.value)}}
         {...rest}
      />
   );
};

export default DefaultTextField;
