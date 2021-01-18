export default function () {
    fetch("http://localhost:3097/logout")
        .then(res => res.json())
        .then(res => {
            window.location.replace(res.url);
        })
        .catch(err => {
            alert(err);
        });
}