/* Construindo o vetor de representação do tabuleiro */
let tabuleiro = [
  null, 0, null, 1, null, 2, null, 3,
  4, null, 5, null, 6, null, 7, null,
  null, 8, null, 9, null, 10, null, 11,
  null, null, null, null, null, null, null, null,
  null, null, null, null, null, null, null, null,
  12, null, 13, null, 14, null, 15, null,
  null, 16, null, 17, null, 18, null, 19,
  20, null, 21, null, 22, null, 23, null
]

/* Representando cada elemento do tabuleiro em um vetor com todos os elementos da mesma classe */
let tabuleiroHTML = document.querySelectorAll("td");
let pecasVermelhas = document.querySelectorAll(".peca_vermelha");
let pecasPretas = document.querySelectorAll(".peca_preta");
let menuTurno = document.querySelector(".menu_turno");
let pecasJodador; // Recebera as peças do jogador do turno atual

/* Criando as variaveis do jogo (Numero de peças de cada jogador, turno atual, etc.) */
let turno = true; // turno = true (Turno do jogador com peças vermelhas); turno = false (Turno do jogador com peças pretas)
let turnoVermelho = document.querySelector(".turno_vermelho");
let turnoPreto = document.querySelector(".turno_preto");
turnoPreto.classList.add("color-gray");
let pecasVermelhasRestantes = 12; // Quantidade de peças vermelhas restantes no tabuleiro
let pecasPretasRestantes = 12; // Quantidade de peças pretas restantes no tabuleiro

/* Crinado um objeto para representar todas a variaveis de uma peça quando ela é selecionada */
let pecaSelecionada = {
  id: -1, // id da peça selecionada (0 até 23)
  indexTabuleiro: -1, // Local no tabuleiro (0 até 63) onde esta peça esta localizada atualmente
  rei: false, // Informa se a peça selecionada é um rei (true) ou não (false)
  pecaDiagonalSuperiorEsquerda: null, // Informa se existe uma peça do jogador, ou do seu adiverdario, na diagonal superior a esquerda da peça selecionada
  pecaDiagonalSuperiorDireita: null, // Informa se existe uma peça do jogador, ou do seu adiverdario, na diagonal superior a direita da peça selecionada
  pecaDiagonalInferiorEsquerda: null, // Informa se existe uma peça do jogador, ou do seu adiverdario, na diagonal inferior a esquerda da peça selecionada
  pecaDiagonalInferiorDireita: null, // Informa se existe uma peça do jogador, ou do seu adiverdario,na diagonal inferior a direita da peça selecionada
  pularDiagonalSuperiorEsquerda: false, // Informa se a peça selecionada pode se movimentar na diagonal superior a esquerda no tabuleiro
  pularDiagonalSuperiorDireita: false, // Informa se a peça selecionada pode se movimentar na diagonal superior a direita no tabuleiro
  pularDiagonalInferiorEsquerda: false, // Informa se a peça selecionada pode se movimentar na diagonal inferior a esquerda no tabuleiro
  pularDiagonalInferiorDireita: false, // Informa se a peça selecionada pode se movimentar na diagonal inferior a direita no tabuleiro
}

adicionarEventoPecasJogador();

/* Adicionando um event listeners as peças do tabuleiro para tornar elas responsivas ao click baseado no turno dos jogadores */
function adicionarEventoPecasJogador() {

  if (turno) { // Turno do jogador com peças vermelhas
      for (let i = 0; i < pecasVermelhas.length; i++) {
          pecasVermelhas[i].addEventListener("click", iniciarPecasJogador); 
      }
  } else { // Turno do jogador com peças pretas
      for (let i = 0; i < pecasPretas.length; i++) {
          pecasPretas[i].addEventListener("click", iniciarPecasJogador);
      }
  }
}

// Inicia a manipulação das peças do jogador neste turno
function iniciarPecasJogador() {
  if (turno){
      pecasJodador = pecasVermelhas;
  } else {
      pecasJodador = pecasPretas;
  }

  receberPecaSelecionada();
}

