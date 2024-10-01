document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://localhost:3000/api/users'; // URL da API

    // Função para mostrar a seção correta
    const showSection = (sectionId) => {
        document.querySelectorAll('main > section').forEach(section => {
            section.classList.add('hidden');
        });
        document.getElementById(sectionId).classList.remove('hidden');
        if (sectionId === 'all-users') {
            fetchUsers(); // Atualiza a tabela quando a seção "Todos" é exibida
        }
    };

    // Função para buscar todos os usuários
    const fetchUsers = async () => {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error('Erro ao buscar usuários');
            const users = await response.json();
            const userTableBody = document.getElementById('user-table-body');
            userTableBody.innerHTML = users.map(user => 
                `<tr>
                    <td>${user.indusers}</td> <!-- Usando 'indusers' como o ID -->
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>
                        <button onclick="editUser(${user.indusers}, '${user.name}', '${user.email}')">Editar</button>
                    </td>
                </tr>`
            ).join('');
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
        }
    };

    // Função para deletar um usuário
    const deleteUser = async (event) => {
        event.preventDefault();
        
        const id = document.getElementById('deleteUserId').value;
        
        try {
            await fetch(`${apiUrl}/${id}`, {
                method: 'DELETE',
            });
            document.getElementById('deleteUserForm').reset();
            showSection('all-users');
            fetchUsers();
        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
        }
    };

    // Função para atualizar um usuário
    const editUser = async (event) => {
        event.preventDefault();
        
        const id = document.getElementById('editUserId').value;
        const name = document.getElementById('editName').value;
        const email = document.getElementById('editEmail').value;

        try {
            await fetch(`${apiUrl}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email }),
            });
            document.getElementById('editUserForm').reset();
            showSection('all-users');
            fetchUsers();
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
        }
    };

    // Função para preencher o formulário de edição
    window.editUser = (id, name, email) => {
        document.getElementById('editUserId').value = id; // Usando 'id' como 'indusers'
        document.getElementById('editName').value = name;
        document.getElementById('editEmail').value = email;
        showSection('edit-user');
    };

    // Adiciona os ouvintes de eventos para os formulários
    document.getElementById('deleteUserForm').addEventListener('submit', deleteUser);
    document.getElementById('editUserForm').addEventListener('submit', editUser);

    // Mostra a seção "Todos os Usuários" e carrega os dados
    showSection('all-users');
    fetchUsers();
});
