---
title: "Invoice extractor"
description: "Automated critical business process significantly reducing workload of the finance team"
employer: "FairPlay"
thumbnail: "https://cdn.prod.website-files.com/67c3a771f50ee86278e081b8/67d92242c06869415245b864_67ce679edc8eb91cc34e3929_invoice-extraction.gif"
banner: "https://cdn.prod.website-files.com/67c3a771f50ee86278e081b8/67cbf293d19d256af5e0dccd_67cbd68c8ae8762187bf946d_photo-1551288049-bebda4e38f71.jpeg"
startDate: "Sat Jun 05 2021 04:33:00 GMT+0000 (Coordinated Universal Time)"
endDate: ""
lucidchartUrl: ""
tags:
  - name: "Python"
    color: "hsla(90, 50%, 50%, 0.3)"
  - name: "Webhooks"
    color: "hsla(330, 100%, 50%, 0.3)"
  - name: "FastAPI"
    color: "hsla(120, 50%, 50%, 0.3)"
  - name: "Asynchronous"
    color: "hsla(300, 100%, 40%, 0.3)"
  - name: "REST APIs"
    color: "hsla(45, 100%, 50%, 0.3)"
---

🔗 **Integración con **[**SAT.ws**]()** usando Python y FastAPI**
‍

[**SAT.ws**]() es una API en la nube que se conecta directamente con el **Servicio de Administración Tributaria (SAT)** de México, permitiéndote automatizar la extracción de facturas electrónicas (CFDIs) sin necesidad de acceso manual.

‍
⚙️ **Proceso Asincrónico**
‍

El proceso es **asincrónico**: primero, realizas una solicitud inicial a [**SAT.ws**]() para extraer las facturas. La plataforma procesa esta solicitud en segundo plano y no entrega las facturas de inmediato. Para evitar consultas repetitivas sobre el estado del proceso, se pueden utilizar **webhooks**. Al registrar una URL de webhook en [**SAT.ws**](), recibirás una notificación automática cuando las facturas estén listas para ser descargadas.

‍

📥 **Solicitud Final de Facturas**

‍

Una vez recibida esta notificación, tu aplicación puede hacer una segunda solicitud para obtener finalmente los archivos (XML y PDF).

‍

‍

‍
🚀 **Beneficios de FastAPI**
‍

**FastAPI** es especialmente útil en este contexto, ya que facilita el manejo de operaciones asincrónicas entre el SAT y tu aplicación. Su integración con **SWAGGER** es muy útil y simplifica la configuración de endpoints para recibir notificaciones a través de webhook. Esta integración hace que todo el proceso sea **eficiente** y **fácil de implementar**.

‍

‍
