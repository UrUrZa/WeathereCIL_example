#!/ust/bin/env node --experimental-specifier-resolution=node
import { getArgs } from "./helpers/args.js"; 
import { printHelp, printSuccess, printError, printWeather } from "./services/log.servis.js";
import { getKeyValue, saveKeyValue, TOKEN_DICTIONARY } from "./services/storage.servis.js";
import { getWeather } from "./services/api.servis.js";

const saveToken = async (token) =>{
    if(!token.length){
        printError('не передан токен');
    } else {
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess('Токен сохранен');

    } catch (e){
        printError(e.massege)
    }
    }
};


const saveCity = async (city) =>{
    if(!city.length){
        printError('не передан город');
    } else {
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city);
        printSuccess('Город сохранен');

    } catch (e){
        printError(e.massege)
    }
    }
};

const getForcast = async() =>{
    try{
        const currentCity = await getKeyValue(TOKEN_DICTIONARY.city);
        const weather = await getWeather(currentCity);
        printWeather(weather);
        } catch (e) {
            if (e?.response?.status == 404){
                    printError('Неверно указан город');
            } else if(e?.response?.status == 401){
                    printError('Неверно указан токен');
            } else {
                    printError(e.massege);
            }
    }
}

const initCLI = () => {
    const args = getArgs(process.argv)
 
    if(args.h){
        return printHelp();
    }
    if(args.s){
        return saveCity(args.s);
    }
    if(args.t){

        return saveToken(args.t);
        
    }
        return getForcast();
    
};

initCLI();