# 🧘 StretchBreak

> Aplicativo desktop para ajudar pessoas que passam muito tempo sentadas a lembrar de fazer pausas, levantar e realizar alongamentos durante o dia.

O **StretchBreak** utiliza a técnica de Pomodoro para alternar períodos de foco e pausas, exibindo lembretes para que o usuário possa se movimentar e cuidar da postura durante a rotina de trabalho ou estudos.

Durante as pausas, o aplicativo oferece exercícios de alongamento com duração controlada.

---

## 📥 Baixar e instalar

Não é necessário instalar Node.js nem clonar o projeto para usar o app. Basta baixar o instalador pronto:

👉 **[Baixar a versão mais recente](https://github.com/hahncamila/stretchbreak/releases/latest)**

Na página de Releases, baixe o arquivo `StretchBreak-Setup.exe` e execute. Como o instalador não possui certificado de assinatura de código, o Windows SmartScreen pode exibir um aviso — clique em **"Mais informações"** → **"Executar assim mesmo"** para continuar.

> Disponível atualmente apenas para **Windows (x64)**.

---

## ✨ Funcionalidades

* ⏱️ Timer baseado na técnica Pomodoro, com anel de progresso circular
* 🎯 Períodos de foco e pausa
* 🔔 Notificações nativas do sistema
* 🧘 Sugestão de exercícios de alongamento
* 🔀 Seleção aleatória de exercícios sem repetir o anterior
* 🖥️ Janela de pausa exibida sobre outras aplicações
* 📌 Funcionamento em segundo plano
* 🪟 Aplicativo desktop desenvolvido com Electron
* 🔄 Controles de iniciar, pausar e resetar (o reset não fecha a janela de pausa)
* 🛠️ Ícone personalizado na aplicação e bandeja do sistema

---

## 🖥️ Como funciona

O StretchBreak alterna automaticamente entre dois estados:

```text
FOCO
  ↓
Timer termina
  ↓
PAUSA
  ↓
Notificação
  ↓
Usuário pode iniciar um alongamento
  ↓
Exercício
  ↓
FOCO
```

Durante a pausa, o usuário pode:

* iniciar o exercício sugerido;
* pular o exercício;
* finalizar o exercício.

A qualquer momento, o botão **Resetar** interrompe a sessão atual e volta o timer para o estado inicial de foco, sem fechar a janela do aplicativo.

---

## 🛠️ Tecnologias utilizadas

### Front-end

* React
* TypeScript
* Vite
* Material UI

### Desktop

* Electron
* Electron Forge (com maker Squirrel para Windows)

### Ferramentas

* Node.js
* npm
* ESLint

---

## 📁 Estrutura do projeto

```text
stretchbreak/
│
├── electron/
│   ├── assets/
│   │   └── icon.ico
│   ├── main.cjs
│   └── preload.cjs
│
├── src/
│   ├── components/
│   │   ├── Controls/
│   │   ├── ExerciseModal/
│   │   └── TimerCard/
│   │
│   ├── constants/
│   │   └── timer.ts
│   │
│   ├── hooks/
│   │   └── usePomodoro.ts
│   │
│   ├── pages/
│   │   └── Home/
│   │
│   ├── services/
│   │   ├── exerciseService.ts
│   │   └── notificationService.ts
│   │
│   ├── types/
│   │   ├── exercise.ts
│   │   └── timer.ts
│   │
│   └── utils/
│       └── formatTime.ts
│
├── public/
├── package.json
├── vite.config.ts
├── tsconfig.json
```

> A configuração do Electron Forge está embutida diretamente no `package.json`, na chave `config.forge`.

---

## 🚀 Rodando o projeto localmente (para desenvolvimento)

### 1. Clone o repositório

```bash
git clone https://github.com/hahncamila/stretchbreak.git
```

### 2. Entre na pasta

```bash
cd stretchbreak
```

### 3. Instale as dependências

```bash
npm install
```

---

## 💻 Desenvolvimento

Para executar o projeto em modo de desenvolvimento:

```bash
npm run electron:dev
```

Esse comando inicia o Vite e o Electron simultaneamente, com hot reload.

O projeto também pode ser executado somente como aplicação web (sem os recursos nativos do Electron, como notificações e bandeja do sistema):

```bash
npm run dev
```

---

## 🏗️ Build

Para gerar a versão de produção do front-end:

```bash
npm run build
```

Para executar a versão compilada através do Electron:

```bash
npm run electron:start
```

---

## 📦 Gerando o instalador localmente

O projeto utiliza **Electron Forge** para gerar o instalador do Windows.

```bash
npm run make
```

Os arquivos gerados ficam dentro da pasta `out/make/` (não versionada no Git — veja `.gitignore`).

---

## 🚢 Publicando uma nova versão (GitHub Releases)

O projeto está configurado com o `@electron-forge/publisher-github`, que builda, empacota e sobe o instalador automaticamente para a aba **Releases** do repositório.

1. Atualize a versão em `package.json` (`"version"`);
2. Gere um [token de acesso pessoal](https://github.com/settings/tokens) do GitHub com o escopo `repo`;
3. Defina o token na sessão do terminal:

   ```powershell
   $env:GITHUB_TOKEN="seu_token_aqui"
   ```

4. Rode:

   ```bash
   npm run publish
   ```

Isso cria uma nova tag/Release com o `StretchBreak-Setup.exe` já anexado, pronto para download.

---

## 🎨 Interface

A interface foi desenvolvida utilizando **Material UI**, com uma proposta simples e minimalista para que o timer seja o elemento principal da aplicação. O timer é representado por um anel de progresso circular, indicando visualmente quanto da sessão de foco ou pausa já passou.

A identidade visual utiliza tons terrosos e verde oliva, reforçando a proposta de bem-estar e pausas durante o trabalho.

---

## 🎯 Objetivo do projeto

O StretchBreak foi desenvolvido como um projeto de estudo e portfólio com o objetivo de explorar:

* desenvolvimento de aplicações desktop com Electron;
* integração entre React e Electron;
* comunicação entre renderer e main process através de IPC;
* gerenciamento de estado com React Hooks;
* notificações nativas;
* execução em segundo plano;
* criação de componentes com Material UI;
* construção e distribuição de aplicações desktop via GitHub Releases.

---

## 🔮 Próximas melhorias

Algumas funcionalidades que podem ser adicionadas futuramente:

* [ ] Configuração personalizada dos tempos de foco e pausa
* [ ] Contagem de pausas realizadas e tempo total de descanso
* [ ] Histórico de pausas
* [ ] Mais exercícios de alongamento
* [ ] Estatísticas semanais e mensais
* [ ] Configuração de horários de funcionamento
* [ ] Inicialização automática com o Windows
* [ ] Personalização das notificações
* [ ] Temas claro e escuro
* [ ] Versão para macOS/Linux
* [ ] Atualizações automáticas via Squirrel

---

## 👩‍💻 Autora

**Camila Moreira Hahn**

Projeto desenvolvido para estudo, prática e portfólio em desenvolvimento de aplicações desktop.

---

## 📄 Licença

Este projeto está disponível para fins de estudo e portfólio.
