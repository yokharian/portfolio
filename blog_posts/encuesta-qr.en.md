---
title: "Encuesta QR"
description: "Serverless redshift ETL"
employer: "XalDigital"
thumbnail: ""
banner: "https://cdn.prod.website-files.com/67c3a771f50ee86278e081b8/67cbe41e022e968fe92ed459_67cbdfe83b32df846e2a44a4_photo-1732320935426-395f3c1d38be.jpeg"
startDate: "Mon Apr 15 2024 05:00:00 GMT+0000 (Coordinated Universal Time)"
endDate: "Sat Jun 15 2024 05:00:00 GMT+0000 (Coordinated Universal Time)"
lucidchartUrl: ""
tags:
  - name: "Python"
    color: "hsla(90, 50%, 50%, 0.3)"
  - name: "AWS Glue"
    color: "hsla(30, 100%, 50%, 0.3)"
  - name: "AWS Redshift"
    color: "hsla(0, 50%, 50%, 0.3)"
  - name: "AWS CloudFormation"
    color: "hsla(210, 50%, 40%, 0.3)"
  - name: "AWS Step Functions"
    color: "hsla(120, 100%, 50%, 0.3)"
  - name: "Project Planning"
    color: "hsla(210, 100%, 40%, 0.3)"
  - name: "ETL Pipelines"
    color: "hsla(331, 83%, 49%, 0.3)"
  - name: "Amazon CloudWatch"
    color: "hsla(240, 100%, 40%, 0.3)"
  - name: "AWS SNS"
    color: "hsla(30, 100%, 50%, 0.3)"
---

🚀 **Automating Customer Surveys**
In this project, we receive CSV files from **Medallia** with customer survey results 📝

**EventBridge** starts the **Step Function** flow that coordinates the execution of tasks 🔄

**AWS Glue** extracts the information to **Amazon S3** and then integrates new records (deltas) and historical data to keep everything up to date and the processed information goes to **Redshift**

When the process finishes, the notification is sent via **SNS**, so the whole team knows that the data is ready 🔔 For added security, we use **Secret Manager**.
