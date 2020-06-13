//Form

function populateUFs(){
        const ufSelect = document.querySelector("[name=uf]")

        fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then( res => res.json() )
        .then( states => {
            for(state of states){
                ufSelect.innerHTML += `<option value='${state.id}'>${state.nome}</option>`
            }
        })
}

populateUFs()

function getCities(event){
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectState = event.target.selectedIndex

    stateInput.value = event.target.options[indexOfSelectState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`


    citySelect.innerHTML = '<option value>Selecione uma Cidade</option>'
    citySelect.disabled = true

    fetch(url)
        .then( res => res.json() )
        .then( cities => {
            for(city of cities){
                citySelect.innerHTML += `<option value='${city.nome}'>${city.nome}</option>`
            }

            citySelect.disabled = false
        })

}

document
    .querySelector("[name= uf]")
    .addEventListener("change", getCities)


//Items css grid

const itemsToCollect = document.querySelectorAll(".itens-grid li")

for(item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const colletedITtems = document.querySelector("input[name= items]")

let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target

    //add or remove classes from an element
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id  
    

    //verificar se existem elementos selecionados, se sim
    //pegar todos os itens selecionados
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId
        return itemFound
    })


    //se já está selecionado, 
    if(alreadySelected >= 0){
        //tirar da seleção
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems
    }
    else{
        //se não estiver selecioando, 
        //adicionar a seleção
        selectedItems.push(itemId)
    }

    console.log(selectedItems)

    //por fim, atualizar o campo escondido com os itens selecionados
    colletedITtems.value = selectedItems
}

