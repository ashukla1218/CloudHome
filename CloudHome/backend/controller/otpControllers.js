const crypto = require('crypto');
const nodemailer = require("nodemailer");

// Function to generate a random 4-digit OTP
const generateRandomOtp = () => {
    return crypto.randomInt(1000, 9999);
};


const sendOTPMail = async (email, otp) => {
    try {
        let mailer = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            port: 465,
            auth: {
                user: "cloudhome572@gmail.com",
                pass: "dwac zbcp nxqa zkyw",
            },
        });

        const response = await mailer.sendMail({
            from: "abcd", // likhilesh@<home.cloud.app>
            to: email,
            subject: "OTP", // OTP verification for your account
            html: `
                <html>
                    <body>
                        <h1> Your OTP for Cloud Home APP is </h1>
                        <h1> ${otp} </h1>
                    </body>
                </html>
            `,
        });

        console.log(response);

        return true;
    } catch (err) {
        console.log("--------------------------------");
        console.log(err);
        console.log("--------------------------------");

        return false;
    }
};

const generateOtp = async (req, res) => {
    try {
        const { email } = req.user;

        // generate Random OTP
        const otp = generateRandomOtp();

        const isMailSent = await sendOTPMail(email, otp);

        if (!isMailSent) {
            res.status(500);
            res.json({
                status: "Fail",
                message: `Otp NOT sent to ${email}`,
                data: {},
            });
        }

        // create a entry in database with that OTP

        res.status(201);
        res.json({
            status: "success",
            message: `Otp sent to ${email}`,
            data: {},
        });
    } catch (err) {
        console.log("----------------------------");
        console.log(err);
        console.log("----------------------------");
        res.status(500).json({
            status: "fail",
            message: "Internal Server Error",
            data: err,
        });
    }
};

module.exports = { generateOtp };
