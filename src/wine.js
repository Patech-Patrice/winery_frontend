class Wine {
    constructor(data) {
        this.id = data.id
        this.title = data.title 
        this.winery_id = data.winery_id
        this.description = data.description
    }
}

function addWine() {  
    const wine = {
        title: document.getElementById('title').value,
        description: document.getElementById('wine-description').value,
        winery_id: document.getElementById('wine-wineryId').value 
    }

    fetch("http://localhost:3000/api/v1/wines", {
        method: 'POST',
        body: JSON.stringify(wine),
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json', 'Accept': 'application/json'}
      })
    .then(resp => resp.json())
    .then(wine => {
         clearWineriesHtml()
         getWineries()
         //renderWinesHtml(data)
      }); 

}

function renderWineFormFields(wineryId) {
    return `<label><strong>Title: </strong></label><br/>
    <input type="text" id="title"><br/>
    <input type="hidden" id="wine-wineryId" value="${wineryId}">
    <label><strong>Description:   </strong></label><br/>
    <input type="text" id="wine-description"><br/>  
    <input type="submit" value="Add Wine" style="color:white;background-color:orange">
    `  
}

function renderNewWineForm() {
    let wineryId = this.getAttribute('id')
    this.style.display = "none"
    let winesHtml = this.parentElement
    let wineForm = document.createElement('form')
    wineForm.setAttribute("onsubmit", "addWine(); return false;")
    wineForm.innerHTML = renderWineFormFields(wineryId)
    winesHtml.appendChild(wineForm)
}

function addWinesClickListeners() {
    document.querySelectorAll('.view-wines-winery-button').forEach(element => {
        element.addEventListener('click', viewWineryWines)
    }) 
    document.querySelectorAll('.add-wine-button').forEach(element => {
        element.addEventListener('click', renderNewWineForm)
    })
    
    document.querySelectorAll('.edit-wine-button').forEach(element => {
        element.addEventListener("click", editWine)
    })

    document.querySelectorAll('.delete-wine-button').forEach(element => {
        element.addEventListener("click", deleteWine)
    })
   

}

function deleteWine() {  
}



function updateWine() {
}

function renderWineForm (wineryId) {
    let wineForm = document.createElement('form')
    wineForm.setAttribute("onsubmit", "updateWine(); return false;")
    wineForm.innerHTML = renderWineFormFields(wineryId)
    return wineForm 
}

function populateWineForm(data) { 
    let wine = new Wine(data)
    let wineForm = renderWineForm(wine.winery_id)
    
    wineForm.querySelector('#title').value = wine.title 
    wineForm.querySelector('#wine-description').value = event.description 
    eventForm.querySelector('#wine-wineryId').value = event.dog_id 
    document.querySelector(`.card[wine-id="${wine.id}"]`).appendChild(wineForm)
}



function editWine() {
  
}




function viewWineryWines() {
    Winery.newWineryForm()
    let winerySelectedHtml = this.parentElement.querySelector('.wines')
    toggleHideDisplay(winerySelectedHtml)
}









