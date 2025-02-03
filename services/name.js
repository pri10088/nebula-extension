$(document).ready(() => {
    chrome.storage.local.get(["name"], (data) => {
        if(data.name)
           changeName(data.name);
    })
   
 
    $("#name input").keypress((event) => {
        if(event.which == 13) {
            const name = event.currentTarget.value;
            console.log(name);
            changeName(name);
            chrome.storage.local.set({name: name})
        }

        
    })
    function changeName(name) {
        $("#name div.control").remove();
        $("#name").append (`<h1 class="title has-text-white"> Hey ${name}!</h1>`);
    }
    
})