// Remover temporariamente os eventos onClick dos espaços do tabuleiro (Será feito sempre antes do inicio de um novo turno)
function removerEventosTabuleiroHTML() {
  for (let i = 0; i < pecasJodador.length; i++) {
      pecasJodador[i].removeAttribute("onClick");
      pecasJodador[i].removeEventListener("click", iniciarPecasJogador);
  }
 
  resetarCoresTabuleiro();
}

// Reinicia o tabuleiro com novos eventos e propriedades 
function resetarCoresTabuleiro() {
  // Remove a borda verde da peça selecionada anteriormente e coloca uma borda branca em todas as peças do jogador
  console.log("resetar cores")
  console.log(pecasJodador);
  for (let i = 0; i < pecasJodador.length ; i++) {
      pecasJodador[i].style.border = "1px solid white";
  }
  if(pecaSelecionada.pecaDiagonalInferiorEsquerda !== null) {
      if(pecaSelecionada.pecaDiagonalInferiorEsquerda === 0) {
          colorirEspaco = true;
          tabuleiroHTML[(pecaSelecionada.indexTabuleiro + 7)].style.backgroundColor = "rgb(147, 94, 33)";
          tabuleiroHTML[(pecaSelecionada.indexTabuleiro + 7)].removeAttribute("onclick", "moverPeca(7)");
      }
  }
  if(pecaSelecionada.pecaDiagonalInferiorDireita !== null) {
      if(pecaSelecionada.pecaDiagonalInferiorDireita === 0) {
          colorirEspaco = true;
          tabuleiroHTML[(pecaSelecionada.indexTabuleiro + 9)].style.backgroundColor = "rgb(147, 94, 33)";
          tabuleiroHTML[(pecaSelecionada.indexTabuleiro + 9)].removeAttribute("onclick", "moverPeca(9)");  
      }
  }
  if(pecaSelecionada.pecaDiagonalSuperiorDireita !== null) {
      if(pecaSelecionada.pecaDiagonalSuperiorDireita === 0) {
          colorirEspaco = true;
          tabuleiroHTML[(pecaSelecionada.indexTabuleiro - 7)].style.backgroundColor = "rgb(147, 94, 33)";
          tabuleiroHTML[(pecaSelecionada.indexTabuleiro - 7)].removeAttribute("onclick", "moverPeca(-7)"); 
      }
  }
  if(pecaSelecionada.pecaDiagonalSuperiorEsquerda !== null) {
      if(pecaSelecionada.pecaDiagonalSuperiorEsquerda === 0) {
          colorirEspaco = true;
          tabuleiroHTML[(pecaSelecionada.indexTabuleiro - 9)].style.backgroundColor = "rgb(147, 94, 33)";
          tabuleiroHTML[(pecaSelecionada.indexTabuleiro - 9)].removeAttribute("onclick", "moverPeca(-9)"); 
      }
  }
  if(pecaSelecionada.pularDiagonalInferiorEsquerda) {
      colorirEspaco = true;
      tabuleiroHTML[(pecaSelecionada.indexTabuleiro + 14)].style.backgroundColor = "rgb(147, 94, 33)";
      tabuleiroHTML[(pecaSelecionada.indexTabuleiro + 14)].removeAttribute("onclick", "moverPeca(14)"); 
  }
  if(pecaSelecionada.pularDiagonalInferiorDireita) {
      colorirEspaco = true;
      tabuleiroHTML[(pecaSelecionada.indexTabuleiro + 18)].style.backgroundColor = "rgb(147, 94, 33)";
      tabuleiroHTML[(pecaSelecionada.indexTabuleiro + 18)].removeAttribute("onclick", "moverPeca(18)"); 
  }
  if(pecaSelecionada.pularDiagonalSuperiorDireita) {
      colorirEspaco = true;
      tabuleiroHTML[(pecaSelecionada.indexTabuleiro - 14)].style.backgroundColor = "rgb(147, 94, 33)";
      tabuleiroHTML[(pecaSelecionada.indexTabuleiro - 14)].removeAttribute("onclick", "moverPeca(-14)"); 
  }
  if(pecaSelecionada.pularDiagonalSuperiorEsquerda) {
      colorirEspaco = true;
      tabuleiroHTML[(pecaSelecionada.indexTabuleiro - 18)].style.backgroundColor = "rgb(147, 94, 33)";
      tabuleiroHTML[(pecaSelecionada.indexTabuleiro - 18)].removeAttribute("onclick", "moverPeca(-18)"); 
  }
  resetarPropriedadesPecaSelecionada();
}

