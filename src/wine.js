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
    //viewWinesClickListeners()
   })
}



//function viewWinesClickListeners() {
//document.querySelectorAll('.view-wine-button').forEach(element => {
    //element.addEventListener("click", viewWineryWines)
 //})
//}



        
  
  



function viewWineryWines() {
    console.log('hello')
       
}














