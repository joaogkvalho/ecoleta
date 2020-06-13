const searchButton = document.querySelector("#page-home main a")
const closeButton = document.querySelector(".modal header a")
const modal = document.querySelector(".modal")

searchButton.addEventListener('click', () =>{
    modal.classList.remove("hide")
})  

closeButton.addEventListener('click', () =>{
    modal.classList.add("hide")
})