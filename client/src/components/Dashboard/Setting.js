import { Card, CardContent, CardHeader } from "@mui/material";
import { Create, FileInput, SimpleForm, FileField, DateInput, NumberInput}  from 'react-admin';
import formCarrousel from './carrousel/formCarrousel';


const currentDate = new Date();

const Setting = () => (
    
        <>
        <Create>
        <SimpleForm>
        
            <NumberInput source="dolar" step="0.01"  required/>
            <DateInput source = "hoy"  defaultValue={currentDate} disabled/>
        </SimpleForm>
        {/* <SimpleForm> */}
        {/* </SimpleForm> */}
    </Create>
           {/* <formCarrousel/> */}
        </>
           
);

export default Setting 