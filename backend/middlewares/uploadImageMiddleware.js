const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { s3Client } = require("../config/awsConfig");

const uploadImageToS3 = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  try {
    const file = req.file;
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `products/${Date.now()}_${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const command = new PutObjectCommand(params);
    const s3Response = await s3Client.send(command);

    req.body.image = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
    next();
  } catch (error) {
    res.status(500).json({ message: "Error uploading image to S3", error });
  }
};

module.exports = uploadImageToS3;
