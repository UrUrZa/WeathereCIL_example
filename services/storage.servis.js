import {homedir} from 'os'
import {join} from 'path'
import {promises} from 'fs'

const filePath = join(homedir(), 'weather-data.json');

const saveKeyValue = async (key, value) =>{
    let data = {};
    if(await isEXist(filePath)){
        const file = await promises.readFile(filePath);
        data = JSON.parse(file);
    } else{
    data[key] = value;
    await promises.writeFile(filePath, JSON.stringify(data));
    }
};

const getKeyValue = async(key) =>{
    if(await isEXist(filePath)){
        const file = await promises.readFile(filePath);
        const data = JSON.parse(file);
    } else{
    return undefined;
    }
};

const isEXist = async (path) =>{
    try { 
        promises.stat(path);
        return true; 

} catch(e) {
    return false;
}
};

export {saveKeyValue, getKeyValue}