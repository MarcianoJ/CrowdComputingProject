

export function highlight(e,props,sentence) {
    var selStart = e.target.selectionStart
    var selEnd = e.target.selectionEnd
    var data = props.data 
    
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

    if(data[sentence]["rational"].includes(finalSelection)){
        return
    }
 
    data[sentence]["rational"] = [...data[sentence]["rational"], finalSelection]
    props.setData(({...data}))
}

export function removeHighlight(e, props, sentence) {
    var id =e.target.id
    props.data[sentence]["rational"].splice(id,1)
    var data = props.data 
    data[sentence]["rational"] = {...data}[sentence]["rational"]
    props.setData(({...data}))
}


export function resetHighlight(e, props, sentence) {
    var data = props.data 
    data[sentence]["rational"] = []
    props.setData(({...data}))
}