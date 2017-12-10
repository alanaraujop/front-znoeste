$(document).ready(function(){
    $("#header").load("pages/header.html");
    $("#content").load("pages/inicio.html");
});

function redirectPage(page, el){
    if (page == 1) {
        $("#content").html('');
        $("#content").load("pages/inicio.html");
        $('nav li').removeClass('active');
        $(el).addClass('active');
    }
    if (page == 2) {
        $("#content").html('');
        $("#content").load("pages/cadastrarOcorrencia.html");
        $('nav li').removeClass('active');
        $(el).addClass('active');
    }
    if (page == 3) {
        $("#content").html('');
        $("#content").load("pages/listarOcorrencias.html");
        $('nav li').removeClass('active');
        $(el).addClass('active');
        listarOcorrencia();
    }
}

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
            "tipo_ocorrencia_id":tipoOcorrencia,
            "data": data,
            "bairro_id": bairro,
            "endereco": endereco,
            "descricao": descricao,
            "usuario_id":usuario_id
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

function listarOcorrencia(){
         //Ajax para preencher o Select dos Counters Heroes
         $.ajax({
            url: "http://techsaferj.com.br/znoeste/api/public/Ocorrencia",
            type: "GET",
            dataType: "JSON",
            success: function (response) {

   
            },
            error: function (e) {
                console.log("Erro: " + e);
            }
   
        });
}

function cadastrarUsuario(){

}

function editarUsuario(){

}

function login(){

}

function redefinirSenha(){

}

function filtrarOcorrencias(){

}