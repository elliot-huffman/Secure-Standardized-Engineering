---
description: The shared responsibility model is a framework that outlines the division of security responsibilities between cloud service providers and their customers. It helps organizations understand their role in securing data, applications, and infrastructure in the cloud.
icon: fontawesome/solid/handshake
---

# Shared Responsibility Model

## Overview

Lets face it, not all system are hosted by you any more.
In fact this website you are accessing is hosted by a third party (GitHub), and you are trusting them to keep it secure and me to keep the information accurate.

When interacting with a system, it is important to understand what is your responsibility and what is the responsibility of the provider.
The below table provides a visual breakdown of the shared responsibility model for different types of systems.

## Trust but verify

Just because a responsibility is offloaded to a provider does not mean you should blindly trust them to do it correctly.
You should always verify that the provider is doing their part to keep their systems and by extension your data, users, and devices secure.

Check out the infrastructure review template for a list of items to verify with your provider.

## Breakdown of Responsibility

Legend:

- ❌ - Your Responsibility
- 🔄️ - Shared responsibility between you and the provider (specifics depend on the system)
- ✅ - Offloaded Responsibility to provider

| System                                  | On-Prem  | IaaS    | PaaS     | SaaS    |
| --------------------------------------- | -------- | ------- | -------- | ------- |
| `Information and Data`                  | ❌      | ❌      | ❌      | ❌      |
| `Devices (Clients)`                     | ❌      | ❌      | ❌      | ❌      |
| `Accounts and Identities`               | ❌      | ❌      | ❌      | ❌      |
| `Identity and Directory Infrastructure` | ❌      | ❌      | 🔄️      | 🔄️      |
| `Application (Source) Code`             | ❌      | ❌      | 🔄️      | ✅      |
| `Networking (SDN/Internet)`             | ❌      | ❌      | 🔄️      | ✅      |
| `Host Operating System`                 | ❌      | ❌      | ✅      | ✅      |
| `Physical Host`                         | ❌      | ✅      | ✅      | ✅      |
| `Physical Networking`                   | ❌      | ✅      | ✅      | ✅      |
| `Physical Location`                     | ❌      | ✅      | ✅      | ✅      |

### Items That Are Always Your Responsibility

No matter how you host your systems, there are some things that are always your responsibility. These include:

- `Information and Data`
    - The system provider is not going to run it for you or be able to provide your data, you have to do this.
    - The system provider is unable to determine the level of sensitivity of your data as well as you can.
- `Devices (Clients)`
    - The systems used to access various systems are generally provided by you, not the service provider. 
- `Accounts and Identities`
    - The system provider is unable to know who in your org is supposed to have access to a system. This information is traditionally managed through an SSO connection.

### What Is Shared Responsibility?

Shared responsibility is a grey area where you and the provider both have some level of responsibility.
The specifics of this shared responsibility depend on the type of system you are using.

For example:

- In a PaaS Azure App Service in code deploy mode, you are responsible for the application code, but the provider is responsible for the runtime.
- In a SaaS app like GitHub, the GitHub platform has a built in IdP, but identity can be offloaded via SSO and SCIM. Hence a shared responsibility.

### Items That Are Immediately Transferred to the Provider

As soon as you move to any type of cloud system, the physical aspects of the system are no longer your responsibility. This includes:

- `Physical Host`
    - Physical servers, storage, and other hardware that make up the infrastructure of the system.
- `Physical Networking`
    - Cables, switches, routers, etc.
- `Physical Location`
    - Includes power, cooling, and physical security of the data center.

## Recoup Damages

Depending on certain factors such as the contract/agreement you signed with the provider, geographic location, and governing laws, you may be able to recoup damages from the provider if they fail to meet their responsibilities.
This can be through breach, downtime, or other failures that result in loss of data, revenue, or other damages.
Offloading responsibility to a provider does not absolve you of your responsibilities, and you should always have a plan in place to recoup damages if the provider fails to meet their responsibilities.

This is not legal advice, and you should consult with a lawyer to determine your options if the provider fails to meet their responsibilities.

## See Also

- [Microsoft's Shared Responsibility Model](https://learn.microsoft.com/en-us/azure/security/fundamentals/shared-responsibility){:target="_blank"}
