//prototype string start
if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function (str){
        return this.slice(0, str.length) == str;
    };
}
//handle hash change
if ("onhashchange" in window) { // event supported?
    window.onhashchange = function () {
        hashChanged(window.location.hash);
    }
}
else { // event not supported:
    var storedHash = window.location.hash;
    window.setInterval(function () {
        if (window.location.hash != storedHash) {
            storedHash = window.location.hash;
            hashChanged(storedHash);
        }
    }, 100);
}
//instance of remodal
var inst = $('[data-remodal-id=modal]').remodal();

//hashChage handler
function hashChanged(hash){
    // console.log("hash: "+hash);
    if(hash.startsWith("#ajax")){
        $.ajax({url: './ajax/', success: function(result){
            $("#remodalcontent").html(result);
        }});
        inst.open();
    }else if(hash.startsWith("#cashbox")){
        $.ajax({url: './cashbox/', success: function(result){
            $("#remodalcontent").html(result);
        }});
        inst.open();
    }else{
        var state = inst.getState();
        //console.log("state: "+state);
        if(state=="opening" || state=="opened"){
            inst.close();
        }
    }
}
//clear hash
function removeHash () {
    history.pushState("", document.title, window.location.pathname+window.location.search);
}
//fire when landing on the page
hashChanged(window.location.hash);

//clear hash and html on close
$(document).on('closed', '.remodal', function (e) {
    removeHash();
    $('#remodalcontent').html('Loading...');
    // Reason: 'confirmation', 'cancellation'
    //console.log('Modal is closed' + (e.reason ? ', reason: ' + e.reason : ''));
});
