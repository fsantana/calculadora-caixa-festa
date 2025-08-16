const fs = require('fs');
const path = require('path');

// Criar diretório de ícones se não existir
const iconsDir = path.join(__dirname, 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
}

// Tamanhos dos ícones necessários
const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Criar um ícone SVG básico como placeholder
const createBasicIcon = (size) => {
    const svg = `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#4CAF50"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${size * 0.4}" 
        fill="white" text-anchor="middle" dominant-baseline="middle">🧮</text>
</svg>`;
    
    return svg;
};

// Gerar ícones para cada tamanho
iconSizes.forEach(size => {
    const iconPath = path.join(iconsDir, `icon-${size}x${size}.png`);
    const svgPath = path.join(iconsDir, `icon-${size}x${size}.svg`);
    
    // Salvar SVG como placeholder
    fs.writeFileSync(svgPath, createBasicIcon(size));
    
    console.log(`✅ Ícone ${size}x${size} criado: ${svgPath}`);
});

console.log('\n🎉 Ícones básicos criados com sucesso!');
console.log('📝 Para produção, substitua estes ícones por versões PNG de alta qualidade.');
console.log('🔧 Você pode usar ferramentas como:');
console.log('   - PWA Asset Generator');
console.log('   - Real Favicon Generator');
console.log('   - Figma ou Adobe Illustrator');
