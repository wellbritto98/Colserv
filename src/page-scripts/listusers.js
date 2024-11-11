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

function userWasUpdated() {
  // Pega a mensagem de sucesso do localStorage
  const successMessage = localStorage.getItem("updateSuccess");

  if (successMessage) {
    console.log("Success message:", successMessage);
    // Exibe o alerta com a mensagem
    document.getElementById("messageSuccessAlert").textContent = successMessage;
    document.getElementById("successAlertContainer").classList.remove("hidden"); // Exibe o alerta

    let timer = 5; // Tempo de exibição (em segundos)
    let timeLeft = timer;

    // Atualiza a barra de progresso
    const timeBarProgress = document.getElementById("timeBarProgress");
    const timeBarAlert = document.getElementById("timeBarAlert");

    const interval = setInterval(function () {
      if (timeLeft <= 0) {
        // Esconde o alerta após o tempo
        localStorage.removeItem("updateSuccess");
        document
          .getElementById("successAlertContainer")
          .classList.add("hidden"); // Esconde o alerta
        document.getElementById("messageSuccessAlert").textContent = ""; // Limpa o texto da mensagem

        clearInterval(interval);
      } else {
        // Decrementa o tempo
        timeLeft--;
        // Atualiza a largura da barra com base no tempo restante
        const progressWidth = (timeLeft / timer) * 100; // Calcula a porcentagem
        timeBarProgress.style.width = progressWidth + "%";
      }
    }, 1000); // A cada segundo, o timer é decrementado
  }
}

window.onload = () => {
  fetchUsers();
  userWasUpdated();
};
