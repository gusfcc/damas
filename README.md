
# Damas

Este trabalho é um jogo de damas simplificado, desenvolvido em JavaScript, HTML e CSS.

## HTML

No HTML foi montada uma _table_ para o tabuleiro. 
Cada elemento dessa tabela representa uma casa do tabuleiro,
e cada casa pode, ou não, possuir uma peça de damas.

As peças são representadas pelo elemento HTML _span, um elemento genérico de texto. 
Cada _span_ possui um ID único (range: [0,23]), para representar cada peça.
As peças vermelhas, posicionadas na parte superior do tabuleiro, possuem os IDs de 0 a 11,
enquanto as paças pretas, posicionadas na parte inferior do tabuleiro, possuem os IDs de 12 a 23

Os turnos dos jogadores são representados através de um elemento _div_, que sinaliza de qual
jogador é a vez atual

## CSS

Responsável pela montagem visual do tabuleiro e das peças, com ajustes de margem, cor e tamanho.
As peças vermelhas e pretas são coloridas por suas respectivas cores, enquanto o tabuleiro é colorido
por 2 tons distintos de marrom, intercalados.

Além disso, o CSS também é responsável pela cor que sinaliza o jogador da vez.

## JavaScript

O JavaScript é responsável pelo funcionamento das peças, da seguinte maneira:

* O tabuleiro é representado no JS como uma tabela, que representa a posição das peças através do ID,
ou de _null_ para vazio.
* A variável _pecaSelecionada_ é responsável por guardar as informações da peça selecionada pelo jogador.
* A função adicionarEventoPecasJogador possibilita a adição de eventos clicável nas peças do jogador do turno atual.
* As peças do jogador deste turno serão adicionadas a uma variavel de controle chamada pecasJogador e será chamada a função receberPecaSelecionada.
* A peça selecionada pelo jogador será então adicionada à variável _pecaSelecionada_ através da função receberPecaSelecionada.
* Depois, a função encontarPeca sera chamada para encontar a localização da peça selecionada no tabuleiro.
* Após a localização da peça selecionada ser adicionada a variavel _pecaSelecionada_, irá ser feita a verificação se a peça é um rei, ou uma peça normal, por meio da funçao verificarPecaRei.
* Agora que sabemos se a peça é um rei, ou não, podemos calcular os movimentos possiveis para essa peça chamando as funções verificarMovimentoEnvoltaPeca e VerificarPulosPecaSelecionada.
* verificarMovimentoEnvoltaPeca registrara se existe peças inimigas, espaços vazios, ou peças aliadas ao redor da peça selecionada e registrara essas informações na variavel _pecaSelecionada_.
* VerificarPulosPecaSelecionada calculará com base nas informações registradas sobre o estado ao redor da peça selecionada e do tabuleiro, se é possivel eleiminar uma peça inimiga que está ao redor da peça selecionada.
* Sabendo agora todos os movimentos possiveis da peça, podemos mostrar para o jogador onde ele pode movimentar a peça ao adicionar aos locais de possiveis movimento uma coloração verde, e adicionar um evento de onclick nessas possições, para que possamos registrar a aça~ode mover a peça. isso é realizado na função movimentosPossiveisPecaSelecionada.
* Ao selecionar uma das possições de possivel movimento da peça, é chamada a a funçao moverPeça, com o respectivo valor de casas e direção em que a peça sera movida. É calculado também nessa função se houve a eliminação de alguma peça inimiga.
* Após isso, são chamadas as funções reiniciarPecasHTML e removerEventosTabuleiroHTML, para reinicar os enventos do tabuleiro.
* Também é chamada a função _transformarPecaEmRei_, a qual verifica se a peça, após o movimento, irá se tranformar em um rei, ou não.
* Por fim é chamada a função _verificarVencedor_ que verifica se houve um vencedor definido após o final da jogada. Caso não haja um vencedor, será chamada a funçaõ mudarTurnoJogador, que mudara o turno do jogador e adicionara um envento de click nas peças do jogador do novo turno.
