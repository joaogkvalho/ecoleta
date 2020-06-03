function populateUFs(){
        const ufSelect = document.querySelector("[name=uf]")

        fetch("https://servicodados.ibge.gov.br/api/v1/localidades/distritos")
        .then( res => res.json() )
        .then( states => {
            for(state of states){
                ufSelect.innerHTML += `<option value='${state.id}'>${state.nome}</option>`
            }
        })
}

populateUFs()

document
    .querySelector("[name= uf]")
    .addEventListener("change", () => {
        console.log('Mudei!!!')
    })