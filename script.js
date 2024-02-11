const BitsCountSelector = document.getElementById("bits_count");
const FistNumberBox = document.getElementById("first_num");
const OperatorSelector = document.getElementById("operator_selector");
const SecondNumberBox = document.getElementById("second_num");

const FirstNumberOutTable = document.getElementById("first_number_output");
const SecondNumberOutTable = document.getElementById("second_number_output");
const TotalOutTable = document.getElementById("total-output");


const OutputFieldSet1 = document.getElementById("output-fieldset-1");
const OutputFieldSet2 = document.getElementById("output-fieldset-2");
const OutputFieldSet3 = document.getElementById("output-fieldset-3");

const OutputFieldSet1Legend = document.getElementById("output-fieldset-1-legend");
const OutputFieldSet2Legend = document.getElementById("output-fieldset-2-legend");
const OutputFieldSet3Legend = document.getElementById("output-fieldset-3-legend");

const outputDiv = document.getElementById("output-div");

let bitCount  = BitsCountSelector.value;
bitCount = parseInt(bitCount.substring(0,bitCount.length-5));

let firstNum =  parseInt(FistNumberBox.value);
let secondNum =  parseInt(SecondNumberBox.value);
let maxNumSupport = (2**(bitCount-1)-1)
let minNumSupport = maxNumSupport*-1
let operator = OperatorSelector.value
let inputOutOfRange = false


let outputValues = [];
let total = 0;
let outputVal = "";

function set_operator(){
    operator = OperatorSelector.value
    check_first_second_num()
}

function check_first_second_num(){
    inputOutOfRange = false;
    firstNum =  parseInt(FistNumberBox.value);
    secondNum =  parseInt(SecondNumberBox.value);

    firstNum =  parseInt(firstNum);
    secondNum =  parseInt(secondNum);

    if (operator=="-" && secondNum<0){
        operator = "+";
        secondNum = secondNum*-1;
    }

    else if (operator=="-" && secondNum>-1){
        operator = "+";
        secondNum = secondNum*-1;
    }

    maxNumSupport = (2**(bitCount-1)-1);
    minNumSupport = maxNumSupport*-1;
    console.log(maxNumSupport, minNumSupport);
    console.log(firstNum, secondNum);
    console.log(operator);
    
    if  (firstNum>maxNumSupport || firstNum<minNumSupport || secondNum>maxNumSupport || secondNum<minNumSupport){
        inputOutOfRange = true;
    }
    if  (((firstNum+secondNum)>maxNumSupport || (firstNum+secondNum)<minNumSupport)){
        console.log(firstNum+secondNum)
        inputOutOfRange = true;
    }

    
    if (inputOutOfRange){
        BitsCountSelector.style.color = "#ff0000";
    }
    else{
        BitsCountSelector.style.color = "#000000";
    }

    if (!inputOutOfRange && !isNaN(firstNum) && !isNaN(secondNum)){
        createOutput()
    }
    else{
        resetOutput();
    }

}

function resetOutput(){
    outputDiv.style["border"] = "none";
    outputDiv.style["background-color"] = "#ffffff";

    OutputFieldSet1Legend.textContent = ""
    OutputFieldSet2Legend.textContent = ""
    OutputFieldSet3Legend.textContent = ""
    OutputFieldSet1.style["border"] ="none";
    OutputFieldSet2.style["border"] ="none";
    OutputFieldSet3.style["border"] ="none";
    FirstNumberOutTable.innerHTML = ``; 
    SecondNumberOutTable.innerHTML = ``; 
    TotalOutTable.innerHTML = ``;
}

function createOutput(){
    outputValues = []

    OutputFieldSet1.style["border"] ="1px solid rgba(210,210,210,0.2);";
    OutputFieldSet2.style["border"] ="1px solid rgba(210,210,210,0.2);";
    OutputFieldSet3.style["border"] ="1px solid rgba(210,210,210,0.2);";
    outputDiv.style["border"] = "1px solid rgba(99,99,99,0.1)"
    outputDiv.style["background-color"] = "rgba(210,210,210,0.2)"

    OutputFieldSet1Legend.textContent = firstNum;
    OutputFieldSet2Legend.textContent = secondNum;

    total=firstNum+secondNum;
    
    OutputFieldSet3Legend.textContent = total
    FirstNumberOutTable.innerHTML = get_table_html(firstNum); 
    SecondNumberOutTable.innerHTML = get_table_html(secondNum); 
    TotalOutTable.innerHTML = get_output_table_html(total); 
}


