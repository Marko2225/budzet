console.log('pocetak')
//mk
const cont = document.querySelector('#conteiner')
//mk
const divZaPrihode = document.querySelector('#divZaPrih')
const divZaRashode = document.querySelector('#divZaRash')
const data = [
    //     desc: 'dgd',
    //     vrednost: 1,
    //     tip: '-'
]

const pUkupno = document.createElement('p')
pUkupno.textContent = 0
pUkupno.id = 'ukup'

const pPrihod = document.createElement('p')
pPrihod.textContent = 0
pPrihod.id = 'prih'

const pRashod = document.createElement('p')
pRashod.textContent = 0
pRashod.id = 'rash'
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
inputDesc.placeholder = 'opis'
const inputValue = document.createElement('input')
inputValue.type = 'number'

const btnSubmit = document.createElement('button')
btnSubmit.innerHTML = 'izracunaj &#10004' 

function ukupanPrihod() {
    let zbir = 0
    data.forEach(nesto => {
        if (nesto.tip === '+') zbir += nesto.vrednost
    })

    return zbir
}

function ukupanRashod() {
    let zbir = 0
    data.forEach(x => {
        if (x.tip === '-') zbir += x.vrednost
    })

    return zbir
}

let ukupno = ukupanPrihod() - ukupanRashod()
console.log(ukupno)

function azurirajVrednosti() {
    pPrihod.textContent = ` prihod ${ukupanPrihod()}`
    pPrihod.textContent = ` prihod ${ukupanPrihod()}`
    pRashod.textContent = `rashod ${ukupanRashod()} `
    pUkupno.textContent = ukupanPrihod() - ukupanRashod()

    const procenti = document.createElement('span')
    procenti.innerHTML = Math.round(ukupanRashod() * 100 / ukupanPrihod()) + `&#37`
    pRashod.append(procenti)

    //// ovde bi trebalo da se menjaju procenti u divu za rashod

    data.forEach(item => {


      let   procenat2 = document.querySelector('.procRasSpan')
        
        procenat2.innerHTML = Math.round(item.vrednost * 100 / ukupanPrihod()) + `&#37`
      //= procenat2.innerHTML
         
        console.log(procenat2)
        console.log(Math.round(item.vrednost * 100 / ukupanPrihod()))
        console.log(item)

    })

}
   // potencijalna f=ja za mejanje procentata
   
// function menjajProcente (objecat){
//     data.forEach(obj => {
         
// objecat = obj
//         let   procenat2 = document.querySelector('.procRasSpan')
          
//           procenat2.innerHTML = Math.round(objecat.vrednost * 100 / ukupanPrihod()) + `&#37`
//         //= procenat2.innerHTML
      
//           console.log(procenat2)
//           console.log(Math.round(obj.vrednost * 100 / ukupanPrihod()))
//           console.log(objecat)
         
//       })
// }


function dodajNaStranicu(limun) {
    const div = document.createElement('div')
    const p = document.createElement('p')

    p.textContent = `${limun.desc}  ---   ${limun.vrednost}`


    const btnDelete = document.createElement('button')
    btnDelete.textContent = 'x'

    div.append(p, btnDelete)

    btnDelete.addEventListener('click', () => {
        div.remove()
        let index = data.indexOf(limun)
        data.splice(index, 1)

        azurirajVrednosti()
    })

    if (limun.tip === '+') divZaPrihode.append(div)

    else {

        var procenat = document.createElement('span')
        procenat.className = 'procRasSpan'

        // procenat.id = 'procRasSpan'  `&#37`


      p.innerHTML = `${limun.desc}  --   ${limun.vrednost} `

        procenat.innerHTML = Math.round(limun.vrednost * 100 / ukupanPrihod()) 
        
        // `${procenat}`
        p.append(procenat)
        divZaRashode.append(div)

    }
}

btnSubmit.addEventListener('click', (e) => {
    e.preventDefault()

    let obj = {
        desc: inputDesc.value,
        vrednost: Number(inputValue.value),
        tip: select.value
    }

    data.push(obj)
    dodajNaStranicu(obj)

    azurirajVrednosti()
    
   // menjajProcente (obj)
    console.log(data)
})
//opt
select.append(opt1, opt2)
divSel.append(select, inputDesc, inputValue, btnSubmit)
cont.append(pUkupno, pPrihod, pRashod)