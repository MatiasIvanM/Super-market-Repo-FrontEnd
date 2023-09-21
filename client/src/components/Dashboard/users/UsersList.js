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
} from 'react-admin';
import { Link } from 'react-router-dom';

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

const UsersList = (props) => (
        <List {...props} actions={<ListActions />} filters={userFilters}>
        <DatagridConfigurable>
            <TextField source="id" />
            <TextField source="name" />
            <EmailField source="email" />
            <TextField source = "role" />
            <EditButton label="Editar" />
            <CustomLinkField record={props.record} />
        </DatagridConfigurable>
    </List>
);
const CustomLinkField = ({ record }) => {
    if (record && record.id) {
        return <Link to={`/userDetail/${record.id}`}>Detalles</Link>;
    }
    return null;
};

export default UsersList
 