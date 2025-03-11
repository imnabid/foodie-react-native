import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Address, User } from './schema.js'
import Twilio from 'twilio'

export const auth = express()

const generateOtp = () => {
    return Math.floor(1000 + Math.random() * 9000);
}

const accountSID = 'test'
const authToken = 'test' 
// const client = new Twilio(accountSID, authToken)

auth.post("/otp", async (req, res) => {
    try {
        const { email, otp } = req.body
        console.log(email, otp)
        const user = await User.findOne({ email: email, otpRegistrationNumber: otp })
        if (user) {
            {
                user.isOtpRegistrationVerified = true;
                await user.save();
                res.json({ message: "OTP verified" })
            }
        }
        res.status(400).json({ message: "OTP verification failed" })
    }
    catch {
        res.status(500).json({ message: "Internal server error" })
    }
})

// const JWT_SECRET = process.env.JWT_SECRET;
const JWT_SECRET = "fskdbf374h2jn{}jdiw()sdhsfhjsb??djskjdsk1212nkdfkdn[]nskdksn[}nfdhjdks231"
auth.post("/signup", async (req, res) => {
    try {

        console.log(req.body)
        const { fullName, email, password, phoneNumber, allergies, address } = req.body;
        const otpRegistration = generateOtp();
        const oldUser = await User.findOne({ email: email, isOtpRegistrationVerified: true });
        if (oldUser) {
            return res.status(409).send({ message: "User already exists" });
        }
        const encryptedPassword = await bcrypt.hash(password, 10);
        const addrs = await Address.create({ location: address });
        console.log('otp', otpRegistration)
        await User.create({
            fullName: fullName,
            phoneNumber: phoneNumber,
            email: email,
            password: encryptedPassword,
            otpRegistrationNumber: otpRegistration,
            isOtpRegistrationVerified: false,
            address: addrs
        });




        // await client.messages.create({
        //     body: `Your OTP is  ${otpRegistration}`,
        //     from: '+12075693951',
        //     to: '+977' + '9869191972'
        // });

        // Send success response
        return res.status(200).send({ success: true, message: 'User Created' });
    } catch (error) {
        // Handle errors and send error response
        console.error(error);
        return res.status(500).send({ success: false, message: 'Failed to create user' });
    }


})

auth.post("/login", async (req, res) => {
    try {
        console.log('login handler', req.body)
        const { email, password } = req.body;
        const user = await User.findOne({ email: email, isOtpRegistrationVerified: true }).populate('address');
        await User.deleteMany({ email:email, isOtpRegistrationVerified: false })
        if (!user) {
            return res.status(409).send({ message: 'Login failed!' })
        }

        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ email: user.email }, JWT_SECRET,)
            if (user.role === 'admin') user.isAdmin = true;
            else user.isAdmin = false;
            // const {password, isOtpRegistrationVerified, otpRegistration, ...output} = user;
            const output = { id: user._id, phoneNumber: user.phoneNumber, isAdmin: user.isAdmin, fullName: user.fullName, email: user.email, allergies: user.allergies, address: user.address }
            return res.status(200).send({ token, user: output });
        } else {

        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({ success: false, message: 'Failed to login' });
    }
})