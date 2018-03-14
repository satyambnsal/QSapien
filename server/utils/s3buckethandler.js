import s3 from 's3';
import AWS from 'aws-sdk';
import logger from 'winston';
import fs from 'fs';
const SECRET_ACCESS_KEY=process.env.SECRET_ACCESS_KEY||"abc123";
const ACCESS_KEY_ID=process.env.ACCESS_KEY_ID||"abc123";
const BUCKET_NAME='qsapien';

let s3Bucket=new AWS.S3({
  accessKeyId:ACCESS_KEY_ID,
  secretAccessKey:SECRET_ACCESS_KEY,
  Bucket:BUCKET_NAME
});
exports.uploadFileToS3=(filePath,fileName,callback)=>{
  let fileData=fs.readFileSync(filePath);
  const params={
    Bucket:BUCKET_NAME,
    Key:fileName,
    Body:fileData,
    ACL:'public-read'
  };
  s3Bucket.upload(params,(err,data)=>{
    if(err){
      callback(err);
    }
    else{
      callback(null,data);
    }
  })
}
