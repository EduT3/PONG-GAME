let jogando = false;
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
  const tela = createCanvas(600,400);
  tela.parent("jogo");
  tela.elt.setAttribute("aria-label", "Campo do jogo Pong. Use as setas para controlar a raquete.");
  document.getElementById("iniciar").addEventListener("click", alternarJogo);
}


function draw() {
  background(0);
  mostraBolinha();
  if (!jogando) { incluiPlacar(); return; }
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
  yRaqueteOponente = constrain(yRaqueteOponente + velocidadeYOponente + chanceDeErrar, 0, height - raqueteAltura);
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

   if(yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
    yBolinha = constrain(yBolinha, raio, height - raio);
  }
}

//bolinha presa
function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 23
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
    yRaquete = constrain(yRaquete, 0, height - raqueteAltura);
}

//colisão das raquetes 
function verificaColisaoRaquete(x,y){

  colidiu = 
  
  collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, diametro);
  if(colidiu && ((x < width / 2 && velocidadeXBolinha < 0) || (x > width / 2 && velocidadeXBolinha > 0))){
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
  if(xBolinha - raio > width){
    meusPontos += 1;
    ponto.play();
    reiniciarBolinha();
  }
  if(xBolinha + raio < 0){
    pontosOponente += 1;
    ponto.play();
    reiniciarBolinha();
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









function reiniciarBolinha() {
  xBolinha = width / 2; yBolinha = height / 2;
  velocidadeXBolinha *= -1;
  document.getElementById("placar").textContent = `Você ${meusPontos} × ${pontosOponente} Computador`;
}
function alternarJogo() {
  jogando = !jogando;
  document.getElementById("iniciar").textContent = jogando ? "Pausar" : "Jogar";
  if (jogando) { userStartAudio(); if (!trilha.isPlaying()) trilha.loop(); }
  else trilha.pause();
}
function keyPressed() {
  if (keyCode === 32 && document.activeElement.tagName !== "BUTTON") { alternarJogo(); return false; }
  if (keyCode === UP_ARROW || keyCode === DOWN_ARROW) return false;
}
function mouseDragged() {
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    yRaquete = constrain(mouseY - raqueteAltura / 2, 0, height - raqueteAltura);
    return false;
  }
}
function touchMoved() { return mouseDragged(); }
