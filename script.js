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


function del(index){
    alert("apagar " + index);
}