import axios from 'axios';
import { authHeader } from '../Utils/auth';

const urlBase = '/api'

export async function login(user){
    return (await axios.post(`${urlBase}/auth/login`, user)).data;
}

export async function getBuildingWithContaining(str) {
    if (typeof (str) !== 'string')
        throw Error('str isn\'t string');

    return (await axios.get(`${urlBase}/buildings/find/${str}`)).data;
}

export async function getBuildingList(limit, skip) {
    let params = [];

    if (limit) {
        if (isNaN(limit))
            throw Error('limit is NaN');

        params.push(`limit=${limit}`);
    }

    if (skip) {
        if (isNaN(skip))
            throw Error('skip is NaN');

        params.push(`skip=${skip}`);
    }

    if (params.length !== 0)
        params = `?${params.join('&')}`;


    return (await axios.get(`${urlBase}/buildings/list` + params, {headers: authHeader()})).data;
}

export async function addBuilding(building){
    return axios.post(`${urlBase}/buildings/add`, building, {headers: authHeader()});
}

export async function getTicketById(id) {
    if (isNaN(id))
        throw Error('id is NaN');

    return (await axios.get(`${urlBase}/tickets/info/${id}`)).data;
}

export async function getTicketList(limit, skip) {
    let params = [];

    if (limit) {
        if (isNaN(limit))
            throw Error('limit is NaN');

        params.push(`limit=${limit}`);
    }

    if (skip) {
        if (isNaN(skip))
            throw Error('skip is NaN');

        params.push(`skip=${skip}`);
    }

    if (params.length !== 0)
        params = `?${params.join('&')}`;

    return (await axios.get(`${urlBase}/tickets/list` + params, {headers: authHeader()})).data;
}

export async function addTicket(ticket) {

    return axios.post(`${urlBase}/tickets/add`, ticket);
}

export async function resolveTicket(id) {
    return axios.put(`${urlBase}/tickets/resolve/${id}`, null, {headers: authHeader()});
}

export async function refuseTicket(id) {
    return axios.put(`${urlBase}/tickets/refuse/${id}`, null, {headers: authHeader()});
}