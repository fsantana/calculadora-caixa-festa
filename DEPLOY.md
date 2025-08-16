# 🚀 Deploy no Heroku - Calculadora Festa Igreja

Este guia te ajudará a fazer o deploy da aplicação Calculadora Festa Igreja no Heroku.

## 📋 Pré-requisitos

1. **Conta no Heroku**
   - Acesse [heroku.com](https://heroku.com)
   - Crie uma conta gratuita
   - Verifique seu email

2. **Heroku CLI instalado**
   - [Download do Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

3. **Git configurado**
   - Tenha o Git instalado e configurado

## 🔧 Passo a passo

### 1. Instalar Heroku CLI

#### Ubuntu/Debian:
```bash
curl https://cli-assets.heroku.com/install-ubuntu.sh | sh
```

#### macOS:
```bash
brew install heroku
```

#### Windows:
- Baixe o instalador do [site oficial](https://devcenter.heroku.com/articles/heroku-cli)

### 2. Fazer login no Heroku
```bash
heroku login
```
- Uma janela do navegador abrirá para autenticação
- Faça login com suas credenciais

### 3. Preparar o projeto
```bash
# Certifique-se de estar no diretório do projeto
cd calculadora-festa

# Inicializar git se não existir
git init

# Adicionar todos os arquivos
git add .

# Fazer commit inicial
git commit -m "Versão inicial da calculadora festa"
```

### 4. Criar app no Heroku
```bash
# Criar app com nome específico
heroku create seu-app-name

# OU deixar o Heroku gerar um nome
heroku create
```

### 5. Configurar variáveis de ambiente (opcional)
```bash
# Configurar ambiente de produção
heroku config:set NODE_ENV=production

# Verificar configurações
heroku config
```

### 6. Fazer deploy
```bash
# Adicionar remote do Heroku
git remote add heroku https://git.heroku.com/SEU-APP-NAME.git

# Fazer push para o Heroku
git push heroku main

# OU se sua branch principal for 'master'
git push heroku master
```

### 7. Verificar se está funcionando
```bash
# Abrir a aplicação no navegador
heroku open

# Ver logs em tempo real
heroku logs --tail
```

## 🐛 Solução de problemas

### Erro: "App not found"
```bash
# Verificar se o remote está correto
git remote -v

# Remover e adicionar novamente
git remote remove heroku
git remote add heroku https://git.heroku.com/SEU-APP-NAME.git
```

### Erro: "Build failed"
```bash
# Verificar logs detalhados
heroku logs --tail

# Verificar se o package.json está correto
cat package.json

# Verificar se todas as dependências estão instaladas
npm install
```

### Erro: "H10 - App crashed"
```bash
# Verificar se a porta está configurada corretamente
# No server.js deve estar: process.env.PORT || 3000

# Verificar logs
heroku logs --tail

# Reiniciar o app
heroku restart
```

## 🔄 Atualizações futuras

Para atualizar a aplicação:
```bash
# Fazer alterações no código
# Fazer commit
git add .
git commit -m "Descrição das alterações"

# Fazer deploy
git push heroku main
```

## 📱 Testar PWA

1. Acesse sua aplicação no Heroku
2. Abra no Chrome/Edge
3. Deve aparecer um prompt para instalar
4. Clique em "Instalar"
5. O app será adicionado à tela inicial

## 🌐 URLs importantes

- **Sua aplicação**: `https://seu-app-name.herokuapp.com`
- **Dashboard Heroku**: `https://dashboard.heroku.com`
- **Logs**: `https://dashboard.heroku.com/apps/seu-app-name/logs`

## 💰 Custos

- **Plano gratuito**: $0/mês (com algumas limitações)
- **Plano básico**: $7/mês
- **Outros planos**: [Ver preços](https://www.heroku.com/pricing)

## 📚 Recursos adicionais

- [Documentação oficial do Heroku](https://devcenter.heroku.com/)
- [Guia de deploy Node.js](https://devcenter.heroku.com/articles/deploying-nodejs)
- [Configuração de domínios customizados](https://devcenter.heroku.com/articles/custom-domains)

## 🆘 Suporte

Se encontrar problemas:
1. Verifique os logs: `heroku logs --tail`
2. Consulte a [documentação oficial](https://devcenter.heroku.com/)
3. Use o [fórum da comunidade](https://help.heroku.com/)

---

**🎉 Parabéns! Sua calculadora de festa está rodando na nuvem!**