// Redefine as propriedades do objeto pecaSelecionada de volta ao padrão
function resetarPropriedadesPecaSelecionada() {
  pecaSelecionada.id = -1;
  pecaSelecionada.indexTabuleiro = -1;
  pecaSelecionada.rei = false;
  pecaSelecionada.pecaDiagonalSuperiorEsquerda = null;
  pecaSelecionada.pecaDiagonalSuperiorDireita = null;
  pecaSelecionada.pecaDiagonalInferiorEsquerda = null;
  pecaSelecionada.pecaDiagonalInferiorDireita = null;
  pecaSelecionada.pularDiagonalSuperiorEsquerda = false;
  pecaSelecionada.pularDiagonalSuperiorDireita = false;
  pecaSelecionada.pularDiagonalInferiorEsquerda = false;
  pecaSelecionada.pularDiagonalInferiorDireita = false;
}

// Redefine as propriedades para a nova peça selecionada através do objeto pecaSelecionada
function receberPecaSelecionada() {
  console.log("receber pecas selecionadas")
  console.log(event);
  resetarCoresTabuleiro();
  pecaSelecionada.id = parseInt(event.target.id); // Recebe o id da peça selecionada através de um novo evento
  pecaSelecionada.indexTabuleiro = encontarPeca(pecaSelecionada.id); // Recebe a posição onde a peça selecionada se encontra no tabuleiro
  console.log(pecaSelecionada)
  console.log()
  verificarPecaRei();
}

// Encontra a posição de um peça selecionada através do index do id da peça no vetor que representa o tabuleiro
let encontarPeca = function (pecaId) {
  console.log("encontrar peca")
  intPecaId = parseInt(pecaId);
  console.log("index: " + tabuleiro.indexOf(intPecaId));
  return tabuleiro.indexOf(intPecaId);
}

// Verifica se a peça selecionada é rei ou não e adiciona esta propriedade ao objeto pecaSelecionada
function verificarPecaRei() {
  console.log("verificar peca rei");
  // Verificar se  o elemento HTML da peca selecionada possue "rei" como umas das propriedades de sua classe
  console.log(tabuleiroHTML)
  console.log(pecasJodador)
  console.log(pecaSelecionada)
  rei = document.getElementById(pecaSelecionada.id).classList.contains("rei");
  console.log("rei: " + rei)
  if (rei) {
      pecaSelecionada.rei = true;
      verificarMovimentosEnvoltaPeca(0);
      verificarPulosPecaSelecionada(0);
  } else {
      pecaSelecionada.rei = false;
      if (turno) { // Peça selecionada é vermelha
          verificarMovimentosEnvoltaPeca(1);
          verificarPulosPecaSelecionada(1);
      } else {
          verificarMovimentosEnvoltaPeca(-1);
          verificarPulosPecaSelecionada(-1);
      }
  }
  movimentosPossiveisPecaSelecionada();
}

