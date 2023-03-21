let valoresOriginales = [1,2,3,4,5]

function miFuncion(v1,v2,v3){
    return v1*v2
}

const resMiFuncion = valoresOriginales.filter(miFuncion)
console.log(resMiFuncion)