---
title: "Migraciones ETL de Big Data"
description: "Ejecuté múltiples proyectos de migración ETL de Oracle a AWS Glue, con fuerte énfasis en la recolección detallada de requisitos y planificación integral"
employer: "XalDigital"
thumbnail: "https://cdn.prod.website-files.com/67c3a771f50ee86278e081b8/67d922414a1a67225db976dd_67ce51d93112315f92886c3f_big%2520data%2520etls.gif"
banner: "https://cdn.prod.website-files.com/67c3a771f50ee86278e081b8/67cbe41e022e968fe92ed459_67cbdfe83b32df846e2a44a4_photo-1732320935426-395f3c1d38be.jpeg"
startDate: "Fri Nov 01 2024 06:00:00 GMT+0000 (Coordinated Universal Time)"
endDate: "Fri Nov 01 2024 06:00:00 GMT+0000 (Coordinated Universal Time)"
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
  - name: "Amazon CloudWatch"
    color: "hsla(240, 100%, 40%, 0.3)"
  - name: "AWS SNS"
    color: "hsla(30, 100%, 50%, 0.3)"
lang: "es"
translationKey: "big-data-etls"
---

Durante mis dos años en **Xaldigital**, tuve la oportunidad de participar en varios proyectos desafiantes enfocados en la migración de datos y la automatización en la nube. Estos proyectos abarcaron desde la gestión de leads hasta la integración de encuestas de clientes y empleados, así como la creación de un registro maestro de clientes. Aquí tienes un resumen de estos proyectos:

- [**Gestión de Leads**]():
- Uno de los primeros proyectos en los que trabajé fue la automatización del procesamiento de leads.
- Esto implicó migrar un proyecto existente de **SAS Enterprise Guide 7.1** a una infraestructura sin servidor en **AWS**.
- El flujo de trabajo incluía:
- Descargar archivos CSV de un servidor SFTP.
- Limpieza y transformación de datos.
- Generación de tablas delta.
- Actualización de la base de datos maestra.

- Además, implementamos despliegue continuo y orquestación de procesos utilizando **AWS Step Functions**.

- [**Encuesta de Clientes**]():
- En otro proyecto, automatizamos el procesamiento de los resultados de encuestas de clientes recibidos en formato CSV de **Medallia**.
- Utilizamos **EventBridge** para activar el flujo de Step Functions, **AWS Glue** para extraer la información a **Amazon S3**, y luego lo integramos en **Redshift**.
- Al final del proceso, se envió una notificación a través de **SNS**.

- [**Encuesta de Empleados**]():
- Un proyecto similar al anterior, pero en este caso, procesamos los resultados de las encuestas de empleados.
- La arquitectura y las tecnologías utilizadas fueron muy similares, incluyendo **EventBridge**, **Step Functions**, **AWS Glue** y **Redshift**.

- [**Registro Maestro de Clientes**]():
- Uno de los proyectos más desafiantes fue la creación de un registro maestro de clientes.
- Aquí, integramos información de diferentes sistemas internos (como **Rackspace** y **Aeroméxico**) con la nube de AWS, manteniendo la continuidad de los flujos de trabajo existentes.
- Utilizamos **AWS Glue** y **Step Functions** para orquestar todo el proceso.

- [**Flujos de Datos Post-Compra**]():
- Finalmente, trabajé en un proyecto donde se subieron archivos CSV generados por **SAS** en un servidor interno a la nube de AWS para su procesamiento.
- También utilizamos **AWS Glue** y **Step Functions**, junto con **Lambda** para la integración con SAS.

Estos proyectos me permitieron desarrollar habilidades clave en automatización de flujos de datos, integración de sistemas, despliegue continuo y orquestación de procesos en la nube. Fue un desafío constante, pero increíblemente gratificante optimizar y escalar estos flujos de trabajo.

Si deseas aprender más sobre cada uno de estos proyectos, no dudes en hacer clic en los enlaces correspondientes.
