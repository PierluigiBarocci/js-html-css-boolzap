// Dobbiamo replicare la famosa app di messaggistica in versione web e come dicevamo a lezione, procederemo per milestone.
// Nome repo: js-html-css-boolzap
// Oggi pomeriggio iniziate ad occuparvi della milestone 1, che prevede di:
// creare la grafica di boolzapp (whatsapp web)
// dare la possibilità all'utente di inviare un messaggio: scrivendo nel campo di testo in basso e premendo un pulsante, il messaggio comparirà nel contenitore della conversazione. Per fare questo punto, vi consiglio di usare la funzione clone() che abbiamo visto insieme per utilizzare un div template a mo' di "stampo".

// Milestone 1
// ● Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) e
// dall’interlocutore (bianco) assegnando due classi CSS diverse
// ● Aggiunta di un messaggio : l’utente scrive un testo nella parte bassa e cliccando
// invia il testo viene aggiunto al thread sopra, come messaggio verde


var ricevuto = $('.template').clone();
ricevuto.removeClass('none');
ricevuto.addClass('received');

$('.chatWindow').append(ricevuto);

// var inviato = $('.template').clone();
// inviato.removeClass('none');
// inviato.addClass('sent');
//
// $('.chatWindow').append(inviato);


// andiamo a cercarci il valore dell'input

$('#sendButton').click(function(){
    var inviato = $(ricevuto).clone();
    var testo = $('#textBox').val();
    console.log(testo);
    inviato.removeClass('received').addClass('sent').text(testo);
    $('.chatWindow').append(inviato);
    $('#textBox').val('');
})
