



document.addEventListener("DOMContentLoaded", () => {
    const clientForm = document.getElementById("clientForm"); // Form on admin page
    const clientContainer = document.getElementById("clientContainer"); // Container on client page

    // ✅ Function to Fetch and Display Clients on Client Page
    async function fetchClients() {
        try {
            const res = await fetch("http://localhost:5000/api/clients");
            const clients = await res.json();
            console.log("Fetched Clients:", clients); // Debugging log

            clientContainer.innerHTML = ""; // Clear previous content

            clients.forEach(client => {
                clientContainer.innerHTML += `
                    <div class="client-card">
                        <img src="${client.projectImage}" alt="Project Image" 
                             onerror="this.onerror=null; this.src='fallback-image.jpg';">
                        <h3>${client.heading}</h3>
                        <p>${client.description}</p>
                        <a href="${client.projectLink}" target="_blank">View Project</a>
                    </div>
                `;
            });
        } catch (error) {
            console.error("Error fetching clients:", error);
        }
    }

    // ✅ Function to Handle Admin Form Submission (Adding New Clients)
    if (clientForm) {
        clientForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const formData = new FormData();
            formData.append("name", document.getElementById("name").value);
            formData.append("heading", document.getElementById("heading").value);
            formData.append("description", document.getElementById("description").value);
            formData.append("projectLink", document.getElementById("projectLink").value);
            formData.append("projectImage", document.getElementById("projectImage").files[0]); // File upload

            console.log("Form Data Sent:", [...formData.entries()]); // Debugging log

            try {
                const response = await fetch("https://bharatagrawal.shop:3000/api/add-client", {
                    method: "POST",
                    body: formData, // No headers needed for FormData
                });

                const data = await response.json();
                console.log("Server Response:", data);

                if (response.ok) {
                    alert("Client added successfully!");
                    clientForm.reset(); // Clear form after submission
                } else {
                    alert("Error adding client: " + data.message);
                }
            } catch (error) {
                console.error("Error adding client:", error);
                alert("Something went wrong. Check the console for details.");
            }
        });
    }

    // ✅ Auto-Load Clients Only on Client Page
    if (clientContainer) {
        fetchClients();
    }
});
