# Jogo Inspirado no Flappy Bird
Jogo inspirado no game Flappy Bird, com mecânica simples, porém muito boa.
## Descrição

Este projeto é um jogo de navegador simples, inspirado no famoso game Flappy Bird. O jogo foi desenvolvido utilizando HTML5 Canvas e JavaScript puros. A mecânica é simples: você controla um pássaro que tenta evitar obstáculos enquanto coleta pontos. O jogo aumenta de dificuldade à medida que o tempo passa, tornando-se um desafio viciante.

## Lógica do Jogo

A lógica principal do jogo está contida em um arquivo JavaScript. Ele se encarrega de:

- Renderizar o pássaro e os obstáculos usando HTML5 Canvas.
- Controlar a física do jogo, como a gravidade que atua sobre o pássaro.
- Registrar a pontuação do jogador.
- Detectar colisões entre o pássaro e os obstáculos.

### Estrutura de Código

O código JavaScript faz o seguinte:

- Inicializa variáveis para controlar a posição do pássaro, sua velocidade, gravidade, etc.
- Adiciona um `EventListener` para detectar quando a tecla de espaço ou seta para baixo são pressionadas.
- Contém um loop que é responsável pela animação e atualização da posição do pássaro e obstáculos.

### Objetos Principais

- `birdY`: A coordenada Y do pássaro.
- `birdVelocity`: A velocidade atual do pássaro.
- `gravity`: A força da gravidade aplicada ao pássaro.
- `obstacles`: Um array contendo os obstáculos que o pássaro deve evitar.

## Controles

- Pressione a tecla de espaço para fazer o pássaro subir.
- Pressione a seta para baixo para fazer o pássaro descer mais rápido.

## Como Jogar

1. Abra o arquivo `index.html` em um navegador da web.
2. Use a tecla de espaço para fazer o pássaro subir.
3. Use a seta para baixo para fazer o pássaro descer mais rápido.
4. Evite colidir com os obstáculos para acumular pontos.

## Para rodar o projeto

- Clone o repositório para sua máquina local.
- Navegue até a pasta do projeto e abra o arquivo `index.html` com um navegador da web.

## Futuras Melhorias

- Adicionar mais tipos de obstáculos.
- Implementar um placar de líderes online.

---
[Visite o Jogo Aqui](https://bruksfildservices01.github.io/jogo-flupp/)


Este é um projeto em desenvolvimento e todos os tipos de contribuição são bem-vindos!



