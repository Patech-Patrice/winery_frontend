

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

    renderDivCard() {
        return `
        <div><br>
        <h4>${this.name}<h4>
        <h1>${this.year_founded}<h1>
        <h5>${this.types_offered}<h5>
        <h6>${this.title}
        <h4>${this.description}<h4>
        <button data-id=${this.id}>edit</button
        </h6>
        </li>`;
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
    static editWineryForm() {
 
    }
  }

    function getWineries() {
        fetch("http://localhost:3000/api/v1/wineries")
        .then(resp => resp.json())
        .then(data => {
        renderWinery(data)
        addWineryClickListeners()
        addWinesClickListeners()
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
       // "Access-Control-Allow-Credentials": "true",
        //"Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
        //"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
        'Content-Type': 'application/json', 'Accept': 'application/json'

  }

    })
    .then(resp => resp.json() )
    .then(winery => {
         getWineries()
         Winery.newWineryForm()
         renderWinery 
      });
      // need a addWinery function?
    
}
function showMoreInfo() {
    //console.log("this", this)
    
}

function updateWinery() {
}

function editWinery() {
  
}

function deleteWinery() {  
}


function addWineryClickListeners() {
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

function clearWineriesHtml() {
    let wineriesIndex = document.getElementById("wineries-container")
    wineriesIndex.innerHTML = ''
}




















function renderWinery(data){
    console.log ('my wines here')
    //const wineriesContainer = document.getElementById('wineries-container')
    //wineriesContainer.innerHTML = 'here are the wineries'

    let wineriesIndex = document.getElementById("wineries-container")
    data.forEach((winery) => {
        let winesIndexHtml = document.createElement('div')
        winesIndexHtml.className = 'wines'
        winesIndexHtml.style.display = 'none'
        let emptyWinesHtml = winesIndexHtml

        let newWinery = new Winery(winery)
        winesIndexHtml.innerHTML += newWinery.wineryHtml()

        let selectedWineryHtml = document.querySelector('.card[data-winery-id="${newWinery.id}"]')
        selectedWineryHtml.append(winesIndexHtml.childElementCount ? winesIndexHtml : emptyWinesHtml )
        selectedWineryHtml.querySelector('.wines').appendChild(newWinery.addWineButton())

        
    });
}




