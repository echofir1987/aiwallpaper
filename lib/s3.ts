import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { fetch } from 'cross-fetch';

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
  }
});

export async function downloadAndUploadImage(
  imageUrl: string,
  bucketName: string,
  key: string
) {
  try {
    // 下载图片
    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();

    // 上传到 S3
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: Buffer.from(buffer),
      ContentType: 'image/png'
    });

    const result = await s3Client.send(command);
    
    // 返回图片URL
    return {
      Location: `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
      ...result
    };
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw error;
  }
}

export async function downloadImage(imageUrl: string, outputPath: string) {
  try {
    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();
    
    // 如果需要保存到文件系统
    const fs = require('fs');
    fs.writeFileSync(outputPath, Buffer.from(buffer));
    
    return outputPath;
  } catch (error) {
    console.error('Error downloading image:', error);
    throw error;
  }
}