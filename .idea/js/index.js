fetch("header.html")
    .then(respons => respons.text())
    .then(data => {
        document.getElementById("headerContent").innerHTML = data;
    })
    .catch(error => {
        console.log('Fejl ved indlæsning af header:', error);
    })

function addHotel() {
    event.preventDefault()

    let name = document.getElementById("name").value
    let street = document.getElementById("street").value
    let city = document.getElementById("city").value
    let zip = document.getElementById("zip").value
    let country = document.getElementById("country").value

    let hotel = {
        name: name,
        street: street,
        city: city,
        zip: zip,
        country: country
    }
    let body = JSON.stringify(hotel)
    console.log(body)

    fetch("http://localhost:3333/addHotel", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: body
    }).then(response => {
        if (!response.ok) {
            throw new Error("Something went wrong");
        }
        return response.json();
    }).then(data => {
        console.log("Hotel created succesfully");
        alert("Hotel was created successfully")
    }).catch(error => {
        console.error("Error when creating hotel " + error);
    });
}

let hotels = []
async function fetchHotelList() {
    try {
        const response = await fetch("http://localhost:3333/getAllHotels")

        if (!response.ok) {
            throw new Error('Failed to fetch data')
        }

        hotels = await response.json()
        console.log(hotels)

        let tableBody = document.getElementById("tableBodyListAllHotels")
        tableBody.innerHTML = ""

        for (let i = 0; i < hotels.length; i++) {
            let rowData = document.createElement("tr")

            let hotelIdCell = document.createElement("td")
            hotelIdCell.textContent = hotels[i].hotelId
            rowData.appendChild(hotelIdCell)

            let nameCell = document.createElement("td")
            nameCell.textContent = hotels[i].name
            rowData.appendChild(nameCell)

            let streetCell = document.createElement("td")
            streetCell.textContent = hotels[i].street
            rowData.appendChild(streetCell)

            let cityCell = document.createElement("td")
            cityCell.textContent = hotels[i].city
            rowData.appendChild(cityCell)

            let countryCell = document.createElement("td")
            countryCell.textContent = hotels[i].country
            rowData.appendChild(countryCell)

            tableBody.appendChild(rowData)
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}