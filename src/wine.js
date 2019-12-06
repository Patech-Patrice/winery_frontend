class Wine {
    constructor(data) {
        this.id = data.id
        this.title = data.title 
        this.description = data.description
        this.winery_id = data.winery_id
        this.updated_at = data.updated_at
        this.created_at = data.created_at
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
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    })
    .then(resp => resp.json())
    .then(wine => {
         clearWineriesHtml()
         getWineries()
      });
}


