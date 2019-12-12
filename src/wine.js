class Wine {
    constructor(data) {
        this.id = data.id
        this.title = data.title 
        this.winery_id = data.winery_id
        this.description = data.description
    }
}

function addWine() {   

}

function renderWineFormFields(wineryId) {
    return `<label><strong>Title: </strong></label><br/>
    <input type="text" id="title"><br/>
    <input type="hidden" id="wine-wineryId" value="${wineryId}">
    <label><strong>Description:   </strong></label><br/>
    <input type="text" id="wine-description"><br/>  
    <input type="submit" value="Submit" style="color:white;background-color:orange">
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

function editWine() {
  
}




function viewWineryWines() {
    Winery.newWineryForm()
    let winerySelectedHtml = this.parentElement.querySelector('.wines')
    toggleHideDisplay(winerySelectedHtml)
}






