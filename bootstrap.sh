#!/bin/bash
# this script will generate everything including the ~/.aws/config file for you.
# make sure you modify the variables before you run this script.
AWS_CLI_V2_URL='https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip'
CRED_PROCESS_URL='https://raw.githubusercontent.com/pahud/vscode/main/.devcontainer/bin/aws-sso-credential-process'

DEFAULT_PROFILE='default'
DEFAULT_REGION='us-east-1'
DEFAULT_OUTPUT='json'
SSO_START_URL=${SSO_START_URL}
SSO_REGION='us-east-1'
SSO_ACCOUNT_ID=${SSO_ACCOUNT_ID}
SSO_ROLE_NAME='AdministratorAccess'

PROJECT_DIR="${PWD}"

mkdir ~/.tmp && cd $_

# install aws-cli v2
curl "${AWS_CLI_V2_URL}" -o "awscliv2.zip" && \
  unzip awscliv2.zip && \
  sudo ./aws/install

mkdir ~/.bin && cd $_
wget "${CRED_PROCESS_URL}" && \
chmod +x aws-sso-credential-process && \
cd ${PROJECT_DIR}

aws configure set credential_process ${HOME}/.bin/aws-sso-credential-process
touch ~/.aws/credentials && chmod 600 $_

echo "generate the ~/.aws/config"

cat << EOF > ~/.aws/config
[${DEFAULT_PROFILE}]
credential_process = /home/codespace/.bin/aws-sso-credential-process
sso_start_url = ${SSO_START_URL}
sso_region = ${SSO_REGION}
sso_account_id = ${SSO_ACCOUNT_ID}
sso_role_name =${SSO_ROLE_NAME}
region = ${DEFAULT_REGION}
output = ${DEFAULT_OUTPUT}
EOF

# skip the configuration as we just generated the config above
#aws configure sso --profile default

# login to authenticate again
aws sso login
