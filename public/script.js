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
    // Registrar service worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('Service Worker registrado com sucesso:', registration);
                
                // Verificar atualizações
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            // Nova versão disponível
                            showUpdatePrompt();
                        }
                    });
                });
            })
            .catch((error) => {
                console.log('Falha ao registrar Service Worker:', error);
            });
    }

    // Capturar evento de instalação
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        showInstallPrompt();
    });

    // Evento de instalação concluída
    window.addEventListener('appinstalled', () => {
        hideInstallPrompt();
        deferredPrompt = null;
    });
}

// Mostrar prompt de instalação
function showInstallPrompt() {
    const installPrompt = document.getElementById('installPrompt');
    if (installPrompt) {
        installPrompt.style.display = 'flex';
    }
}

// Mostrar prompt de atualização
function showUpdatePrompt() {
    if (confirm('Uma nova versão está disponível! Deseja atualizar agora?')) {
        window.location.reload();
    }
}

// Ocultar prompt de instalação
function hideInstallPrompt() {
    const installPrompt = document.getElementById('installPrompt');
    if (installPrompt) {
        installPrompt.style.display = 'none';
    }
}

// Configurar event listeners
function setupEventListeners() {
    // Botão de instalação
    const installBtn = document.getElementById('installBtn');
    if (installBtn) {
        installBtn.addEventListener('click', installApp);
    }

    // Botão de configurações
    const configBtn = document.getElementById('configBtn');
    if (configBtn) {
        configBtn.addEventListener('click', openConfigModal);
    }

    // Botão de atualização
    const updateBtn = document.getElementById('updateBtn');
    if (updateBtn) {
        updateBtn.addEventListener('click', checkForUpdates);
    }

    // Fechar modal ao clicar fora
    window.addEventListener('click', (event) => {
        const modal = document.getElementById('configModal');
        if (event.target === modal) {
            closeConfigModal();
        }
    });
}

// Instalar aplicação
async function installApp() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            console.log('Usuário aceitou a instalação');
        } else {
            console.log('Usuário rejeitou a instalação');
        }
        deferredPrompt = null;
        hideInstallPrompt();
    }
}

// Gestão de produtos
function loadProducts() {
    const savedProducts = localStorage.getItem('calculadoraFesta_products');
    if (savedProducts) {
        products = JSON.parse(savedProducts);
    } else {
        // Produtos padrão
        products = [
            { id: 1, name: 'Nhoque', price: 30.00, order: 1 },
            { id: 2, name: 'Risoto de Frango', price: 25.00, order: 2 },
            { id: 3, name: 'Maionese', price: 15.00, order: 3 },
            { id: 4, name: 'Saladas', price: 12.00, order: 4 },
            { id: 5, name: 'Sobremesa', price: 10.00, order: 5 },
            { id: 6, name: 'Pastel', price: 7.00, order: 6 },
            { id: 7, name: 'Bolo fatia', price: 7.00, order: 7 },
            { id: 8, name: 'Bolo N.Sra', price: 10.00, order: 8 },
            { id: 9, name: 'Refrigerante', price: 7.00, order: 9 },
            { id: 10, name: 'Suco', price: 7.00, order: 10 },
            { id: 11, name: 'Agua', price: 3.00, order: 11 }
        ];
        saveProducts();
    }
    renderProducts();
    renderConfigProducts();
}

function saveProducts() {
    localStorage.setItem('calculadoraFesta_products', JSON.stringify(products));
}

function addProduct() {
    const name = document.getElementById('productName').value.trim();
    const price = parseFloat(document.getElementById('productPrice').value);
    const order = parseInt(document.getElementById('productOrder').value);

    if (!name || isNaN(price) || price <= 0 || isNaN(order) || order <= 0) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    const newProduct = {
        id: Date.now(),
        name: name,
        price: price,
        order: order
    };

    products.push(newProduct);
    products.sort((a, b) => a.order - b.order);
    
    saveProducts();
    renderProducts();
    renderConfigProducts();
    
    // Limpar formulário
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productOrder').value = '';
}

function deleteProduct(id) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
        products = products.filter(p => p.id !== id);
        saveProducts();
        renderProducts();
        renderConfigProducts();
    }
}

function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        document.getElementById('productName').value = product.name;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productOrder').value = product.order;
        
        // Remover produto antigo
        deleteProduct(id);
    }
}

// Renderização
function renderProducts() {
    const productsList = document.getElementById('productsList');
    if (!productsList) return;

    productsList.innerHTML = '';
    
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-item';
        productElement.onclick = () => addProductToTotal(product);
        
        productElement.innerHTML = `
            <span class="product-name">${product.name}</span>
            <span class="product-price">R$ ${product.price.toFixed(2)}</span>
        `;
        
        productsList.appendChild(productElement);
    });
}

function renderConfigProducts() {
    const configProductsList = document.getElementById('configProductsList');
    if (!configProductsList) return;

    configProductsList.innerHTML = '';
    
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'config-product-item';
        
        productElement.innerHTML = `
            <div class="config-product-info">
                <div class="config-product-name">${product.name}</div>
                <div class="config-product-price">R$ ${product.price.toFixed(2)} - Ordem: ${product.order}</div>
            </div>
            <div class="config-product-actions">
                <button class="edit-btn" onclick="editProduct(${product.id})" title="Editar">✏️</button>
                <button class="delete-btn" onclick="deleteProduct(${product.id})" title="Excluir">🗑️</button>
            </div>
        `;
        
        configProductsList.appendChild(productElement);
    });
}

// Calculadora
function addToCalculator(value) {
    const calcInput = document.getElementById('calcInput');
    calcInput.value += value;
}

