// Arquivo: app.js - Para gerenciar sua SPA

// Sistema de roteamento simples
const router = {
  // Armazena as rotas e seus respectivos conteúdos/handlers
  routes: {},

  // Define a rota padrão
  defaultRoute: 'dashboard',

  // Registra uma nova rota
  register: function (path, handler) {
    this.routes[path] = handler;
  },

  // Navega para uma rota específica
  navigate: function (path) {
    // Atualiza a URL com o fragmento (hash)
    window.location.hash = path;

    // Carrega o conteúdo
    this.loadContent(path);
  },

  // Carrega o conteúdo da rota
  loadContent: function (path) {
    const contentDiv = document.querySelector('.content');

    // Remove '#' do início do path se existir
    if (path.startsWith('#')) {
      path = path.substring(1);
    }

    // Se o path estiver vazio, usar a rota padrão
    if (!path) {
      path = this.defaultRoute;
    }

    // Verifica se a rota existe
    if (this.routes[path]) {
      // Chama o handler da rota
      const content = this.routes[path]();

      // Atualiza o conteúdo do container principal
      contentDiv.innerHTML = content;

      // Dispara um evento customizado para informar que o conteúdo foi carregado
      const event = new CustomEvent('contentLoaded', { detail: { route: path } });
      document.dispatchEvent(event);
    } else {
      // Rota não encontrada, carrega a rota padrão
      if (path !== this.defaultRoute && this.routes[this.defaultRoute]) {
        console.warn(`Rota "${path}" não encontrada. Redirecionando para a rota padrão.`);
        this.navigate(this.defaultRoute);
      } else {
        // Caso a rota padrão também não exista
        contentDiv.innerHTML = `
          <h2>Página não encontrada</h2>
          <p>A página "${path}" não foi encontrada.</p>
        `;
      }
    }
  },

  // Inicializa o router
  init: function () {
    // Manipula a mudança na hash da URL
    window.addEventListener('hashchange', () => {
      const path = window.location.hash.substring(1);
      this.loadContent(path);
    });

    // Carrega o conteúdo inicial
    const path = window.location.hash.substring(1);
    this.loadContent(path); // Se path estiver vazio, carregará a rota padrão
  }
};

// Registrar rotas e seus conteúdos
document.addEventListener('DOMContentLoaded', function () {
  // Registra a rota inicial/dashboard
  router.register('dashboard', function () {
    return `
      <h2>Dashboard</h2>
      <p>Bem-vindo ao sistema de gestão GB Sistemas.</p>
      <div class="dashboard-stats">
        <div class="stat-card">
          <h3>Empresas Ativas</h3>
          <p class="stat-number">42</p>
        </div>
        <div class="stat-card">
          <h3>Certidões a Vencer</h3>
          <p class="stat-number">8</p>
        </div>
        <div class="stat-card">
          <h3>Notas Fiscais Emitidas</h3>
          <p class="stat-number">124</p>
        </div>
      </div>
    `;
  });

  // Rota para NFS-e mensal
  router.register('nfse-mensal', function () {
    return `
      <h2>NFS-e Mensal</h2>
      <p>Gestão de Notas Fiscais de Serviço Mensais.</p>
      <div id="empresasGrid" class="empresas-grid-container">
        <!-- Conteúdo será carregado dinamicamente -->
      </div>
    `;
  });

  // Rota para NFS-e anual
  router.register('nfse-anual', function () {
    return `
      <h2>NFS-e Anual</h2>
      <p>Relatório anual de Notas Fiscais de Serviço.</p>
      <!-- Conteúdo da página NFS-e Anual -->
    `;
  });

  // Rota para DARF
  router.register('darf', function () {
    return `
      <h2>DARF</h2>
      <p>Gestão de DARFs</p>
      <!-- Conteúdo da página DARF -->
    `;
  });

  // Rota para Notas Fiscais 55
  router.register('nf55', function () {
    return `
      <h2>Notas Fiscais 55</h2>
      <p>Gestão de Notas Fiscais Eletrônicas (NF-e modelo 55)</p>
      <!-- Conteúdo para NF 55 -->
    `;
  });

  // Rota para NFC-e
  router.register('nfce', function () {
    return `
      <h2>NFC-e</h2>
      <p>Gestão de Notas Fiscais de Consumidor Eletrônica</p>
      <!-- Conteúdo para NFC-e -->
    `;
  });

  // Rota para CTE Emissor
  router.register('cte', function () {
    return `
      <h2>CTE Emissor</h2>
      <p>Gestão de Conhecimentos de Transporte Eletrônico</p>
      <!-- Conteúdo para CTE -->
    `;
  });

  // Rota para ecacPJPF
  router.register('ecacPJPF', function () {
    return `
      <h2>Certidão ecac PF e PJ</h2>
      <p>Gestão de Conhecimentos de Transporte Eletrônico</p>
      <!-- Conteúdo para ecacPJPF -->
    `;
  });

  // Rota para Municipal
  router.register('Municipal', function () {
    return `
      <h2>Certidão Municipal</h2>
      <p>Gestão de Conhecimentos de Transporte Eletrônico</p>
      <!-- Conteúdo para Municipal -->
    `;
  });

  // Rota para Sefaz
  router.register('Sefaz', function () {
    return `
      <h2>Certidão Sefaz</h2>
      <p>Gestão de Conhecimentos de Transporte Eletrônico</p>
      <!-- Conteúdo para Sefaz -->
    `;
  });

  // Rota para FGTS
  router.register('FGTS', function () {
    return `
      <h2>Certidão FGTS</h2>
      <p>Gestão de Conhecimentos de Transporte Eletrônico</p>
      <!-- Conteúdo para FGTS -->
    `;
  });

  router.register('cadastroEMp', function () {
    setTimeout(() => { // Garante que o DOM já foi atualizado antes de buscar o elemento
        const btnCadastrar = document.getElementById("btnCadastrar");
        if (btnCadastrar) {
            btnCadastrar.addEventListener("click", function () {
                let modalElement = document.getElementById("importModal");

                if (modalElement) {
                    let modalInstance = bootstrap.Modal.getInstance(modalElement);
                    
                    if (!modalInstance) {
                        modalInstance = new bootstrap.Modal(modalElement);
                    }

                    modalInstance.show();
                }
            });
        }
    }, 100); // Pequeno delay para garantir que o DOM foi atualizado antes de acessar o botão

    return `
      <h2>Cadastro de Empresas</h2>
      <p>Gerenciamento de empresas do sistema.</p>

      <button id="btnCadastrar" class="btn btn-primary">
          <i class="fa-solid fa-plus"></i> Cadastrar Empresas
      </button>

      <h3 class="mt-4">Empresas Cadastradas</h3>
      <div id="empresasGrid" class="empresas-grid-container">
        <!-- Os dados serão carregados dinamicamente -->
      </div>
    `;
});


  // Inicializa o router
  router.init();

  // Adiciona os event listeners aos itens do menu
  setupMenuListeners();

  // Adicionar listener para carregar dados quando o conteúdo muda
  document.addEventListener('contentLoaded', function (e) {
    const route = e.detail.route;

    // Verifica qual rota foi carregada e executa ações específicas
    if (route === 'empresas-cadastro' ||
      document.getElementById('empresasGrid')) {
      carregarEmpresas();
    }

    // Aqui você pode adicionar mais lógica dependendo da rota carregada
  });
});

