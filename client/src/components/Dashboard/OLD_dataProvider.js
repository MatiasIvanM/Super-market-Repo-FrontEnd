import { fetchUtils } from "react-admin";
import { stringify } from "query-string";
import axios from 'axios';
import { PRODUCT } from "../../utils/urlLocales";

const apiUrl = "https://localhost:3001";
const httpClient = fetchUtils.fetchJson;

const dataProvider = {
    getList: () => {
        axios.get(PRODUCT)
        .then(response => {
            // Hacer algo con la respuesta de la solicitud
            console.log(response.data);
            return response.data;
        })
        .catch(error => {
            // Manejar errores
            console.error(error);
        });
    
    // getList: async (resource, params) => {
    //     return axios.get(`${apiUrl}/${resource}`)
    //     .then(response => response.data)
    //     .catch(error => {
    //         console.log("EREEEE: ")
    //         console.log(error.message);});

        // const { page, perPage } = params.pagination;
        // const { field, order } = params.sort;
        // const query = {
        //     sort: JSON.stringify([field, order]),
        //     range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
        //     filter: JSON.stringify(params.filter),
        // };
        
            // return axios.get(`apiUrl/${resource}`, { params })
            // return axios.get(`${apiUrl}/${resource}`)
           
          
        // const url = `${apiUrl}/${resource}`; //?${stringify(query)}
        // const data = await axios.get(url); //.then(({ json }) => ({ data: json }));

        // console.log(data.data);
        // return data;
        // httpClient(url)
        // .then(({ headers, json }) => ({
        //      data: json,
        //     // total: parseInt((headers.get("content-range") || "0").split("/").pop() || 0, 10),
        // }))
        // .catch(error => {
        //     // Manejo de errores
        //     // log
        //     console.log(error.message);
        //   });
    },

    getOne: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
            data: json,
        })),

    getMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        return httpClient(url).then(({ json }) => ({ data: json }));
    },

    getManyReference: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => ({
            data: json,
            total: parseInt((headers.get("content-range") || "0").split("/").pop() || 0, 10),
        }));
    },

    update: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: "PUT",
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json })),

    updateMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: "PUT",
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },

    create: (resource, params) =>
        httpClient(`${apiUrl}/${resource}`, {
            method: "POST",
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...params.data, id: json.id },
        })),

    delete: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: "DELETE",
        }).then(({ json }) => ({ data: json })),

    deleteMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: "DELETE",
        }).then(({ json }) => ({ data: json }));
    },
};

export default dataProvider;