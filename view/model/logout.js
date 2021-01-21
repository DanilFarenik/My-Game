export default function () {
    fetch("http://localhost:3000/logout")
        .then(res => res.json())
        .then(res => {
            window.location.replace(res.url);
        })
        .catch(err => {
            alert(err);
        });
}