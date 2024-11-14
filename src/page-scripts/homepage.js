document.getElementById('logout-button').addEventListener('click', () => {
  // Limpar dados de sessão ou qualquer outra lógica de logout
  console.log('Usuário deslogando...');
  window.electronAPI.removeUserLocalStorage();
  console.log('Usuário deslogado');
  window.location.href = "../pages/signin.html";
});

document.addEventListener("DOMContentLoaded", async () => {
  // Verificar role do usuário
  const user = JSON.parse(localStorage.getItem("User"));
  if (user && user.role === "ADMIN") {
    document.getElementById("registrar-usuario-link").style.display = "flex";
    document.getElementById("visualizar-usuarios-link").style.display = "flex";
  } else {
    document.getElementById("registrar-usuario-link").style.display = "none";
    document.getElementById("visualizar-usuarios-link").style.display = "none";
  }

  // Carregar chamados e preencher o dashboard
  try {
    const chamados = await window.electronAPI.invoke("get-chamados");

    // Contar chamados por status
    const abertos = chamados.filter(c => c.status === "Aberto").length;
    const indeferidos = chamados.filter(c => c.status === "Indeferido").length;
    const deferidos = chamados.filter(c => c.status === "Deferido").length;

    // Atualizar o contador no dashboard
    document.querySelector("#dashboard-abertos h4").textContent = abertos;
    document.querySelector("#dashboard-indeferidos h4").textContent = indeferidos;
    document.querySelector("#dashboard-deferidos h4").textContent = deferidos;

    // Preencher a tabela de chamados
    const chamadosTableBody = document.querySelector("table tbody");
    chamadosTableBody.innerHTML = ""; // Limpar linhas anteriores
    chamados.forEach(chamado => {
      const statusClass = getStatusClass(chamado.status); // Helper para classes de status
      const row = `
        <tr>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${chamado.id}</td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-900">${chamado.titulo}</div>
            <div class="text-sm text-gray-500">${chamado.descricao}</div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span class="inline-flex px-2 text-xs font-semibold leading-5 ${statusClass}">
              ${chamado.status}
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${new Date(chamado.createdAt).toLocaleDateString()}</td>
          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <a href="#" class="text-indigo-600 hover:text-indigo-900">Ver</a>
          </td>
        </tr>
      `;
      chamadosTableBody.insertAdjacentHTML("beforeend", row);
    });
  } catch (error) {
    console.error("Erro ao carregar chamados:", error);
  }
});

// Função auxiliar para definir a classe de status
function getStatusClass(status) {
  switch (status) {
    case "Aberto":
      return "text-yellow-800 bg-yellow-100 rounded-full";
    case "Indeferido":
      return "text-orange-800 bg-orange-100 rounded-full";
    case "Deferido":
      return "text-green-800 bg-green-100 rounded-full";
    default:
      return "text-gray-800 bg-gray-100 rounded-full";
  }
}
