---
title: "Backend CI/CD container orchestation"
description: "Using ECS that is ❝similar to kubernetes❞ automatically deployed via Jenkins I deployed a container"
employer: "Lighthouse Technologies"
thumbnail: "https://cdn.prod.website-files.com/67c3a771f50ee86278e081b8/67d922403d2d66358aadb22f_67ce3b6e78e6d8f70b924301_jenkins%2520ecs.gif"
banner: "https://cdn.prod.website-files.com/67c3a771f50ee86278e081b8/67cbf29408ea1ae1f6dc48f4_67cbd53bc957f1d484626cff_photo-1504253163759-c23fccaebb55.jpeg"
startDate: "Tue Nov 12 2024 06:00:00 GMT+0000 (Coordinated Universal Time)"
endDate: "Mon Jul 29 2024 05:00:00 GMT+0000 (Coordinated Universal Time)"
lucidchartUrl: ""
tags:
  - name: "AWS ECS"
    color: "hsla(180, 50%, 40%, 0.3)"
  - name: "AWS CodeBuild"
    color: "hsla(170, 99%, 33%, 0.3)"
  - name: "AWS S3"
    color: "hsla(77, 76%, 36%, 0.3)"
  - name: "AWS RDS"
    color: "hsla(205, 71%, 41%, 0.3)"
  - name: "AWS CDK"
    color: "hsla(60, 50%, 50%, 0.3)"
  - name: "Jenkins"
    color: "hsla(2, 64%, 52%, 0.3)"
---

🚀 **Despliegue de Contenedores en AWS con Jenkins y Bitbucket**

**Directus** es una plataforma sin cabeza que te permite gestionar y exponer datos de manera muy sencilla a través de APIs, independientemente del tipo de base de datos que tengas. Básicamente, convierte tu fuente de datos en un **backend** listo para conectarse a cualquier frontend o aplicación.

☁️ **Despliegue en Amazon ECS**

Desplegarlo en **Amazon ECS** significa que puedes ejecutar Directus dentro de contenedores, facilitando la **escalabilidad**, **automatización** y **mantenimiento** de tu aplicación con alta disponibilidad. Además, al estar en AWS, puedes aprovechar servicios como **Amazon RDS** para la base de datos y lograr un entorno seguro y robusto en la nube.

🔧 **Flujo de Trabajo del Proyecto**

En este proyecto, **Bitbucket** activa un **Jenkinsfile** que empaqueta los artefactos y los sube a **S3**. Luego, **AWS CodeBuild** toma esos archivos y claves de otro bucket de S3 para construir la imagen Docker de Directus, que se publica en **Amazon ECR** ⚙️.

Una vez lista, CodeBuild recupera la imagen de ECR nuevamente y la despliega en un **clúster de ECS**, donde la aplicación está en funcionamiento y lista para usar.

🔒 **Seguridad y Automatización**

Además, la base de datos está alojada en **Amazon RDS** dentro de una **VPC**, asegurando que todo esté seguro. Gracias a esta arquitectura, la canalización se mantiene **automatizada** y **escalable**, reduciendo el trabajo manual y permitiendo lanzamientos rápidos con cada envío de código.

Consulta el diagrama de infraestructura de AWS 👇
