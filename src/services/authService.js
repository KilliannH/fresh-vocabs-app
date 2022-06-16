import config from "../config";

const urlPrefix = `${config.backendProtocol}://${config.backendHost}:${config.backendPort}`;

export async function login(credentials) {
    return fetch(urlPrefix + '/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then((data) => {
        console.log(data);
        return data.json();
    });
}

export async function decode(token) {
    return fetch(urlPrefix + '/api/decode', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({token: token})
    }).then((data) => {
        return data.json();
    });
}