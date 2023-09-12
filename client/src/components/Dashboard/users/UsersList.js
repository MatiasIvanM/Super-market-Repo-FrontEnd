import {
    CreateButton,
    DatagridConfigurable,
    ExportButton,
    FilterButton,
    List,
    SelectColumnsButton,
    TopToolbar,
    TextInput,
    TextField,
    EmailField,
    EditButton,
    Create, 
} from 'react-admin';
import { Link } from 'react-router-dom';
import IconEvent from '@mui/icons-material/Event';

const ListActions = () => (
    <TopToolbar>
        <SelectColumnsButton />
        <FilterButton/>
        <CreateButton/>
        <ExportButton/>
    </TopToolbar>
);

const userFilters = [
    <TextInput label="Search" source="q" alwaysOn />,
    <TextInput label="name" source="name" defaultValue="" />,
    <TextInput label="email" source="email" defaultValue="" />,
];

const UsersList = () => (
    <List actions={<ListActions/>} filters={userFilters}>
        <DatagridConfigurable>
            <TextField source="id" />
            <TextField source="name" />
            <EmailField source="email" />
            <EditButton label="Editar" />
            {/* <Link to="/users/create">Crear Usuario</Link> */}
        </DatagridConfigurable>
    </List>
);

export default UsersList
 