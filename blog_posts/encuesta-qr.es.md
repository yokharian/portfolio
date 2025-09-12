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

🚀 **Automatizando Encuestas de clientes**
En este proyecto, recibimos archivos CSV desde **Medallia** con resultados de encuestas de clientes 📝

**EventBridge** inicia el flujo de la **Step Function** que coordina la ejecución de tareas 🔄

**AWS Glue** extrae la información hacia **Amazon S3** y luego integra nuevos registros (deltas) y datos históricos para mantener todo al día y la información procesada pasa a **Redshift**

Cuando termina el proceso se envía la notificación por **SNS**, así todo el equipo sabe que la data está lista 🔔 Para mayor seguridad, usamos **Secret Manager**.
