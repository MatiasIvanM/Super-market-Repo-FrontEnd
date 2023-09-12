import axios from 'axios';
import { stringify } from 'query-string';

const url = 'http://localhost:3001'; 

const httpClient = axios.create({
  baseURL: url,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const dataProvider = {
    //Trae la lista de registros de un recurso. Falta la paginacion
  getList: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      _page: page,
      _limit: perPage,
      _sort: field,
      _order: order,
      ...params.filter,
      // ...params.filter,
      // _sort: field,
      // _order: order,
      // _start: ( 1) * 10,
      // _start: (page - 1) * perPage,
      // _end: 5 * 10,
      // _end: page * perPage,

    };
    const url = `${resource}?${stringify(query)}`;

    // return httpClient.get(url).then(({ data }) => ({
    //   data: data,
    //   total: parseInt(data.length, 10),
    // }));
    return httpClient.get(url).then(({ data, headers }) => ({
      data: data,
      total: parseInt(headers['x-total-count'], 10),
    }));
  },

  getOne: (resource, params) => {
    return httpClient.get(`${resource}/${params.id}`).then(({ data }) => ({
      data: data,
    }));
  },

  create: (resource, params) => {
    return httpClient.post(`${resource}`, params.data).then(({ data }) => ({
      data: { ...params.data, id: data.id },
    }));
  },

  update: (resource, params) => {
    return httpClient
      .put(`${resource}/${params.id}`, params.data)
      .then(({ data }) => ({
        data: data,
      }));
  },

  delete: (resource, params) => {
    return httpClient.delete(`${resource}/${params.id}`).then(({ data }) => ({
      data: data,
    }));
  },

  // Otros métodos como getMany, updateMany, deleteMany, etc.
};

export default dataProvider;
