$('.js-jquery-modal').click(function(event) {
    event.preventDefault();
    $.get(this.href, function(html) {
        $(html).appendTo('body').modal({
            // fadeDuration: 200,
            // fadeDelay: 0.50
        });
    });
});
