const db = require("../firebase/config");
const jwt = require("jsonwebtoken");

const getAllMedicines = async (req,res) => {
    try{
        jwt.verify(req.token, SECRET_KEY, async (err, authData) => {
            if (err) {
                res.status(400).send({ result: "invalid token"})
            }
            else{
                let medicineData = [];
                let branches = ['ALLOPATHY','AYURVEDA','HOMEOPATHY']; 
                console.log(process.env.branches);
                const branchRef = db.collection("Medicines");
                for(let i = 0; i < branches.length; i++){
                    const snapshot = await branchRef.doc(branches[i]).collection('all_medicines').get();
                    let eachBranchData = [];
                    snapshot.forEach(doc => {
                        eachBranchData.push(doc.data());
                    })
                    medicineData.push({branch : branches[i],data : eachBranchData});
                }
                console.log(medicineData);
                res.send(medicineData);
            }
        })
    }
    catch(error){
        res.send(error); 
    }
}

const getMedicine = async (req,res) => {
    try{
        jwt.verify(req.token, SECRET_KEY, async (err, authData) => {
            if (err) {
                res.status(400).send({ result: "invalid token"})
            }
            else{
                const {branch,name} = req.body;
                const branchRef = db.collection("Medicines");
                const snapshot = await branchRef.doc(branch).collection('all_medicines').get();
                let arr = [];
                snapshot.forEach(doc => {
                    if(doc.data().name == name) {
                        console.log(doc.data());
                        arr.push(doc.data());
                    }
                })
                res.send(arr.length != 0 ? arr : 'Not Found');
            }
        })
    }
    catch(error){
        return res.send(error);
    }
}

const changeMedicineQuantity = async (req,res) => {
    try{
        jwt.verify(req.token, SECRET_KEY, async (err, authData) => {
            if (err) {
                res.status(400).send({ result: "invalid token"})
            }
            else{
                const {branch,name,quantityRemaining} = req.body;
                const branchRef = db.collection("Medicines");
                const snapshot = await branchRef.doc(branch).collection('all_medicines').get();
                let arr = [];
                snapshot.forEach(doc => {
                    if(doc.data().name == name) {
                        console.log(doc.data());
                        arr.push(doc.data());
                    }
                })
                res.send(arr.length != 0 ? arr : 'Not Found');
            }
        })
        
    }
    catch(error){
        return res.send(error);
    }
}

const addMedicine = async (req,res) => {
    try {
        jwt.verify(req.token, SECRET_KEY, async (err, authData) => {
            if (err) {
                res.status(400).send({ result: "invalid token"})
            }
            else{
                const {branch, name, quantityRemaining, disease} = req.body;
                let temp = String(branch).toUpperCase();
                let medicineJson = {
                    name: name,
                    quantityRemaining: quantityRemaining,
                    disease: disease,
                }
                if(branch != 'Homeopathy'){
                    medicineJson = {...medicineJson,type: req.body.type};
                }
                const response = await db.collection("Medicines").doc(temp).collection("all_medicines").add(medicineJson);
                res.send({...medicineJson,...response}) ;
            }
        })
        
    } 
    catch(error) {
        res.status(400).send(error)
    }
}

module.exports = {getAllMedicines,addMedicine,getMedicine,changeMedicineQuantity};