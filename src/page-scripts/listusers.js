async function fetchUsers() {
    try {
        const users = await window.electronAPI.listUsers();
        displayUsers(users)
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
    }
}

function displayUsers(users) {
    const userListElement = document.getElementById('user-list');
    userListElement.innerHTML = '';

    users.forEach(user => {
        const userRow = document.createElement('tr');

        userRow.appendChild(createCell(user.name));
        userRow.appendChild(createCell(user.email));
        userRow.appendChild(createCell(user.phone));
        userRow.appendChild(createCell(user.cpf));

        const actionCell = createCell('', 'px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right');
        actionCell.appendChild(createEditButton());

        userRow.appendChild(actionCell);
        userListElement.appendChild(userRow);
    });
}

function createCell(content, classes) {
    const cell = document.createElement('td');
    cell.className = classes == null ? 'px-6 py-4 whitespace-nowrap text-sm text-gray-500' : classes;
    cell.textContent = content;
    return cell;
}

function createEditButton() {
    const editButton = document.createElement('button');

    const editIcon = document.createElement('i');
    editIcon.className = 'material-icons';
    editIcon.textContent = 'edit';

    editButton.appendChild(editIcon);
    return editButton;
}

window.onload = fetchUsers();
