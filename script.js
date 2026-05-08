// --- Seleção de Elementos ---
const convertButton = document.querySelector(".btn-cvt");
const currencySelectToConvert = document.querySelector(".currency-select-to-convert"); // Select "De"
const currencySelectConverted = document.querySelector(".currency-select-converted"); // Select "Para"
const inputCurrencyValue = document.querySelector(".input-currency");

// Elementos da Vitrine (Lado DE)
const currencyNameToConvert = document.querySelector(".currency");
const currencyImgToConvert = document.querySelector(".img-to-convert");
const currencyValueToConvert = document.querySelector(".currency-value-to-convert");

// Elementos da Vitrine (Lado PARA)
const currencyNameConverted = document.querySelector(".currency-converted");
const currencyImgConverted = document.querySelector(".img-converted");
const currencyValueConverted = document.querySelector(".currency-value");

// --- Banco de Dados e Configurações ---
const rates = {
    USD: 5.2,
    EUR: 6.2,
    GBP: 7.2,
    JPY: 0.05,
    BTC: 250000,
    RS: 1.0
};

const currencyData = {
    RS:  { name: "Real Brasileiro", img: "./assets/logo-brl.png", locale: "pt-BR", currency: "BRL", placeholder: "R$ 10.000,00" },
    USD: { name: "Dólar Americano", img: "./assets/logo-usd.png", locale: "en-US", currency: "USD", placeholder: "$ 10.000,00" },
    EUR: { name: "Euro", img: "./assets/logo-eur.png", locale: "de-DE", currency: "EUR", placeholder: "€ 10.000,00" },
    GBP: { name: "Libra Esterlina", img: "./assets/logo-gbp.png", locale: "en-GB", currency: "GBP", placeholder: "£ 10.000,00" },
    JPY: { name: "Iene Japonês", img: "./assets/logo-jpy.png", locale: "ja-JP", currency: "JPY", placeholder: "¥ 10.000" },
    BTC: { name: "Bitcoin", img: "./assets/logo-btc.png", locale: "en-US", currency: "BTC", placeholder: "₿ 1.0" }
};

// --- Funções Principais ---

function convertValues() {
    const valueTyped = parseFloat(inputCurrencyValue.value);

    // Validação básica: se não for número, limpa os campos e para
    if (isNaN(valueTyped)) {
        currencyValueToConvert.innerHTML = "---";
        currencyValueConverted.innerHTML = "---";
        return;
    }

    const fromCurrency = currencySelectToConvert.value;
    const toCurrency = currencySelectConverted.value;

    // Atualiza o valor "DE"
    currencyValueToConvert.innerHTML = new Intl.NumberFormat(currencyData[fromCurrency].locale, {
        style: "currency",
        currency: currencyData[fromCurrency].currency
    }).format(valueTyped);

    // 2. Lógica de Conversão (Base Real)
    const valueInBrl = valueTyped * rates[fromCurrency];
    const result = valueInBrl / rates[toCurrency];

    // Atualiza o valor "PARA"
    currencyValueConverted.innerHTML = new Intl.NumberFormat(currencyData[toCurrency].locale, {
        style: "currency",
        currency: currencyData[toCurrency].currency
    }).format(result);
}

// Muda o lado "DE" (Origem)
function changeCurrencyToConvert() {
    const selected = currencySelectToConvert.value;
    const data = currencyData[selected];

    currencyNameToConvert.innerHTML = data.name;
    currencyImgToConvert.src = data.img;
    inputCurrencyValue.placeholder = data.placeholder;

    convertValues(); // Recalcula na hora
}

// Muda o lado "PARA" (Destino)
function changeCurrencyConverted() {
    const selected = currencySelectConverted.value;
    const data = currencyData[selected];

    currencyNameConverted.innerHTML = data.name;
    currencyImgConverted.src = data.img;

    convertValues(); // Recalcula na hora tbm
}

// --- Eventos ---
currencySelectToConvert.addEventListener("change", changeCurrencyToConvert);
currencySelectConverted.addEventListener("change", changeCurrencyConverted);
convertButton.addEventListener("click", convertValues);