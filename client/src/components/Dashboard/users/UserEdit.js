
import { Edit, SimpleForm, TextInput, EmailField} from 'react-admin';

const UserEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name" label="Nombre" />
            <EmailField source="email" label="Correo Electrónico" />
            <TextInput source="address" label="Dirección" />
        </SimpleForm>
    </Edit>
);

export default UserEdit;