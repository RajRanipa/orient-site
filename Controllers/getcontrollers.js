// this is getcontrolls.js file
const obj = require('../index.js');
const nodemailer = require('nodemailer');
require("dotenv").config();


module.exports.home_page = (rec, res) => {
    res.sendFile(obj.filepath + '/index.html');
}
module.exports.Blanket_page = (rec, res) => {
    res.sendFile(obj.filepath + '/Blanket_page.html');
}
module.exports.Board_page = (rec, res) => {
    res.sendFile(obj.filepath + '/Board_page.html');
}
module.exports.Bulk_page = (rec, res) => {
    res.sendFile(obj.filepath + '/Bulk_page.html');
}
module.exports.Module_page = (rec, res) => {
    res.sendFile(obj.filepath + '/Module_page.html');
}
module.exports.Paper_page = (rec, res) => {
    res.sendFile(obj.filepath + '/Paper_page.html');
}
module.exports.Career = (rec, res) => {
    res.sendFile(obj.filepath + '/Career.html');
}
module.exports.Contact_us = (rec, res) => {
    res.sendFile(obj.filepath + '/Contact_us.html');
}
module.exports.Ga_id = (rec, res) => {
    try {
        const trackingID = process.env.gaid;
        console.log("rec :- ",rec)
        console.log("res :- ",res)
        console.log("trackingID :- ",trackingID)
        const encodedID = Buffer.from(trackingID).toString("base64");
        res.json({ trackingID: encodedID });
    } catch (error) {
        return obj.handleError(res, error);
    }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports.send_career_email =
    async (req, res) => {
        try {
            const { fullName, mobileNumber, email, address, education } = req.body;
            const resume = req.file; // File uploaded by the user

            if (!resume) {
                return res.status(400).json({
                    status_code: 400,
                    status: false,
                    message: "Resume is required",
                });
            }

            console.log(process.env.fromemail, process.env.app_pass, email, address, education);

            // Create the transporter object
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: process.env.fromemail,
                    pass: process.env.app_pass,
                },
            });

            // Prepare the email content
            const mailOptions = {
                from: process.env.fromemail,
                to: process.env.toemail,
                subject: "New Career Form Submission",
                text: `New Career Form Submission:

                Name: ${fullName}
                Phone: ${mobileNumber}
                Email: ${email}
                Address: ${address}
                Education: ${education}`,
                attachments: [
                    {
                        filename: resume.originalname,
                        path: resume.path,
                    },
                ],
            };

            // Send the email
            const info = await transporter.sendMail(mailOptions);

            console.log("Email sent successfully:", info.response);

            // Clean up the uploaded file
            const fs = require("fs");
            fs.unlinkSync(resume.path);

            return res.status(200).json({
                status_code: 200,
                status: true,
                message: "Email sent successfully",
            });
        } catch (error) {
            return obj.handleError(res, error);
        }
    }


module.exports.send_contact_email = async (req, res) => {
    try {
        const { fullName, mobileNumber, email, address, enquiry } = req.body;

        console.log(fullName, mobileNumber, email, address, enquiry);
        // Create the transporter object
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.fromemail,
                pass: process.env.app_pass,
            },
        });

        // Prepare the email content
        const mailOptions = {
            from: process.env.fromemail,
            to: process.env.toemail,
            subject: "New Enquiry ",
            text: `New Enquiry :
                Name: ${fullName}
                Phone: ${mobileNumber}
                Email: ${email}
                Address: ${address}
                Enquiry: ${enquiry}`,
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);

        console.log("Email sent successfully:", info.response);

        return res.status(200).json({
            status_code: 200,
            status: true,
            message: "Email sent successfully",
        });
    } catch (error) {
        return obj.handleError(res, error);
    }
};



