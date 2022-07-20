let musicas =  [
    {titulo: 'Tortura',
     artista: 'Dorsal Atlântica',
     src: 'musicas/01_dorsal_atlantica_tortura_myzuka.mp3',
     img: 'imagens/rock.jpg'},

     {titulo: 'Roendo as Unhas',
     artista: 'Paulinho da Viola',
     src: 'musicas/Roendo as Unhas.mp3',
     img: 'imagens/samba.jpg'}
];


let indexMusica = 0;

let musica = document.querySelector("audio");



let duracaoMusica = document.querySelector('.fim');
let imagem = document.querySelector('img');
let nomeMusica = document.querySelector('.descricao h2');
let nomeArtista = document.querySelector('.descricao i');



musica.load();
renderizarMusica(indexMusica);
//Eventos
document.querySelector(".botao-play").addEventListener('click', tocarMusica);
document.querySelector(".botao-pause").addEventListener('click', pausarMusica);

musica.addEventListener('timeupdate', atualizarBarra);
musica.addEventListener('loadeddata', duration);
console.log(musica.src);

document.querySelector('.anterior').addEventListener('click', () => {
    console.log(indexMusica);
    indexMusica > 0? indexMusica-- : indexMusica = (musicas.length -1);  
    renderizarMusica(indexMusica);
});

document.querySelector('.proxima').addEventListener('click', () => {
    console.log('teste');
    indexMusica < (musicas.length -1)? indexMusica++ : indexMusica = 0;
    renderizarMusica(indexMusica);
});

//Funções

function renderizarMusica(index) {
    musica.setAttribute('src', musicas[index].src);
    musica.addEventListener('loadeddata', () =>{
        nomeMusica.textContent = musicas[index].titulo;
        nomeArtista.textContent = musicas[index].artista;
        imagem.src = musicas[index].img;
        duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));

    });

}

function tocarMusica(){
    musica.play();
    document.querySelector(".botao-pause").style.display = 'block';
    document.querySelector(".botao-play").style.display = 'none';
}

function pausarMusica(){
    musica.pause();
    document.querySelector(".botao-play").style.display = "block";
    document.querySelector(".botao-pause").style.display = 'none';
}

function atualizarBarra(){
    let barra = document.querySelector('progress');
    barra.style.width = Math.floor((musica.currentTime / musica.duration) * 100)  + '%';
    let tempoDecorrido = document.querySelector('.inicio');
    tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime));

}

function segundosParaMinutos(segundos){
    let campoMinutos = Math.floor(segundos/60);
    let campoSegundos = segundos % 60;
    if(campoSegundos < 10){
        campoSegundos = '0' + campoSegundos;
    }

    return campoMinutos + ':' + campoSegundos;
}

function duration(){    
    duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));
    console.log(musica.duration);
}


