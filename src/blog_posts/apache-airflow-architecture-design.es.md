---
title: "PaaS to IaaS Redesign"
description: "Significantly reduced infrastructure expenses in AWS MWAA, optimizing long-term investments purchasing EC2 and RDS servers"
employer: "Next-e"
thumbnail: "https://cdn.prod.website-files.com/67c3a771f50ee86278e081b8/67d92dc6621095a7279c95d7_67d91797085b62e84594c222_portfolio%2520thumbnails-4.webp"
banner: "https://cdn.prod.website-files.com/67c3a771f50ee86278e081b8/67cbe1da6e6df1b12e3845c7_67cbdb1089836af946d606fd_photo-1515879218367-8466d910aaa4.jpeg"
startDate: "Tue Mar 08 2022 19:02:00 GMT+0000 (Coordinated Universal Time)"
endDate: "Fri May 09 2025 17:00:00 GMT+0000 (Coordinated Universal Time)"
lucidchartUrl: "https://lucid.app/documents/embedded/30f8bc57-131a-4503-84ae-af9a9f673a31"
tags:
  - name: "AWS ECS"
    color: "hsla(180, 50%, 40%, 0.3)"
  - name: "Docker"
    color: "hsla(210, 50%, 50%, 0.3)"
  - name: "Amazon RDS"
    color: "hsla(210, 100%, 50%, 0.3)"
  - name: "Amazon EFS"
    color: "hsla(180, 50%, 50%, 0.3)"
  - name: "CI/CD"
    color: "hsla(60, 100%, 50%, 0.3)"
  - name: "AWS Load Balancer"
    color: "hsla(180, 100%, 50%, 0.3)"
  - name: "DNS"
    color: "hsla(300, 100%, 50%, 0.3)"
---

Como parte de mi trabajo en una startup 🚀, tuve la oportunidad de diseñar e implementar la infraestructura de backend y en la nube utilizando **AWS CDK**. Uno de los componentes clave de esta solución fue la implementación de Apache Airflow, la popular herramienta de orquestación de flujos de trabajo, en la plataforma de AWS ☁️.

‍

Uno de los componentes clave de la solución fue el uso de **Amazon ECS** para alojar los diferentes componentes de Airflow, como el **SERVIDOR WEB** 🌐, el **SCHEDULER** ⏰ y los **WORKERS** 👷. Esto me permitió seleccionar los tipos de máquinas más adecuados para satisfacer las necesidades de rendimiento y capacidad de procesamiento de nuestra carga de trabajo. Además, la capacidad de escalar horizontal y verticalmente las instancias de **EC2 o FARGATE** garantizó que la infraestructura pudiera adaptarse a las variaciones en la demanda.

‍

Otro elemento importante fue la integración de **Amazon RDS**, donde configuré una base de datos **PostgreSQL** 🗄️ para almacenar los metadatos de Airflow. Pero quizás el aspecto más destacado de la solución fue el uso de **Amazon EFS (Elastic File System)** para almacenar los **DAGs (Directed Acyclic Graphs)** 📊 y otros archivos relacionados con Airflow.

‍

EFS me permitió crear un sistema de archivos compartido y escalable, lo que garantizó que los archivos estuvieran siempre accesibles para nuestro entorno de Airflow, independientemente de la cantidad de instancias EC2 que se estuvieran utilizando.

‍
La integración de EFS fue clave, ya que me permitió evitar los problemas de persistencia de datos que podrían surgir con otras soluciones de almacenamiento. Además, EFS ofrece una alta disponibilidad y durabilidad, lo que me dio la tranquilidad de saber que los datos críticos de Airflow estarían seguros y accesibles 🔒.
‍

En cuanto a la automatización, configuré **GitHub Actions** ⚙️ para automatizar el despliegue de los DAGs desde un repositorio de GitHub directamente a nuestro entorno de Airflow. Esto mejoró la eficiencia y redujo los errores manuales en el proceso de despliegue, ya que los cambios en los DAGs se actualizaban automáticamente.

‍

‍cada archivo y cada dag en el repositorio refleja el contenido exacto en todos los contenedores.

‍
Consulta el diagrama de infraestructura de AWS 👇
