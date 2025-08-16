// Variáveis globais
let products = [];
let total = 0;
let history = [];
let deferredPrompt;

// Função para remover item individual do histórico (deve ser global)
function removeHistoryItem(id) {
    console.log('Tentando remover item com ID:', id);
    console.log('Histórico atual:', history);
    
    const item = history.find(h => h.id === id);
    if (item) {
        console.log('Item encontrado:', item);
        
        if (item.type === 'product') {
            // Para produtos cadastrados, decrementar quantidade
            if (item.quantity > 1) {
                item.quantity -= 1;
                item.totalValue = item.unitValue * item.quantity;
                total -= item.unitValue;
            } else {
                // Se quantidade chegar a zero, remover o item
                total -= item.totalValue;
                history = history.filter(h => h.id !== id);
            }
        } else {
            // Para valores manuais, remover completamente
            total -= item.value;
            history = history.filter(h => h.id !== id);
        }
        
        console.log('Total atualizado:', total);
        console.log('Histórico após remoção:', history);
        updateDisplay();
        saveHistory();
    } else {
        console.log('Item não encontrado com ID:', id);
    }
}

// Inicialização da aplicação
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    updateDisplay();
    setupPWA();
    setupEventListeners();
});

// Configuração PWA
function setupPWA() {
  // Registrar service worker e detectar atualizações
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then((reg) => {
      // se já existe um SW esperando, notificar usuário
      if (reg.waiting) {
        showUpdatePrompt();
      }

      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // novo SW instalado e há um controlador ativo -> há atualização
            showUpdatePrompt();
          }
        });
      });
    }).catch(console.error);

    // quando o novo SW assumir, recarrega a página para usar novos assets
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      window.location.reload();
    });
  }

  // botão de atualização no layout deve chamar this function (ex: updateBtn)
  window.applyUpdate = function() {
    navigator.serviceWorker.getRegistration().then(reg => {
      if (reg && reg.waiting) {
        // pede ao SW em espera para assumir imediade
