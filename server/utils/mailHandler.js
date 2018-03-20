import nodemailer from 'nodemailer';
import logger from 'winston';
logger.level='debug';
const ADMIN_EMAIL_ID=process.env.ADMIN_EMAIL_ID||'abc123@gmail.com';
const ADMIN_EMAIL_PASSWORD=process.env.ADMIN_EMAIL_PASSWORD||'abc123';

const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:ADMIN_EMAIL_ID,
        pass:ADMIN_EMAIL_PASSWORD
    },
    proxy:process.env.HTTP_PROXY
});
const sendEMail=(receiverId,callback)=>{
const mailOptions={
    from:ADMIN_EMAIL_ID,
    to:receiverId,
    subject:'Activate your Qsapien account',
    html:'<h3>Welcome to QSapien'
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
export default sendEMail;