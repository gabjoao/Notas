class nota{
    constructor(titulo, cor, grupo, texto){
        this.titulo = titulo;
        this.cor = cor;
        this.grupo =  grupo;
        this.texto = texto;
    }
}

var notas = [];

//Pegando os itens do localStorage
for(var x = 0; x < localStorage.length; x++){
    notas.push(JSON.parse(localStorage.getItem("notas"))); 
}

//Adicioanndo uma primeira nota caso não haja nenhuma
if(notas.length < 1){
    notas.push(new nota("Nota 1", "#67C158", "", "Edite sua nota aqui"));
    
}

//Criando os cards já existentes
for(var x = 0; x < notas.length; x++){
    criarNota(x);
}

//Função para criar a nota no menu
function criarNota(index){
    var card = document.createElement("div");
    card.className = "nota";
    card.setAttribute("onclick", "edit("+index+")");
    document.querySelector("#notas-container").appendChild(card);

    var pin = document.createElement("img");
    pin.src = "media/pin.png";
    pin.id = "pin";
    card.appendChild(pin);

    var article = document.createElement("article");
    var h2 = document.createElement("h2");
    h2.textContent = notas[index].titulo;
    h2.id = "titulo";
    article.appendChild(h2);
    var texto = document.createElement("p");
    texto.textContent = notas[index].texto;
    article.appendChild(texto);
    card.appendChild(article);

    var bin = document.createElement("div");
    bin.id = "bin";
    bin.setAttribute("onclick", "del("+index+")");
    card.appendChild(bin);

    card.style.backgroundColor = notas[index].cor;
   
}


function edit(index){
    document.querySelector("main").style.display = "none";
    document.querySelector("#editar").style.display = "flex";

    var titulo = document.querySelector("#in-titulo");
    titulo.value = notas[index].titulo;

    var texto = document.querySelector("#in-texto");
    texto.value = notas[index].texto;

    const btn = document.querySelector("#salvar-btn");
    btn.addEventListener("click", function(e){
        e.preventDefault();

        notas[index].titulo = titulo.value;
        notas[index].texto = texto.value;
        notas[index].grupo = "Todos";

        console.table(notas[index]);
        localStorage.setItem("notas", JSON.stringify(notas[index]));
        criarNota[index]
        
    })

}

function del(index){
    alert("apagar " + index);
}

function add(){
    edit(notas.length);
}

function voltar(){
    document.querySelector("main").style.display = "flex";
    document.querySelector("#editar").style.display = "none";
}