---
title: "Data processing pipeline"
description: "Cloud and backend infrastructure to measure the electrical usage and cost of industrial factories through IoT electrical sensors"
employer: "Next-E"
thumbnail: "/assets/images/nexte.webp"
banner: "https://cdn.prod.website-files.com/67c3a771f50ee86278e081b8/67cbf29308ea1ae1f6dc483e_67cb925d445935b57d5f7800_photo-1461088945293-0c17689e48ac.jpeg"
startDate: "Mon Aug 01 2022 05:00:00 GMT+0000 (Coordinated Universal Time)"
endDate: "Mon Aug 01 2022 05:00:00 GMT+0000 (Coordinated Universal Time)"
lucidchartUrl: "https://lucid.app/documents/embedded/94970f86-7e06-49f3-a315-5112b722191f"
tags:
  - name: "Serverless"
    color: "hsla(331, 83%, 49%, 0.3)"
  - name: "Project Management"
    color: "hsla(214, 100%, 58%, 0.3)"
  - name: "IoT"
    color: "hsla(331, 83%, 49%, 0.3)"
  - name: "AWS CDK"
    color: "hsla(60, 50%, 50%, 0.3)"
  - name: "AWS CloudFormation"
    color: "hsla(210, 50%, 40%, 0.3)"
  - name: "Kinesis"
    color: "hsla(331, 83%, 49%, 0.3)"
  - name: "Architecture"
    color: "hsla(331, 83%, 49%, 0.3)"
lang: "en"
translationKey: "iot-electrical-bi-and-kpis-startup"
---

• I built the entire infrastructure as code using **AWS CDK**, which allowed everything to be scalable, flexible, and easy to maintain, especially considering the wide variety of sensors and hardware we planned to integrate in the future.

‍

• The IoT sensors in the industrial factories send electrical measurements every 5 minutes. I set up a local SQLite database within each device, to temporarily store the records when there was no connection, and later automatically upload them to the cloud to ensure zero data loss.

‍

• At AWS, I set up a serverless-based infrastructure, as well as using services like **Lambda**, **Step Functions**, and **Kinesis Data Streams and Firehose**, to process the information as it came in. While we didn’t need exact real-time analytics, it was important to automatically calculate the electrical cost for each measurement using our data pipeline.

‍

• In Python and Pandas i developed ETLs that run on **AWS Step Functions** to integrate external information sources that clients were giving us, and they also built a library that greatly simplifies queries to **InfluxDB** using the Flux query language.

‍

As part of the project, I developed a Python script to easily check the execution status of our **AWS Step Functions**. This script allows you to know in real time how your process is going, the estimated time to complete, automatically get the results, and best of all: if something fails, you receive a clear and friendly description of the error, so you can solve it quickly without having to dive into confusing logs.

‍

Finally, something that stood out a lot was how we made use of IaaS and visualization with **Grafana and Power BI with AWS Athena** while maintaining full visibility with tools like **CloudWatch** and **Sentry** 🔎.

This combination allowed us to maintain an efficient, economical and easily scalable operation in the future, especially for a startup with an **AGILE** methodology.‍
💡 Our goal was to deliver key indicators **KPI’s** based on the information we collected from all our **Data Lake** sources with a business intelligence **BI** objective, for this with a combination of transactional **OLTP** databases and **OLAP** Analytics that we intended to achieve
‍
Why AWS Kinesis instead of Apache Kafka ??
We needed a simple, scalable, and quick solution to deploy from scratch. I chose **AWS Kinesis** because compared to Apache Kafka, **it is serverless**, which means zero additional infrastructure management, lower upfront costs, and a much faster startup.

‍

**Note on Event-Driven Architectures:** These architectures are based on generating, detecting, and reacting to events in real time, allowing systems to respond asynchronously and flexibly to specific changes or actions. This facilitates application scalability and responsiveness.‍

**Lambda** automatically scales on demand and follows a pay-as-you-go model, resulting in a more efficient and cost-effective solution for applications with variable workloads.

‍
Check out the AWS infrastructure diagram 👇
