// URL da API que retorna a lista de usuários
const apiURL = "https://67084a4f8e86a8d9e42e96a5.mockapi.io/api/users";

// Define a quantidade de usuários exibidos por página
const usuariosPorPagina = 9;

// Armazena a página atual e os dados dos usuários
let paginaAtual = 1;
let usuarios = [];

// Função para buscar a lista de usuários da API
async function fetchUsuarios() {
    try {
        // Realiza uma requisição GET para a API
        const response = await axios.get(apiURL);
        usuarios = response.data; // Armazena os usuários obtidos
        displayPaginado(); // Exibe os usuários paginados
        configurarPesquisa(); // Configura a pesquisa dinâmica
    } catch (error) {
        // Exibe um alerta em caso de erro na requisição
        Swal.fire("Erro", "Não foi possível buscar os usuários.", "error");
    }
}

// Função para exibir os usuários de forma paginada
function displayPaginado(page = 1) {
    // Calcula o índice inicial e final dos usuários a serem exibidos
    const inicio = (page - 1) * usuariosPorPagina;
    const fim = page * usuariosPorPagina;
    const usuariosPaginados = usuarios.slice(inicio, fim); // Filtra os usuários da página atual
    displayUsuarios(usuariosPaginados); // Exibe os usuários filtrados
    configurarPaginacao(usuarios.length, page); // Configura a exibição da paginação
}

// Função para exibir a lista de usuários
function displayUsuarios(usuarios) {
    const userList = document.getElementById("listaDeUsuarios");
    userList.innerHTML = ""; // Limpa a lista antes de exibir novos usuários
    usuarios.forEach(user => {
        // Cria um elemento para cada usuário
        const usuario = document.createElement("div");
        usuario.className = "col-md-4 mb-3";
        // Preenche o conteúdo do usuário em formato de card com avatar e informações
        usuario.innerHTML = `
            <div class="card h-100">
                <div class="row g-0">
                    <div class="col-md-4 d-flex align-items-center justify-content-center">
                        <img src="${user.avatar}" alt="${user.firstName} ${user.lastName}" class="img-fluid rounded-circle" style="max-width: 100px;">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${user.firstName} ${user.lastName}</h5>
                            <p class="card-text"><strong>E-mail:</strong> ${user.email}</p>
                            <p class="card-text"><strong>Telefone:</strong> ${user.phone}</p>
                            <div class="d-flex justify-content-end">
                                <!-- Botão para editar o usuário -->
                                <button class="btn btn-warning btn-sm me-2" onclick="modalEditar('${user.id}')">Editar</button>
                                <!-- Botão para excluir o usuário -->
                                <button class="btn btn-danger btn-sm" onclick="deleteUser('${user.id}')">Excluir</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        userList.appendChild(usuario); // Adiciona o usuário à lista
    });
}

// Função para configurar a paginação
function configurarPaginacao(totalUsuarios, page) {
    const totalPages = Math.ceil(totalUsuarios / usuariosPorPagina); // Calcula o número total de páginas
    const pagination = document.getElementById("paginacao");
    pagination.innerHTML = ""; // Limpa a paginação antes de adicionar novos itens

    // Cria os itens da paginação
    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement("li");
        li.className = `page-item ${i === page ? "active" : ""}`; // Marca a página atual como ativa
        li.innerHTML = `<button class="page-link" onclick="displayPaginado(${i})">${i}</button>`;
        pagination.appendChild(li); // Adiciona o item à paginação
    }
}

// Função para configurar a pesquisa de usuários
function configurarPesquisa() {
    const searchInput = document.getElementById("searchInput");
    // Adiciona um evento ao input de pesquisa para filtrar os usuários conforme o usuário digita
    searchInput.addEventListener("input", () => {
        const termo = searchInput.value.toLowerCase();
        const usuariosFiltrados = usuarios.filter(user =>
            user.firstName.toLowerCase().includes(termo) ||
            user.lastName.toLowerCase().includes(termo) ||
            user.email.toLowerCase().includes(termo)
        );
        displayUsuarios(usuariosFiltrados); // Exibe os usuários filtrados
    });
}

// Função para exibir o modal de criação de usuário
function showCreateModal() {
    resetModal(); // Reseta os campos do modal
    document.getElementById("userModalLabel").innerText = "Adicionar Usuário";
    const userModal = new bootstrap.Modal(document.getElementById('userModal'));
    userModal.show(); // Exibe o modal
}

// Função para salvar ou atualizar um usuário
async function saveUser() {
    const userId = document.getElementById("userId").value;
    const nome = document.getElementById("name").value;
    const [firstName, lastName] = nome.split(' '); // Desestrutura o nome em primeiro nome e sobrenome

    const user = {
        firstName,
        lastName,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        avatar: document.getElementById("avatar").value
    };

    try {
        // Se existe um ID de usuário, atualiza o usuário, caso contrário, cria um novo
        if (userId) {
            await axios.put(`${apiURL}/${userId}`, user);
            Swal.fire("Sucesso", "Usuário atualizado com sucesso.", "success");
        } else {
            await axios.post(apiURL, user);
            Swal.fire("Sucesso", "Usuário criado com sucesso.", "success");
        }
        // Fecha o modal após criar ou editar o usuário
        const userModal = bootstrap.Modal.getInstance(document.getElementById('userModal'));
        userModal.hide();
        
        fetchUsuarios(); // Atualiza a lista de usuários após salvar
    } catch (error) {
        Swal.fire("Erro", "Não foi possível salvar o usuário.", "error");
    }
}

// Função para limpar os campos do modal
function resetModal() {
    document.getElementById("userId").value = "";
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("avatar").value = "";
}

// Função para deletar um usuário
async function deleteUser(userId) {
    try {
        await axios.delete(`${apiURL}/${userId}`);
        Swal.fire("Sucesso", "Usuário deletado com sucesso.", "success");
        fetchUsuarios(); // Atualiza a lista de usuários após deletar
    } catch (error) {
        Swal.fire("Erro", "Não foi possível deletar o usuário.", "error");
    }
}

// Função para preencher os campos do modal com os dados do usuário em edição
function modalEditar(id) {
    const user = usuarios.find(u => u.id === id);
    if (user) {
        document.getElementById("userId").value = user.id;
        document.getElementById("name").value = `${user.firstName} ${user.lastName}`;
        document.getElementById("email").value = user.email;
        document.getElementById("phone").value = user.phone;
        document.getElementById("avatar").value = user.avatar;

        document.getElementById("userModalLabel").innerText = "Editar Usuário";
        const userModal = new bootstrap.Modal(document.getElementById('userModal'));
        userModal.show(); // Exibe o modal com os dados preenchidos para edição
    }
}

// Ao carregar a página, busca a lista de usuários
document.addEventListener("DOMContentLoaded", fetchUsuarios);
