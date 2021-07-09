
const fs = require("fs") ; 
const prescriptions = require("./prescriptions");

function getPrescriptions() {
     
    fs.readFile('./prescriptions.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("Error reading file from disk:", err)
            return
        }
        try {
            const prescriptions = JSON.parse(jsonString)
            
    } catch(err) {
            console.log('Error parsing JSON string:', err)
            return 
        }
    }) ;
    return prescriptions ; 
}


function updatePrescriptions(prescription){
    const jsonString = JSON.stringify(prescription)
    fs.writeFile('./prescriptions.json', jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    }) ; 

}

module.exports = {getPrescriptions, updatePrescriptions} ; 

