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

            let addressCell = document.createElement("td")
            addressCell.textContent = `${hotels[i].street}, ${hotels[i].city}, ${hotels[i].country}`
            rowData.appendChild(addressCell)

            let roomCell = document.createElement("td")
            roomCell.textContent = hotels[i].created
            rowData.appendChild(roomCell)

            tableBody.appendChild(rowData)
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function searchHotel() {
    event.preventDefault();
    try {
        const id = document.getElementById("hotelId").value;

        const response = await fetch(`http://localhost:3333/findHotelById/${id}`);

        if (response.status === 404) {
            // Handle case where hotel is not found
            const searchResult = document.getElementById("searchResult");
            searchResult.textContent = "No hotel found";
            return;
        }

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const hotel = await response.json();
        console.log(hotel);

        const searchResult = document.getElementById("searchResult");

        if (hotel) {
            const resultText = `
                Name: ${hotel.name},
                Address: ${hotel.street},
                         ${hotel.city},
                         ${hotel.zip}
            `;
            searchResult.textContent = resultText;
        } else {
            searchResult.textContent = "No hotel found";
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

function clearForm() {
    document.getElementById("searchHotelForm").reset();
    let searchResult = document.getElementById("searchResult")
    searchResult.innerHTML = ""
}

async function getHotel() {
    event.preventDefault();

    const hotelId = document.getElementById("hotelId").value;

    try {
        const response = await fetch(`http://localhost:3333/findHotelById/${hotelId}`);

        if (!response.ok) {
            throw new Error('Failed to load hotel');
        }

        const hotel = await response.json();
        console.log(hotel);

        document.getElementById("name").value = hotel.name;
        document.getElementById("street").value = hotel.street;
        document.getElementById("city").value = hotel.city;
        document.getElementById("zip").value = hotel.zip;
        document.getElementById("country").value = hotel.country;
    } catch (error) {
        console.error('Error fetching hotel:', error);
    }
}

async function editHotel() {
    event.preventDefault()

    let hotelId = document.getElementById("hotelId").value
    let name = document.getElementById("name").value
    let street = document.getElementById("street").value
    let city = document.getElementById("city").value
    let zip = document.getElementById("zip").value
    let country = document.getElementById("country").value

    const updatedHotel = {
        hotelId: hotelId,
        name: name,
        street: street,
        city: city,
        zip: zip,
        country: country
    }

    try {
        const response = await fetch(`http://localhost:3333/editHotel`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedHotel)
        });

        if (!response.ok) {
            throw new Error('Failed to update product');
        }
        alert("Hotel was updated successfully!")
    } catch (error) {
        console.error('Error updating product:', error);
    }
}