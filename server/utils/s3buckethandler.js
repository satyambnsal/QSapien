import s3 from 's3';
import logger from 'winston';
const SECRET_ACCESS_KEY=process.env.SECRET_ACCESS_KEY||"abc123";
const ACCESS_KEY_ID=process.env.ACCESS_KEY_ID||"abc123";

var client = s3.createClient({
    maxAsyncS3: 20,      
    s3RetryCount: 3,     
    s3RetryDelay: 1000,  
    multipartUploadThreshold: 20971520,  
    multipartUploadSize: 15728640,  
    s3Options: {
      accessKeyId:ACCESS_KEY_ID,
      secretAccessKey:SECRET_ACCESS_KEY,
    },
  });
  exports.uploadFileToS3=(filePath,fileName,callback)=>{
    const params = {
        localFile:filePath,
        s3Params: {
          Bucket: "qsapien",
          Key: fileName,
        },
      };
      logger.info('inside uploadFileToS3 function');
      logger.info('param object::'+JSON.stringify(params));
      const uploader = client.uploadFile(params);
      uploader.on('error', function(err) {
          callback(err,null)
      });

      uploader.on('progress', function() {
        console.log("progress", uploader.progressMd5Amount,
                  uploader.progressAmount, uploader.progressTotal);
      });
      uploader.on('end', function() {
          callback(null,"done");
      });
  }
  