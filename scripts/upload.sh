if [ -z $CIRCLECI ]; then
  echo "This script should run on CircleCI only. Bailing..."
  exit 1
fi

S3_BUCKET=type-driven-development
S3_BUCKET_FOLDER=$1

if [ -z $1 ]; then
  S3_BUCKET_FOLDER=$NODE_ENV
fi

echo "***** About to deploy build to $S3_BUCKET/$S3_BUCKET_FOLDER"

# copy all of the files to aws
aws s3 cp ./dist/ s3://$S3_BUCKET/$S3_BUCKET_FOLDER \
  --acl public-read \
  --recursive

if [ $? -ne 0 ]; then
  echo "***** Failed uploading build to $S3_BUCKET/$S3_BUCKET_FOLDER"
  exit 1
fi

echo "***** Succeeded uploading build to $S3_BUCKET/$S3_BUCKET_FOLDER"