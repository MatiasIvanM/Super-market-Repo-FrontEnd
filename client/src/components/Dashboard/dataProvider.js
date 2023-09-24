import axios from 'axios';
import { stringify } from 'query-string';
import { server } from '../../utils/urlLocales';

const url = server;

const httpClient = axios.create({
  baseURL: url,
  /*  headers: {
     Accept: 'application/json',
     'Content-Type': 'application/json',
   }, */
});

const dataProvider = {

  getList: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      ...params.filter,
      _sort: field,
      _order: order,
    };

    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;

    const url = `${resource}?${stringify(query)}`;

    const token = JSON.parse(localStorage.getItem('token'))
    return httpClient.get(url, { headers: { 'Authorization': `Bearer ${token}` } }).then(({ data }) => ({
      data: data.slice(startIndex, endIndex), // Obtén solo los datos para la página actual
      total: data.length, // Total de registros en el frontend
    }));
  },


  getOne: (resource, params) => {
    const token = JSON.parse(localStorage.getItem('token'))
    return httpClient.get(`${resource}/${params.id}`, { headers: { 'Authorization': `Bearer ${token}` } }).then(({ data }) => ({
      data: data,
    }));
  },

  create: (resource, params) => {
    return httpClient.post(`${resource}`, params.data).then(({ data }) => ({
      data: { ...params.data, id: data.id },
    }));
  },

  update: (resource, params) => {
    const token = JSON.parse(localStorage.getItem('token'))
    if (resource === 'product') {
      return httpClient
        .put(`${resource}/${params.id}`, params.data, { headers: { 'Authorization': `Bearer ${token}` } })
        .then(({ data }) => ({
          data: data,
        }))
    } else {
      return httpClient
        .put(`${resource}`, params.data, { headers: { 'Authorization': `Bearer ${token}` } })
        .then(({ data }) => ({
          data: data,
        }));
    }
  },

  // update: (resource, params) => {  
  //    console.log("🚀 ~ file: dataProvider.js:55 ~ params.data:", params.data)
  //   return httpClient.put(`${resource}/${params.id}`, params.data).then(({ data }) =>({
  //     data: data
  //   }));
  // },

  delete: (resource, params) => {
    const token = JSON.parse(localStorage.getItem('token'))
    return httpClient.delete(`${resource}/${params.id}`, { headers: { 'Authorization': `Bearer ${token}` } }).then(({ data }) => ({
      data: data,
    }));
  },


  // getMany: (resource, params) => {
  //   const { ids } = params;
  //   const query = {
  //     id: ids.join(','),
  //   };
  //   const url = `${resource}/name${stringify(query)}`;

  //   return httpClient.get(url).then(({ data }) => ({
  //     data: data,
  //   }));
  // },


};

export default dataProvider;