function setField(x,y,fields,value){
    if(checkField(x,y))
        fields[y][x]=value
}
function getField(x,y,fields){
    if(checkField(x,y))
        return fields[y][x]
    return undefined
}
function setCrossFields(x,y,fields,value,condition=(v)=>true){
    const callback=(x,y,fields)=>{
        const field=getField(x,y,fields)
        if(condition(field)){
            setField(x,y,fields,value)
        }
    }
    forCrossFields(x,y,fields,callback)
}
function forCrossFields(x,y,fields,callback=()=>{}){
    callback(x+1,y,fields);
    callback(x-1,y,fields);
    callback(x,y+1,fields);
    callback(x,y-1,fields);
}
function setAroundFields(x,y,fields,value,condition=v=>true){
    const callback=(x,y,fields)=>{
        const field=getField(x,y,fields)
        if(condition(field)){
            setField(x,y,fields,value)
        }
    }
    forAroundFields(x,y,fields,callback)
}
function forAroundFields(x,y,fields,callback){
    for(let i=-1;i<2;i++){
        for(let j=-1;j<2;j++){
            callback(x+i,y+j,fields)
        }
    }
}
function printFields(fields){
    let msg="";
    fields.forEach(row=>{
        row.forEach(field=>{
            msg+=field
        })
        msg+="\n"
    })
    console.log(msg)
}
function checkField(x, y) {
    return x >= 0 && y >= 0 && x <= 9 && y <= 9;
}
function getRandomNumber (max){
    return Math.floor(Math.random() * max)
}
function cloneFields(fields){
    return fields.map(arr=>[...arr])
}
 function getEmptyFields(){
    return [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
}
export {getField,setField,setCrossFields,forAroundFields,setAroundFields,printFields,forCrossFields,checkField,getRandomNumber,cloneFields,getEmptyFields}