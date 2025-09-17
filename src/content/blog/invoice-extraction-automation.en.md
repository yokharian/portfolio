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
lang: "en"
translationKey: "invoice-extraction-automation"
---

🔗 **Integration with **[**SAT.ws**]()** using Python and FastAPI**
‍

[**SAT.ws**]() is a cloud API that connects directly to the **Mexican Tax Administration Service (SAT)**, allowing you to automate the extraction of electronic invoices (CFDIs) without the need for manual access.

‍
⚙️ **Asynchronous Process**
‍

The process is **asynchronous**: first, you make an initial request to [**SAT.ws**]() to extract the invoices. The platform processes this request in the background and does not immediately deliver the invoices. To avoid repetitive queries about the status of the process, **webhooks** can be used. By registering a webhook URL on [**SAT.ws**](), you will receive an automatic notification when the invoices are ready to be downloaded.

‍

📥 **Final Request for Invoices**

**‍**‍

Once this notification is received, your application can make a second request to finally obtain the files (XML and PDF).

‍

‍

‍

‍
🚀 **Benefits of FastAPI**
‍

**FastAPI** is especially useful in this context, as it facilitates the handling of asynchronous operations between the SAT and your application. Its **SWAGGER** integration is very helpful and simplifies the configuration of endpoints to receive notifications via webhook. This integration makes the entire process **efficient** and **easy to implement**.

‍

‍
