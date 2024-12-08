document.addEventListener("DOMContentLoaded", () => {
    const inputs = document.querySelectorAll(".form-group input");

    // Input field behavior
    inputs.forEach((input) => {
        input.addEventListener("input", () => {
            if (input.value.trim() !== "") {
                input.classList.add("filled");
            } else {
                input.classList.remove("filled");
            }
        });
    });

    let roomsData = []; // Declare roomsData to hold fetched data

    // Ambil token dari cookie (misalnya nama cookie-nya adalah 'authToken')
    const authToken = getCookie('Authorization');
    console.log(authToken)
        // Kirim permintaan fetch dengan Authorization header
    fetch('https://beaps-treamyracles-projects.vercel.app/rooms', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getCookie('Authorization')}`,
            },
            credentials: 'include', // Pastikan credentials disertakan
        })
        .catch(error => console.error("Error fetching data:", error))
        .then((response) => response.json())
        .then((data) => {
            roomsData = data; // Store fetched data
            const roomsContainer = document.querySelector(".popular__grid");
            roomsContainer.innerHTML = ""; // Clear the container first

            // Display the fetched rooms in the grid
            data.forEach((room) => {
                const roomElement = document.createElement("div");
                roomElement.classList.add("popular__card");
                roomElement.innerHTML = `
                <img src="${room.image_url || 'assets/g2.jpg'}" alt="Ruangan ${room.name}" />
                <div class="popular__content">
                    <div class="popular__card__header">
                        <h4>${room.name}</h4>
                        <h4>${room.capacity} Orang</h4>
                    </div>
                    <div class="popular__description">
                        <p>${room.description}</p>
                        <a href="informasi.html?id=${room.id}">
                            <button class="btn lebih__lanjut">Detail</button>
                        </a>
                    </div>
                </div>
            `;
                roomsContainer.appendChild(roomElement);
            });
        })
        .catch((error) => console.error("Error fetching data:", error));

    // Function to get a specific cookie
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
        return "";
    }


});