import s3 from 's3';

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
  