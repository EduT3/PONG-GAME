# Pong com p5.js

Recriação educacional de Pong com raquete controlada pelo jogador e oponente automático.

## Tecnologias

HTML, CSS e JavaScript. Sem framework de interface.

## Executar

Na raiz do repositório, com Python 3 instalado:

```sh
python -m http.server 8000
```

Abra http://localhost:8000/PONG_2023_02_06_21_44_46/ após iniciar o servidor. As bibliotecas p5.js, p5.sound e collide2d já estão no projeto.

## Recursos e melhorias

- Jogar/pausar por botão; espaço também pausa. Setas ou arraste controlam a raquete.
- Pontuação reinicia a bola para impedir pontos duplicados; raquetes ficam dentro do campo.
- Canvas responsivo e instruções em português. Áudio começa por ação do jogador.

## Testes

Com Node.js 18 ou superior, execute na raiz:

```sh
node --test tests/*.test.cjs
```

Os testes de regressão usam o test runner nativo, DOM e serviços simulados, sem instalar dependências. Cobrem fluxos específicos de lógica, não substituem testes visuais, de acessibilidade ou integração em navegador real.

## Escopo e limitações

Jogo em canvas: o placar é anunciado, mas a partida não oferece uma alternativa não visual completa. Testes usam dublês de p5; física visual, som e toque precisam de teste em navegador.

## Contexto

Projeto de estudos de Eduardo (EduT3). A proposta e os recursos originais foram preservados; as melhorias priorizam correção, uso por teclado, adaptação de layout e documentação.

### Links registrados na versão original

- https://editor.p5js.org/EduT3/full/vT_dRSnxt">Link
- https://editor.p5js.org/EduT3/sketches/vT_dRSnxt">Link

Esses links foram preservados como referência e não representam publicação desta revisão.
