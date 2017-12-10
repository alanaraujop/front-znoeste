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
    }
    if (page == 4) {
        $("#content").html('');
        $("#content").load("pages/mapa.html");
        $('nav li').removeClass('active');
        $(el).addClass('active');
    }
}

function cadastrarOcorrencia(){

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