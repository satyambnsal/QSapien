import nodemailer from 'nodemailer';
import ejs from 'ejs'
import fs from 'fs';
import logger from 'winston';
logger.level='debug';
const ADMIN_EMAIL_ID=process.env.ADMIN_EMAIL_ID||'abc123@gmail.com';
const ADMIN_EMAIL_PASSWORD=process.env.ADMIN_EMAIL_PASSWORD||'abc123';

// const mailTemplateSource=fs.readFileSync(__dirname+'/mailTemplate.ejs');
// const mailTemplate=Handlebars.compile(mailTemplateSource);
console.log('admin email password',ADMIN_EMAIL_PASSWORD);
const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:ADMIN_EMAIL_ID,
        pass:ADMIN_EMAIL_PASSWORD
    }
});
const sendEMail=(req,token,callback)=>{
logger.info('receiver id::',req.body.email_id);
const confirmation_link=`http://${req.headers.host}/user/confirmation?code=${token}`
ejs.renderFile(__dirname+'/../views/mailTemplate.ejs',{user_email:req.body.email_id,confirmation_link},(err,result)=>{
if(err){
logger.info('error occured in ejs render file method');
logger.info(err );
}
else{
    const mailOptions={
        from:ADMIN_EMAIL_ID,
        to:req.body.email_id,
        subject:'Activate your Qsapien account',
        html:result
    };
    transporter.sendMail(mailOptions,(err,info)=>{
        if(err){
            logger.info('error occured while sending mail');
            logger.debug(JSON.stringify(err));
            callback(err,null);
        }
        else{
            logger.info('mail sent successfully');
            logger.debug(JSON.stringify(info));
            callback(null,info);
        }
    })
        
}
})
}
export default sendEMail;