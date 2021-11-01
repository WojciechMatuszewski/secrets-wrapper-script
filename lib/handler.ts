import S3Client from "aws-sdk/clients/s3";

const S3 = new S3Client();

export const handler = () => {
  console.log("reading the secret value", process.env.SECRET_VALUE);
};
