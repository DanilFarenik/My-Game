

export default function (options) {
    return fetch('http://localhost:3001/admin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(options)
    })
        .then(res => res.json())
        .then(res => {
            if (res.status) {

                alert(res.err || res.error);

            } else if (res.url) {
                window.location.replace(res.url);
            }
            return res;
        })
}


export function changeOfStatus(password, id, roleFlag) {
    return fetch('http://localhost:3001/admin/change', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            id: id,
            password: password,
            roleFlag: roleFlag
        })
    }).then(res => res.json())
}