function clearCalculator() {
    document.getElementById('calcInput').value = '';
}

function calculateResult() {
    const calcInput = document.getElementById('calcInput');
    try {
        const result = eval(calcInput.value);
        if (!isNaN(result) && isFinite(result)) {
            calcInput.value = result;
        } else {
            alert('Expressão inválida!');
            calcInput.value = '';
        }
    } catch (error) {
        alert('Erro na expressão!');
        calcInput.value = '';
    }
}

function addManualValue() {
    const calcInput = document.getElementById('calcInput');
    const value = parseFloat(calcInput.value);
    
    if (isNaN(value) || value <= 0) {
        alert('Por favor, insira um valor válido maior que zero.');
        return;
    }
    
    addToHistory('Valor manual', value);
    clearCalculator();
}

function addProductToTotal(product) {
    addToHistory(product.name, product.price);
}

function addToHistory(label, value) {
    // Se for um produto cadastrado (não valor manual), agrupar por quantidade
    if (label !== 'Valor manual') {
        const existingItem = history.find(item => item.label === label && item.type === 'product');
        
        if (existingItem) {
            // Incrementar quantidade e recalcular valor total
            existingItem.quantity += 1;
            existingItem.totalValue = existingItem.unitValue * existingItem.quantity;
            
            // Atualizar o total geral
            total = total - (existingItem.totalValue - existingItem.unitValue) + existingItem.totalValue;
        } else {
            // Criar novo item agrupado
            const historyItem = {
                id: Date.now() + Math.random(),
                label: label,
                type: 'product',
                unitValue: value,
                quantity: 1,
                totalValue: value
            };
            
            history.push(historyItem);
            total += value;
        }
    } else {
        // Valor manual - adicionar normalmente
        const historyItem = {
            id: Date.now() + Math.random(),
            label: label,
            type: 'manual',
            value: value
        };
        
        history.push(historyItem);
        total += value;
    }
    
    updateDisplay();
    saveHistory();
}

function updateDisplay() {
    // Atualizar total
    const totalElement = document.getElementById('totalValue');
    if (totalElement) {
        totalElement.textContent = `R$ ${total.toFixed(2)}`;
    }
    
    // Atualizar histórico
    const historyDisplay = document.getElementById('historyDisplay');
    if (historyDisplay) {
        historyDisplay.innerHTML = '';
        
        if (history.length === 0) {
            historyDisplay.innerHTML = '<div class="history-item">Nenhum item adicionado</div>';
        } else {
            history.forEach(item => {
                const historyItem = document.createElement('div');
                historyItem.className = 'history-item';
                
                if (item.type === 'product') {
                    // Item agrupado com quantidade
                    historyItem.innerHTML = `
                        <span class="history-label">${item.label} (${item.quantity}x)</span>
                        <div class="history-actions">
                            <span class="history-value">R$ ${item.totalValue.toFixed(2)}</span>
                            <button class="remove-item-btn" onclick="removeHistoryItem('${item.id}')" title="Remover 1 unidade" data-id="${item.id}">
                                🗑️
                            </button>
                        </div>
                    `;
                } else {
                    // Valor manual
                    historyItem.innerHTML = `
                        <span class="history-label">${item.label}</span>
                        <div class="history-actions">
                            <span class="history-value">R$ ${item.value.toFixed(2)}</span>
                            <button class="remove-item-btn" onclick="removeHistoryItem('${item.id}')" title="Remover item" data-id="${item.id}">
                                🗑️
                            </button>
                        </div>
                    `;
                }
                
                // Adicionar event listener diretamente para garantir funcionamento
                const removeBtn = historyItem.querySelector('.remove-item-btn');
                if (removeBtn) {
                    removeBtn.addEventListener('click', function() {
                        removeHistoryItem(item.id);
                    });
                }
                
                historyDisplay.appendChild(historyItem);
            });
        }
    }
}

function saveHistory() {
    localStorage.setItem('calculadoraFesta_history', JSON.stringify(history));
    localStorage.setItem('calculadoraFesta_total', total.toString());
}

function loadHistory() {
    const savedHistory = localStorage.getItem('calculadoraFesta_history');
    const savedTotal = localStorage.getItem('calculadoraFesta_total');
    
    if (savedHistory) {
        history = JSON.parse(savedHistory);
    }
    
    if (savedTotal) {
        total = parseFloat(savedTotal);
    }
}

// Modal de configurações
function openConfigModal() {
    const modal = document.getElementById('configModal');
    if (modal) {
        modal.style.display = 'block';
        renderConfigProducts();
    }
}

function closeConfigModal() {
    const modal = document.getElementById('configModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Função para verificar atualizações
function checkForUpdates() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistration().then((registration) => {
            if (registration) {
                registration.update();
                alert('Verificando atualizações... Recarregue a página em alguns segundos.');
            }
        });
    }
}



// Função para limpar histórico e total
function clearAll() {
    if (confirm('Tem certeza que deseja limpar todo o histórico e total?')) {
        history = [];
        total = 0;
        updateDisplay();
        saveHistory();
    }
}

// Carregar histórico ao inicializar
loadHistory();
updateDisplay();

// Adicionar botão de limpar tudo no header
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    if (header) {
        const clearBtn = document.createElement('button');
        clearBtn.className = 'config-btn';
        clearBtn.innerHTML = '🗑️';
        clearBtn.title = 'Limpar Tudo';
        clearBtn.onclick = clearAll;
        clearBtn.style.marginLeft = '0.5rem';
        
        header.appendChild(clearBtn);
    }
});
