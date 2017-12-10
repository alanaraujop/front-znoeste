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
    var tipoOcorrencia = $("#ddlTipoOcorrencia").val();
    var data = $("#data").val();
    var bairro = $("#ddlBairro").val();
    var endereco = $("#endereco").val();
    var descricao = $("#descricao").val();

    console.log(data);
    debugger;

    $.ajax({
        type: "POST",
        data: {
            "tipo_ocorrencia_id":tipoOcorrencia,
            "data": data,
            "bairro_id": bairro,
            "endereco": endereco,
            "descricao": descricao
        },
        url: "http://techsaferj.com.br/znoeste/api/public/Ocorrencia",
        success: function (data) {
            alert("OK");

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
                console.log(response);
                // var optionHeroi = "<option value='0'>--Select Hero--</option>";
                // $.each(response, function (i, item) {
                //     optionHeroi += "<option value='" + item.id + "'>" + item.name + "</option>";
                // }); //Fim Each
   
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