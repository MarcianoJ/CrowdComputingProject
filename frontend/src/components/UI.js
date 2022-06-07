import React from "react";

import alien from '../images/alien.jpeg'
import robot from '../images/robot.jpeg'

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
        <div className="d-flex justify-content-center mt-5">
            <div>
                <img src={alien} alt="Alien" width="300" />
            </div>
            <div className="">
                <div className="box mb-3">
                    <p>{sentenceScrambled}</p>
                </div>
                <div className="box">
                    <p>{sentenceClear}</p>
                </div>
            </div>
            

            <div >
                <img src={robot} alt="Robot" width="300" />
                <div style={{fontFamily: 'Brush Script MT'}} className="text centered">{parseInt(props.index/35*100)}%</div>
            </div>


        </div>
    )

}