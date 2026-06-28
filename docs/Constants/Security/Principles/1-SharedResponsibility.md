---
description: The shared responsibility model is a framework that outlines the division of security responsibilities between cloud service providers and their customers. It helps organizations understand their role in securing data, applications, and infrastructure in the cloud.
icon: fontawesome/solid/handshake
tags:
  - Common
---

# Shared Responsibility Model

## Overview

Let's face it, not all systems are hosted by you anymore.
In fact, this website you are accessing is hosted by a third party (GitHub), and you are trusting them to keep it secure and me to keep the information correct.

When interacting with a system, it is important to understand what your responsibility is and what is the responsibility of the provider.
The table below provides a visual breakdown of the shared responsibility model for several types of systems.

## Trust but verify

Just because a responsibility is offloaded to a provider does not mean you should blindly trust them to do it correctly.
You should always verify that the provider is doing their part to keep their systems and by extension your data, users, and devices secure.

Check out the infrastructure review template for a list of items to verify with your provider.

## Breakdown of Responsibility

Legend:

- 🏢 - Your Responsibility
- 🔄️ - Shared responsibility between you and the provider (specifics depend on the system)
- ✅ - Offloaded Responsibility to provider

| System                                  | On-Prem  | IaaS    | PaaS     | SaaS    |
| --------------------------------------- | -------- | ------- | -------- | ------- |
| `Information and Data`                  | 🏢      | 🏢      | 🏢      | 🏢      |
| `Devices (Clients)`                     | 🏢      | 🏢      | 🏢      | 🏢      |
| `Accounts and Identities`               | 🏢      | 🏢      | 🏢      | 🏢      |
| `Identity and Directory Infrastructure` | 🏢      | 🏢      | 🔄️      | 🔄️      |
| `Application (Source) Code`             | 🏢      | 🏢      | 🔄️      | ✅      |
| `Networking (SDN/Internet)`             | 🏢      | 🏢      | 🔄️      | ✅      |
| `Host Operating System`                 | 🏢      | 🏢      | ✅      | ✅      |
| `Physical Host`                         | 🏢      | ✅      | ✅      | ✅      |
| `Physical Networking`                   | 🏢      | ✅      | ✅      | ✅      |
| `Physical Location`                     | 🏢      | ✅      | ✅      | ✅      |

### Items That Are Always Your Responsibility

No matter how you host your systems, there are some things that are always your responsibility. These include:

- `Information and Data`
    - The system provider is not going to run it for you or be able to provide your data, you must do this.
    - The system provider is unable to figure out the level of sensitivity of your data as well as you can.
- `Devices (Clients)`
    - The systems used to access various systems are generally provided by you, not the service provider. 
- `Accounts and Identities`
    - The system provider is unable to know who in your org is supposed to have access to a system. This information is traditionally managed through an SSO connection.

### What Is Shared Responsibility?

Shared responsibility is a grey area where you and the provider both have some level of responsibility.
The specifics of this shared responsibility depend on the type of system you are using.

For example:

- In a PaaS Azure App Service in code deploy mode, you handle the application code, but the provider handles the runtime.
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

Depending on factors like your contract, location, and applicable laws, you may have options if a provider doesn't meet their responsibilities. These can include:

- Service credits for outages or missed SLAs.
- Contractual damages defined in your agreement.
- Legal claims in cases of breach or negligence.

These situations can arise from issues such as:

- Downtime or service disruptions.
- Data loss.
- Impact to revenue or business operations.

It's important to remember:

- Handing responsibility to a provider does not remove your accountability.
- You should always have a plan to recover losses or mitigate impact if the provider fails to deliver.

!!!warning "Disclaimer"
    This content is provided for general informational purposes only and is not legal advice. It does not create an attorney-client relationship. Laws, contracts, remedies, and rights vary by jurisdiction and by the specific agreement and facts involved. You should consult a qualified attorney before relying on this information or taking action regarding provider failures, damages, breach, downtime, data loss, or other legal claims.


## See Also

- [Microsoft's Shared Responsibility Model](https://learn.microsoft.com/en-us/azure/security/fundamentals/shared-responsibility){:target="_blank"}
