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
        this.id = data.id;
        this.name = data.name; 
        this.year_founded = data.year_founded;
        this.types_offered = data.types_offered;
        this.location = data.location; 
        this.affordable = data.affordable;
        this.wines = data.wines;
    }

    //New Wine Form

    static newWineryForm() {
        let newWineryFormDiv = document.getElementById('winery-form')
        newWineryFormDiv.innerHTML = `
        <form onsubmit="createWinery(); return false;">` + 
        wineryFormFields + 
        `<input type="submit" value="Add New Winery" style="color:white;background-color:green">
        </form>
        <br>`
    }   
    static editWineryForm() {
        let editWineryFormDiv = document.getElementById('winery-form')
        editWineryFormDiv.innerHTML = `
        <form onsubmit="updateWinery(); return false;">` + 
        wineryFormFields + 
        `<input type="submit" value="Update Winery">
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
        'Content-Type': 'application/json', 'Accept': 'application/json'
  }

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

// PATCH request to update winery
function updateWinery() {
    let wineryId = this.wine.target.wineryId.value

    const winery = {
        name: document.getElementById('name').value,
        year_founded: document.getElementById('year_founded').value,
        types_offered: document.getElementById('types_offered').value,
        location: document.getElementById('location').value,
        affordable: document.getElementById('affordable').value,
    }
    fetch(`http://localhost:3000/api/v1/wineries/${wineryId}`, {
        method: 'PATCH',
        body: JSON.stringify(winery),
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json', 'Accept': 'application/json'
      }
    
    })
    .then(resp => resp.json() )
    .then(winery => {
         clearWineriesHtml()
         getWineries()
         Winery.newWineryForm()
        });

}

//fetch request to edit winery and fill it with current info
function editWinery() {
    let wineryId = this.parentElement.getAttribute('data-winery-id')

    // Fills the winery form with previous winery info
        fetch(`http://localhost:3000/api/v1/wineries/${wineryId}`)
        .then(resp => resp.json())
        .then(data => {
            Winery.editWineryForm()
            let wineryForm = document.getElementById('winery-form')
            wineryForm.querySelector('#name').value = data.name 
            wineryForm.querySelector('#year_founded').value = data.year_founded
            wineryForm.querySelector('#types_offered').value = data.types_offered
            wineryForm.querySelector('#location').value = data.location
            wineryForm.querySelector('#affordable').value = data.affordable
        })
  
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

    document.querySelectorAll('.edit-winery-button').forEach(element => {
        element.addEventListener("click", editWinery)
    })

    document.querySelectorAll('.delete-winery-button').forEach(element => {
        element.addEventListener("click", deleteWinery)
    })
 
}
//clear wineries
function clearWineriesHtml() {
    let wineriesIndex = document.getElementById("wineries-index")
    wineriesIndex.innerHTML = ''
}
Winery.prototype.wineryWinesHtml = function () {
	let wineryWines = this.wines.map(event => {
        return (`
        <div class="card" wine-id="${wine.id}" >
        <strong>Title: </strong>${wine.title} <br/>
        <strong>Description: </strong>${wine.description} <br/>
        <button class="edit-winery-button" style="background-color:orange">Edit Winery</button>  
        <button class="delete-winery-button" style="background-color:red">Delete Winery</button>
        <button class="add-wine-button" style="background-color: blue;">Add Wine
        </button>  
        </div>
		`)
    }).join('')

    return (wineryWines)
}

Winery.prototype.wineryHtml = function () {
     
    return `<div class="card" data-winery-id="${this.id}">
           
            <button class="edit-winery-button" style="background-color:orange">Edit Winery</button>  
            <button class="delete-winery-button" style="background-color:red">Delete Winery</button>
            <br><br>
            <strong class="winery-name">${this.name}</strong> <br>
            <strong>Year Founded: </strong>${this.year_founded}<br>
            <strong>Types Offered: </strong>${this.types_offered}<br>
            <div class="additional-info" style="display:none">     
            <strong>Location: </strong>${this.location}<br>
            <strong>Affordable: </strong>${this.affordable}<br>
            <button class="add-wine-button" style="background-color: blue;">Add Wine
            </button>
            </div>
        </div>` 
}

Winery.prototype.addWineButton = function () {

    let addNewWineButton = document.createElement('button')
    addNewWineButton.className = 'add-wine-button'
    addNewWineButton.id = this.id 
    addNewWineButton.innerText = "Add Wine"
    addNewWineButton.style.backgroundColor = "blue"
    return addNewWineButton
}


function renderWinery(data){
    console.log ('my wines here')
    let wineriesIndex = document.getElementById("wineries-index")
    data.forEach((winery) => {
        let winesIndexHtml = document.createElement('div')
        winesIndexHtml.className = 'wines'
        winesIndexHtml.style.display = 'none'
        let emptyWinesHtml = winesIndexHtml

        let newWinery = new Winery(winery)
        winesIndexHtml.innerHTML += newWinery.wineryHtml()

        wineriesIndex.innerHTML += newWinery.wineryHtml()

        let selectedWineryHtml = document.querySelector('.card[data-winery-id="1"')
        selectedWineryHtml.append(winesIndexHtml.childElementCount ? winesIndexHtml : emptyWinesHtml )
        selectedWineryHtml.querySelector('.wines').appendChild(newWinery.addWineButton())
        
        
        
    });
}