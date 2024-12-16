const {createTransport} = require('nodemailer')



const transporter = createTransport({
    host : process.env.EMAIL_SERVICE,
    port : 587,
    secure : true,
    auth :{ 
        user: process.env.EMAIL_USERNAME,
        password: process.env.EMAIL_PASSWORD
    }

})

const sendMail = async(options)=>{
    const mailOptions={
        from: process.env.EMAIL_FROM,
        to: options.to,
        subject:options.subject,
        text: options.text,  
        html:options.html
    }
    try{
        const info = await transporter.sendMail(mailOptions)
        console.log('email sent')
    } catch(error){
        console.error('error sending mail', error)
    }
}

module.exports = sendMail