let listaDeNumerosSorteados = [];
let numeroSecreto = gerarNumeroAleatorio();
let numeroTentativas = 1;
let numeroLimite = 10;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10:');
}

exibirMensagemInicial();

function verificarChute(){
    let chute = document.querySelector('input').value;
    if (numeroSecreto==chute){
        exibirTextoNaTela('h1','Acertou!');
        let palavra = numeroTentativas > 1 ? 'tentativas' : 'tentativa';
        exibirTextoNaTela('p','Você descobriu o número secreto com ' + numeroTentativas+ ' ' + palavra);
        document.getElementById('reiniciar').removeAttribute('disabled');
}
    else{
        if(chute>numeroSecreto){
            exibirTextoNaTela('p','O número secreto é menor');
        }
        else{
            exibirTextoNaTela('p','O número secreto é maior');
        }
        limparCampo();
        numeroTentativas++;
    }
}

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt((Math.random()*numeroLimite)+1);
    let quantidadeDeNumerosSorteados = listaDeNumerosSorteados.length;
    if (quantidadeDeNumerosSorteados==numeroLimite){
        listaDeNumerosSorteados =[];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }
    else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo()
    numeroTentativas=1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}