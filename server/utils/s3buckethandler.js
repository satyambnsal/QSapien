import AWS from 'aws-sdk';
import logger from 'winston';
import fs from 'fs';


const SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || "abc123";
const ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || "abc123";
const BUCKET_NAME = 'qsapien';


AWS.config.update({
sslEnabled:false,
region:'ap-south-1'
});
let s3=new AWS.S3();
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
