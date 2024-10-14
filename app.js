const apiUrl = "https://67084a4f8e86a8d9e42e96a5.mockapi.io/api/users";
let usuarios= [];

function fetchUsuarios()
{
    fetch(apiUrl)
    .then(res => res.jason())
    .then(data => {
        usuarios = data;    
    })
    
    .catch(error => {
        console.error('error' , error)
        alert('nao foi possivel')
    });
}

function displayUsers(usuarios)
{
    const userList = document.getElementById('listaDeUsuarios')
    userList.innerHTML = ''
    usuarios.forEach(user => {
        const usuario = document.createElement('div')
        usuario.className = 'usar-card'; 
        usuario.innerHTML = `
            <img src="">`
    })
}