
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

    fetch("http://localhost:8080/addHotel", {
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
    }).catch(error => {
        console.error("Error when creating hotel " + error);
    });
}