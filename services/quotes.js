$(document).ready(() => {
    fetch("http://localhost:3000/api/quotes")
        .then(result => result.json())
        .then(q => {
            document.querySelector("#quotes p").textContent = q[0].q; // ZenQuotes API returns an array
        })
        .catch(error => console.error("Error fetching quote:", error));
});
