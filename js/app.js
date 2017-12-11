$(document).ready(function () {
    var user = localStorage.getItem("email");
    var id = localStorage.getItem("id");
    var nivel_acesso = localStorage.getItem("nivel_acesso");

    if (user != "" && user != null && nivel_acesso == 1) {
        $("#content").html('');
        redirectPage(1, null);
    }
    if (user == "" || user == null) {
        $("#content").html('');
        $("#content").load("pages/login.html");
    }
});

//Redirecionamento das páginas SPA
function redirectPage(page, el) {
    if (page == 1) {
        $("#content").html('');
        $("#header").load("pages/header.html");
        $("#content").load("pages/inicio.html");
        $('nav li').removeClass('active');
        $('nav li:nth-child(1)').addClass('active');
    }
    if (page == 2) {
        $("#content").html('');
        $("#header").load("pages/header.html");
        $("#content").load("pages/cadastrarOcorrencia.html");
        $('nav li').removeClass('active');
        $(el).addClass('active');
    }
    if (page == 3) {
        $("#content").html('');
        $("#header").load("pages/header.html");
        $("#content").load("pages/listarOcorrencias.html");
        $('nav li').removeClass('active');
        $(el).addClass('active');
        listarOcorrencia();
    }
}

//Cadastro de Ocorrencias da página de ocorrencias
function cadastrarOcorrencia() {
    var usuario_id = 1; //trazer o id do cookie
    var tipoOcorrencia = $("#ddlTipoOcorrencia").val();
    var data = $("#data").val();
    var bairro = $("#ddlBairro").val();
    var endereco = $("#endereco").val();
    var descricao = $("#descricao").val();

    $.ajax({
        type: "POST",
        data: {
            "tipo_ocorrencia_id": tipoOcorrencia,
            "data": data,
            "bairro_id": bairro,
            "endereco": endereco,
            "descricao": descricao,
            "usuario_id": usuario_id
        },
        url: "http://techsaferj.com.br/znoeste/api/public/Ocorrencia",
        success: function (data) {
            $("#ddlTipoOcorrencia").val(0);
            $("#data").val('');
            $("#ddlBairro").val(0);
            $("#endereco").val('');
            $("#descricao").val('');
            carregarTabelaOcorrenciaPorUsuario();

        },
        error: function (e) {
            console.log("Erro: " + e);
        }
    });

}

function cadastrarUsuario() {

}

function editarUsuario() {

}

function login() {
    localStorage.clear();
    var email = $("#email").val();
    var senha = $("#senha").val();

    $.ajax({
        type: "POST",
        data: {
            "email": email,
            "senha": senha,
        },
        url: "http://techsaferj.com.br/znoeste/api/public/Login",
        success: function (response) {
            localStorage.setItem("id", response.id);
            localStorage.setItem("email", response.email);
            localStorage.setItem("nivel_acesso", response.nivel_acesso);
            redirectPage(1);
        },
        error: function (e) {
            console.log("Erro: " + e);
        }
    });
}

function logout() {
    localStorage.clear();
    $("#header").html('');
    $("#content").html('');
    $("#content").load("pages/login.html");

}

function redefinirSenha() {

}

function filtrarOcorrencias() {

}