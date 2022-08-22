#!/ust/bin/env node --experimental-specifier-resolution=node
import { getArgs } from "./helpers/args.js"; 
import { printHelp, printSuccess, printError } from "./services/log.servis.js";
import { saveKeyValue } from "./services/storage.servis.js";

const saveToken = async (token) =>{
    try {
        await saveKeyValue('token', token);
        printSuccess('Токен сохранен');

    } catch (e){
        printError(e.massege)
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
};

initCLI();