const urlBase = '/api'

export async function getBuildingById(id) {
    if (isNaN(id))
        throw Error('id is NaN');

    return fetch(`${urlBase}/buildings/${id}`);
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

    return fetch(`${urlBase}/buildings/list` + params);
}

export async function getTicketById(id) {
    if (isNaN(id))
        throw Error('id is NaN');

    return fetch(`${urlBase}/tickets/${id}`);
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

    return fetch(`${urlBase}/tickets/list` + params);
}