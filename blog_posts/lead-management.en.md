---
title: "Lead Management"
description: "Serverless redshift ETL"
employer: "XalDigital"
thumbnail: ""
banner: "https://cdn.prod.website-files.com/67c3a771f50ee86278e081b8/67cbe41e022e968fe92ed459_67cbdfe83b32df846e2a44a4_photo-1732320935426-395f3c1d38be.jpeg"
startDate: "Mon May 20 2024 05:00:00 GMT+0000 (Coordinated Universal Time)"
endDate: "Mon Sep 30 2024 05:00:00 GMT+0000 (Coordinated Universal Time)"
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

🚀 I was on a super challenging project for **4 months** with my partner
where we automated lead processing by migrating a project from SAS enterprise guide 7.1 and a serverless infrastructure on AWS.

It all started by downloading CSV files from an SFTP 📥, and then data cleansing started: we removed duplicates, applied business rules, and left everything spotless. Afterwards, we generated a delta table with the daily changes and updated the master database, creating reports that were dumped back to the server 📊

I implemented **continuous deployment** using **CodePipeline, CloudFormation, and GitHub**, which allowed any code changes to be automatically deployed 🔥

In addition, we used **AWS Step Functions** to orchestrate the entire flow 🔄, while from **AWS Glue** SQL queries were sent directly to **Redshift** for analysis ⛅ and at the end **SNS** sends the success signal

It was an intense and rewarding project that allowed us to optimize processes and gain in efficiency and scalability
