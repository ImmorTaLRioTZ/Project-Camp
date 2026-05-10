import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

let s3ClientInstance = null;

const getS3Client = () => {
    if (!s3ClientInstance) {
        s3ClientInstance = new S3Client({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            }
        });
    }
    return s3ClientInstance;
};

export const uploadFileToS3 = async (fileBuffer, fileName, mimetype) => {
    const s3 = getS3Client();
    
    // Clean filename to prevent spaces or weird characters breaking the URL
    const cleanFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
    const uniqueFileName = `${Date.now()}-${cleanFileName}`;
    
    // Upload into the 'attachments' directory in the bucket
    const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `attachments/${uniqueFileName}`,
        Body: fileBuffer,
        ContentType: mimetype,
    });

    await s3.send(command);
    
    // Return the public AWS S3 URL
    return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/attachments/${uniqueFileName}`;
};