// Verifica se existem e onde estão as peças do jogador advesario, ao redor da peça selecionada, e adiciona esta propriedade ao objeto pecaSelecionada
function verificarMovimentosEnvoltaPeca(tipoPeca) {
  console.log("verificar movimento envolta peca");
  if(tipoPeca == 0 || tipoPeca == 1) {
      console.log("peca vermelha")
      if ((pecaSelecionada.indexTabuleiro + 7) < tabuleiro.length && // A peça esta dentro do tabuleiro
          (pecaSelecionada.indexTabuleiro + 7) % 8 < pecaSelecionada.indexTabuleiro % 8) { // A peça selecionada não está na borda esquerda do tabuleiro
          if (tabuleiro[(pecaSelecionada.indexTabuleiro + 7)] === null ) { // Não existe nenhuma peça no espaço da diagonal inferior esquerda da peça selecionada
                  pecaSelecionada.pecaDiagonalInferiorEsquerda = 0;
          } else if (tabuleiro[(pecaSelecionada.indexTabuleiro + 7)] !== null && // Existe peça no espaço da diagonal inferior esquerda da peça selecionada
                      (Math.floor(tabuleiro[pecaSelecionada.indexTabuleiro] / 12) !== Math.floor(tabuleiro[(pecaSelecionada.indexTabuleiro + 7)] / 12))) {
                          pecaSelecionada.pecaDiagonalInferiorEsquerda = 1; // Peça inimiga na diagonal inferior esquerda da peça selecionada
          } else if (tabuleiro[(pecaSelecionada.indexTabuleiro + 7)] !== null && // Não existe nenhuma peça no espaço da diagonal inferior esquerda da peça selecionada
                      (Math.floor(tabuleiro[pecaSelecionada.indexTabuleiro] / 12) === Math.floor(tabuleiro[(pecaSelecionada.indexTabuleiro + 7)] / 12))) {
                          pecaSelecionada.pecaDiagonalInferiorEsquerda = -1; // Peça do jogador na diagonal inferior esquerda da peça selecionada
          }
      }

      if ((pecaSelecionada.indexTabuleiro + 9) < tabuleiro.length && // A peça esta dentro do tabuleiro
          (pecaSelecionada.indexTabuleiro + 9) % 8 > pecaSelecionada.indexTabuleiro % 8) { // A peça selecionada não está na borda direita do tabuleiro
          if (tabuleiro[(pecaSelecionada.indexTabuleiro + 9)] === null) {  // Não existe nenhuma peça no espaço da diagonal inferior direita da peça selecionada
                  pecaSelecionada.pecaDiagonalInferiorDireita = 0;
          } else if (tabuleiro[(pecaSelecionada.indexTabuleiro + 9)] !== null && // Existe nenhuma peça no espaço da diagonal inferior direita da peça selecionada
                      (Math.floor(tabuleiro[pecaSelecionada.indexTabuleiro] / 12) !== Math.floor(tabuleiro[(pecaSelecionada.indexTabuleiro + 9)] / 12))) {
                          pecaSelecionada.pecaDiagonalInferiorDireita = 1; // Peça inimiga na diagonal inferior direita da peça selecionada
          } else if (tabuleiro[(pecaSelecionada.indexTabuleiro + 9)] !== null && // Não existe nenhuma peça no espaço da diagonal inferior direita da peça selecionada
                      (Math.floor(tabuleiro[pecaSelecionada.indexTabuleiro] / 12) === Math.floor(tabuleiro[(pecaSelecionada.indexTabuleiro + 9)] / 12))) {
                          pecaSelecionada.pecaDiagonalInferiorDireita = -1; // Peça do jogador na diagonal inferior direita da peça selecionada
          }
      }
      console.log(pecaSelecionada);
      console.log();

  } if(tipoPeca == 0 || tipoPeca == -1) {
      if ((pecaSelecionada.indexTabuleiro - 7) >= 0 && // A peça esta dentro do tabuleiro
          (pecaSelecionada.indexTabuleiro - 7) % 8 > pecaSelecionada.indexTabuleiro % 8) { // A peça selecionada não está na borda direita do tabuleiro
          if (tabuleiro[(pecaSelecionada.indexTabuleiro - 7)] === null ) { // Não existe nenhuma peça no espaço da diagonal superior direita da peça selecionada
              pecaSelecionada.pecaDiagonalSuperiorDireita = 0;
          } else if (tabuleiro[(pecaSelecionada.indexTabuleiro - 7)] !== null && // Existe nenhuma peça no espaço da diagonal superior direita da peça selecionada
                      (Math.floor(tabuleiro[pecaSelecionada.indexTabuleiro] / 12) !== Math.floor(tabuleiro[(pecaSelecionada.indexTabuleiro - 7)] / 12))) {
                          pecaSelecionada.pecaDiagonalSuperiorDireita = 1; // Peça inimiga na diagonal superior direita da peça selecionada
          } else if (tabuleiro[(pecaSelecionada.indexTabuleiro - 7)] !== null && // Não existe nenhuma peça no espaço da diagonal superior direita da peça selecionada
                      (Math.floor(tabuleiro[pecaSelecionada.indexTabuleiro] / 12) === Math.floor(tabuleiro[(pecaSelecionada.indexTabuleiro - 7)] / 12))) {
                          pecaSelecionada.pecaDiagonalSuperiorDireita = -1; // Peça do jogador na diagonal superior direita da peça selecionada
          }
      }

      if ((pecaSelecionada.indexTabuleiro - 9) >= 0 && // A peça esta dentro do tabuleiro
          (pecaSelecionada.indexTabuleiro - 9) % 8 < pecaSelecionada.indexTabuleiro % 8) { // A peça selecionada não está na borda esquerda do tabuleiro
              if (tabuleiro[(pecaSelecionada.indexTabuleiro - 9)] === null ) { // Não existe nenhuma peça no espaço da diagonal superior esquerda da peça selecionada
                  pecaSelecionada.pecaDiagonalSuperiorEsquerda = 0;
          } else if (tabuleiro[(pecaSelecionada.indexTabuleiro - 9)] !== null && // Existe nenhuma peça no espaço da diagonal superior esquerda da peça selecionada
                      (Math.floor(tabuleiro[pecaSelecionada.indexTabuleiro] / 12) !== Math.floor(tabuleiro[(pecaSelecionada.indexTabuleiro - 9)] / 12))) {
                          pecaSelecionada.pecaDiagonalSuperiorEsquerda = 1; // Peça inimiga na diagonal superior esquerda da peça selecionada
          } else if (tabuleiro[(pecaSelecionada.indexTabuleiro - 9)] !== null && // Não existe nenhuma peça no espaço da diagonal superior esquerda da peça selecionada
                      (Math.floor(tabuleiro[pecaSelecionada.indexTabuleiro] / 12) === Math.floor(tabuleiro[(pecaSelecionada.indexTabuleiro - 9)] / 12))) {
                          pecaSelecionada.pecaDiagonalSuperiorEsquerda = -1; // Peça do jogador na diagonal superior esquerda da peça selecionada
          }
      }
      console.log(pecaSelecionada);
      console.log();
  }
}

