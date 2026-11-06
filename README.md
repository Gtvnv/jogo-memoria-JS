# 🧠 Jogo da Memória com Emojis

Um jogo da memória clássico feito com **HTML, CSS e JavaScript puro** (sem bibliotecas ou frameworks). O objetivo é encontrar todos os pares de emojis no menor número de jogadas e no menor tempo possível.

## 🎮 Como jogar

1. Clique em uma carta para revelar o emoji.
2. Clique em uma segunda carta para tentar formar um par.
3. Se os emojis forem iguais, as cartas permanecem viradas.
4. Se forem diferentes, elas voltam a ficar com a face para baixo.
5. Vença encontrando os 8 pares!

## ✨ Funcionalidades

- 16 cartas (8 pares) embaralhadas a cada partida com o algoritmo de Fisher-Yates.
- Contador de **jogadas**, **pares encontrados** e **cronômetro**.
- Animação de virada das cartas em 3D.
- Modal de vitória com o resumo da partida.
- Botão de reiniciar a qualquer momento.
- Layout responsivo para desktop e mobile.

## 🚀 Como executar

Basta abrir o arquivo `index.html` no navegador. Nenhuma instalação é necessária.

```bash
# Ou, se preferir servir localmente:
npx serve .
```

## 🛠️ Tecnologias

- HTML5
- CSS3 (Grid, animações, variáveis CSS)
- JavaScript (ES6+)

## 📁 Estrutura do projeto

```
Jogo-Memoria/
├── index.html    # Estrutura da página
├── style.css     # Estilos e animações
├── script.js     # Lógica do jogo
└── README.md
```

---

Feito com 💛 para praticar JavaScript.
