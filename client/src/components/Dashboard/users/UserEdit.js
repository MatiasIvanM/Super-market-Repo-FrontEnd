
import {
    Edit,
    SimpleForm,
    TextInput,
    SelectInput,
    PasswordInput,
    useShowController,
} from 'react-admin';

const UserDetails = ({ record }) => {
    return (
        <div>
            <h2>Detalles del Usuario</h2>
            <p><strong>Nombre:</strong> {record.name}</p>
            <p><strong>Dirección:</strong> {record.adress}</p>
            <p><strong>Correo Electrónico:</strong> {record.email}</p>
            <p><strong>Rol:</strong> {record.role}</p>
            <p><strong>Télefono:</strong> {record.phone}</p>
            <p><strong>Cuenta:</strong> {record.provider}</p>
        </div>
    );
};

const UserEdit = (props) => {
    const { record } = useShowController(props);

    return (
        <Edit {...props}>
            <UserDetails record={record} />
            <SimpleForm>
                <TextInput source="name" label="Nombre" />
                <TextInput source="email" label="Correo Electrónico" />
                <TextInput source="address" label="Dirección" />
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
        </Edit>
    );
};

export default UserEdit;