function get_output_table_html(num){
    let innerHtml = `
                <tr>
                    <td></td>
                    <td class="output-title">${firstNum}</td>
                    <td><label class="dash">:</td>
                    <td class="output"><label class="output-val">${outputValues[0]}</td>
                </tr>
                <tr>
                    <td> &nbsp &nbsp + &nbsp</td>
                    <td class="output-title">${secondNum}</td>
                    <td class="dash">:</td>
                    <td class="output"><label class="output-val">${outputValues[1]}</td>
                </tr>`
    if (total>-1){
        outputVal = add_spaces_by(fix_len_by(decimal_to_binary(total),bitCount,"0"),4);
    }
    else{
        outputVal = decimal_to_binary(total*-1);
        outputVal = fix_len_by(outputVal,bitCount,"0");
        outputVal = get_opposite(outputVal);
        outputVal = decimal_to_binary(binary_to_decimal(outputVal)+1);
        outputVal = add_spaces_by(outputVal,4);
    }

    innerHtml +=`
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td class="output"><hr></td>
                </tr
                <tr>
                    <td></td>
                    <td class="output-title">${total}</td>
                    <td class="dash">:</td>
                    <td class="output"><label class="output-val">${outputVal}</td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td class="output"><hr><hr></td>
                </tr
                `
    return innerHtml;
}

function get_table_html(num){
    let tempNum = num ;
    if (num<0) tempNum = num*-1;
    let binary = decimal_to_binary(tempNum);
    let fixedBinary = fix_len_by(binary,bitCount,"0");
    let onesComplement = get_opposite(fixedBinary) ;
    let twosComplement =  fix_len_by(decimal_to_binary(binary_to_decimal(onesComplement)+1),bitCount,"1");

    let innerHtml = `
                <tr>
                    <td class="output-title">Decimal</td>
                    <td class="dash">:</td>
                    <td class="output"><label class="output-val">${num}</td>
                </tr>
                <tr>
                    <td class="output-title">Binary</td>
                    <td class="dash">:</td>
                    <td class="output"><label class="output-val">${add_spaces_by(binary,4)}</td>
                </tr>`

    if (num>-1){      
        innerHtml+=`<tr>
                        <td></td>
                        <td></td>
                        <td class="output"><hr></td>
                    </tr>`

        outputValues.push(add_spaces_by(fixedBinary,4));
    }
    innerHtml+= `<tr>
                    <td class="output-title">Binary(${bitCount}-Bits)</td>
                    <td class="dash">:</td>
                    <td class="output"><label class="output-val">${add_spaces_by(fixedBinary,4)}</td>
                </tr>
                `;
    if (num>-1){      
        innerHtml+=`<tr>
                        <td></td>
                        <td></td>
                        <td class="output"><hr></td>
                    </tr>`
    }  
    if (num<0) {
        outputValues.push(add_spaces_by(twosComplement,4));
        innerHtml += `
                    <tr>
                        <td class="output-title">1's Complement</td>
                        <td class="dash">:</td>
                        <td class="output"><label class="output-val">${add_spaces_by(onesComplement,4)}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td class="output"><label class="output-val">+ 1</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td class="output"><hr></td>
                    </tr>
                    <tr>
                        <td class="output-title">2's Complement</td>
                        <td class="dash">:</td>
                        <td class="output"><label class="output-val">${add_spaces_by(twosComplement,4)}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td class="output"><hr></td>
                    </tr
                    `;
    }
    return innerHtml;

}


function set_bit_count(){
    bitCount = BitsCountSelector.value
    bitCount = parseInt(bitCount.substring(0,bitCount.length-5))
    console.log(bitCount)
    check_first_second_num();
}


function decimal_to_binary(num){
    if (num==0) return "0";
    let binaryVal = "";
    while(num!=0){
        binaryVal = num%2 + binaryVal;
        console.log("decimal_to_binary")
        num =  parseInt(num/2);
    }
    return binaryVal;
}

function binary_to_decimal(value){
    let decimalVal = 0;
    let power = 0;
    for (let i=(value.length-1); i>-1; i--){
        if (value[i]=="1"){
            decimalVal += (2**power) 
        }
        power++;
        console.log("binary_to_decimal")
    }
    return decimalVal;
}

function fix_len_by(value, len, fixer){
    let fix = ""
    for (let i=0; i<len-value.length; i++){
        console.log("fix_len_by")
        fix += fixer 
    }
    return  (fix + value)
}

function add_spaces_by(value ,space_count){
    let spacedValue = "";
    let spaceCount = space_count;
    for (let i=(value.length-1); i>-1; i--){
        spacedValue = value[i] + spacedValue;
        console.log("add_spaces_by")
        if (spacedValue.length==spaceCount){
            spacedValue =  " "+ spacedValue;
            spaceCount += (space_count+1)
        }
    }
    return spacedValue;
}

function get_opposite(value){
    let oppositeVal = "";
    for(let i=0; i<value.length; i++){
        console.log("get_opposite")
        if (value[i]=="1"){
            oppositeVal += "0";
        }
        else{
            oppositeVal += "1";
        }
    }
    return oppositeVal;
}
