const db = require("../firebase/config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;

const getAllDoctorStaffDetails = async (req,res)=>{
    try{
        jwt.verify(req.token, SECRET_KEY, async (err, authData) => {
            if(err){
                res.status(400).send({ result: "Invalid token" });
            }
            else{
                const usersRef = db.collection("Doctor And Staff");
                const response = await usersRef.get();
                let responseArr = [];
                response.forEach(doc =>{
                    responseArr.push(doc.data());
                });
                res.send(responseArr);
            }
        })
    }
    catch(error){
        res.send(error); 
    }
};

const doctorStaffSignIn = async (req,res)=>{
    const {id,password} = req.body;
    try{
        const usersRef = db.collection("Doctor And Staff");
        const response = await usersRef.get();
        let responseArr = [];
        response.forEach(doc =>{
            responseArr.push(doc.id);
        });

        const existingUser = responseArr.find(_id => _id==id);
        if(!existingUser){
            return res.status(400).json({message:"User not found"});
        }

        const matchPassword = await bcrypt.compare(password,existingUser.password);

        if(!matchPassword){
            return res.status(400).json({message:"Invalid credentials"});
        }
        else{
            const token = jwt.sign({id: id, password: password}, SECRET_KEY);
            res.status(201).json({token});
        }
        

    }
    catch(error){
        res.status(500).send(error);
    }
};

const doctorStaffSignUp = async (req,res)=>{
    try {
     
        const password = req.body.password;
        const encryptedPassword = await bcrypt.hash(password,12); 
        const userId = (req.body.id);
        const userJson = {
            name : req.body.name,
            id : userId,
            password : encryptedPassword,
            date:Date().toString()
        };
        const token = jwt.sign({id : userJson.id, password: password},SECRET_KEY)
        const response = await db.collection("Doctor And Staff").doc(userId).set(userJson);
        res.send({token:token,...userJson,...response});
    } 
    catch(error) {
        console.log(error);
        res.status(500).send(error);
    }
}

module.exports = {getAllDoctorStaffDetails,doctorStaffSignIn,doctorStaffSignUp};

