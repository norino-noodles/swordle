function export.poj_to_tl_conv(text)
    if type(text) == "table" then text = text.args[1] end
    local accent = "[́̀̂]?"
    local conv = {
        ["e"] = "i", ["E"] = "I", ["o"] = "u", ["O"] = "U"
    }
    local function convert(a, b)
        return conv[a] .. b
    end
    text = gsub(text, "#", "")
    text = mw.ustring.toNFD(text)
    text = gsub(text, "仔", "á")
    text = gsub(text, "%(([^%)]+)%)", "%1-%1-%1")
    text = gsub(text, "([eE])(̍?k)", convert)
    text = gsub(text, "([eE])(" .. accent .. "ng)", convert)
    text = gsub(text, "([oO])(" .. accent .. "[ae])", convert)
    text = gsub(text, "([uU])(" .. accent .. ")([aei])", "%1%3%2")
    text = gsub(text, "([eE])(" .. accent .. ")(re)", "%1%3%2")
    text = gsub(text, "([oO]" .. accent .. ")͘", "%1o")
    text = gsub(text, "(h?)ⁿ", "nn%1")
    text = gsub(text, "[cC]h", {["ch"] = "ts", ["Ch"] = "Ts"})
    text = gsub(text,'/([^ ])',' / %1')
    return mw.ustring.toNFC(text)
end