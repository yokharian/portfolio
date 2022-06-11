ARN=arn:aws:lambda:us-east-1:898466741470:layer:psycopg2-py38:2
URL=$(aws lambda get-layer-version-by-arn --arn $ARN --query Content.Location --output text)
curl $URL -o layer.zip