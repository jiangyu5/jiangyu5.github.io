var select = document.querySelector('select');
var body = document.querySelector('body');

function update(bgColor) {
    body.style.backgroundColor = bgColor;
}

select.onchange = function() {
    ( select.value === 'dark' ) ? update('rgb(73, 85, 97)') : update('rgb(199, 225, 252)');
}
