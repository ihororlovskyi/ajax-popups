// $(document).ready(function() {
//     $('.js-fancybox').fancybox({
//         maxWidth: 660,
//         // maxHeight: 600,
//         fitToView: false,
//         width: '70%',
//         height: '70%',
//         autoSize: true,
//         autoHeight: true,
//         closeClick: false,
//         openEffect: 'none',
//         closeEffect: 'none'
//     });
// });

var thisHash = window.location.hash;

$(document).ready(function() {
    if(window.location.hash) {
        $(thisHash).fancybox({
            padding: 0
        }).trigger('click');
    }
    $('.js-fancybox').fancybox({
        maxWidth: 660,
        // maxHeight: 600,
        fitToView: false,
        width: '70%',
        height: '70%',
        autoSize: true,
        autoHeight: true,
        closeClick: false,
        openEffect: 'none',
        closeEffect: 'none'
    });
});
