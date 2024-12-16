const sendMail = require('../helpers/SendMail')

const testEmail = async (req,res)=>{
    try{
        const emailOptions={
            to: "victorbamidele3@gmail.com",
            subject: "Test",
            text:'test',
        }
        const response = await sendMail(emailOptions)
        res.status(200).json({message:'test email sent'})

    } catch(error){
        console.error('error occured sending mail')

    }
}

module.exports = { testEmail }