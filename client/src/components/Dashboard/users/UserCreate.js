import { Create, SimpleForm, TextInput, PasswordInput, NumberInput, SelectInput } from 'react-admin';

const UserCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" label="Nombre" />
            <TextInput source="email" label="Correo Electrónico" type="email" />
            <TextInput source="address" label="Dirección" />
            <NumberInput source="phone" label="Telefono" />
            <PasswordInput source="password" label="Contraseña" />
            <SelectInput
                source="role"
                label="Rol"
                choices={[
                    { id: 'user', name: 'Usuario' },
                    { id: 'admin', name: 'Administrador' },
                ]}
                />
        </SimpleForm>
    </Create>
);


export default UserCreate;
