class Wine {
    constructor(data) {
        this.wine = [];
        this.id = data.id;
        this.title = data.title; 
        this.winery_id = data.winery_id;
        this.description = data.description;
        this.getWines()
       
    }
}

function getWines() {
   fetch("http://localhost:3000/api/v1/wines")
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
    //renderWine(data)
    viewWinesClickListeners()
   })
}



function viewWinesClickListeners() {
document.querySelectorAll('.view-wine-button').forEach(element => {
    element.addEventListener("click", viewWineryWines)
 })
}

//Wine.prototype.winesHtml = function () {
//	let wines = this.wines.map(event => {
  //      return (`
    //    <div class="card" wine-id="${wine.id}" >
      //  <strong>Title: </strong>${wine.title} <br/>
        //<strong>Description: </strong>${wine.description} <br/> 
        //<button class="delete-winery-button" style="background-color:red">Delete Winery</button> 
        //</div>
		//`)
    //})
    //return (wines)
//}


//function renderWine(data){
    //console.log('rendering wines....')
   // let winesContainer = document.getElementById('wines-container');
   // data.forEach((dataJSON) => {
        //console.log(dataJSON)
      // winesContainer.innerHTML += ('My Wines', this.wine)

   // })
//}
   
        
    //f

    //function renderWine(data){
        //console.log('rendering wines....')
       // const winesContainer = document.getElementById('wines-container');
       // data.forEach((data) => {
            //console.log(data)
      //  })
   // }
  


//function renderWine(){
    //console.log('rendering wines....')
     
    //const winesContainer = document.getElementById('wines-container')
    ///winesContainer.innerHTML = ('My Wines')
//}

function viewWineryWines() {
    console.log('hello')
        //console.log(JSON.stringify(data));

    //let winerySelectedHtml = this.parentElement.querySelector('.wines')
    //toggleHideDisplay(winerySelectedHtml)
}