function verificarPulosPecaSelecionada(tipoPeca) {
  console.log("verificar pulos peca selecionada")
  if(tipoPeca == 0 || tipoPeca == 1) {
      if ((pecaSelecionada.indexTabuleiro + 14) < tabuleiro.length && // A peça estará dentro do tabuleiro após o possivel pulo
          (pecaSelecionada.indexTabuleiro + 14) % 8 < pecaSelecionada.indexTabuleiro % 8) { // A peça selecionada não está na borda esquerda do tabuleiro
          if (tabuleiro[(pecaSelecionada.indexTabuleiro + 14)] === null &&
              pecaSelecionada.pecaDiagonalInferiorEsquerda === 1 ) { // Peça inimiga na diagonal inferior esquerda da peça selecionada
                  pecaSelecionada.pularDiagonalInferiorEsquerda = true;
          }
      }

      if ((pecaSelecionada.indexTabuleiro + 18) < tabuleiro.length && // A peça estará dentro do tabuleiro após o possivel pulo
          (pecaSelecionada.indexTabuleiro + 18) % 8 > pecaSelecionada.indexTabuleiro % 8) { // A peça selecionada não está na borda direita do tabuleiro
          if (tabuleiro[(pecaSelecionada.indexTabuleiro + 18)] === null &&
              pecaSelecionada.pecaDiagonalInferiorDireita === 1 ) { // Peça inimiga na diagonal inferior direita da peça selecionada
                  pecaSelecionada.pularDiagonalInferiorDireita = true;
          }
      }
  } if(tipoPeca == 0 || tipoPeca == -1) {
  if ((pecaSelecionada.indexTabuleiro - 14) >= 0 &&// A peça estará dentro do tabuleiro após o possivel pulo
          (pecaSelecionada.indexTabuleiro - 14) % 8 > pecaSelecionada.indexTabuleiro % 8) { // A peça selecionada não está na borda direita do tabuleiro
          if (tabuleiro[(pecaSelecionada.indexTabuleiro - 14)] === null &&
              pecaSelecionada.pecaDiagonalSuperiorDireita === 1 ) { // Peça inimiga na diagonal superior direita da peça selecionada
                  pecaSelecionada.pularDiagonalSuperiorDireita = true;
          }
      }

      if ((pecaSelecionada.indexTabuleiro - 18) >= 0 &&// A peça estará dentro do tabuleiro após o possivel pulo
          (pecaSelecionada.indexTabuleiro - 18) % 8 < pecaSelecionada.indexTabuleiro % 8) { // A peça selecionada não está na borda esquerda do tabuleiro
          if (tabuleiro[(pecaSelecionada.indexTabuleiro - 18)] === null &&
              pecaSelecionada.pecaDiagonalSuperiorEsquerda === 1 ) { // Peça inimiga na diagonal superior esquerda da peça selecionada
                  pecaSelecionada.pularDiagonalSuperiorEsquerda = true;
          }
      }
  }
}

