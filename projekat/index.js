console.log('pocetak');

const cont = document.querySelector('#conteiner');
const divZaPrihode = document.querySelector('#divZaPrih');
const divZaRashode = document.querySelector('#divZaRash');
const divSel = document.querySelector('#selPrRs');

const data = [];

const pUkupno = document.createElement('p');
pUkupno.textContent = 0;
pUkupno.id = 'ukup';

const pPrihod = document.createElement('p');
pPrihod.textContent = 0;
pPrihod.id = 'prih';

const pRashod = document.createElement('p');
pRashod.textContent = 0;
pRashod.id = 'rash';

const select = document.createElement('select');

const opt1 = document.createElement('option');
opt1.value = '+';
opt1.textContent = 'prihod';

const opt2 = document.createElement('option');
opt2.value = '-';
opt2.textContent = 'rashod';

const inputDesc = document.createElement('input');
inputDesc.type = 'text';
inputDesc.placeholder = 'opis';

const inputValue = document.createElement('input');
inputValue.type = 'number';

const btnSubmit = document.createElement('button');
btnSubmit.innerHTML = 'izracunaj ✔'; 

// Funkcija za računanje ukupnog prihoda
function ukupanPrihod() {
    return data.reduce((zbir, nesto) => {
        return nesto.tip === '+' ? zbir + nesto.vrednost : zbir;
    }, 0);
}

// Funkcija za računanje ukupnog rashoda
function ukupanRashod() {
    return data.reduce((zbir, x) => {
        return x.tip === '-' ? zbir + x.vrednost : zbir;
    }, 0);
}

// Funkcija za ažuriranje prikazanih vrednosti
function azurirajVrednosti() {
    const prihod = ukupanPrihod();
    const rashod = ukupanRashod();

    pPrihod.textContent = `prihod: ${prihod}`;
    pRashod.textContent = `rashod: ${rashod}`;
    pUkupno.textContent = `ukupno: ${prihod - rashod}`;

    // Ažuriranje procenata
    const procenatRashoda = document.createElement('span');
    procenatRashoda.innerHTML = rashod > 0 ? Math.round(rashod * 100 / prihod) + `%` : '0%';
    pRashod.append(procenatRashoda);
}

// Funkcija za dodavanje transakcije na stranicu
function dodajNaStranicu(limun) {
    const div = document.createElement('div');
    const p = document.createElement('p');
    p.textContent = `${limun.desc} --- ${limun.vrednost}`;
    
    const btnDelete = document.createElement('button');
    btnDelete.textContent = 'x';

    btnDelete.addEventListener('click', () => {
        div.remove();
        const index = data.indexOf(limun);
        if (index > -1) {
            data.splice(index, 1);
        }
        azurirajVrednosti();
    });

    if (limun.tip === '+') {
        divZaPrihode.append(div);
    } else {
        const procenat = document.createElement('span');
        procenat.className = 'procRasSpan';
        procenat.innerHTML = `${Math.round(limun.vrednost * 100 / ukupanPrihod())}%`;
        p.append(procenat);
        divZaRashode.append(div);
    }

    div.append(p, btnDelete);
}

// Event listener za dodavanje transakcije
btnSubmit.addEventListener('click', (e) => {
    e.preventDefault();

    // Validacija unosa
    if (inputDesc.value.trim() === "" || isNaN(inputValue.value) || Number(inputValue.value) <= 0) {
        alert("Molimo unesite validan opis i pozitivnu vrednost.");
        return;
    }

    let obj = {
        desc: inputDesc.value,
        vrednost: Number(inputValue.value),
        tip: select.value
    };

    data.push(obj);
    dodajNaStranicu(obj);
    azurirajVrednosti();

    // Resetovanje polja unosa
    inputDesc.value = '';
    inputValue.value = '';
});

// Dodavanje opcija u select i dodavanje elemenata u DOM
select.append(opt1, opt2);
divSel.append(select, inputDesc, inputValue, btnSubmit);
cont.append(pUkupno, pPrihod, pRashod);