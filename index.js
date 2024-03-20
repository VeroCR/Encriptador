let input = document.getElementById('input');
let output = document.getElementById('output');
let info = document.getElementById('info');
let btnCopy = document.getElementById('btnCopy');

const REGLAS_ENCRIPTADO =   {
                                'e': 'enter',
                                'i': 'imes',
                                'a': 'ai',
                                'o': 'ober',
                                'u': 'ufat'
                            };

function encriptar() {
    if(input.value === '') {
        alert('No hay texto para encriptar');
        return;
    }
    let texto = input.value;
    for (let letra in REGLAS_ENCRIPTADO) {
        texto = texto.split(letra).join(REGLAS_ENCRIPTADO[letra]);
    }
    info.style.display = 'none';
    output.innerHTML = texto;
    btnCopy.style.display = 'flex';
}

function desencriptar() {
    if(input.value === '') {
        alert('No hay texto para desencriptar');
        return;
    }
    let texto = input.value;
    for (let letra in REGLAS_ENCRIPTADO) {
        texto = texto.split(REGLAS_ENCRIPTADO[letra]).join(letra);
    }
    info.style.display = 'none';
    output.innerHTML = texto;
    btnCopy.style.display = 'flex';
}

async function copiar() {
    try {
        await navigator.clipboard.writeText(output.innerText);
        btnCopy.innerHTML = 'Copiado!';
        btnCopy.style.backgroundColor = '#2ecc71';
        setTimeout(() => {
            btnCopy.innerHTML = 'Copiar';
            btnCopy.style.backgroundColor = 'Transparent';
        }, 2000);
    } catch (err) {
        console.error('Error al copiar el texto: ', err);
    }
}

input.addEventListener('input', function() {
    let texto = input.value;
    let textoModificado = texto.toLowerCase() // Cambia a minúsculas
                                .normalize('NFD') // Descompone los caracteres acentuados en su base y componentes diacríticos
                                .replace(/[\u0300-\u036f]/g, '') // Elimina los componentes diacríticos
                                .replace(/[^a-z\s.;,]/g, ''); // Elimina cualquier caracter que no sea una letra minúscula, espacio, punto o coma
    input.value = textoModificado;
});
