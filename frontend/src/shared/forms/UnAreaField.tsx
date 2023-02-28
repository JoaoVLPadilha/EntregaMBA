import React from 'react';
import { useField } from '@unform/core';
import { TextField, TextFieldProps, styled } from '@mui/material';

type TUnTextField = TextFieldProps & {
   name: string;
};
const UnTextField: React.FC<TUnTextField> = ({ name, ...rest }) => {
   const { fieldName, registerField, defaultValue, error, clearError } =
      useField(name);

   const [value, setValue] = React.useState(defaultValue || '');

   React.useEffect(() => {
      registerField({
         name: fieldName,
         getValue: () => value,
         setValue: (_, newValue) => setValue(newValue),
      });
   }, [registerField, fieldName, value]);

   return (
      <TextField
         {...rest}
         fullWidth
         name={name}
         error={!!error}
         helperText={error}
         defaultValue={defaultValue}
         value={value}
         onChange={(e) => setValue(e.target.value)}
         onKeyDown={() => (error ? clearError() : undefined)}
         // Style
         id="outlined-multiline-static"
         label="Descricao"
         multiline
         rows={4}
         placeholder="Descreva seu problme"
         sx={{
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
         }}
      />
   );
};
export default UnTextField;
