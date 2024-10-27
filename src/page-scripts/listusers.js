async function fetchUsers() {
  try {
    const users = await window.electronAPI.listUsers();
    displayUsers(users);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
  }
}

function displayUsers(users) {
  const userListElement = document.getElementById("user-list");
  userListElement.innerHTML = "";

  users.forEach((user) => {
    const userRow = document.createElement("tr");

    userRow.appendChild(createCell(user.name));
    userRow.appendChild(createCell(user.email));
    userRow.appendChild(createCell(user.phone));
    userRow.appendChild(createCell(user.cpf));

    const actionCell = createCell(
      "",
      "px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right"
    );
    actionCell.appendChild(createEditButton(user));

    userRow.appendChild(actionCell);
    userListElement.appendChild(userRow);
  });
}

function createCell(content, classes) {
  const cell = document.createElement("td");
  cell.className =
    classes == null
      ? "px-6 py-4 whitespace-nowrap text-sm text-gray-500"
      : classes;
  cell.textContent = content;
  return cell;
}

function createEditButton(user) {
  const editButton = document.createElement("button");
  const editIcon = document.createElement("i");

  editIcon.className = "material-icons";
  editIcon.textContent = "edit";

  editButton.type = "button";

  editButton.onclick = () => {
    window.location.href = `edituser.html`;
    saveUserToEdit(user);
  };

  editButton.appendChild(editIcon);
  return editButton;
}

function saveUserToEdit(user) {
  localStorage.setItem("User", JSON.stringify(user));
}

window.onload = fetchUsers();
