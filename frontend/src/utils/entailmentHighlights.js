

export function highlight(e,props,sentences) {
    var selStart = e.target.selectionStart
    var selEnd = e.target.selectionEnd
    var data = props.data 
    var sentence = sentences[e.target.id]
    var first_sentence = sentences[0]
    
    if (sentence.substring(selStart, selEnd) == " " || sentence.substring(selStart, selEnd) == ""){
        return
    }

    var newStart = selStart
    for(var i = selStart; i >= 0; i--) {
        if (sentence[i] == " " || i == 0){
            newStart = i
            break
        }
    }
    var newEnd = selEnd
    for(var i = selEnd; i <= sentence.length; i++) {
        if (sentence[i] == " " || i == sentence.length){
            newEnd = i
            break
        }
    }
    var finalSelection = sentence.substring(newStart, newEnd).trim()
    if (finalSelection[finalSelection.length-1] == "," || finalSelection[finalSelection.length-1] == "." || finalSelection[finalSelection.length-1] == ";"){
        finalSelection = finalSelection.substring(0, finalSelection.length-1)
    }

    if(data[first_sentence]["rational"].includes(finalSelection)){
        return
    }
    if(e.target.id == 0)
        data[first_sentence]["rational"] = [...data[first_sentence]["rational"], [finalSelection]]
    else if(e.target.id == 1){
        var index = data[first_sentence]["rational"].length - 1
        data[first_sentence]["rational"][index].push(finalSelection)
    }

    props.setData(({...data}))
}

export function removeHighlight(e, props, sentences) {
    var first_sentence = sentences[0]

    var id =e.target.id
    console.log(id)
    console.log(props.data[first_sentence]["rational"])
    props.data[first_sentence]["rational"].splice(id, 1)
    var data = props.data 
    data[first_sentence]["rational"] = {...data}[first_sentence]["rational"]
    props.setData(({...data}))
}


export function resetHighlight(e, props, sentences) {
    var first_sentence = sentences[0]
    var data = props.data 
    data[first_sentence]["rational"] = []
    props.setData(({...data}))
}