// Configuração dos event listeners do menu
function setupMenuListeners() {
  // Seleciona todos os links de submenu
  document.querySelectorAll('.submenu a').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      // Obtém o hash do link ou usa o atributo data se disponível
      const route = this.getAttribute('data-route') || this.getAttribute('href').replace('#', '');

      if (route) {
        router.navigate(route);
      }
    });
  });

  // Event listener específico para o botão Cadastrar em Configurações
  const btnCadastrar = document.getElementById('btnCadastrar');
  if (btnCadastrar) {
    btnCadastrar.addEventListener('click', function (e) {
      e.preventDefault();
      router.navigate('empresas-cadastro');
    });
  }

  // Event listener para o botão Buscar
  const btnBuscar = document.getElementById('btnBuscar');
  if (btnBuscar) {
    btnBuscar.addEventListener('click', function (e) {
      e.preventDefault();
      // Você pode adicionar uma rota específica para busca ou usar uma existente
      router.navigate('dashboard');
    });
  }

  // Event listener para logout
  const btnLogout = document.getElementById('btnLogout');
  if (btnLogout) {
    btnLogout.addEventListener('click', function (e) {
      e.preventDefault();
      // Lógica de logout do Firebase
      firebase.auth().signOut().then(() => {
        // Redireciona para a página de login após logout
        window.location.href = 'index.html';
      }).catch((error) => {
        console.error("Erro ao fazer logout:", error);
      });
    });
  }
}

// Funções para carregar dados do Firestore
function carregarEmpresas() {
  const empresasGrid = document.getElementById('empresasGrid');
  if (!empresasGrid) return;

  // Limpa o grid
  empresasGrid.innerHTML = '<p>Carregando empresas...</p>';

  // Busca empresas no Firestore
  db.collection('empresas').get()
    .then((querySnapshot) => {
      if (querySnapshot.empty) {
        empresasGrid.innerHTML = '<p>Nenhuma empresa cadastrada.</p>';
        return;
      }

      // Cria a tabela
      let tableHTML = `
        <table class="table table-striped">
          <thead>
            <tr>
              <th>CNPJ</th>
              <th>Razão Social</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
      `;

      // Adiciona as empresas
      querySnapshot.forEach((doc) => {
        const empresa = doc.data();
        tableHTML += `
          <tr>
            <td>${empresa.cnpj}</td>
            <td>${empresa.razaoSocial}</td>
            <td>
              <button class="btn btn-sm btn-primary editar-empresa" data-id="${doc.id}">
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn btn-sm btn-danger excluir-empresa" data-id="${doc.id}">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        `;
      });

      tableHTML += `
          </tbody>
        </table>
      `;

      empresasGrid.innerHTML = tableHTML;

      // Adiciona event listeners para os botões de ação
      document.querySelectorAll('.editar-empresa').forEach(btn => {
        btn.addEventListener('click', function () {
          const id = this.getAttribute('data-id');
          editarEmpresa(id);
        });
      });

      document.querySelectorAll('.excluir-empresa').forEach(btn => {
        btn.addEventListener('click', function () {
          const id = this.getAttribute('data-id');
          excluirEmpresa(id);
        });
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar empresas:", error);
      empresasGrid.innerHTML = '<p>Erro ao carregar empresas.</p>';
    });
}

// Função para editar empresa
function editarEmpresa(id) {
  // Implemente de acordo com sua necessidade
  console.log("Editar empresa:", id);
}

// Função para excluir empresa
function excluirEmpresa(id) {
  Swal.fire({
    title: 'Confirmar exclusão',
    text: "Esta ação não pode ser revertida!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sim, excluir!',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      db.collection('empresas').doc(id).delete()
        .then(() => {
          Swal.fire(
            'Excluído!',
            'A empresa foi excluída com sucesso.',
            'success'
          );
          carregarEmpresas(); // Recarrega a lista
        })
        .catch((error) => {
          console.error("Erro ao excluir:", error);
          Swal.fire(
            'Erro!',
            'Ocorreu um erro ao excluir a empresa.',
            'error'
          );
        });
    }
  });
}