import boto3
from botocore.exceptions import ClientError

# Replace sender@example.com with your "From" address.
# This address must be verified with Amazon SES.
SENDER = "Contact <web@yokharian.dev>"
RECIPIENT = "cdmx.sofia@gmail.com"
AWS_REGION = "us-east-1"
SUBJECT = "Contact Me (portfolio)"

# The email body for recipients with non-HTML email clients.
BODY_TEXT = (
    "EMAIL SEND WITH SES FROM yokharian.dev\r\n"
    "SENDER: {name} <{email}>\r\n\r\n"
    "{message}"
)

# The character encoding for the email.
CHARSET = "UTF-8"

# Create a new SES resource and specify a region.
client = boto3.client("ses", region_name=AWS_REGION)


def send_email(email: str, name: str, message: str):
    # Try to send the email.
    try:
        # Provide the contents of the email.
        response = client.send_email(
            Destination={
                "ToAddresses": [
                    RECIPIENT,
                ],
            },
            Message={
                "Body": {
                    "Text": {
                        "Charset": CHARSET,
                        "Data": BODY_TEXT.format(
                            email=email, name=name, message=message
                        ),
                    },
                },
                "Subject": {
                    "Charset": CHARSET,
                    "Data": SUBJECT,
                },
            },
            Source=SENDER,
        )

    # Display an error if something goes wrong.
    except ClientError as e:
        print(e.response["Error"]["Message"])
        raise e from e
    else:
        print("Email sent! Message ID:")
        print(response["MessageId"])
