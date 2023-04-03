const db = require("../firebase/config")
const user = db.collection("users")
const jwt = require("jsonwebtoken")
require('dotenv').config()
const SECRET_KEY = process.env.SECRET_KEY

const getPatientInfo = async (req, res) => {
    try {
        jwt.verify(req.token, SECRET_KEY, async (err, authData) => {
            if (err) {
                res.status(404).send({ result: "invalid token" })
            }
            else {

                // console.log(authData.existingUserData.userName)
                let userName = authData.existingUserData.userName
                // console.log(authData)
                console.log(userName)
                const userRef = user.doc(userName)
                const response = await userRef.get()
                // console.log(response)
                res.json({ response: response.data() })
                // res.json({
                //     authData
                // })
            }
        })

    } catch (error) {
        res.send(error)
    }
}

const dummyController = (req, res) => {
    const id = req.id;
    

    res.status(200).send("dummyWorking");
}

const getPatientMedDetails = async (req, res) => {
    try {
        jwt.verify(req.token, SECRET_KEY, async (err, authData) => {
            if (err) {
                res.status(400).send({ result: "invalid token" })
            }
            else {
                let userName = authData.existingUserData.userName
                const userRef = user.doc(userName).collection("medDetails")
                const response = await userRef.get()
                let arrResponse = []
                response.forEach(doc => {
                    arrResponse.push(doc.data())
                })
                res.send(arrResponse)
            }
        })
        // console.log(req.body)
    } catch (error) {
        res.send(error)
    }
}

module.exports =
{
    getPatientInfo,
    getPatientMedDetails,
    dummyController
}
