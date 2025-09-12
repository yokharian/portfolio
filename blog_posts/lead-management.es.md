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

🚀 Estuve en un proyecto súper retador durante **4 meses** junto a mi compañero, donde automatizamos el procesamiento de leads migrando un proyecto desde **SAS enterprise guide 7.1** y una infraestructura serverless en **AWS**.
Todo arrancó descargando archivos CSV desde un SFTP 📥, y luego se puso en marcha la limpieza de datos: eliminamos duplicados, aplicamos reglas de negocio y dejamos todo impecable Después, generamos una tabla delta con los cambios diarios y actualizamos la base de datos maestra, creando reportes que se volcaron de vuelta al servidor 📊

Implementé **despliegue continuo** usando **CodePipeline, CloudFormation y GitHub**, lo que permitió que cualquier cambio en el código se desplegara automáticamente 🔥

Además, usamos **AWS Step Functions** para orquestar todo el flujo 🔄, mientras que desde **AWS Glue** se mandaban queries de SQL directamente a **Redshift** para análisis ⛅ y al finalizar **SNS** envía la señal de éxito

Fue un proyecto intenso y gratificante que nos permitió optimizar procesos y ganar en eficiencia y escalabilidad
