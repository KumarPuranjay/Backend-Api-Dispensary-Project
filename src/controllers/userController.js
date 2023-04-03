const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const db = require("../firebase/config")
const patient = db.collection("patient")
require('dotenv').config()
const SECRET_KEY = process.env.SECRET_KEY

const signup = async (req, res) => {

    try {

        const id = req.body.userName

        console.log(req.body)
        const tempId = []
        await patient.get().then((querySnapshot) => {

            querySnapshot.forEach((doc) => {
                tempId.push(doc.id)
            })
            console.log(tempId)
        })
        let existingUser = tempId.find(_id => _id == id)
        console.log(existingUser)
        if (existingUser) {
            console.log("The string and array element are the same!");
            return res.status(400).json({ message: "User already exists" });
        }
        else {
            console.log("123")
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const pJson = {
                userName: req.body.userName,
                phoneNumber: req.body.phoneNumber,
                email: req.body.email,
                password: hashedPassword,
                // token : ""
            }

            const token = jwt.sign({ email: pJson.email, id: pJson._id }, SECRET_KEY)
            res.status(201).json({ user: pJson, token: token })
            // pJson.token = token
            console.log(token)
            // const response = await patient.doc(id).set(pJson)
            console.log(response)
            res.send({ response })
        }
    } catch (error) {
        res.send(error)
    }
}


const signin = async (req, res) => {
    try {
        const signInJson = {
            userName: req.body.userName,
            password: req.body.password
        }
        const id = req.body.userName
        console.log(req.body)
        const tempId = []
        await patient.get().then((querySnapshot) => {

            querySnapshot.forEach((doc) => {
                tempId.push(doc.id)
            })
            console.log(tempId)
        })
        let existingUser = tempId.find(_id => _id == signInJson.userName)
        console.log(existingUser);
        
        if(!existingUser){
            console.log("User not found");
            return res.status(404).json({ message: "User not found" });
        }
        else{
            const arr = await patient.doc(existingUser).get();
            const existingUserData = arr.data();
            console.log(existingUserData)
            const matchPassword = await bcrypt.compare(signInJson.password, existingUserData.password);
            if(!matchPassword){
                console.log("Invalid Credentials")
                return res.status(404).send("Invalid Credentials")
            }
            else{
                const token = jwt.sign({existingUserData}, SECRET_KEY)
                res.status(201).json({token})
                console.log(token)
                // const response = await patient.doc(id).get()
                // console.log(response)
                // res.send({response})
            }
        } 
        res.status(200).json(signInJson);
    } catch (error) {

    }
}

module.exports = { signup, signin };