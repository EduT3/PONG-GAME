//variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;


//velocidade da bolinha
let velocidadeYBolinha = 5;
let velocidadeXBolinha = 5;


//variaveis da raquete
let xRaquete = 5
let yRaquete = 150
let raqueteComprimento = 10
let raqueteAltura = 90
let colidiu = false;

//variaveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;
let chanceDeErrar = 0;

//placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

//sons do jogo
let ponto;
let raquetada;
let trilha;

//pré load dos sons
function preload(){
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
  trilha = loadSound("trilha.mp3");
}

//tela e som de fundo
function setup() {
  createCanvas(600,400);
  trilha.loop();
}


function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostrarRaquete(xRaquete,yRaquete);
  movimentaMinhaRaquete();
  verificaColisaoRaquete(xRaquete,yRaquete);
  mostrarRaquete(xRaqueteOponente,yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente,yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
}

//movimentação da raquete do oponente
function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha -yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
}

//calculo de chance de erro
function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

//desenhar a bolinha
function mostraBolinha(){
  circle(xBolinha,yBolinha,diametro);
}

//movimentação em x e y da bolinha
function movimentaBolinha(){
   xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

//colisão da bolinha com a borda
function verificaColisaoBorda(){
    if(xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
   if(yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

//bolinha presa
function bolinhaNaoFicaPresa(){
    if (XBolinha - raio < 0){
    XBolinha = 23
    }
}


//desenhar as raquetes
function mostrarRaquete(x,y){
  rect(x,y,raqueteComprimento,raqueteAltura);
  
}

// movimentação da raquete
function movimentaMinhaRaquete() {
    if (keyIsDown(UP_ARROW)) {
        yRaquete -= 10;
    }
    if (keyIsDown(DOWN_ARROW)) {
        yRaquete += 10;
    }
}

//colisão das raquetes 
function verificaColisaoRaquete(x,y){

  colidiu = 
  
  collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if(colidiu){
    velocidadeXBolinha *= -1;
    
    raquetada.play();
  }
}

//placar do jogo
function incluiPlacar() {
    stroke(255);
    textAlign(CENTER);
    textSize(16);
    fill(color(255, 140, 0));
    rect(150, 10, 40, 20);
    fill(255);
    text(meusPontos, 170, 26);
    fill(color(255, 140, 0));
    rect(450, 10, 40, 20);
    fill(255);
    text(pontosOponente, 470, 26);
}

//marcar pontos
function marcaPonto(){
  if(xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  if(xBolinha < 10){
    pontosOponente += 1;
    ponto.play();
  }
}

//multiplayer
//function movimentaRaqueteOponente(){
//    if (keyIsDown(87)){
//        yRaqueteOponente -= 10;
//   }
//    if (keyIsDown(83)){
//       yRaqueteOponente += 10;
//   }
//
//}








