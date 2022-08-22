#!/ust/bin/env node --experimental-specifier-resolution=node
import { getArgs } from "./helpers/args.js"; 
import { printHelp, printSuccess, printError } from "./services/log.servis.js";
import { saveKeyValue, TOKEN_DICTIONARY } from "./services/storage.servis.js";
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

const initCLI = () => {
    const args = getArgs(process.argv)
 
    if(args.h){
        printHelp();
    }
    if(args.s){
        
    }
    if(args.t){

    return saveToken(args.t);
        
    }
    getWeather('moscow');
};

initCLI();