

function poj_to_tailo(text) {
    var conv = {
        "e" :  "i",
        "E" : "I",
        "o" : "u",
        "O" : "U"
    }

    text = text.replace(new RegExp('([eE])(' + '\u030D' + '?k)'), (match, p1, p2, offset, string) => {
        return conv[p1].concat(p2);
    });
    return text
}