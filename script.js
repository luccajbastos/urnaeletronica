const qs = (o) => document.querySelector(o);

let seuVotoPara = qs('.d-1-1 span');
let cargo = qs('.d-1-2 span');
let descricao = qs('.d-1-4');
let aviso = qs('.d-2');
let lateral = qs('.d-1-right');
let numeros = qs('.d-1-3');

let etapaAtual = 0;
let numero = '';
let votoBranco = true;
let votos = [];

function comecarEtapa() {
    let etapa = etapas[etapaAtual];
    let numeroHtml = '';
    numero = '';
    votoBranco = false;

    for(let i=0;i<etapa.numeros;i++){
        if(i === 0){
            numeroHtml += '<div class="numero pisca"></div>'
        } else {
            numeroHtml += '<div class="numero"></div>'
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}
function atualizaInterface(){
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((i) => {
        if(i.numero === numero) {
            return true;
        }else{
            return false;
        }
    });
    if(candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome} <br/>Partido: ${candidato.partido}`;
        
        let fotosHtml = '';
        for(let i in candidato.fotos){
            if(candidato.fotos[i].small){
                fotosHtml += `<div class="d-1-image small"><img src="imagens/${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda}</div>`;
            } else {
                fotosHtml += `<div class="d-1-image"><img src="imagens/${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda}</div>`;
            }
        }
        lateral.innerHTML = fotosHtml;
    }else{
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `<div class="aviso--grande pisca">VOTO NULO.</div>`;
    }
    console.log('INFO: ', candidato)
}
function clicou(n) {
    let elNumero = qs('.numero.pisca');
    if(elNumero !== null){
        elNumero.innerHTML = n;
        numero = `${numero}${n}`

        elNumero.classList.remove('pisca');
        if(elNumero.nextElementSibling !== null){
            elNumero.nextElementSibling.classList.add('pisca');
        } else {
            atualizaInterface();
        } 
    }
}
function branco(){
        numero = '';
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = `<div class="aviso--grande pisca">VOTO EM BRANCO.</div>`;
        lateral.innerHTML = '';
}
function corrige(){
    comecarEtapa();                              
}
function confirma(){
    let etapa = etapas[etapaAtual];

    let votoConfirmado = false;
    if(votoBranco ===  true){
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        })
        alert("URNA: confirmado como BRANCO.")
    } else if (numero.length === etapa.numeros){
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        })
        votoConfirmado = true;
        alert("URNA: confirmado como "+numero);
    }

    if(votoConfirmado){
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        } else {
            console.log("URNA: Votos computados. Obrigado!");
            qs('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div>'
            console.log(votos)
        }
    }
}

comecarEtapa();