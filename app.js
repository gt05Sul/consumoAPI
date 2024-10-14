const apiUrl = "https://67084a4f8e86a8d9e42e96a5.mockapi.io/api/users";
let usuarios= [];
const usuariosPorPagina = 9;
const paginaAtual = 1;




 async function fetchUsuarios()
{
    // fetch(apiUrl)
    // .then(res => res.json())
    // .then(data => {
    //     usuarios = data;    
    //     displayUsers(usuarios)
    // })
    
    // .catch(error => {
    //     console.error('error' , error)
    //     alert('nao foi possivel')
    // });

    try {   
        const response = await axios.get(apiUrl);
        usuarios = response.data;
        displayPaginado()
    } catch (error) {
        Swal.fire('erro' , 'nao foi possivel buascar usuario' , "error")
    }
}
function displayPaginado(page = 1)
{
    const inicio = (page - 1) * usuariosPorPagina;
    const fim = page * usuariosPorPagina;
    const usuariosPaginados = usuarios.slice(inicio , fim);
    displayUsers(usuariosPaginados);
    configurarPaginacao(usuarios.length, page);
};

    function configurarPaginacao(totalusuarios, page){
        const totalPages = Math.ceil(totalusuarios / usuariosPorPagina);
        const pagination = document.getElementById('paginacao')
        pagination.innerHTML = '';

        for(let i = 1; i <= totalPages; i++){
            const li = document.createElement('li');
            li.className = `page-item ${i === page ? "active" : ""}`;
            li.innerHTML = `<button class="page-link" onclick="displayPaginado(${i})">${i}</button>`
            pagination.appendChild(li);
        }
        }






fetchUsuarios()

function displayUsers(usuarios)
{
    const userList = document.getElementById('listaDeUsuarios')
    userList.innerHTML = ''
    usuarios.forEach(user => {
        const usuario = document.createElement('div')
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

document.addEventListener("DOMContentLoaded" , fetchUsuarios);