import React from "react";

import alien from './alien.jpg'
import robot from './robot.jpg'

String.prototype.shuffle = function () {
    var a = this.split(""),
        n = a.length;

    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}

export default function UI(props){
    var sentence = "We demand the recipe for that delicious strawberry cheesecake";
    var sentenceClear = sentence.substring(0,props.index*2)
    var sentenceScrambled = sentence.substring(props.index*2).replace(/\s/g, "").shuffle()

    return(
        <div className="d-flex">
            <img src={alien} alt="Alien" width="400" height="500" />
            <div class="box sb2" >{sentenceClear}{sentenceScrambled}</div>

            <div class="box sb1" >Help me translate this message!</div>
            <div class="container">
                <img src={robot} alt="Robot" width="400" height="500" />
                <div style={{fontFamily: 'Brush Script MT'}} class="text centered">{parseInt(props.index/35*100)}%</div>
            </div>


        </div>
    )

}