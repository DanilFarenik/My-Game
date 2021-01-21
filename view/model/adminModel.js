

export default function (options) {
    return fetch('http://localhost:3000/admin', {
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