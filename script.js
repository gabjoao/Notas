class nota{
    constructor(titulo, cor, grupo, texto, corFonte, sizeFonte){
        this.titulo = titulo;
        this.cor = cor;
        this.grupo =  grupo;
        this.texto = texto;
        this.corFonte = corFonte;
        this.sizeFonte = sizeFonte;
    }
}

var notas = [];

//Pegando os itens do localStorage
for(var x = 0; x < localStorage.length; x++){
    notas = (JSON.parse(localStorage.getItem("notas")));
}



//Adicioanndo uma primeira nota caso não haja nenhuma
if(notas.length < 1){
    notas.push(new nota("Nova nota", "#67C158", "", "Edite sua nota aqui", "#000", "18"));
    
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
    article.id = "article";
    article.style.color = notas[index].corFonte;
    article.setAttribute("onclick", "edit("+index+")");
    var h2 = document.createElement("h2");
    if(notas[index].titulo.length > 9){
        h2.textContent = notas[index].titulo.slice(0, 9) + "...";
    }else{
        h2.textContent = notas[index].titulo;
    }
   
    h2.id = "titulo";
    article.appendChild(h2);

    var texto = document.createElement("p");
    if(notas[index].texto.length > 11){
        texto.textContent = notas[index].texto.slice(0,11) + "...";
    }else{
        texto.textContent = notas[index].texto;
    }
    
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
    document.querySelector(".bin").setAttribute("onclick", "del("+index+")");

    if(index == notas.length){
        notas.push(new nota("Nova nota", "#67C158", "Todos", "Digite aqui"));
    }

    document.querySelector(".titulo-container").style.backgroundColor = notas[index].cor;
    document.querySelector("#salvar-btn").style.backgroundColor = notas[index].cor;

    var titulo = document.querySelector("#in-titulo");
    titulo.value = notas[index].titulo;
    titulo.style.color = notas[index].corFonte;
    
    var texto = document.querySelector("#in-texto");
    texto.value = notas[index].texto;
    texto.setAttribute("style", "font-size:"+notas[index].sizeFonte+"px");

    var cor = document.querySelector("#cor");
    cor.value = notas[index].cor
    

    const btn = document.querySelector("#salvar-btn");
    btn.style.color = notas[index].corFonte;
    btn.addEventListener("click", function(e){
        e.preventDefault();

        notas[index].titulo = titulo.value;
        notas[index].texto = texto.value;
        notas[index].cor = cor.value;

        localStorage.setItem("notas", JSON.stringify(notas));
        criarNota[index]
        console.table(notas[index])
        voltar();
        
    })

    document.querySelector("#text").setAttribute("onclick", "txt("+index+")");

}

function del(index){
    notas.splice(index, 1);
    console.table(notas);
    localStorage.setItem("notas", JSON.stringify(notas));
    location.reload();
    
}

function add(){
    edit(notas.length);
}

function voltar(){
    document.querySelector("main").style.display = "flex";
    document.querySelector("#editar").style.display = "none";
    location.reload();
}

console.table(notas)

function txt(index){
    var container = document.createElement("div");
    container.id = "edit-text";
    container.style.display = "flex";
    container.style.border = "1px solid" + notas[index].cor;

    document.querySelector("#editar").appendChild(container);

    var form = document.createElement("form");
    container.appendChild(form);

    var x = document.createElement("img");
    x.src = "media/x.png";
    x.setAttribute("onclick", "fechar()");
    form.appendChild(x)

    var fonteDiv = document.createElement("div");
    form.appendChild(fonteDiv)

    var labelFonte = document.createElement("label");
    labelFonte.setAttribute("for", "fonte");
    labelFonte.innerHTML = "Tamanho da fonte: "

    var fonte = document.createElement("input")
    fonte.setAttribute("type", "text");
    fonte.setAttribute("autocomplete", "off")
    fonte.id = "fonte";
    fonte.setAttribute("value", notas[index].sizeFonte)

    fonteDiv.appendChild(labelFonte);
    fonteDiv.appendChild(fonte)

    var corDiv = document.createElement("div");
    form.appendChild(corDiv);

    var labelCor = document.createElement("label");
    labelCor.setAttribute("for", "fontColor");
    labelCor.innerHTML = "Cor do texto: ";

    var fontColor = document.createElement("input");
    fontColor.setAttribute("type", "color");
    fontColor.id = "fontColor";
    fontColor.setAttribute("value", notas[index].corFonte);

    corDiv.appendChild(labelCor);
    corDiv.appendChild(fontColor);

    var confirmarBtn = document.createElement("input");
    confirmarBtn.setAttribute("type", "submit");
    confirmarBtn.id = "confirmarBtn";
    confirmarBtn.style.background = notas[index].cor;
    confirmarBtn.style.color = notas[index].corFonte;

    form.appendChild(confirmarBtn);

    
    confirmarBtn.addEventListener("click", function(e){
        e.preventDefault();

        document.querySelector("#in-texto").setAttribute("style", "font-size:"+fonte.value+"px");
        document.querySelector("#article").style.color = fontColor.value;

        notas[index].sizeFonte = fonte.value;
        notas[index].corFonte = fontColor.value;
        localStorage.setItem("notas", JSON.stringify(notas));
        container.style.display = "none";

    })

}

function fechar(){
    document.querySelector("#editar").removeChild(document.querySelector("#edit-text"));
}