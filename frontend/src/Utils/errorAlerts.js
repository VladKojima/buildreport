const alerts = {
    403: "Authorization (Authentication) error",
    504: "Connection timeout",
    502: "Server isn't available",
    404: "Not found"
};

function getAlert(code){
    return alerts[code] ?? "Some is broken, try again later";
}

export default getAlert