function movimentosPossiveisPecaSelecionada() {
  console.log("movimentos possiveis peca selecionada");
  colorirEspaco = false;
  if(pecaSelecionada.pecaDiagonalInferiorEsquerda !== null) {
      if(pecaSelecionada.pecaDiagonalInferiorEsquerda === 0) {
          colorirEspaco = true;
          tabuleiroHTML[(pecaSelecionada.indexTabuleiro + 7)].style.backgroundColor = "green";//Colorir espaço diponivel para movimento da peça selecionada de verde                        
          tabuleiroHTML[(pecaSelecionada.indexTabuleiro + 7)].setAttribute("onclick", "moverPeca(7)");
      }
  }
  if(pecaSelecionada.pecaDiagonalInferiorDireita !== null) {
      if(pecaSelecionada.pecaDiagonalInferiorDireita === 0) {
          colorirEspaco = true;
          tabuleiroHTML[(pecaSelecionada.indexTabuleiro + 9)].style.backgroundColor = "green"; //Colorir espaço diponivel para movimento da peça selecionada de verde
          tabuleiroHTML[(pecaSelecionada.indexTabuleiro + 9)].setAttribute("onclick", "moverPeca(9)"); // Adicionar evento onclick nos espaços, caso seja selecionado aquele espaço realizar a função moverPeca 
      }
  }
  if(pecaSelecionada.pecaDiagonalSuperiorEsquerda !== null) {
      if(pecaSelecionada.pecaDiagonalSuperiorEsquerda === 0) {
          colorirEspaco = true;
          tabuleiroHTML[(pecaSelecionada.indexTabuleiro - 9)].style.backgroundColor = "green"; //Colorir espaço diponivel para movimento da peça selecionada de verde
          tabuleiroHTML[(pecaSelecionada.indexTabuleiro - 9)].setAttribute("onclick", "moverPeca(-9)"); // Adicionar evento onclick nos espaços, caso seja selecionado aquele espaço realizar a função moverPeca
      }
  }
  if(pecaSelecionada.pecaDiagonalSuperiorDireita !== null) {
      if(pecaSelecionada.pecaDiagonalSuperiorDireita === 0) {
          colorirEspaco = true;
          tabuleiroHTML[(pecaSelecionada.indexTabuleiro - 7)].style.backgroundColor = "green"; //Colorir espaço diponivel para movimento da peça selecionada de verde
          tabuleiroHTML[(pecaSelecionada.indexTabuleiro - 7)].setAttribute("onclick", "moverPeca(-7)"); // Adicionar evento onclick nos espaços, caso seja selecionado aquele espaço realizar a função moverPeca
      }
  }
  if(pecaSelecionada.pularDiagonalInferiorEsquerda) {
      colorirEspaco = true;
      tabuleiroHTML[(pecaSelecionada.indexTabuleiro + 14)].style.backgroundColor = "green"; //Colorir espaço diponivel para movimento da peça selecionada de verde
      tabuleiroHTML[(pecaSelecionada.indexTabuleiro + 14)].setAttribute("onclick", "moverPeca(14)"); // Adicionar evento onclick nos espaços, caso seja selecionado aquele espaço realizar a função moverPeca
  }
  if(pecaSelecionada.pularDiagonalInferiorDireita) {
      colorirEspaco = true;
      tabuleiroHTML[(pecaSelecionada.indexTabuleiro + 18)].style.backgroundColor = "green"; //Colorir espaço diponivel para movimento da peça selecionada de verde
      tabuleiroHTML[(pecaSelecionada.indexTabuleiro + 18)].setAttribute("onclick", "moverPeca(18)"); // Adicionar evento onclick nos espaços, caso seja selecionado aquele espaço realizar a função moverPeca
  }
  if(pecaSelecionada.pularDiagonalSuperiorEsquerda) {
      colorirEspaco = true;
      tabuleiroHTML[(pecaSelecionada.indexTabuleiro - 18)].style.backgroundColor = "green"; //Colorir espaço diponivel para movimento da peça selecionada de verde
      tabuleiroHTML[(pecaSelecionada.indexTabuleiro - 18)].setAttribute("onclick", "moverPeca(-18)"); // Adicionar evento onclick nos espaços, caso seja selecionado aquele espaço realizar a função moverPeca
  }
  if(pecaSelecionada.pularDiagonalSuperiorDireita) {
      colorirEspaco = true;
      tabuleiroHTML[(pecaSelecionada.indexTabuleiro - 14)].style.backgroundColor = "green"; //Colorir espaço diponivel para movimento da peça selecionada de verde
      tabuleiroHTML[(pecaSelecionada.indexTabuleiro - 14)].setAttribute("onclick", "moverPeca(-14)"); // Adicionar evento onclick nos espaços, caso seja selecionado aquele espaço realizar a função moverPeca
  }
  if(colorirEspaco){
      document.getElementById(pecaSelecionada.id).style.borde = "3px solid green"; // Mudar borda da peça selecionada
  }
  console.log(pecaSelecionada);
}

