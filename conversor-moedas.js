//npm install dotenv;
//"type":"module"

//Para executar, coloca node ./nomedoarquivo valorASerConvertido moedaBase moedaDestino

import dotenv from 'dotenv'; //importando dados do arquivo .env que guarda API_KEY
dotenv.config(); 

const API_KEY = process.env.API_KEY; //Chave da api https://freecurrencyapi.com

const parameters = process.argv; //Captura de parâmetros via terminal
const valueConvert = Number(parameters[2]); //Valor a ser convertido
const baseCurrency = (parameters[3]).toUpperCase(); //Moeda base
const targetCurrency = (parameters[4]).toUpperCase(); //Moeda destino

async function converterMoedas(valueConvert, baseCurrency, targetCurrency) {
    try{
        if(valueConvert === undefined || valueConvert === null) {
            throw new Error ("Valor a ser convertido é obrigatório");
        }

        if (isNaN(valueConvert)) {
            throw new Error("O valor deve ser um número válido.");
        }
        
        if (valueConvert <= 0) {
            throw new Error("O valor deve ser maior que zero.");
        }
        
        if (!baseCurrency || typeof baseCurrency !== "string" || baseCurrency.length !== 3) {
            throw new Error("Moeda de origem inválida.");
        }
        
        if (!targetCurrency || typeof targetCurrency !== "string" || targetCurrency.length !== 3) {
            throw new Error("Moeda de destino inválida.");
        }
        
        const response = await fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=${API_KEY}&currencies=${targetCurrency}&base_currency=${baseCurrency}`);

        const dados = await response.json();

        const rate = dados.data[targetCurrency.toUpperCase()]; //Capturando o valor da moeda destino que retornou do objeto data

        const conversion = (valueConvert * rate).toFixed(2);

        return `Moeda Base: ${baseCurrency}\nMoeda Destino: ${targetCurrency}\nValor a ser convertido: ${valueConvert}\nResultado: ${valueConvert} ${baseCurrency} é equivalente a ${conversion} ${targetCurrency}`;
        
    }
      catch(error) {
        console.log("Erro ao buscar dados",error);
    }
}

const resultado = await converterMoedas(valueConvert, baseCurrency, targetCurrency);
console.log(resultado)
  