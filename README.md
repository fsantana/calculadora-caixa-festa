# 🧮 Calculadora Festa Igreja - PWA

Uma aplicação PWA (Progressive Web App) para calculadora de festas de igreja, com funcionalidades de cadastro de produtos e calculadora tradicional.

## ✨ Funcionalidades

- **Calculadora tradicional** com operações matemáticas básicas
- **Cadastro de produtos** com nome, preço e ordem
- **Interface responsiva** para uso em dispositivos móveis
- **Instalação como app** no celular (PWA)
- **Histórico de transações** com timestamp
- **Persistência local** dos dados
- **Funcionamento offline** com service worker

## 🚀 Como usar

### 1. Adicionar produtos cadastrados
- Clique no botão ⚙️ (configurações)
- Preencha nome, preço e ordem do produto
- Clique em "Adicionar Produto"

### 2. Usar produtos na calculadora
- Clique em qualquer produto da lista para adicionar ao total
- O valor será automaticamente somado ao total geral

### 3. Usar calculadora manual
- Use os botões da calculadora para inserir valores
- Clique em "Adicionar" para incluir o valor no total
- Use operações matemáticas se necessário

### 4. Visualizar histórico
- Todas as transações aparecem na área de histórico
- O total é atualizado automaticamente
- Use o botão 🗑️ para limpar tudo

## 📱 Instalação como PWA

1. Abra a aplicação no navegador
2. Aparecerá um prompt para instalar
3. Clique em "Instalar"
4. O app será adicionado à tela inicial do seu dispositivo

## 🛠️ Tecnologias utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **PWA**: Service Worker, Web App Manifest
- **Armazenamento**: LocalStorage
- **Responsividade**: CSS Grid, Flexbox, Media Queries

## 📦 Instalação local

### Pré-requisitos
- Node.js 18.x ou superior
- npm ou yarn

### Passos
1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd calculadora-festa
```

2. Instale as dependências:
```bash
npm install
```

3. Execute a aplicação:
```bash
npm start
```

4. Acesse: `http://localhost:3000`

### Desenvolvimento
```bash
npm run dev
```

## 🚀 Deploy no Heroku

### 1. Crie uma conta no Heroku
- Acesse [heroku.com](https://heroku.com)
- Crie uma conta gratuita

### 2. Instale o Heroku CLI
```bash
# Ubuntu/Debian
sudo apt-get install heroku

# macOS
brew install heroku

# Windows
# Baixe o instalador do site oficial
```

### 3. Faça login no Heroku
```bash
heroku login
```

### 4. Crie o app no Heroku
```bash
heroku create seu-app-name
```

### 5. Configure as variáveis de ambiente (opcional)
```bash
heroku config:set NODE_ENV=production
```

### 6. Faça deploy
```bash
git add .
git commit -m "Deploy para Heroku"
git push heroku main
```

### 7. Abra a aplicação
```bash
heroku open
```

## 📁 Estrutura do projeto

```
calculadora-festa/
├── public/                 # Arquivos públicos
│   ├── index.html         # Página principal
│   ├── styles.css         # Estilos CSS
│   ├── script.js          # JavaScript principal
│   ├── manifest.json      # Manifest PWA
│   ├── sw.js             # Service Worker
│   └── icons/            # Ícones PWA
├── server.js              # Servidor Express
├── package.json           # Dependências e scripts
└── README.md             # Este arquivo
```

## 🎨 Personalização

### Cores
As cores principais podem ser alteradas no arquivo `styles.css`:
- Cor primária: `#4CAF50` (verde)
- Cor secundária: `#45a049` (verde escuro)
- Cor de fundo: Gradiente azul/roxo

### Produtos padrão
Os produtos iniciais podem ser modificados no arquivo `script.js` na função `loadProducts()`.

## 🔧 Configurações adicionais

### Porta do servidor
Altere a variável `PORT` no arquivo `server.js` ou use a variável de ambiente `PORT`.

### Ícones PWA
Substitua os ícones na pasta `public/icons/` pelos seus próprios ícones nos tamanhos especificados.

## 📱 Compatibilidade

- ✅ Chrome 67+
- ✅ Firefox 67+
- ✅ Safari 11.1+
- ✅ Edge 79+
- ✅ Dispositivos móveis (iOS 11.3+, Android 5+)

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🆘 Suporte

Se encontrar algum problema ou tiver dúvidas:
1. Verifique se todas as dependências estão instaladas
2. Confirme se está usando Node.js 18+
3. Verifique os logs do console do navegador
4. Abra uma issue no repositório

## 🎯 Roadmap

- [ ] Exportar histórico para PDF
- [ ] Múltiplas listas de produtos
- [ ] Backup na nuvem
- [ ] Temas personalizáveis
- [ ] Modo escuro
- [ ] Notificações push
- [ ] Sincronização entre dispositivos

---

**Desenvolvido com ❤️ para facilitar o controle financeiro das festas de igreja**
