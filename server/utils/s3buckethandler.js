import AWS from 'aws-sdk';
import logger from 'winston';
import fs from 'fs';
//import proxy from 'proxy-agent';

const SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || "abc123";
const ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || "abc123";
const BUCKET_NAME = 'qsapien';

// httpOptions: { agent: proxy('http://satyam_bansal:Sat%4001022018@ptbc1.persistent.co.in:8080') },
// httpsOptions: { agent: proxy('http://satyam_bansal:Sat%4001022018@ptbc1.persistent.co.in:8080') }
// console.log('access key::'+SECRET_ACCESS_KEY);
// console.log('key id::'+ACCESS_KEY_ID);
// accessKeyId: ACCESS_KEY_ID,
// secretAccessKey: SECRET_ACCESS_KEY,

AWS.config.update({
sslEnabled:false,
region:'ap-south-1'
});
let s3=new AWS.S3();
// let s3Bucket = new AWS.S3({
//   accessKeyId: ACCESS_KEY_ID,
//   secretAccessKey: SECRET_ACCESS_KEY,
//   Bucket: BUCKET_NAME,
//   region:'us-east-1'
// });
exports.uploadFileToS3 = (fileBody, fileName, callback) => {
  //let fileData=fs.readFileSync(filePath);
  fs.writeFileSync("111",fileBody);
  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName || 'abc1111',
    Body: fileBody,
    ACL: 'public-read'
  };
  s3.putObject(params, (err, data) => {
    if (err) {
      callback(err);
    }
    else {
      callback(null, data);
    }
  })
}
