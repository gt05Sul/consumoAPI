const apiUrl = "https://67084a4f8e86a8d9e42e96a5.mockapi.io/api/users";
let usuarios = [];
const usuariosPorPagina = 9;
const paginaAtual = 1;

const modal = document.getElementById('userModal')

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
        displayPaginado();
    } catch (error) {
        Swal.fire("Erro", "Não foi possível buscar usuários", "error")
    }
    
}

function displayPaginado(page = 1){
    const inicio = (page - 1) * usuariosPorPagina;
    const fim = page * usuariosPorPagina;
    const usuariosPaginados = usuarios.slice(inicio, fim);
    displayUsers(usuariosPaginados);
    configurarPaginacao(usuarios.length, page);
}

function configurarPaginacao(totalusuarios, page) {
    const totalPages = Math.ceil(totalusuarios / usuariosPorPagina);
    const pagination = document.getElementById("paginacao")
    pagination.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement("li");
        li.className = `page-item ${i === page ? "active" : ""}`;
        li.innerHTML = `<button class="page-link" onclick="displayPaginado(${i})">${i}</button>`;
        pagination.appendChild(li);
    }
}

function displayUsers(usuarios) {
    const userList = document.getElementById("listaDeUsuarios");
    userList.innerHTML = "";
    usuarios.forEach(user => {
        const usuario = document.createElement("div");
        usuario.className = 'col-md-4 mb-3';
        usuario.innerHTML = `
            <img src="${user.avatar}" alt="${user.firstName}" class="img rounded-circle" style="max-width: 150px;">
            <h3>${user.firstName} ${user.lastName}</h3>
            <p>Email: ${user.email}</p>
            <p>Telefone: ${user.phone}</p>
        `
        userList.appendChild(usuario);
    })
}

function showCreateModal(){
    modal.style.display = 'block'
    modal.className = 'modal'
}

function fechar(){
    modal.style.display = 'none'
}

async function postUsuario(){

    const firstName = document.getElementById('name').value  
    const email = document.getElementById('email').value
    const phone = document.getElementById("phone").value
    const avatar = document.getElementById('avatar').value
    const lastName = document.getElementById('Sobrenome').value

    const payload = {
        firstName,
        lastName,
        email,
        phone,
        avatar
    }

    console.log(payload);
    

    const method ={
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }

    await fetch(apiUrl, method)
}

function saveUser(){
    postUsuario()
}

document.addEventListener("DOMContentLoaded", fetchUsuarios)
