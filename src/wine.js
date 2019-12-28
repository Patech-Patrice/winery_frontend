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
         addWinesClickListeners()
         //renderWinesHtml(data)
      }); 
  
}

function getWines() {
    fetch("http://localhost:3000/api/v1/wines")
    .then(resp => resp.json())
    .then(data => {
    //renderWinery(data)
    addWinesClickListeners()
    renderNewWineForm
    })
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
    console.log('wines go here')
    }

function addWinesClickListeners() {
    document.querySelectorAll('.add-wine-button').forEach(element => {
        element.addEventListener('click', renderNewWineForm)
    })
}

function renderWineForm (wineryId) { 
    let wineForm = document.createElement('form')
    wineForm.setAttribute("onsubmit", "updateWine(); return false;")
    wineForm.innerHTML = renderWineFormFields(wineryId)
    return wineForm 
}


function viewWineryWines() {
    Winery.newWineryForm()
    let winerySelectedHtml = this.parentElement.querySelector('.wines')
    toggleHideDisplay(winerySelectedHtml)
}









