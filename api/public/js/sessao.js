// sessão
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    var b_usuario = document.getElementById("b_usuario");
    var logou = sessionStorage.Logou;

    if (email == null && nome == null && logou == null && sessionStorage.Logou != "Sim") {
        window.location = "../login.html";
    }
}

function validarHeader() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    var logou = sessionStorage.Logou;
    var img = sessionStorage.FOTO_USUARIO
    console.log(img)

    if (email != null && nome != null && logou === "Sim") {
        conteudo_header.innerHTML = `
            <li><a href="#sobre">Sobre</a></li>
            <li><a href="#visual">Visual</a></li>
            <li><a href="#narrativas">Narrativas</a></li>
            <li><a href="#recomenda">Recomende</a></li>
            <li><a href="gamedle.html">Adivinhe o jogo</a></li>
            <li><a href="dashboard/dashboard.html"">Dashboard</a></li>
            <div id="imgHeader" onclick="hamburguers()">
                <li><img src="assets/uploads/${img}"></img></li>
            </div>
            <div id="hamburguer">
                <li><a href="dashboard/perfil.html"">Ver perfil</a></li>
                <li id="sair"><a href="#" onclick="limparSessao()">Sair</a></li>
            </div>
        `;
    } else {
        conteudo_header.innerHTML = `
            <li><a href="#sobre">Sobre</a></li>
            <li><a href="#visual">Visual</a></li>
            <li><a href="#narrativas">Narrativas</a></li>
            <li><a href="#recomenda">Recomende</a></li>
            <li><a href="gamedle.html">Adivinhe o jogo</a></li>
            <li><a href="login.html">Login</a></li>
        `;
    }
}

var ativado = false
function hamburguers() {
    if (ativado == false) {
        hamburguer.style.display = "flex";
        imgHeader.classList.add("ativo")
        ativado = true;
    } else {
        hamburguer.style.display = "none";
        imgHeader.classList.remove("ativo")
        ativado = false
    }
}


function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}


// carregamento (loading)
// function aguardar() {
//     var divAguardar = document.getElementById("div_aguardar");
//     divAguardar.style.display = "flex";
// }

// function finalizarAguardar(texto) {
//     var divAguardar = document.getElementById("div_aguardar");
//     divAguardar.style.display = "none";

//     var divErrosLogin = document.getElementById("div_erros_login");
//     if (texto) {
//         divErrosLogin.style.display = "flex";
//         divErrosLogin.innerHTML = texto;
//     }
// }

