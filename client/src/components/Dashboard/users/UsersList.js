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
    ShowButton,
    EditButton, 
} from 'react-admin';

const ListActions = () => (
    <TopToolbar>
        <SelectColumnsButton />
        <FilterButton/>
        <CreateButton/>
        <ExportButton/>
    </TopToolbar>
);

const userFilters = [
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
            <ShowButton record={props.record} label="Ver" basepath="/customer" />
        </DatagridConfigurable>
    </List>
);

export default UsersList
 