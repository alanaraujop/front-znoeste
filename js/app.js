$(document).ready(function() {
    cookieEmail = localStorage.getItem("email");
    cookieId = localStorage.getItem("id");
    cookieNivelAcesso = localStorage.getItem("nivel_acesso");

    //Se existe cookie e o nivel de acesso é usuáiro então redireciona para tela de usuário
    if (cookieEmail != "" && cookieEmail != null) {
        limparTemplate();
        redirectPage(1, null);
    }
    if (cookieEmail == "" || cookieEmail == null) {
        limparTemplate();
        // $("#content").load("pages/login.html");
        $("#header").load("pages/headerBlog.html");
        $("#content").load("pages/inicioBlog.html");
    }
});

//Redirecionamento das páginas SPA
function redirectPage(page, el) {
    cookieNivelAcesso = localStorage.getItem("nivel_acesso");

    // Limpando a classe active para assim que entrar no IF ativar
    $('nav li').removeClass('active');
    limparTemplate();
    if (page == 1) {
        if (cookieNivelAcesso == 1) {
            $("#header").load("pages/header.html");
        } else {
            $("#header").load("pages/headerAdmin.html");
        }
        $("#content").load("pages/inicio.html");
        $('nav li:nth-child(1)').addClass('active');
    }
    if (page == 2) {
        if (cookieNivelAcesso == 1) {
            $("#header").load("pages/header.html");
        } else {
            $("#header").load("pages/headerAdmin.html");
        }
        $("#content").load("pages/cadastrarOcorrencia.html");
        $(el).addClass('active');
    }
    if (page == 3) {
        if (cookieNivelAcesso == 1) {
            $("#header").load("pages/header.html");
        } else {
            $("#header").load("pages/headerAdmin.html");
        }
        $("#content").load("pages/listarOcorrencias.html");
        $(el).addClass('active');
    }
    if (page == 4) {
        if (cookieNivelAcesso == 1) {
            $("#header").load("pages/header.html");
        } else {
            $("#header").load("pages/headerAdmin.html");
        }
        $("#content").load("pages/meuPerfil.html");
        $(el).addClass('active');
        carregarUsuairo();
    }
    //Somente admin pode ver essa página por isso não tem o if do header
    if (page == 5) {
        $("#header").load("pages/headerAdmin.html");
        $("#content").load("pages/listarUsuarios.html");
        $(el).addClass('active');
    }
    //Somente admin pode ver essa página por isso não tem o if do header
    if (page == 6) {
        $("#header").load("pages/headerAdmin.html");
        $("#content").load("pages/cadastrarBairro.html");
        $(el).addClass('active');
    }
    if (page == 7) {
        $("#header").load("pages/headerBlog.html");
        $("#content").load("pages/inicioBlog.html");
        $(el).addClass('active');
    }
    if (page == 8) {
        $("#header").load("pages/headerBlog.html");
        $("#content").load("pages/contato.html");
        $(el).addClass('active');
    }
    if (page == 9) {
        $("#header").load("pages/headerBlog.html");
        $("#content").load("pages/sobre.html");
        $(el).addClass('active');
    }
    if (page == 10) {
        $("#header").load("pages/headerBlog.html");
        $("#content").load("pages/login.html");
        $(el).addClass('active');
    }
}

//Limpa o conteudo das Divs template
function limparTemplate() {
    $("#content").html('');
    $("#header").html('');
}

//Cadastro de Ocorrencias da página de ocorrencias
function cadastrarOcorrencia() {
    var usuario_id = cookieId;
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
        success: function(data) {
            $("#ddlTipoOcorrencia").val(0);
            $("#data").val('');
            $("#ddlBairro").val(0);
            $("#endereco").val('');
            $("#descricao").val('');
            carregarTabelaOcorrenciaPorUsuario();

        },
        error: function(e) {
            console.log("Erro: " + e);
        }
    });

}

function cadastrarUsuario() {

}

function carregarUsuairo() {
    var usuario_id = cookieId;

    $.ajax({
        url: "http://techsaferj.com.br/znoeste/api/public/Usuario/" + usuario_id,
        type: "GET",
        dataType: "JSON",
        success: function(response) {
            $("#nome").val(response.nome);
            $("#cpf").val(response.cpf).prop("disabled", "disabled");;
            $("#data_nasc").val(response.data_nasc);
            $("#email").val(response.email).prop("disabled", "disabled");
            $("#senha").val(response.senha);
        },
        error: function(e) {
            console.log("Erro: " + e);
        }
    });
}

function editarUsuario() {
    var usuario_id = cookieId;
    var nome = $("#nome").val();
    var cpf = $("#cpf").val();
    var data_nasc = $("#data_nasc").val();
    var email = $("#email").val();
    var senha = $("#senha").val();
    $.ajax({
        url: "http://techsaferj.com.br/znoeste/api/public/Usuario/" + usuario_id,
        type: "PUT",
        dataType: "JSON",
        data: { "nome": nome, "data_nasc": data_nasc, "senha": senha },
        success: function(response) {
            alert("Alterado com sucesso");
            redirectPage(4, null);
        },
        error: function(e) {
            console.log("Erro: " + e);
        }
    });
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
        success: function(response) {
            localStorage.setItem("id", response.id);
            localStorage.setItem("email", response.email);
            localStorage.setItem("nivel_acesso", response.nivel_acesso);
            redirectPage(1);
        },
        error: function(e) {
            console.log("Erro: " + e);
        }
    });
}

function logout() {
    limparTemplate();
    localStorage.clear();
    $("#header").load("pages/headerBlog.html");
    $("#content").load("pages/login.html");
}

function redefinirSenha() {

}

function filtrarOcorrencias() {

}