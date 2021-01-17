console.log('pocetak')
//mk
const cont = document.querySelector('#conteiner')
//mk
const divZaPrihode = document.querySelector('#divZaPrih')
const divZaRashode = document.querySelector('#divZaRash')
const data = []

const pUkupno = document.createElement('p')
pUkupno.textContent =  0
pUkupno.id = 'ukup'

const pPrihod = document.createElement('p')
pPrihod.textContent = 0
pPrihod.id= 'prih'

const pRashod = document.createElement('p')
pRashod.textContent = 0
pRashod.id='rash'
//mk
const divSel = document.querySelector('#selPrRs')

const select = document.createElement('select')

//const opt = document.createElement('option')
//opt.value = `'-1' selected disabled`

const opt1 = document.createElement('option')
opt1.value = '+'
//mk
opt1.textContent = 'prihod'
const opt2 = document.createElement('option')
opt2.value = '-'
//mk
opt2.textContent = 'rashod'

//mk

const inputDesc = document.createElement('input')
inputDesc.type = 'text'

const inputValue = document.createElement('input')
inputValue.type = 'number'

const btnSubmit = document.createElement('button')
btnSubmit.innerHTML= ' &#10004'

function ukupanPrihod(){
    let zbir = 0
    data.forEach(nesto => {
        if(nesto.tip === '+') zbir += nesto.vrednost
    })

    return zbir
}

function ukupanRashod(){
    let zbir = 0
    data.forEach(x => {
        if(x.tip === '-') zbir += x.vrednost
    })

    return zbir
}

function azurirajVrednosti(){
    pPrihod.textContent = ` prihod ${ukupanPrihod()}`
    pRashod.textContent =`rashod ${ukupanRashod()}`
    pUkupno.textContent = ukupanPrihod() - ukupanRashod()
    const procenti = document.createElement('span')
    procenti.innerHTML = Math.round( ukupanRashod() * 100 / ukupanPrihod()) + `&#37`
    pRashod.append(procenti)
}

function dodajNaStranicu(limun){
    const div = document.createElement('div')
    const p = document.createElement('p')
    p.textContent = `${limun.desc}     ${limun.vrednost}`
    p.id= 'item'

    const btnDelete = document.createElement('button')
    btnDelete.textContent= 'x'

    div.append(p,btnDelete)

    btnDelete.addEventListener('click',() => {
        div.remove()
        let index = data.indexOf(limun)
        data.splice(index,1)

        azurirajVrednosti()
    })

    if(limun.tip === '+') divZaPrihode.append(div)
    else {
        const procenat = document.createElement('p')
        procenat.textContent = limun.vrednost * 100 / ukupanPrihod()
        divZaRashode.append(div)
    }
    
}

btnSubmit.addEventListener('click',(e) => {
    e.preventDefault()

    let obj = {
        desc: inputDesc.value,
        vrednost: Number(inputValue.value),
        tip: select.value
    }

    data.push(obj)
    dodajNaStranicu(obj)
    azurirajVrednosti()
    console.log(data)
})
//opt
select.append(opt1,opt2)
divSel.append(select,inputDesc,inputValue,btnSubmit)
cont.append(pUkupno,pPrihod,pRashod)