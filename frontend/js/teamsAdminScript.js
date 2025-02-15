document.getElementById("teamForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append("name", document.getElementById("name").value);
    formData.append("skills", document.getElementById("skills").value);
    formData.append("threads", document.getElementById("threads").value);
    formData.append("facebook", document.getElementById("facebook").value);
    formData.append("instagram", document.getElementById("instagram").value);
    formData.append("linkedin", document.getElementById("linkedin").value);
    formData.append("image", document.getElementById("image").files[0]);

    try {
        const response = await fetch("https://bharatagrawal.shop:3000/api/teams/add", {
            method: "POST",
            body: formData
        });

        const result = await response.json();
        alert(result.message);
    } catch (error) {
        console.error("Error adding member:", error);
    }
});
