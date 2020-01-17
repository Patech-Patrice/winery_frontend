const wineryFormFields = `
<label><strong>Name: </strong></label><br>
<input type="text" id="name"><br>
<label><strong>Year Founded: </strong></label><br>
<input type="integer" id="year_founded"><br>
<label><strong>Types Offered: </strong></label><br>
<input type="text" id="types_offered"><br>
<label><strong>Location: </strong></label><br>
<input type="text" id="location"><br>
<label><strong>Affordable: </strong></label><br>
<input type="text" id="affordable"><br>  `

class Winery {
    constructor(data) {
        this.id = data.id
        this.name = data.name 
        this.year_founded = data.year_founded
        this.types_offered = data.types_offered
        this.location = data.location 
        this.affordable = data.affordable
        this.wines = data.wines
    }

static newWineryForm() {
        let newWineryFormDiv = document.getElementById('winery-form')
        newWineryFormDiv.innerHTML = `
        <form onsubmit="createWinery(); return false;">` + 
        wineryFormFields + 
        `<input type="submit" value="Add New Winery" style="color:white;background-color:green">
        </form>
        <br>`
    }   
    
}

function getWineries() {
    
    fetch("http://localhost:3000/api/v1/wineries")
    .then(resp => resp.json())
    .then(data => {
    renderWinery(data)
    addWineriesClickListeners()
    //viewWinesClickListeners()
    getWines()
   })
}


  

    // Create new Winery
function createWinery() {
    const winery = {
        name: document.getElementById('name').value,
        year_founded: document.getElementById('year_founded').value,
        types_offered: document.getElementById('types_offered').value,
        location: document.getElementById('location').value,
        affordable: document.getElementById('affordable').value,
    }
    fetch("http://localhost:3000/api/v1/wineries", {
        method: 'POST',
        body: JSON.stringify(winery),
        headers: {
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json', 'Accept': 'application/json'}
    })
    .then(resp => resp.json() )
    .then(winery => {
        clearWineriesHtml()
         getWineries()
         Winery.newWineryForm()
      });
}

//User will be able to click on the name of the winery to view more info
function showMoreInfo() {
    toggleHideDisplay(this.parentElement.querySelector('.additional-info')) 
}


//delete winery
function deleteWinery() {  
    let wineryId = this.parentElement.getAttribute('data-winery-id')
    
    fetch(`http://localhost:3000/api/v1/wineries/${wineryId}`, {
        method: 'DELETE'
      })
      .then(resp => resp.json())
      .then(json => {
          let selectedWinery = document.querySelector(`.card[data-winery-id="${wineryId}"]`) 
          selectedWinery.remove()
      })  
}

//add winery click listeners
function addWineriesClickListeners() {
    document.querySelectorAll('.winery-name').forEach(element => {
      element.addEventListener("click", showMoreInfo)
    })

    //document.querySelectorAll('.edit-winery-button').forEach(element => {
      //  element.addEventListener("click", editWinery)
    //})

    document.querySelectorAll('.delete-winery-button').forEach(element => {
        element.addEventListener("click", deleteWinery)
    })

   document.querySelectorAll('.view-wine-button').forEach(element => {
       element.addEventListener("click", renderWinery)
    })
   
}

//clears wineries field
function clearWineriesHtml() {
    let wineriesIndex = document.getElementById("wineries-index")
    wineriesIndex.innerHTML = ''
}
Winery.prototype.wineryWinesHtml = function () {

    let wineryWines = this.wines.map(wine => {
        return (`
        <div class="card" wine-id="${wine.id}" >
        <strong>Title: </strong>${wine.title} <br/>
        <strong>Description: </strong>${wine.description} <br/> 
        </div>
        `)
    }).join('')
    return (wineryWines)
}

Winery.prototype.wineryHtml = function () {
     
    return `<div class="card" data-winery-id="${this.id}"> 
            <button class="delete-winery-button" style="background-color:red">Delete Winery</button>
            <br><br>
            <strong class="winery-name">${this.name}</strong> <br>
            <strong>Year Founded: </strong>${this.year_founded}<br>
            <strong>Types Offered: </strong>${this.types_offered}<br>
            <div class="additional-info" style="display:none">     
            <strong>Location: </strong>${this.location}<br>
            <strong>Affordable: </strong>${this.affordable}<br>
            </div>  
        </div>` 
}


//Winery.prototype.viewWineButton = function () {
    //let viewWineButton = document.createElement('button')
    //viewWineButton.className = 'view-wine-button'
    //viewWineButton.id = this.id 
    //viewWineButton.innerText = "View Wine"
    //viewWineButton.style.backgroundColor = "blue"
    //return viewWineButton

//}



function renderWinery(data) {

    let wineriesIndex = document.getElementById("wineries-index")

    data.forEach((winery) => {
        //for wines
       //let winesIndexHtml = document.getElementById("wines-index")
       let winesIndexHtml = document.createElement("wines-index")
        winesIndexHtml.className = 'wines'
        let emptyWinesHtml = winesIndexHtml

        let newWinery = new Winery(winery)
        winesIndexHtml.innerHTML = newWinery.wineryWinesHtml()
        wineriesIndex.innerHTML += newWinery.wineryHtml()

        let selectedWineryHtml = document.querySelector(`.card[data-winery-id="${newWinery.id}"]`)
        
        selectedWineryHtml.append(winesIndexHtml.childElementCount ? winesIndexHtml : emptyWinesHtml )
        //selectedWineryHtml.querySelector('.wines').appendChild(newWinery.addEventButton())



    });
}
      


    