import React from 'react';
import { useField } from '@unform/core';
import {
   FormControl,
   InputLabel,
   MenuItem,
   Select,
   SelectProps,
   TextField,
   TextFieldProps,
   styled,
} from '@mui/material';

type TUnSelect = SelectProps & {
   name: string;
   invisible?: boolean;
   idLabel: string;
};
const UnSelect: React.FC<TUnSelect> = ({ idLabel,name, invisible, ...rest }) => {
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
         <FormControl fullWidth>
            <InputLabel id={idLabel}>Tipo Chamado</InputLabel>
            <Select
               {...rest}
               labelId={idLabel}
               id="demo-simple-select"
               label="Tipo Chamado"

               fullWidth
               name={name}
               error={!!error}
               defaultValue={defaultValue}
               value={value}
               onChange={(e) => setValue(e.target.value)}
               sx={{
                  display: invisible ? 'none' : 'block',
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
            >
               {value.map((item: {value: number, label:string}) => {
               return <MenuItem value={item.value}>item.label</MenuItem>
               })}
            </Select>
         </FormControl>
   );
};
export default UnSelect;
