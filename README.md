# Projeto de Painel Vue 3 + Vite + Tailwind

Este projeto é um painel de administração desenvolvido com Vue 3, Vite e Tailwind CSS. Ele inclui funcionalidades como login, dashboard e painel de configurações, permitindo a gestão de usuários e preferências.

## Tecnologias Utilizadas

- **Vue 3**: Framework JavaScript para construção da interface do usuário.
- **Vite**: Ferramenta de build rápida para Vue.js.
- **Tailwind CSS**: Framework CSS para estilização utilitária.
- **Vue Router**: Para navegação entre as páginas.
- **Pinia**: Gerenciamento de estado (substituindo Vuex).
- **Axios**: Para requisições HTTP.
  
## Funcionalidades

- **Login**: Tela de login para autenticação de usuários.
- **Dashboard**: Tela principal com estatísticas e informações do sistema.
- **Painel de Configurações**: Permite ao usuário gerenciar suas preferências e níveis de acesso.

## Pré-requisitos

Antes de rodar, instale as seguintes ferramentas:

- **Node.js** (versão 18 ou superior)
- **npm** (gerenciador de pacotes do Node)

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/LuizAbudi/convicti-test.git
cd nome-do-projeto
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Agora, o painel estará disponível em [http://localhost:3000](http://localhost:3000).

## Estrutura do Projeto

A estrutura do projeto segue o padrão recomendado para Vue 3 e Vite:

```
convicti-test/
├─ .vscode/                       # Configurações do Visual Studio Code
│  └─ extensions.json             # Extensões recomendadas para o VSCode
├─ public/                        # Arquivos públicos e estáticos
│  └─ favicon.ico                 # Ícone do site
├─ src/                           # Código fonte do projeto
│  ├─ assets/                     # Imagens, ícones e estilos globais
│  │  ├─ icons/                   # Ícones do projeto
│  │  ├─ dashboard-image.png      # Imagem do dashboard
│  │  ├─ logo.svg                 # Logo do projeto
│  │  └─ main.css                 # Estilos globais
│  ├─ components/                 # Componentes reutilizáveis
│  │  ├─ Modal/                   # Componentes de modais
│  │  ├─ ui/                      # Componentes de interface (ex. toasts)
│  │  ├─ AppSidebar.vue           # Sidebar do app
│  │  ├─ FeedbacksCard.vue        # Cartão de feedbacks
│  │  ├─ InformationsCard.vue     # Cartão de informações
│  │  ├─ NewFeaturesCard.vue      # Cartão de novas funcionalidades
│  │  ├─ ProfileCard.vue          # Cartão de perfil
│  │  └─ UsersCard.vue            # Cartão de usuários
│  ├─ composables/                # Funções reutilizáveis (ex. useDownloads)
│  ├─ layouts/                    # Layouts das páginas
│  ├─ router/                     # Configurações de roteamento
│  ├─ services/                   # Serviços de API (ex. LoginService, UserService)
│  ├─ stores/                     # Estado global (Pinia)
│  ├─ views/                      # Páginas do app (Login, Dashboard, Configurações)
│  ├─ App.vue                     # Componente raiz
│  └─ main.ts                     # Arquivo de entrada do Vue
├─ .editorconfig                  # Configurações do editor de código
├─ .env                           # Variáveis de ambiente
├─ package.json                   # Dependências e scripts do projeto
├─ README.md                      # Documentação do projeto
├─ vite.config.ts                 # Configurações do Vite
└─ tsconfig.json                  # Configurações do TypeScript
```

## Configuração do Tailwind CSS

O Tailwind CSS está pré-configurado neste projeto. Qualquer modificação nos estilos pode ser feita no arquivo `src/styles/index.css` ou diretamente nos arquivos Vue usando as classes utilitárias do Tailwind.

## Desenvolvimento

Durante o desenvolvimento, você pode utilizar os seguintes comandos:

- **Rodar o servidor de desenvolvimento**: `npm run dev`
- **Compilar o projeto para produção**: `npm run build`
- **Verificar o projeto (Linting)**: `npm run lint`

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para enviar pull requests com melhorias ou correções de bugs.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
