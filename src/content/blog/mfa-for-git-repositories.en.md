---
title: "MFA security for GIT repositories"
description: "Enhanced security by implementing Multi-Factor Authentication for over 50 team members"
employer: "XalDigital"
thumbnail: "/assets/images/mfa-for-git.webp"
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
lang: "en"
translationKey: "mfa-for-git-repositories"
---

I implemented Git’s **credential helper** feature, which allows you to securely store and retrieve access credentials for Git repositories. ✨ This is especially useful when working with private repositories, as it avoids having to manually enter credentials every time you interact with the repository.

‍
My solution helped more than **50 colleagues** with different operating systems (Mac, Windows, and Linux) access their repositories more efficiently.
‍

With **Boto3**, the Python library for interacting with AWS services, I used it to connect to the AWS STS account and obtain a role with cross-account access to the AWS account where the Git repositories are located. This allows access to the repositories without needing direct credentials for that account.

‍

Finally, the system **generates a QR code** 📱 that can be scanned with a phone. This QR code contains the information needed to access the repositories. This solution benefited more than 50 coworkers, regardless of their operating system.

![diagram](/assets/images/c422657f7f886b740f482e3b2988c71aab3466c2.png)‍
