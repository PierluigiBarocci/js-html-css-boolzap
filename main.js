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

// invia messaggio, intercettando click sul bottone
$('.icons').click (function(){
    mySend();
});

// invia messaggio, intercettando il tasto invio
$('#textBox').keypress(function (event){
    if (event.which == 13) {
        mySend();
    }
})


// creo una funzione per creare un messagio sent da richiamare ogni volta

function mySend() {
    // intercetto il valore dell'input
    var testo = $('#textBox').val();
    // se il valore dell'input c'e` (quindi non è vuoto)
    if (testo.length != 0) {
        // clono il template messages
        var new_msg = $('.template .message').clone();
        // inserisco nello span giusto il testo
        new_msg.children('.message-text').text(testo);
        // aggiungo al div la classe send
        new_msg.addClass('sent');
        // inserisco il messaggio nel container
        $('.right-messages.active').append(new_msg);
        // resetto il valore di input
        $('#textBox').val('');
    };
}
