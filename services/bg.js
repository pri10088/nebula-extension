(() => {
    fetch("https://pixabay.com/api/?key=48586778-8fbbbf9581f8a1d04eab00b91&image_type=illustration&editors_choice=true&color=white", {
        method: "GET"
    })
    .then(res => res.json())
    .then(image => {
        console.log(image);
        const img = image.hits[Math.floor(Math.random() * image.hits.length)].largeImageURL;
        const bg = document.querySelector(".mainbg");
        bg.style.backgroundImage = `url(${img})`;
        bg.style.backgroundSize = "cover"; 
        bg.style.backgroundPosition = "center"; 
    })
    .catch(error => console.error("Error fetching image:", error));
})();
