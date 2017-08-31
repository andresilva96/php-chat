$(document).ready(function () {
    var conn = new WebSocket('ws://localhost:8080');

    //Conectado no Servidor
    conn.onopen = function(e) {
        $('body > div').prepend(
            '<div class="offset-sm-3 col-md-6">' +
            '<div class="alert alert-success alert-dismissible fade show" role="alert">\n' +
            '  <button type="button" class="close" data-dismiss="alert" aria-label="Close">\n' +
            '    <span aria-hidden="true">&times;</span>\n' +
            '  </button>\n' +
            '  <strong>Success!</strong> Connected to server.\n' +
            '</div></div>'
        );
    }

    //Conexao Fechada
    conn.onclose = function(e) {
        alert('Desconectado');
    };

    //Messagem Recebida
    conn.onmessage = function(e) {
        console.log(e.data);
    };

    //Error
    conn.onerror = function(e) {
        alert('Error '+e.data);
    };

    //Envio de Messagem
    $("#enviar").click(function(){
        var meuNome = $("#nome").val();
        var minhaMsg = $("#messagem").val();

        //Prepara dado para JSON
        var msg = {
            nome: meuNome,
            messagem: minhaMsg
        };

        //Converte e envia para o servidor
        conn.send(JSON.stringify(msg));

        $("#chat").append('<p><b>'+meuNome+'</b>: '+minhaMsg+'</p>');
    });
});