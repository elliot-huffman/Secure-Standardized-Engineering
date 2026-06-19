---
icon: fontawesome/solid/user-secret
---

# Confidentiality, Integrity, and Availability

## Overview

Or CIA for short. Also known as the CIA triad.

This model helps in rapid design thinking where each component of the CIA process should be applied to each level of the system being designed.

For example:

- `Information and Data`
    - Encryption at rest to ensure confidentiality
    - Signatures to ensure integrity
    - Backups to ensure availability

!!!warning "Not Threat Modeling Replacement"
    This is meant as a starting point for design thinking.
    You should always perform proper threat modeling to identify and mitigate specific threats to your system.

    Threat modeling is more exhaustive and may take longer to perform. The CIA method is meant to be a quick and easy way to get started with design thinking and can be used in conjunction with threat modeling.

### What is Confidentiality?

Confidentiality is the principle of keeping information and data private and secure from unauthorized access.
This can be achieved through various means such as encryption, access controls, and data classification (with protection).

!!!Example
    HIPAA data is stored in a database.<br>
    That database uses row level security to ensure that only the patient's assigned doctors and nurses can see their data.

### What is Integrity?

Integrity is the principle of ensuring that information and data are accurate and unaltered.
This can be achieved through various means such as checksums, digital signatures, and version control.

Network traffic can be protected with TLS to ensure that the data is not tampered with in transit.
Data at rest can be protected with encryption to ensure that it is not tampered with while stored.

!!!Example
    An ISV has made a software application.<br>
    The application is cryptographically signed to ensure that tamper with the installation does not occur.

### What is Availability?

Availability is the principle of ensuring that information and data are accessible and usable when needed.
This can be achieved through various means such as backups, redundancy, and disaster recovery plans.

Guarding against denial of service (DoS) attacks is also an important aspect of availability, as these attacks can make a system unavailable to its intended users.

!!!Example
    A law firm has files relating to a case and is legally required to retain them.<br>
    The law firm backs up the files to a secure location to ensure that they are available in the event of a ransomware attack or other disaster.

## Examples

Below are some examples on how to get started with applying the CIA triad to different components of a system.
This is not an exhaustive list, but rather a starting point for design thinking.

The `system` column is specifically from a [shared responsibility model](./1-SharedResponsibility.md) perspective, but the examples can be applied to any system regardless of type, such as `source code` or `infrastructure`.

If you need assistance in applying the CIA triad to your system(s), feel free to [reach out](https://elliot.huffman.me/contact-me/) for guidance and support.

### Confidentiality

| System                                  | Example                    |
| --------------------------------------- | -------------------------- |
| `Information and Data`                  | File level RBAC            |
| `Devices (Clients)`                     | MAC Address Randomization  |
| `Accounts and Identities`               | Per-App Unique IDs         |
| `Identity and Directory Infrastructure` | Disable Directory Browsing |
| `Application (Source) Code`             | Code Obfuscation           |
| `Networking (SDN/Internet)`             | TLS Encrypted Session      |
| `Host Operating System`                 | File Permissions           |
| `Physical Host`                         | Data encryption at rest    |
| `Physical Networking`                   | VLAN/subnet Isolation      |
| `Physical Location`                     | Street view redaction      |

### Integrity

| System                                  | Example                |
| --------------------------------------- | ---------------------- |
| `Information and Data`                  | Digital Signatures     |
| `Devices (Clients)`                     | Device Identity (cert) |
| `Accounts and Identities`               | Phish-Resistant MFA    |
| `Identity and Directory Infrastructure` | Certificate Pinning    |
| `Application (Source) Code`             | Code sign              |
| `Networking (SDN/Internet)`             | TLS Encrypted Session  |
| `Host Operating System`                 | Health Attestation     |
| `Physical Host`                         | TPM Attestation        |
| `Physical Networking`                   | 802.1X                 |
| `Physical Location`                     | Guard Patrols          |

### Availability

| System                                  | Example                      |
| --------------------------------------- | ---------------------------- |
| `Information and Data`                  | Multi-Geo Backups            |
| `Devices (Clients)`                     | Treat like cattle, not pets  |
| `Accounts and Identities`               | Break Glass Accounts         |
| `Identity and Directory Infrastructure` | Redundant domain controllers |
| `Application (Source) Code`             | Blue/Green deployments       |
| `Networking (SDN/Internet)`             | Redundant Routes (BGP)       |
| `Host Operating System`                 | Recovery Environment         |
| `Physical Host`                         | Data encryption at rest      |
| `Physical Networking`                   | Link Trunking                |
| `Physical Location`                     | Multiple data-centers        |
