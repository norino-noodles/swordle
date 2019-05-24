

function poj_to_tailo(text) {
    var accent = '[́̀̂]'
    var conv = {
        "e" :  "i",
        "E" : "I",
        "o" : "u",
        "O" : "U"
    }

    function convert(match, p1, p2, offset, string) {
        return conv[p1] + p2;
    }

    text = text.replace('#', '')

    text = text.normalize('NFD');

    text = text.replace('\u4ED4', '\u00E1')
    text = text.replace(new RegExp('\(([^\)]+)\)'), (match, p1, offset, string) => {
        return p1 +'-' + p1 + '-' + p1
    });

    text = text.replace(new RegExp('([eE])(' + '\u030D' + '?k)'), convert);

    text = text.replace(new RegExp('([eE])(' + accent + '?ng)'), convert);

    text = text.replace(new RegExp('([oO])(' + accent + '?[ae])'), convert);

    text = text.replace(new RegExp('([uU])(' + accent + '?[aei])'), '$1$3$2')
    text = text.replace(new RegExp('([eE])(' + accent + '?)(re)'), '$1$3$2')
    text = text.replace(new RegExp('([oO])(' + accent + '?)'), '$1o')
    text = text.replace(new RegExp('(h?)\U207F'), 'nn$1')
    text = text.replace(new RegExp('([cC]h)'), (match, p1, offset, string) => {
        if (match == "ch") {
            return "ts";
        } else if (match == "Ch") {
            return "Ts"
        }
    });

    text = text.replace(new RegExp('/([^\s])'), ' / $1')

    text = text.normalize('NFC');

    return text
}