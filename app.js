const apiUrl = "https://67084a4f8e86a8d9e42e96a5.mockapi.io/api/users";
let usuarios = [];


async function fetchUsuarios() {
    // fetch(apiUrl)
    // .then(res => res.json())
    // .then(data => {
    //     usuarios = data;
    //     displayUsers(usuarios)
    // })
    // .catch(error => {
    //     console.error("Erro", error)
    //     alert("Não foi possível carregar o usuário!")
    // })

    try {
        const response = await axios.get(apiUrl);
        usuarios = response.data;
        displayUsers(usuarios)
    } catch (error) {
        Swal.fire("Erro", "Não foi possível buscar usuários", "error")
    }
}
function displayUsers(usuarios) {
    const userList = document.getElementById("listaDeUsuarios");
    userList.innerHTML = "";
    usuarios.forEach(user => {
        const usuario = document.createElement("div");
        usuario.className = 'user-card';
        usuario.innerHTML = `
            <img src="${user.avatar}" alt="${user.firstName}" class="img rounded-circle" style="max-width: 150px;">
            <h3>${user.firstName} ${user.lastName}</h3>
            <p>Email: ${user.email}</p>
            <p>Telefone: ${user.phone}</p>
        `
        userList.appendChild(usuario);
    })
}
document.addEventListener("DOMContentLoaded", fetchUsuarios)