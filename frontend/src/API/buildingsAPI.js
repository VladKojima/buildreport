const urlBase = '/api'

export async function getBuildingWithStarts(str) {
    if (typeof(str) !== 'string')
        throw Error('str isn\'t string');

    return fetch(`${urlBase}/buildings/${str}`).then(res=>res.json());
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

    return fetch(`${urlBase}/buildings/list` + params).then(res=>res.json());
}

export async function getTicketById(id) {
    if (isNaN(id))
        throw Error('id is NaN');

    return fetch(`${urlBase}/tickets/${id}`).then(res=>res.json());
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

    return fetch(`${urlBase}/tickets/list` + params).then(res=>res.json());
}

export async function addTicket(ticket){

    return fetch(`${urlBase}/tickets/add`, {method: "post", headers:{"Content-Type":"application/json"}, body: JSON.stringify(ticket)});
}

export async function resolveTicket(id){

}

export async function rejectTicket(id){
    
}