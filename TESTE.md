# 🧪 Guia de Teste - Calculadora Festa Igreja

Use este guia para testar todas as funcionalidades da aplicação antes de fazer o deploy.

## 🚀 Como executar os testes

### 1. Iniciar a aplicação
```bash
npm start
```

### 2. Acessar no navegador
- Abra: `http://localhost:3000`
- A aplicação deve carregar sem erros

## ✅ Checklist de funcionalidades

### 📱 Interface PWA
- [ ] **Título da página**: "Calculadora Festa Igreja"
- [ ] **Header verde** com título e botão de configurações
- [ ] **Layout responsivo** que se adapta ao tamanho da tela
- [ ] **Ícone da aplicação** aparece na aba do navegador

### 🧮 Calculadora
- [ ] **Display da calculadora** com fundo escuro
- [ ] **Botões numéricos** (0-9) funcionam
- [ ] **Botões de operação** (+, -, ×, ÷) funcionam
- [ ] **Botão de limpar** (C) limpa o display
- [ ] **Botão de igual** (=) calcula o resultado
- [ ] **Botão decimal** (.) adiciona ponto decimal
- [ ] **Botão "Adicionar"** adiciona valor ao total

### 📊 Produtos cadastrados
- [ ] **Lista de produtos** aparece com produtos padrão:
  - Bolo: R$ 25,00
  - Refrigerante: R$ 8,50
  - Salgados: R$ 15,00
- [ ] **Produtos clicáveis** adicionam valor ao total
- [ ] **Produtos ordenados** por número de ordem

### ⚙️ Configurações
- [ ] **Botão de configurações** (⚙️) abre modal
- [ ] **Formulário de produto** com campos:
  - Nome do produto
  - Preço
  - Ordem
- [ ] **Adicionar produto** funciona
- [ ] **Lista de produtos** para edição/exclusão
- [ ] **Botões de editar** (✏️) e excluir (🗑️) funcionam

### 💰 Funcionalidades financeiras
- [ ] **Total inicial** mostra R$ 0,00
- [ ] **Adicionar produto** aumenta o total
- [ ] **Adicionar valor manual** aumenta o total
- [ ] **Histórico** mostra todas as transações
- [ ] **Timestamp** em cada transação
- [ ] **Botão limpar tudo** (🗑️) funciona

### 🔄 PWA e Offline
- [ ] **Service Worker** registrado (ver console)
- [ ] **Manifest** carregado corretamente
- [ ] **Prompt de instalação** aparece (se suportado)
- [ ] **Funciona offline** após primeiro carregamento

## 🧪 Testes específicos

### Teste 1: Adicionar produtos
1. Clique em "Bolo" na lista
2. Verifique se o total mudou para R$ 25,00
3. Clique em "Refrigerante"
4. Verifique se o total mudou para R$ 33,50

### Teste 2: Calculadora manual
1. Digite "15.50" na calculadora
2. Clique em "Adicionar"
3. Verifique se o total aumentou para R$ 49,00
4. Verifique se aparece "Valor manual" no histórico

### Teste 3: Operações matemáticas
1. Digite "10+5" na calculadora
2. Clique em "="
3. Verifique se o resultado é "15"
4. Clique em "Adicionar"
5. Verifique se o total aumentou

### Teste 4: Configurações
1. Clique no botão ⚙️
2. Preencha: Nome="Café", Preço="3.50", Ordem="4"
3. Clique em "Adicionar Produto"
4. Verifique se o produto aparece na lista
5. Clique no produto para adicionar ao total

### Teste 5: Responsividade
1. Redimensione a janela do navegador
2. Teste em diferentes tamanhos
3. Abra as ferramentas de desenvolvedor
4. Simule diferentes dispositivos móveis

## 🐛 Problemas comuns

### Aplicação não carrega
- Verifique se o servidor está rodando
- Verifique se a porta 3000 está livre
- Verifique os logs do terminal

### Produtos não aparecem
- Verifique o console do navegador
- Verifique se o localStorage está funcionando
- Recarregue a página

### Calculadora não funciona
- Verifique se o JavaScript está carregado
- Verifique o console para erros
- Teste em navegador diferente

### PWA não instala
- Use Chrome ou Edge
- Verifique se o manifest está correto
- Verifique se o service worker está registrado

## 📱 Teste em dispositivos móveis

### Android
1. Abra no Chrome
2. Deve aparecer prompt de instalação
3. Teste todas as funcionalidades
4. Verifique se é responsivo

### iOS
1. Abra no Safari
2. Adicione à tela inicial
3. Teste todas as funcionalidades
4. Verifique se é responsivo

## 🎯 Critérios de aprovação

A aplicação está pronta para deploy quando:
- ✅ Todos os testes básicos passam
- ✅ Interface é responsiva
- ✅ PWA funciona corretamente
- ✅ Não há erros no console
- ✅ Funciona offline
- ✅ Dados persistem no localStorage

## 🚀 Próximos passos

Após os testes:
1. Corrigir problemas encontrados
2. Fazer commit das correções
3. Seguir o guia de deploy no Heroku
4. Testar a versão online

---

**🧪 Teste bem sua aplicação antes de fazer o deploy!**
