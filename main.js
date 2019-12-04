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

// Milestone 3
// ● Click sul contatto mostra la conversazione del contatto cliccato, è possibile inserire
// nuovi messaggi per ogni conversazione
// ● Cancella messaggio: cliccando sul messaggio appare un menu a tendina che
// permette di cancellare il messaggio selezionato


// creo più oggetti, mi interesseranno solo nome e immagine
var michele_user = {
    'nome': 'Michele',
    'foto': 'avatar_1.jpg'
};
var fabio_user = {
    'nome': 'Fabio',
    'foto': 'avatar_2.jpg'
};
var samuele_user = {
    'nome': 'Samuele',
    'foto': 'avatar_3.jpg'
};
var alessandro_user = {
    'nome': 'Alessandro',
    'foto': 'avatar_4.jpg'
};
var pierluigi_user = {
    'nome': 'Pierluigi',
    'foto': 'avatar_5.jpg'
};
var claudia_user = {
    'nome': 'Claudia',
    'foto': 'avatar_6.jpg'
};
var davide_user = {
    'nome': 'Davide',
    'foto': 'avatar_7.jpg'
};
var federico_user = {
    'nome': 'Federico',
    'foto': 'avatar_8.jpg'
};
// li inserisco in un array
var lista_utenti = [michele_user,fabio_user,samuele_user,alessandro_user,pierluigi_user,claudia_user,davide_user,federico_user];
// ciclo for per scorrere l'array
for (var i = 0; i < lista_utenti.length; i++) {
    // prendo il Nome
    var nome_utente = lista_utenti[i].nome;
    // prendo l'Immagine
    var img = lista_utenti[i].foto;
    // clono il mio template per i contatti
    var contatto_appoggio = $('.template_contatti .myFriend').clone();
    // all'interno del mio clone, cerco:
    // 1)lo span per il nome e ci inserisco quello dell'oggetto
    $(contatto_appoggio).find('p.account').text(nome_utente);
    // 2)il tag immagine per assegnargi l'attributo src con la foto dell'oggetto
    $(contatto_appoggio).find('img').attr('src', 'images/'+ img +'');
    // inoltre gli aggiungo un data name per richiamarlo più insieme alla sua chat corrispondente
    $(contatto_appoggio).attr('data-name', ''+ nome_utente +'');
    // inserisco nel container
    $('.myHistory').append(contatto_appoggio);
    // creo un div per preparagli il campo nella chat view con un data che corrisponda al suo nome
    var account_yard = "<div class=\"right-messages\" data-name=" + nome_utente + "></div>";
    // lo mando dentro il div della chat
    $('.chatWindow').append(account_yard);
    // alla fine di ogni ciclo mi crea un contatto con un nome, un'immagine personalizzata,
    // e un data-name identico a quello del suo div in Chatview, in modo da poterli collegare più tardi
}

// appena creato tutto metto un active al primo elemento,
// di modo che la pagina, appena aperta, abbia un account già attivo
$('.myHistory').find('.myFriend').eq(0).addClass('active');
// faccio la stessa cosa per la pagina chat corrispondente
$('.chatWindow').find('.right-messages').eq(0).addClass('active');

// ● Click sul contatto mostra la conversazione del contatto cliccato, è possibile inserire
// nuovi messaggi per ogni conversazione

// intercetto click del contatto
$('.myFriend').click(function(){
    // se questo non ha la classe active
    if (!$(this).hasClass('active')) {
        // tolgo le classe active a tutti
        $('.myFriend').removeClass('active');
        // a questo gli assegno la classe active
        $(this).addClass('active');
        // nel frattempo cerco anche l'immagine
        var immagine = $(this).find('img').attr('src');
        // e il nome
        var nome = $(this).find('p.account').text();
        // e li schiaffo di prepotenza nel header della chat, problema risolto
        $('#nome-header').text(nome);
        $('#img-header').attr('src', immagine);
        // estrapolo il data name del mio contatto
        var account_name = $(this).attr('data-name');
        // cerco il data-name corrispondente in chatwindows, frugandolo con una each
        $('.right-messages').each(function(){
            // se il data-name associato a questa chat è identico a quello dello user cliccato, mostralo
            if ($(this).attr('data-name') == account_name) {
                $(this).addClass('active');
            }
            // altrimenti togli la classe active
            else {
                $(this).removeClass('active');
            }
        })
    }
})

// ● Cancella messaggio: cliccando sul messaggio appare un menu a tendina che
// permette di cancellare il messaggio selezionato


// intercetto il click sul pannellino
// essendo elemento dinamico molto 'anarchico' usiamo il costrutto con document e on per intercettare quel click preciso
// DA USARE CON PARSIMONIA!!!
$(document).on('click', 'i.message-options', function(){
    // richiamo il pannello di questa che ho cliccato
    var pannello = $(this).next('.message-options-panel');
    // se non è visibile
    if (!pannello.is(':visible')) {
        // nascondi tutti
        $('.message-options-panel').hide();
        // e mostra solo questo
        pannello.show();
        // intercetto il click sul tasto cancella
    } else {
        $('.message-options-panel').hide();
    }
    $('.message-destroy').click(function(){
        // cancello questo messaggio
        $(this).parent('.message-options-panel').parent('.message').remove();
    })
})
// fa nascondere il pannello se si preme da un'altra parte
$('.mainPage').on('click', function(){
    $('.message-options-panel').hide();
})




// ricerca utenti
// utilizzando la keyup function
// la mySearching si svolge ogni volta che premo un tasto
$('#searchFriends').keyup(function(){
    mySearching();
});



// arriva a questo punto la click e la keypress diventano inutili,
// perchè la ricerca prosegue 'in live' con l'utente che digita
// non le cancello, le lascio commentate



// // intercetto clik pulsante lente ricerca contatti
// $('.searchIcon').click(function(){
//     mySearching();
// })
//
// // intercetto invio su input ricerca contatti
// $('#searchFriends').keypress(function(event){
//     if (event.which == 13) {
//         mySearching();
//     };
// });



// invia messaggio, intercettando click sul bottone
$('.icons').click(function(){
    mySend();
});

// invia messaggio, intercettando il tasto invio
$('#textBox').keypress(function(event){
    if (event.which == 13) {
        mySend();
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
        // setTimeout per richiamare la funziona risposta, ritardo di 1000ms (1 secondo)
        setTimeout(myAnswer, 1000);
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
    console.log(inputName);
    // se il nome ha una lunghezza
    if (inputName.length != 0) {
        // inizio a leggere ogni nome
        $('.contactName .account').each(function(){
            // leggo il nome (per ogni elemento account)
            var friendName = $(this).text();
            // variabile maestra per tornare in cima all'albero dell'account
            var allFather = $(this).parent('.contactName').parent('.contactText').parent('.myFriend');
            // se quella lettera non è contenuta, nascondi account
            if (!(friendName.toLocaleLowerCase()).includes(inputName.toLocaleLowerCase())) {
                allFather.hide();
            } else {
                // altrimenti prosegui e mostra corrispondenze
                allFather.show();
            };
        });
    } else {
        // se il nome non c'e`, mostrami tutti i contatti
        $('.myFriend').show();
    }
}
