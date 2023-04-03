const express = require('express')
const app = express()
const history = require('../src/routes/historyRoutes')
const patientRoutes = require('../src/routes/patientRoutes')
const doctorStaffLoginRouter = require('./routes/doctorStaffLoginRoute')
const medicineRouter = require('./routes/medicineRoutes')
// const db = require("./firebase/config")

const dotenv = require('dotenv')
const auth = require("../src/middlewares/auth")
const cors = require('cors');

dotenv.config()

const corsOptions = {
    "origin": "*",
    "methods": ["GET", "POST"]
};

app.use(cors(corsOptions));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/users/read', auth, history)
app.use('/patient', patientRoutes)
app.use('/medicine',medicineRouter)
app.use('/doctor_staff',doctorStaffLoginRouter)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Listening the port ${PORT}...`)
})




// app.post('/create', async (req, res) => {
//     try {
//         // console.log(req.body)
//         const id = req.body.userName
//         const userJson = {
//             email: req.body.email,
//             firstName: req.body.firstName,
//             lastName: req.body.lastName,
//             visitDate: req.body.visitDate,
//             illness: req.body.illness,
//             precautions: req.body.precautions,
//             userName: req.body.userName
//         }

//         const response = await db.collection("users").doc(id).set(userJson)
//         console.log(response)
//         res.send(response)
//     } catch (error) {
//         res.send(error)
//     }
// // })



// app.post('/create/medDetails/:id', async (req, res) => {
//     try {
//         // console.log(req.body)
//         const medId = req.body.medId
//         const medDetails = {
//             medPres: req.body.medPres,
//             dosage: req.body.dosage,
//             qtyPres: req.body.qtyPres,
//             qtyGiven: req.body.qtyGiven
//         }
//         const responseMed = await db.collection("users").doc(req.params.id).collection("medDetails").doc(medId).set(medDetails)
//         console.log(responseMed)
//         res.send(responseMed)
//     } catch (error) {
//         res.send(error)
//     }
// })

