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

// Milestone 2
// ● Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà
// un “ok” come risposta, che apparirà dopo 1 secondo.
// ● Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i
// contatti il cui nome contiene le lettere inserite (es, Marco, Matteo Martina -> Scrivo
// “mar” rimangono solo Marco e Martina)

// ricerca utenti


// intercetto clik pulsant lente
$('.searchIcon').click(function(){
    mySearching();
})

// intercetto invio su input ricerca contatti
$('#searchFriends').keypress(function(event){
    if (event.which == 13) {
        mySearching();
    };
});



// invia messaggio, intercettando click sul bottone
$('.icons').click(function(){
    mySend();
    // setTimeout per richiamare la funziona risposta, ritardo di 1000ms (1 secondo)
    setTimeout(myAnswer, 1000);
});

// invia messaggio, intercettando il tasto invio
$('#textBox').keypress(function(event){
    if (event.which == 13) {
        mySend();
        // setTimeout per richiamare la funziona risposta, ritardo di 1000ms (1 secondo)
        setTimeout(myAnswer, 1000);
    }
})

// cambio dell'icona microphone in paper pulsante
// keyup si attiva quando sollevo il dito dal tasto
$('#textBox').keyup(function(){
    // intercetto valore di input
    var testo = $('#textBox').val();
    // se è presente del testo
    if (testo.length != 0) {
        // tolgo il mivrofono e metto il paper plane
        $('.icons i').removeClass('fa-microphone fa-lg');
        $('.icons i').addClass('fa-paper-plane fa-lg');
    } else {
        // faccio il contrario
        $('.icons i').removeClass('fa-paper-plane fa-lg');
        $('.icons i').addClass('fa-microphone fa-lg');
    };
});


//  FUNZIONI //

// funzione per creare un messagio sent da richiamare ogni volta

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
};

// funzione per creare un messagio received da richiamare ogni volta

function myAnswer() {
    // clono il template messages
    var new_msg = $('.template .message').clone();
    // inserisco nello span giusto il testo 'ok'
    new_msg.children('.message-text').text('ok');
    // aggiungo al div la classe received
    new_msg.addClass('received');
    // inserisco il messaggio nel container
    $('.right-messages.active').append(new_msg);
};

// funzione per scorgere attraverso gli account e mostrare o nascondere le corrispondenze

function mySearching() {
    // prendo il val da input
    var inputName = $('#searchFriends').val();
    // per ogni elemento nome devo svolgere un azione
    $('.contactName .account').each(function(){
        // leggo il nome (per ogni elemento account)
        var friendName = $(this).text();
        // variabile maestra per tornare in cima all'albero dell'account
        var allFather = $(this).parent('.contactName').parent('.contactText').parent('.myFriend');
        // se il nome ha una lunghezza
        if (inputName.length != 0) {
            // se il nome cercato trova corrispondenza identica nella mia lista
            if (inputName.toLocaleLowerCase() == friendName.toLocaleLowerCase()) {
                // mostramelo
                $(this).show();
            } else {
                // altrimenti nascondi tutto l'account
                allFather.hide();
            }
        } else {
            // se il nome non c'e`, mostrami tutti i contatti
            $('.myFriend').show();
        }
    })
}
