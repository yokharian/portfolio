---
title: "Data processing pipeline"
description: "Cloud and backend infrastructure to measure the electrical usage and cost of industrial factories through IoT electrical sensors"
employer: "Next-E"
thumbnail: "https://cdn.prod.website-files.com/67c3a771f50ee86278e081b8/67d92240da86c17b3a696589_67ce272c8f2c435d49843740_nextethumbnail3.gif"
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
---

• Construí toda la infraestructura como código usando **AWS CDK**, lo que permitió que todo fuera escalable, flexible y fácil de mantener, especialmente considerando la amplia variedad de sensores y hardware que planeábamos integrar en el futuro.

‍

• Los sensores IoT en las fábricas industriales envían mediciones eléctricas cada 5 minutos. Configuré una base de datos SQLite local en cada dispositivo para almacenar temporalmente los registros cuando no había conexión y luego subirlos automáticamente a la nube para garantizar una pérdida de datos cero.

‍

• En AWS, configuré una infraestructura sin servidor, además de usar servicios como **Lambda**, **Step Functions**, **Kinesis Data Streams y Firehose** para procesar la información conforme llegaba. Si bien no necesitábamos análisis precisos en tiempo real, era importante calcular automáticamente el costo eléctrico de cada medición utilizando nuestro flujo de datos.

‍

• En Python y Pandas desarrollé ETLs que corren en **AWS Step Functions** para integrar fuentes de información externas que nos proporcionaban los clientes, y también construyeron una biblioteca que simplifica enormemente las consultas a **InfluxDB** usando el lenguaje de consulta Flux.

‍

Como parte del proyecto, desarrollé un script de Python para verificar fácilmente el estado de ejecución de nuestras **AWS Step Functions**. Este script te permite saber en tiempo real cómo va tu proceso, el tiempo estimado de finalización, obtener los resultados automáticamente y, lo mejor de todo: si algo falla, recibes una descripción clara y sencilla del error para que puedas solucionarlo rápidamente sin tener que consultar registros confusos.

‍

‍

Finalmente, algo que destacó fue cómo aprovechamos la infraestructura como servicio (IaaS) y la visualización con **Grafana** y Power BI con AWS Athena**, manteniendo al mismo tiempo una visibilidad completa con herramientas como **CloudWatch** y **Sentry** 🔎. 

Esta combinación nos permitió mantener una operación eficiente, económica y fácilmente escalable en el futuro, especialmente para una startup con una metodología **ÁGIL**.‍
💡 Nuestro objetivo era entregar indicadores clave **KPI’s** basados ​​en la información que recogimos de todas nuestras fuentes de **Data Lake** con un objetivo de inteligencia empresarial **BI**, para esto con una combinación de bases de datos transaccionales **OLTP** y **OLAP** Analytics que pretendíamos lograr
‍
¿Por qué AWS Kinesis en lugar de Apache Kafka?
Necesitábamos una solución sencilla, escalable y rápida para implementar desde cero. Elegí **AWS Kinesis** porque, en comparación con Apache Kafka, **no requiere servidor**, lo que significa cero administración de infraestructura adicional, menores costos iniciales y un inicio mucho más rápido.

‍

**Nota sobre arquitecturas basadas en eventos:** Estas arquitecturas se basan en la generación, detección y reacción a eventos en tiempo real, lo que permite que los sistemas respondan de forma asíncrona y flexible a cambios o acciones específicos. Esto facilita la escalabilidad y la capacidad de respuesta de las aplicaciones.

‍

**Lambda** escala automáticamente bajo demanda y sigue un modelo de pago por uso, lo que resulta en una solución más eficiente y rentable para aplicaciones con cargas de trabajo variables.

‍
Observa el diagrama de infraestructura de AWS 👇
