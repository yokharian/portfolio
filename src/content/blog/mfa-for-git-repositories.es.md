---
title: "Seguridad MFA para repositorios GIT"
description: "Mejoré la seguridad de los repositorios al implementar doble factor para más de 50 compañeros de trabajo"
employer: "XalDigital"
thumbnail: "https://cdn.prod.website-files.com/67c3a771f50ee86278e081b8/67d9223fc72e0e95f5afa6c4_67ce16d4ec624e2b73332f3f_mfa%2520for%2520git.gif"
banner: "https://cdn.prod.website-files.com/67c3a771f50ee86278e081b8/67cbe41e022e968fe92ed459_67cbdfe83b32df846e2a44a4_photo-1732320935426-395f3c1d38be.jpeg"
startDate: "Mon Jan 08 2024 06:00:00 GMT+0000 (Coordinated Universal Time)"
endDate: "Thu Feb 09 2023 06:00:00 GMT+0000 (Coordinated Universal Time)"
lucidchartUrl: ""
tags:
  - name: "Python"
    color: "hsla(90, 50%, 50%, 0.3)"
  - name: "AWS IAM"
    color: "hsla(240, 100%, 50%, 0.3)"
  - name: "Git"
    color: "hsla(0, 100%, 50%, 0.3)"
  - name: "Cross-platform compatibility"
    color: "hsla(270, 100%, 50%, 0.3)"
lang: "es"
translationKey: "mfa-for-git-repositories"
---

Implementé, gracias a la característica **credential helper** de Git, que permite almacenar y recuperar de manera segura las credenciales de acceso a los repositorios de Git. ✨ Esto es especialmente útil cuando se trabaja con repositorios privados, ya que evita tener que ingresar manualmente las credenciales cada vez que se interactúa con el repositorio.

‍
Mi solución ayudó a más de **50 compañeros** con diferentes sistemas operativos (Mac, Windows y Linux) a acceder de manera más eficiente a sus repositorios.
‍

Con **Boto3**, la biblioteca de Python para interactuar con los servicios de AWS, la usé para conectarme a la cuenta de AWS STS y obtener un rol con acceso cross-account a la cuenta de AWS donde se encuentran los repositorios de GIT. Esto permite acceder a los repositorios sin necesidad de tener credenciales directas de esa cuenta.

‍

Por último, el sistema **genera un código QR** 📱 que puede ser escaneado con un teléfono. Este código QR contiene la información necesaria para acceder a los repositorios. Esta solución benefició a más de 50 compañeros de trabajo, independientemente de su sistema operativo.

‍
![diagrama](/assets/images/c422657f7f886b740f482e3b2988c71aab3466c2.png)‍