function moverPeca(movimento) {
  console.log("mover peca")
  if (turno) { // Turno das peças vermelhas
      if(pecaSelecionada.rei) {
          tabuleiroHTML[pecaSelecionada.indexTabuleiro + movimento].className = "espaco_preto";
          tabuleiroHTML[pecaSelecionada.indexTabuleiro + movimento].innerHTML = `<span class="peca_vermelha rei" id=${pecaSelecionada.id}></span>`;
          tabuleiroHTML[pecaSelecionada.indexTabuleiro].className = "espaco_sem_peca espaco_preto";
          tabuleiroHTML[pecaSelecionada.indexTabuleiro].innerHTML = '';
          tabuleiro[pecaSelecionada.indexTabuleiro + movimento] = pecaSelecionada.id;
          tabuleiro[pecaSelecionada.indexTabuleiro] = null
      } else {
          tabuleiroHTML[pecaSelecionada.indexTabuleiro + movimento].className = "espaco_preto";
          tabuleiroHTML[pecaSelecionada.indexTabuleiro + movimento].innerHTML = `<span class="peca_vermelha" id=${pecaSelecionada.id}></span>`;
          tabuleiroHTML[pecaSelecionada.indexTabuleiro].className = "espaco_sem_peca espaco_preto";
          tabuleiroHTML[pecaSelecionada.indexTabuleiro].innerHTML = '';
          tabuleiro[pecaSelecionada.indexTabuleiro + movimento] = pecaSelecionada.id;
          tabuleiro[pecaSelecionada.indexTabuleiro] = null
      }
      if(movimento === 14 || movimento === -14 || movimento === 18 || movimento === -18) { // Precisamos remover a peça inimiga que foi eliminada durante o pulo
          let indexPecaRemovida = (movimento / 2);
          tabuleiroHTML[pecaSelecionada.indexTabuleiro + indexPecaRemovida].className = "espaco_sem_peca espaco_preto";
          tabuleiroHTML[pecaSelecionada.indexTabuleiro + indexPecaRemovida].innerHTML = '';
          tabuleiro[pecaSelecionada.indexTabuleiro + indexPecaRemovida] = null;
          pecasPretasRestantes--; // Remover uma das peças pretas
      }
  } else { // Turno peças pretas
      if(pecaSelecionada.rei) {
          tabuleiroHTML[pecaSelecionada.indexTabuleiro + movimento].className = "espaco_preto";
          tabuleiroHTML[pecaSelecionada.indexTabuleiro + movimento].innerHTML = `<span class="peca_preta rei" id=${pecaSelecionada.id}></span>`;
          tabuleiroHTML[pecaSelecionada.indexTabuleiro].className = "espaco_sem_peca espaco_preto";
          tabuleiroHTML[pecaSelecionada.indexTabuleiro].innerHTML = '';
          tabuleiro[pecaSelecionada.indexTabuleiro + movimento] = pecaSelecionada.id;
          tabuleiro[pecaSelecionada.indexTabuleiro] = null
      } else {
          tabuleiroHTML[pecaSelecionada.indexTabuleiro + movimento].className = "espaco_preto";
          tabuleiroHTML[pecaSelecionada.indexTabuleiro + movimento].innerHTML = `<span class="peca_preta" id=${pecaSelecionada.id}></span>`;
          tabuleiroHTML[pecaSelecionada.indexTabuleiro].className = "espaco_sem_peca espaco_preto";
          tabuleiroHTML[pecaSelecionada.indexTabuleiro].innerHTML = '';
          tabuleiro[pecaSelecionada.indexTabuleiro + movimento] = pecaSelecionada.id;
          tabuleiro[pecaSelecionada.indexTabuleiro] = null
      }
      if(movimento === 14 || movimento === -14 || movimento === 18 || movimento === -18) { // Precisamos remover a peça inimiga que foi eliminada durante o pulo
          let indexPecaRemovida = (movimento / 2);
          tabuleiroHTML[pecaSelecionada.indexTabuleiro + indexPecaRemovida].className = "espaco_sem_peca espaco_preto";
          tabuleiroHTML[pecaSelecionada.indexTabuleiro + indexPecaRemovida].innerHTML = '';
          tabuleiro[pecaSelecionada.indexTabuleiro + indexPecaRemovida] = null;
          pecasVermelhasRestantes--; // Remover uma das peças vermelhas
      }

  }
  console.log(tabuleiro);
  console.log(tabuleiroHTML); 
  transformarPecaEmRei(movimento);
  reiniciarPecasHTML();
  removerEventosTabuleiroHTML();
  verificarVencedor();
}

