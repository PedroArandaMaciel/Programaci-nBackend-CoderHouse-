import fs from 'fs';
import __dirName from '../utils.js';

const pathToFile = __dirName + '/files/messages.json'

class contenedorMsg {
    save = async (msg) => {
        if (!msg){
            return {
                status: "Error",
                message: "Message is required"
            }
        }
        try{
            if(fs.existsSync(pathToFile)){
                let data = await fs.promises.readFile(pathToFile, 'utf-8')
                let messages = JSON.parse(data)
                messages.push(msg)
                await fs.promises.writeFile(pathToFile, JSON.stringify(messages, null,2))
                return {
                    status: "success",
                    message: "adeded message"
                }
            }else {
                await fs.promises.writeFile(pathToFile, JSON.stringify([msg], null,2))
            }
        }catch (error){
            return {
                status: "Error",
                message: error.message
            }
        }
    }
    getAllMsgs = async () => {
        try {
            if(fs.existsSync(pathToFile)){
                let data = await fs.promises.readFile(pathToFile, "utf-8")
                let messages = JSON.parse(data)
                return {
                    status: "Succes",
                    messages: messages
                }
            }else{
                return {
                    status: "Error",
                    message: "Route not found",
                    messages: []
                }
            }
        } catch (error) {
            return {
                status: "Error",
                message: error.message
            }
        }
    }
}
export default contenedorMsg;