function reiniciarPecasHTML() {
  console.log("reiniciar pecas html")
  pecasVermelhas = document.querySelectorAll(".peca_vermelha");
  pecasPretas = document.querySelectorAll(".peca_preta");
  if(turno){
      pecasJodador = pecasVermelhas;
  } else {
      pecasJodador = pecasPretas;
  }
  tabuleiroHTML = document.querySelectorAll("td");
  console.log("pecas vermelhas: ");
  console.log(pecasVermelhas);
  console.log("pecas pretas");
  console.log(pecasPretas);
}

function verificarVencedor() {
  console.log("verificar vencedor");
  if(pecasPretasRestantes == 0) {
      menuTurno.innerHTML = `<div class = "turno_vermelho"> Jogador Vermelho Venceu !!!! </div>`
  }
  if(pecasVermelhasRestantes == 0) {
      menuTurno.innerHTML = `<div class = "turno_preto"> Jogador Preto Venceu !!!! </div>`
  }
  mudarTurnoJogador();
}

function mudarTurnoJogador() {
  console.log("mudar turno jogador")
  console.log(turno);
  if(turno) {
      turno = false;
      turnoPreto.classList.remove("color-gray");
      turnoVermelho.classList.add("color-gray");
  } else {
      turno = true;
      turnoPreto.classList.add("color-gray");
      turnoVermelho.classList.remove("color-gray");
  }
  console.log(turno);
  adicionarEventoPecasJogador();
}

// função para verificar se a peça selecionada apos o moivimento pode se transformar em rei
function transformarPecaEmRei(movimento) {
  if((pecaSelecionada.indexTabuleiro + movimento < 8 && pecaSelecionada.id > 11) ||
      (pecaSelecionada.indexTabuleiro + movimento > 55 && pecaSelecionada.id < 12)) {
      if(turno){
          tabuleiroHTML[pecaSelecionada.indexTabuleiro + movimento].innerHTML = `<span class="peca_vermelha rei" id=${pecaSelecionada.id}></span>`;
      }
      else {
          tabuleiroHTML[pecaSelecionada.indexTabuleiro + movimento].innerHTML = `<span class="peca_preta rei" id=${pecaSelecionada.id}></span>`;

      }
  }
}