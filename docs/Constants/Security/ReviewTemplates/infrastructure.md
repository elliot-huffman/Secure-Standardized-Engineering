---
title: Infrastructure Review Template
description: A form-style infrastructure security review template for evaluating hosting, identity, network, operations, resilience, and administrative control paths.
icon: fontawesome/solid/server
tags:
  - Shared
  - Review Template
---

## Overview

This template is used to evaluate the infrastructure security posture of a product, platform, service, or environment.

The goal is not to prove that the system is perfect.<br>
The goal is to identify weak assumptions before an attacker, outage, insider mistake, vendor failure, or operational gap turns them into business impact.

This template is not supposed to definitively say that an app passes or fails a specific test.<br>
Instead, it helps the reviewer gather a set of red flags for them to make their own go/no-go decision based on their requirements.

## How to Use This Template

Use this document as an interview guide, evidence checklist, and architecture review worksheet.

The reviewer should ask the questions conversationally, not mechanically.  
Some questions are intentionally written to expose unsafe assumptions, especially around trust boundaries, clean source relationships, shared responsibility, and security through obscurity.

###  Markers

These markers on the answers indicate what the reviewer expects to see, what is acceptable, and what may require follow-up.<br>
These should not be given to the interviewee, but are for the reviewer to use as a guide when scoring the results after the interview.

| Marker | Meaning |
| ------ | ------- |
| `[Preferred]` | Strong answer or target state |
| `[Acceptable]` | Reasonable answer depending on context |
| `[Concern]` | Needs follow-up or compensating controls |
| `[Red Flag]` | High-risk answer that may require remediation |
| `[Trick Question]` | Question designed to expose unsafe assumptions |
| `[Evidence Required]` | Do not accept verbal confirmation alone |
| `[Context Dependent]` | Answer depends on architecture, risk, contract, or system type |

### Dependent Question Format

Dependent questions are visually identified with `↳` and include a `Depends on` condition.

If the parent question makes the child question irrelevant, skip the dependent question.

| Pattern | Meaning |
| ------- | ------- |
| `↳ Question text` | This is a dependent child question |
| `Depends on` | The parent condition required for the question to apply |
| `[Skip if: ...]` | Explicit skip instruction |

Example:

| Question | Expected / Options | Depends on |
| --- | --- | --- |
| Are containers used? | Yes / No | Always ask |
| ↳ Are container images scanned before deployment? | `[Preferred]` Yes / `[Concern]` No | Containers are used. `[Skip if: No containers]` |

!!! info "Reviewer Notes"
    This template intentionally does **not** include a notes column.

    Reviewers should capture notes in their own review system, ticketing platform, GRC tool, document workspace, or customer-specific evidence tracker.

    Recommended note-taking categories:

    - Observed answer
    - Evidence provided
    - Evidence missing
    - Follow-up questions
    - Risk rationale
    - Remediation owner
    - Due date
    - Exception or acceptance details

### Suggested Risk Ratings

| Rating | Meaning |
| ------ | ------- |
| Low | Control is present, mature, and evidenced |
| Medium | Control exists but has gaps, exceptions, or weak evidence |
| High | Control is missing, weak, inconsistent, or not enforced |
| Critical | Gap creates direct compromise, outage, data loss, or privilege escalation risk |
| Not Applicable | Not relevant to this environment |
| Unknown | Not enough evidence provided |

!!! warning "Evidence Required"
    For high-impact systems, do not rely on verbal confirmation alone.

    If a control matters, request evidence.

---

## Engagement Details

| Field | Response |
| ----- | -------- |
| Review date |  |
| Reviewer |  |
| Requesting organization |  |
| Requesting representative(s) |  |
| Product / service name |  |
| Product / service owner |  |
| Review reason |  |
| Review type | Initial / Renewal / Change / Incident Follow-up / Vendor Review / Other |
| Target environment | Production / Pre-production / Development / Shared / Other |
| Hosting model | SaaS / PaaS / IaaS / On-premises / Hybrid / Other |
| Cloud provider(s) | Azure / AWS / GCP / Private Cloud / Other |
| Business criticality | Low / Medium / High / Mission Critical |
| Data sensitivity | Public / Internal / Confidential / Regulated / Highly Restricted |
| Internet-facing? | Yes / No / Partially |
| Administrative access model | Direct / Bastion / PAM / JIT / Other |
| Review outcome | Approved / Approved with Conditions / Remediation Required / Rejected / Deferred |

## Architecture Evidence Intake

Before asking detailed questions, collect or request the artifacts below.

| Evidence Item | Provided? | Risk |
| ------------- | --------- | ---- |
| Current architecture diagram | | |
| Network diagram | | |
| Identity and access diagram | | |
| Administrative access flow | | |
| Data flow diagram | | |
| Logging / monitoring diagram | | |
| Backup and recovery design | | |
| Cloud subscription / account structure | | |
| Asset inventory | | |
| Critical dependency list | | |
| Incident response playbooks | | |
| Recent security assessment / penetration test | | |
| Vulnerability management report | | |
| Business continuity / disaster recovery test evidence | | |
| Provider security documentation | | |
| Exception register | | |

| Question | Expected / Options | Depends on |
| -------- | ------------------ | ---------- |
| `[Trick Question]` Which architecture diagram is the one defenders actually use during an incident? | Should identify whether documentation is operationally useful. | Always ask |
| Are diagrams reviewed after major infrastructure changes? | `[Preferred]` Yes / `[Concern]` No | Always ask |
| ↳ Are stale diagrams clearly marked or removed? | `[Preferred]` Yes / `[Concern]` No | Diagrams exist. `[Skip if: No diagrams provided]` |
| Are data flows documented for sensitive data? | `[Preferred]` Yes / `[Concern]` No | Sensitive data exists |
| `[Trick Question]` What would the architecture diagram fail to show an attacker? | Should reveal undocumented trust paths, dependencies, or admin routes. | Always ask |

---

## 1. Infrastructure Scope

### 1.1 Environment Classification

| Question | Expected / Options | Depends on |
| -------- | ------------------ | ---------- |
| What environments exist for this system? | Production / Staging / Test / Development / Sandbox / Other | Always ask |
| Are production and non-production environments isolated? | `[Preferred]` Yes / `[Red Flag]` No | Always ask |
| ↳ What type of isolation exists between environments? | Identity / Network / Data / Subscription / Tenant / Pipeline / Other | Multiple environments exist. `[Skip if: Production only]` |
| Can non-production identities, systems, or pipelines affect production? | `[Red Flag]` Yes / `[Preferred]` No | Multiple environments exist |
| `[Trick Question]` Which environment is allowed to be less secure because it is “only dev”? | `[Preferred]` None. Lower environments may have different controls, but should not become clean source risks. | Multiple environments exist |
| Are production secrets ever copied into lower environments? | `[Red Flag]` Yes / `[Preferred]` No | Multiple environments exist |
| Is production data used in lower environments? | Yes / No / Masked / Synthetic | Multiple environments exist |
| ↳ If production data is used outside production, is it tokenized, masked, minimized, or otherwise protected? | `[Preferred]` Yes / `[Red Flag]` No | Production data is used outside production. `[Skip if: No production data outside production]` |
| `[Trick Question]` If the development environment is compromised, what production systems can it reach? | Should reveal whether the team understands blast radius. | Multiple environments exist |
| Can a developer with access to test infrastructure modify anything that later becomes production infrastructure? | `[Concern]` Yes / `[Preferred]` No | Multiple environments or shared pipelines exist |
| Are sandbox environments included in inventory, logging, and access review? | `[Preferred]` Yes / `[Concern]` No | Sandbox environments exist. `[Skip if: No sandbox]` |

---

## 2. Hosting and Shared Responsibility

### 2.1 Hosting Model

| Question | Expected / Options | Depends on |
| -------- | ------------------ | ---------- |
| What hosting model is used? | SaaS / PaaS / IaaS / On-premises / Hybrid / Other | Always ask |
| Which provider owns the physical host layer? | Provider / Customer / Shared / Unknown | Always ask |
| Which provider owns the physical network layer? | Provider / Customer / Shared / Unknown | Always ask |
| Which provider owns the runtime layer? | Provider / Customer / Shared / Unknown | Always ask |
| Which provider owns patching of the operating system? | Provider / Customer / Shared / Unknown | Always ask |
| Has the shared responsibility boundary been documented? | `[Preferred]` Yes / `[Concern]` No | Cloud, SaaS, PaaS, IaaS, managed service, or vendor-hosted system |
| `[Trick Question]` What security responsibilities disappeared when this moved to the cloud? | `[Preferred]` Physical responsibilities may shift, but accountability and configuration responsibilities remain. | Cloud or managed hosting is used |
| Are customer responsibilities explicitly assigned to named teams? | `[Preferred]` Yes / `[Concern]` No | Shared or customer-owned responsibilities exist |
| ↳ Are those responsibilities reviewed after provider, architecture, or contract changes? | `[Preferred]` Yes / `[Concern]` No | Responsibility owners are assigned. `[Skip if: No responsibility ownership defined]` |
| `[Trick Question]` If the provider says they handle security, what exactly do they handle? | Should produce a specific responsibility boundary, not a vague answer. | Provider-hosted or managed service |
| Are provider security documents reviewed during onboarding and renewal? | `[Preferred]` Yes / `[Concern]` No | Provider-hosted or managed service |
| ↳ Are gaps between provider controls and customer requirements tracked? | `[Preferred]` Yes / `[Concern]` No | Provider security documents are reviewed |
| `[Trick Question]` Which controls are assumed to exist because the provider is reputable? | Exposes unsupported trust assumptions. | Provider-hosted or managed service |

### 2.2 Responsibility Matrix

| Layer | Customer | Provider | Shared | Unknown |
| ----- | -------- | -------- | ------ | ------- |
| Data classification | | | | |
| Data protection | | | | |
| Identity and access | | | | | |
| Application configuration | | | | |
| Runtime | | | | |
| Host operating system | | | | |
| Network controls | | | | |
| Physical host | | | | |
| Physical facility | | | | |
| Backup and recovery | | | | |
| Monitoring and logging | | | | |
| Incident notification | | | | |

---

## 3. Network Architecture

### 3.1 Network Trust Model

| Question | Expected / Options | Depends on |
| -------- | ------------------ | ---------- |
| Is any network segment treated as inherently trusted? | `[Red Flag]` Yes / `[Preferred]` No | Always ask |
| Are internal networks treated as hostile or untrusted by default? | `[Preferred]` Yes / `[Concern]` No | Always ask |
| `[Trick Question]` Which internal services trust traffic because it came from an internal IP range? | Exposes legacy perimeter assumptions. | Always ask |
| Is network access segmented by workload, environment, and sensitivity? | `[Preferred]` Yes / `[Concern]` No | Always ask |
| ↳ Is segmentation enforced technically rather than only documented? | `[Preferred]` Yes / `[Concern]` No | Segmentation is claimed. `[Skip if: No segmentation]` |
| Are management interfaces isolated from user traffic? | `[Preferred]` Yes / `[Red Flag]` No | Always ask |
| Are production management paths reachable from general user networks? | `[Red Flag]` Yes / `[Preferred]` No | Always ask |
| `[Trick Question]` What happens if a workstation on the corporate network is already compromised? | Should reveal Assume Breach network design. | Always ask |
| Are firewall rules reviewed regularly? | `[Preferred]` Yes / `[Concern]` No | Firewalls, NSGs, security groups, or network policies are used |
| ↳ Are temporary firewall rules automatically expired? | `[Preferred]` Yes / `[Concern]` No | Firewall changes can be temporary. `[Skip if: No temporary rules allowed]` |
| Are any inbound ports open directly to administrative services? | `[Red Flag]` Yes / `[Preferred]` No | Always ask |
| Are network flows logged centrally? | `[Preferred]` Yes / `[Concern]` No | Always ask |
| ↳ Is east-west traffic monitored? | `[Preferred]` Yes / `[Concern]` No | Multiple internal network segments exist |
| `[Trick Question]` Which network rule would everyone be afraid to remove because nobody knows why it exists? | Identifies rule lifecycle and documentation weakness. | Firewall or network policies are used |

### 3.2 VPN and Remote Access

| Question | Expected / Options | Depends on |
| -------- | ------------------ | ---------- |
| Is VPN required for end users? | Yes / No / Conditional | Remote user access exists |
| Is VPN required for administrators? | Yes / No / Conditional | Remote admin access exists |
| Does VPN access grant broad network reachability? | `[Red Flag]` Yes / `[Preferred]` No | VPN is used |
| `[Trick Question]` Is the VPN considered a security boundary? | `[Preferred]` No. VPN may be an access method, not proof of trust. | VPN is used |
| Are VPN users restricted by role, device health, and risk? | `[Preferred]` Yes / `[Concern]` No | VPN is used |
| ↳ Can unmanaged devices connect to the VPN? | `[Red Flag]` Yes / `[Preferred]` No | VPN is used. `[Skip if: No VPN]` |
| Are VPN sessions logged and monitored? | `[Preferred]` Yes / `[Concern]` No | VPN is used |
| `[Trick Question]` Once a device connects to the VPN, what can it reach by default? | Should not be “everything internal.” | VPN is used |
| What replaces VPN trust for services that do not require VPN? | Conditional access / ZTNA / App proxy / Direct internet auth / Other | VPN is not required for some services |
| `[Trick Question]` What happens if a VPN-connected laptop is already compromised? | Should reveal Assume Breach design thinking. | VPN is used |

---

## 4. Internet Exposure

### 4.1 External Attack Surface

| Question | Expected / Options | Depends on |
| -------- | ------------------ | ---------- |
| Is the service internet-facing? | Yes / No / Partially | Always ask |
| ↳ Is a complete external attack surface inventory maintained? | `[Preferred]` Yes / `[Concern]` No | Internet-facing assets exist. `[Skip if: No internet-facing assets]` |
| ↳ Are internet-facing assets reviewed continuously? | `[Preferred]` Yes / `[Concern]` No | Internet-facing assets exist. `[Skip if: No internet-facing assets]` |
| `[Trick Question]` Which public endpoint would surprise the security team if it appeared in a scan? | Tests asset inventory confidence. | Internet-facing assets exist |
| Are public DNS records reviewed for stale entries? | `[Preferred]` Yes / `[Concern]` No | Public DNS exists |
| Are public IPs mapped to owners and workloads? | `[Preferred]` Yes / `[Concern]` No | Public IPs exist |
| Are exposed management ports prohibited? | `[Preferred]` Yes / `[Red Flag]` No | Internet-facing assets exist |
| `[Trick Question]` Is hiding the URL considered a security control? | `[Preferred]` No. It may reduce casual discovery but should not be the primary control. | Internet-facing routes, URLs, or endpoints exist |
| Are default cloud services blocked from public exposure unless approved? | `[Preferred]` Yes / `[Concern]` No | Cloud services are used |
| ↳ Are public exposure approvals time-bound and reviewed? | `[Preferred]` Yes / `[Concern]` No | Public exposure approvals exist. `[Skip if: No approved public exposure]` |

### 4.2 Web-Facing Protection

| Question | Expected / Options | Depends on |
| -------- | ------------------ | ---------- |
| Is a WAF deployed for all applicable web-facing services? | `[Preferred]` Yes / `[Concern]` No | Web-facing services exist |
| ↳ Where is the WAF enforced? | Edge / Network / Host / Application / Multiple | WAF is used. `[Skip if: No WAF]` |
| `[Trick Question]` What protects the application if the WAF is bypassed or misconfigured? | Should reveal Defense in Depth. | Web-facing services exist |
| Are WAF rules actively monitored and tuned? | `[Preferred]` Yes / `[Concern]` No | WAF is used |
| ↳ Are WAF logs sent to the SIEM or central logging platform? | `[Preferred]` Yes / `[Concern]` No | WAF is used. `[Skip if: No WAF]` |
| Is DDoS protection implemented? | `[Preferred]` Yes / `[Concern]` No | Internet-facing services exist |
| Is application-layer DoS protection implemented? | `[Preferred]` Yes / `[Concern]` No | Web-facing services exist |
| Are rate limits configured for public APIs? | `[Preferred]` Yes / `[Concern]` No | Public APIs exist |
| `[Trick Question]` If an attacker knows every hostname, route, and API path, what still protects the system? | Tests whether the design survives disclosure. | Internet-facing services exist |

---

## 5. Identity and Administrative Access

### 5.1 Identity Provider Integration

| Question | Expected / Options | Depends on |
| --- | --- | --- |
| Is a central identity provider used? | `[Preferred]` Yes / `[Concern]` No | Always ask |
| ↳ Which identity provider is used? | Entra ID / Okta / Google Workspace / Other | Central IdP is used. `[Skip if: No central IdP]` |
| Are all infrastructure platforms integrated with the central IdP? | `[Preferred]` Yes / `[Red Flag]` No | Central IdP is used |
| `[Trick Question]` Which system still has its own separate admin login because integration was inconvenient? | Exposes identity exceptions. | Central IdP is used |
| Are any local accounts used? | Yes / No | Always ask |
| ↳ Are local accounts documented, justified, monitored, and reviewed? | `[Preferred]` Yes / `[Red Flag]` No | Local accounts exist. `[Skip if: No local accounts]` |
| Is SSO required for administrative access? | `[Preferred]` Yes / `[Red Flag]` No | Always ask |
| Is phishing-resistant MFA required for administrators? | `[Preferred]` Yes / `[Concern]` No | Always ask |
| Are shared administrator accounts prohibited? | `[Preferred]` Yes / `[Red Flag]` No | Always ask |
| Are service accounts assigned owners? | `[Preferred]` Yes / `[Concern]` No | Service accounts exist |
| ↳ Are service accounts reviewed regularly? | `[Preferred]` Yes / `[Concern]` No | Service accounts exist. `[Skip if: No service accounts]` |
| `[Trick Question]` Which identity has access because nobody knows what will break if it is removed? | Tests access review maturity. | Always ask |

### 5.2 Privileged Access

| Question | Expected / Options | Depends on |
| --- | --- | --- |
| Is least privilege enforced for infrastructure access? | `[Preferred]` Yes / `[Red Flag]` No | Always ask |
| Is standing privileged access minimized? | `[Preferred]` Yes / `[Concern]` No | Always ask |
| `[Trick Question]` Who can grant themselves more access without another person approving it? | Reveals privilege escalation and governance issues. | Always ask |
| Is Just-in-Time access used for privileged roles? | `[Preferred]` Yes / `[Concern]` No | Privileged roles exist |
| ↳ Are privileged role activations logged? | `[Preferred]` Yes / `[Concern]` No | JIT or privileged activation exists. `[Skip if: No JIT or activation workflow]` |
| ↳ Are privileged role activations reviewed? | `[Preferred]` Yes / `[Concern]` No | JIT or privileged activation exists. `[Skip if: No JIT or activation workflow]` |
| Are privileged sessions recorded or monitored where appropriate? | `[Preferred]` Yes / `[Context Dependent]` No | Privileged sessions exist |
| `[Trick Question]` Are break-glass accounts monitored more or less than normal admin accounts? | `[Preferred]` More. Emergency access should not mean invisible access. | Emergency access accounts exist |
| Are emergency access accounts defined? | `[Preferred]` Yes / `[Concern]` No | Always ask |
| ↳ Are emergency access accounts protected from normal policy failures? | `[Preferred]` Yes / `[Concern]` No | Emergency accounts exist. `[Skip if: No emergency accounts]` |
| ↳ Are emergency access accounts tested? | `[Preferred]` Yes / `[Concern]` No | Emergency accounts exist. `[Skip if: No emergency accounts]` |

### 5.3 Clean Source for Administration

| Question | Expected / Options | Depends on |
| --- | --- | --- |
| Are privileged actions performed from hardened administrative workstations? | `[Preferred]` Yes / `[Red Flag]` No | Privileged actions exist |
| `[Trick Question]` If an administrator's normal laptop is compromised, what infrastructure can the attacker control? | Should reveal clean source and privileged isolation gaps. | Privileged actions exist |
| Are privileged workstations separated from daily productivity use? | `[Preferred]` Yes / `[Concern]` No | Privileged workstations exist |
| Are unmanaged devices blocked from administrative access? | `[Preferred]` Yes / `[Red Flag]` No | Administrative access exists |
| Are admin workstations protected with EDR? | `[Preferred]` Yes / `[Concern]` No | Admin workstations exist |
| ↳ Are admin workstations patched more aggressively than standard endpoints? | `[Preferred]` Yes / `[Concern]` No | Admin workstations exist. `[Skip if: No dedicated admin workstations]` |
| ↳ Are admin workstations restricted from email and general web browsing? | `[Preferred]` Yes / `[Concern]` No | Admin workstations exist. `[Skip if: No dedicated admin workstations]` |
| `[Trick Question]` Does MFA still protect the environment if the admin device is compromised? | `[Preferred]` Not fully. MFA helps, but compromised control points can still create downstream risk. | Administrative access exists |
| Are bastions, jump boxes, or PAM session hosts treated as privileged systems? | `[Preferred]` Yes / `[Red Flag]` No | Bastion, jump box, PAM, or session host exists |
| `[Trick Question]` Which system controls the systems that control production? | Identifies upstream administrative dependencies. | Always ask |

---

## 6. Compute Infrastructure

### 6.1 Virtual Machines

| Question | Expected / Options | Depends on |
| --- | --- | --- |
| Are virtual machines used? | Yes / No | Always ask |
| ↳ Are VM images hardened before deployment? | `[Preferred]` Yes / `[Concern]` No | VMs are used. `[Skip if: No VMs]` |
| ↳ Are golden images or approved baselines used? | `[Preferred]` Yes / `[Concern]` No | VMs are used. `[Skip if: No VMs]` |
| `[Trick Question]` Which VM was manually built and now nobody wants to touch it? | Identifies snowflake infrastructure. | VMs are used |
| ↳ Are VMs patched automatically or through a managed process? | `[Preferred]` Yes / `[Concern]` No | VMs are used. `[Skip if: No VMs]` |
| ↳ Are host firewalls enabled? | `[Preferred]` Yes / `[Concern]` No | VMs are used. `[Skip if: No VMs]` |
| ↳ Is EDR installed on supported VMs? | `[Preferred]` Yes / `[Concern]` No | VMs are used. `[Skip if: No VMs]` |
| ↳ Is vulnerability scanning performed continuously or frequently? | `[Preferred]` Yes / `[Concern]` No | VMs are used. `[Skip if: No VMs]` |
| ↳ Are unused services removed or disabled? | `[Preferred]` Yes / `[Concern]` No | VMs are used. `[Skip if: No VMs]` |
| ↳ Are VM local administrator accounts controlled? | `[Preferred]` Yes / `[Red Flag]` No | VMs are used. `[Skip if: No VMs]` |
| `[Trick Question]` Which VM would be hardest to rebuild from scratch? | Tests cattle-vs-pets maturity. | VMs are used |
| ↳ Are SSH/RDP access paths restricted and monitored? | `[Preferred]` Yes / `[Red Flag]` No | VMs are used and SSH/RDP exists. `[Skip if: No VM remote admin protocols]` |

### 6.2 Containers

| Question | Expected / Options | Depends on |
| --- | --- | --- |
| Are containers used? | Yes / No | Always ask |
| ↳ Are container images scanned before deployment? | `[Preferred]` Yes / `[Concern]` No | Containers are used. `[Skip if: No containers]` |
| ↳ Are container images scanned after deployment? | `[Preferred]` Yes / `[Concern]` No | Containers are used. `[Skip if: No containers]` |
| `[Trick Question]` What can a compromised container identity access outside the container? | Tests blast radius. | Containers are used |
| ↳ Are base images approved and maintained? | `[Preferred]` Yes / `[Concern]` No | Containers are used. `[Skip if: No containers]` |
| ↳ Are containers prevented from running as root where possible? | `[Preferred]` Yes / `[Concern]` No | Containers are used. `[Skip if: No containers]` |
| ↳ Are privileged containers prohibited or tightly controlled? | `[Preferred]` Yes / `[Red Flag]` No | Containers are used. `[Skip if: No containers]` |
| ↳ Are container registries private or access-controlled? | `[Preferred]` Yes / `[Concern]` No | Containers are used. `[Skip if: No containers]` |
| `[Trick Question]` If a base image is compromised, how quickly can affected workloads be identified and rebuilt? | Tests clean source and inventory maturity. | Containers are used |
| ↳ Are image signing or provenance controls used? | `[Preferred]` Yes / `[Concern]` No | Containers are used. `[Skip if: No containers]` |
| ↳ Are runtime protections enabled? | `[Preferred]` Yes / `[Concern]` No | Containers are used. `[Skip if: No containers]` |
| ↳ Are orchestrator admin privileges minimized? | `[Preferred]` Yes / `[Red Flag]` No | Container orchestrator is used. `[Skip if: No orchestrator]` |

### 6.3 Serverless and Managed Compute

| Question | Expected / Options | Depends on |
| --- | --- | --- |
| Are serverless resources used? | Yes / No | Always ask |
| `[Trick Question]` Which workloads are considered secure because they are “managed”? | Exposes overreliance on provider-managed services. | Managed compute or serverless exists |
| ↳ Are serverless identities least-privileged? | `[Preferred]` Yes / `[Red Flag]` No | Serverless resources are used. `[Skip if: No serverless]` |
| ↳ Are serverless functions isolated by purpose or sensitivity? | `[Preferred]` Yes / `[Concern]` No | Serverless resources are used. `[Skip if: No serverless]` |
| ↳ Are triggers and bindings reviewed for unwanted access paths? | `[Preferred]` Yes / `[Concern]` No | Serverless resources are used. `[Skip if: No serverless]` |
| ↳ Are secrets stored outside function code and configuration files? | `[Preferred]` Yes / `[Red Flag]` No | Serverless resources are used. `[Skip if: No serverless]` |
| `[Trick Question]` Which production workloads can be reached from a build agent? | Identifies pipeline-to-production risk. | Build pipelines or managed compute exist |
| ↳ Are logs centralized? | `[Preferred]` Yes / `[Concern]` No | Serverless resources are used. `[Skip if: No serverless]` |
| ↳ Are runtime versions actively maintained? | `[Preferred]` Yes / `[Concern]` No | Serverless resources are used. `[Skip if: No serverless]` |

---

## 7. Secrets and Credential Management

### 7.1 Secret Storage

| Question | Expected / Options | Depends on |
| --- | --- | --- |
| Are secrets stored in an approved secrets manager or vault? | `[Preferred]` Yes / `[Red Flag]` No | Secrets exist |
| Are secrets stored in source code? | `[Red Flag]` Yes / `[Preferred]` No | Source code or scripts exist |
| `[Trick Question]` Which secret would be hardest to rotate quickly? | Identifies operational fragility. | Secrets exist |
| Are secrets stored in deployment scripts? | `[Red Flag]` Yes / `[Preferred]` No | Deployment scripts exist |
| Are secrets stored in CI/CD variables without access controls? | `[Red Flag]` Yes / `[Preferred]` No | CI/CD is used |
| Are secrets encrypted at rest? | `[Preferred]` Yes / `[Concern]` No | Secrets exist |
| Are secrets access-controlled by workload identity or role? | `[Preferred]` Yes / `[Concern]` No | Secrets exist |
| `[Trick Question]` Who can read production secrets without triggering an alert? | Should identify monitoring and governance gaps. | Production secrets exist |
| Are secret reads logged? | `[Preferred]` Yes / `[Concern]` No | Secrets manager or vault is used |
| ↳ Are secret changes logged? | `[Preferred]` Yes / `[Concern]` No | Secrets manager or vault is used. `[Skip if: No managed secret store]` |
| Are secret owners assigned? | `[Preferred]` Yes / `[Concern]` No | Secrets exist |

### 7.2 Rotation and Exposure

| Question | Expected / Options | Depends on |
| --- | --- | --- |
| Are secrets rotated on a defined schedule? | `[Preferred]` Yes / `[Concern]` No | Secrets exist |
| Are secrets rotated after staff changes or suspected exposure? | `[Preferred]` Yes / `[Red Flag]` No | Secrets exist |
| `[Trick Question]` If a secret appears in a log, who notices first? | Tests detection maturity. | Logs and secrets exist |
| Are long-lived secrets minimized? | `[Preferred]` Yes / `[Concern]` No | Secrets exist |
| Are managed identities or workload identities used where possible? | `[Preferred]` Yes / `[Concern]` No | Cloud or platform identity is available |
| Are shared credentials prohibited? | `[Preferred]` Yes / `[Red Flag]` No | Human or workload credentials exist |
| Are credentials exposed in logs, telemetry, or error messages? | `[Red Flag]` Yes / `[Preferred]` No | Logs, telemetry, or error messages exist |
| `[Trick Question]` Which system has access because “it was easier than configuring identity correctly”? | Exposes convenience-based privilege. | Workload-to-workload access exists |
| Are credentials exposed to support staff unnecessarily? | `[Red Flag]` Yes / `[Preferred]` No | Support access exists |

---

## 8. Infrastructure as Code and Change Control

### 8.1 Infrastructure as Code

| Question | Expected / Options | Depends on |
| --- | --- | --- |
| Is infrastructure defined as code? | `[Preferred]` Yes / `[Concern]` No | Always ask |
| ↳ Which tools are used? | Terraform / Bicep / ARM / CloudFormation / Pulumi / Other | IaC is used. `[Skip if: No IaC]` |
| ↳ Is infrastructure code stored in version control? | `[Preferred]` Yes / `[Concern]` No | IaC is used. `[Skip if: No IaC]` |
| `[Trick Question]` Who can change the pipeline that deploys production infrastructure? | Identifies clean source risk. | IaC or deployment pipelines exist |
| ↳ Is peer review required before infrastructure changes? | `[Preferred]` Yes / `[Red Flag]` No | IaC is used. `[Skip if: No IaC]` |
| ↳ Are infrastructure changes tested before production? | `[Preferred]` Yes / `[Concern]` No | IaC is used. `[Skip if: No IaC]` |
| ↳ Are policy checks performed before deployment? | `[Preferred]` Yes / `[Concern]` No | IaC is used. `[Skip if: No IaC]` |
| `[Trick Question]` Is the pipeline more trusted than the people who maintain it? | Forces review of upstream control path. | Deployment pipelines exist |
| Are manual changes detected as drift? | `[Preferred]` Yes / `[Concern]` No | IaC, cloud, or managed infrastructure exists |
| ↳ Is drift remediated or intentionally accepted? | `[Preferred]` Yes / `[Concern]` No | Drift detection exists. `[Skip if: No drift detection]` |
| Are emergency changes reviewed after the fact? | `[Preferred]` Yes / `[Concern]` No | Emergency changes are allowed |

### 8.2 Change Governance

| Question | Expected / Options | Depends on |
| --- | --- | --- |
| Are production changes tied to change records, pull requests, or approvals? | `[Preferred]` Yes / `[Concern]` No | Production changes occur |
| Can a single person approve and deploy their own high-risk infrastructure change? | `[Red Flag]` Yes / `[Preferred]` No | Production changes occur |
| `[Trick Question]` Which changes are allowed outside the pipeline because they are “small”? | Exposes change bypass culture. | Deployment pipelines exist |
| Are high-risk changes reviewed by security or architecture? | `[Preferred]` Yes / `[Concern]` No | High-risk changes occur |
| Are rollback plans required for production changes? | `[Preferred]` Yes / `[Concern]` No | Production changes occur |
| Are deployment windows defined for risky changes? | `[Preferred]` Yes / `[Context Dependent]` No | Risky changes occur |
| Are changes logged centrally? | `[Preferred]` Yes / `[Concern]` No | Production changes occur |
| `[Trick Question]` If someone manually opens a firewall rule in production, how is that detected? | Tests drift detection. | Firewalls, NSGs, or security groups exist |

---

## 9. Logging, Monitoring, and Detection

### 9.1 Log Collection

| Question | Expected / Options | Depends on |
| --- | --- | --- |
| Are logs collected centrally? | `[Preferred]` Yes / `[Red Flag]` No | Always ask |
| Are identity logs collected? | `[Preferred]` Yes / `[Concern]` No | Identity provider exists |
| Are administrative activity logs collected? | `[Preferred]` Yes / `[Red Flag]` No | Administrative access exists |
| `[Trick Question]` What alert would fire if someone granted themselves owner access? | Tests privileged activity detection. | Privileged roles exist |
| Are network flow logs collected? | `[Preferred]` Yes / `[Concern]` No | Network controls exist |
| Are WAF logs collected? | `[Preferred]` Yes / `[Concern]` No | WAF is used |
| Are EDR logs collected? | `[Preferred]` Yes / `[Concern]` No | EDR is used |
| Are cloud control-plane logs collected? | `[Preferred]` Yes / `[Red Flag]` No | Cloud is used |
| `[Trick Question]` Are logs collected because they are useful, or because the tool collects them by default? | Tests detection engineering maturity. | Central logging exists |
| Are infrastructure deployment logs collected? | `[Preferred]` Yes / `[Concern]` No | Deployment pipelines exist |
| Are backup and restore logs collected? | `[Preferred]` Yes / `[Concern]` No | Backups exist |

### 9.2 Tamper Resistance and Retention

| Question | Expected / Options | Depends on |
| --- | --- | --- |
| Are logs protected from modification by normal administrators? | `[Preferred]` Yes / `[Red Flag]` No | Logs exist |
| `[Trick Question]` Which logs can the attacker delete after gaining admin access? | Identifies logging trust boundary. | Logs exist |
| Are logs retained long enough for investigation needs? | `[Preferred]` Yes / `[Concern]` No | Logs exist |
| Are high-value logs stored immutably or with write-once protections? | `[Preferred]` Yes / `[Concern]` No | High-value logs exist |
| Are log deletion events alerted? | `[Preferred]` Yes / `[Red Flag]` No | Logs can be deleted |
| `[Trick Question]` If an administrator disables logging, who is alerted? | Tests tamper detection. | Logging controls exist |
| Are time sources synchronized across systems? | `[Preferred]` Yes / `[Concern]` No | Multiple systems generate logs |
| Are logs protected from sensitive data leakage? | `[Preferred]` Yes / `[Concern]` No | Logs may contain sensitive data |

### 9.3 Detection and Response

| Question | Expected / Options | Depends on |
| --- | --- | --- |
| Is a SIEM or equivalent used? | `[Preferred]` Yes / `[Red Flag]` No | Always ask |
| ↳ Are detections mapped to realistic attack paths? | `[Preferred]` Yes / `[Concern]` No | SIEM or detection platform exists. `[Skip if: No SIEM or detection platform]` |
| Are alerts triaged by trained staff? | `[Preferred]` Yes / `[Concern]` No | Alerts exist |
| `[Trick Question]` What incident could happen today that your current telemetry would not explain? | Encourages gap discovery. | Always ask |
| Are detection rules tested? | `[Preferred]` Yes / `[Concern]` No | Detection rules exist |
| Are false positives reviewed and tuned? | `[Preferred]` Yes / `[Concern]` No | Alerts exist |
| Are high-severity alerts routed after hours? | `[Preferred]` Yes / `[Concern]` No | High-severity alerts exist |
| Are automated response actions used? | Yes / No / Limited | Detection platform exists |
| ↳ Are automated response actions reviewed for blast radius? | `[Preferred]` Yes / `[Concern]` No | Automated response actions exist. `[Skip if: No automated response]` |

---

## 10. Vulnerability and Patch Management

### 10.1 Vulnerability Management

| Question | Expected / Options | Depends on |
| --- | --- | --- |
| Is vulnerability scanning performed across infrastructure? | `[Preferred]` Yes / `[Concern]` No | Infrastructure exists |
| Are cloud resources assessed for misconfiguration? | `[Preferred]` Yes / `[Concern]` No | Cloud resources exist |
| Are container images assessed? | `[Preferred]` Yes / `[Concern]` No | Containers exist |
| `[Trick Question]` Which vulnerability would still be exploitable because a dependency is embedded in an appliance, image, or container? | Identifies hidden vulnerable components. | Appliances, images, or containers exist |
| Are operating systems assessed? | `[Preferred]` Yes / `[Concern]` No | Operating systems are customer-managed |
| Are network devices assessed? | `[Preferred]` Yes / `[Concern]` No | Network devices are customer-managed |
| Are vulnerabilities assigned owners? | `[Preferred]` Yes / `[Concern]` No | Vulnerability findings exist |
| Are remediation SLAs defined by severity? | `[Preferred]` Yes / `[Concern]` No | Vulnerability findings exist |
| `[Trick Question]` Are vulnerability exceptions reviewed, or do they become permanent architecture? | Tests exception governance. | Exceptions exist |
| Are exceptions documented and time-bound? | `[Preferred]` Yes / `[Red Flag]` No | Exceptions exist |
| Are exploited-in-the-wild vulnerabilities escalated? | `[Preferred]` Yes / `[Red Flag]` No | Vulnerability management process exists |

### 10.2 Patch Management

| Question | Expected / Options | Depends on |
| --- | --- | --- |
| Is patching automated where safe? | `[Preferred]` Yes / `[Concern]` No | Customer-managed systems exist |
| Are critical patches expedited? | `[Preferred]` Yes / `[Concern]` No | Customer-managed systems exist |
| `[Trick Question]` Which system is too important to patch? | `[Preferred]` None. Critical systems may need careful patching, not no patching. | Customer-managed systems exist |
| Are unsupported systems prohibited? | `[Preferred]` Yes / `[Red Flag]` No | Customer-managed systems exist |
| ↳ Are legacy systems isolated when they cannot be patched? | `[Preferred]` Yes / `[Red Flag]` No | Legacy or unsupported systems exist. `[Skip if: No legacy systems]` |
| Are patch failures monitored? | `[Preferred]` Yes / `[Concern]` No | Patching process exists |
| Are reboot requirements tracked? | `[Preferred]` Yes / `[Concern]` No | Systems require reboot after patching |
| `[Trick Question]` What compensating controls exist for systems that cannot be patched? | Should produce specific isolation, monitoring, and access controls. | Unpatchable systems exist |

---

## 11. Data Protection Infrastructure

### 11.1 Data Location and Access

| Question | Expected / Options | Depends on |
| -------- | ------------------ | ---------- |
| Where is production data stored? | Database / Object storage / File share / SaaS / Other | Production data exists |
| Is data classified by sensitivity? | `[Preferred]` Yes / `[Concern]` No | Data exists |
| Is access to sensitive data least-privileged? | `[Preferred]` Yes / `[Red Flag]` No | Sensitive data exists |
| `[Trick Question]` Can administrators read customer data during troubleshooting? | Identifies support access and privacy risk. | Customer or sensitive data exists |
| Are privileged data access events logged? | `[Preferred]` Yes / `[Concern]` No | Privileged data access exists |
| Are direct database connections restricted? | `[Preferred]` Yes / `[Concern]` No | Databases exist |
| Are data exports restricted and monitored? | `[Preferred]` Yes / `[Concern]` No | Data export capability exists |
| Is data encrypted at rest? | `[Preferred]` Yes / `[Concern]` No | Data exists |
| Is data encrypted in transit? | `[Preferred]` Yes / `[Red Flag]` No | Data moves over a network |
| `[Trick Question]` If data is encrypted, who can access the keys? | Tests whether encryption actually reduces access. | Encryption is used |
| Are encryption keys managed securely? | `[Preferred]` Yes / `[Concern]` No | Encryption is used |
| ↳ Are key management responsibilities documented? | `[Preferred]` Yes / `[Concern]` No | Encryption keys exist. `[Skip if: No customer-controlled keys]` |

### 11.2 Integrity and Availability

| Question | Expected / Options | Depends on |
| -------- | ------------------ | ---------- |
| Are integrity protections used for critical data? | `[Preferred]` Yes / `[Concern]` No | Critical data exists |
| Are unauthorized data changes detectable? | `[Preferred]` Yes / `[Concern]` No | Critical data exists |
| `[Trick Question]` Who can delete both the production data and the backups? | Should identify separation-of-duties and backup protection gaps. | Production data and backups exist |
| Are backups protected from modification or deletion? | `[Preferred]` Yes / `[Red Flag]` No | Backups exist |
| Are recovery points protected from ransomware scenarios? | `[Preferred]` Yes / `[Red Flag]` No | Backups or recovery points exist |
| Are backup restores tested? | `[Preferred]` Yes / `[Concern]` No | Backups exist |
| `[Trick Question]` If ransomware encrypts production storage, what prevents it from encrypting the backups too? | Tests recovery architecture. | Backups exist |
| Are critical records retained according to policy or legal need? | `[Preferred]` Yes / `[Concern]` No | Records with retention requirements exist |

---

## 12. Backup, Recovery, and Resilience

### 12.1 Backup Design

| Question | Expected / Options | Depends on |
| -------- | ------------------ | ---------- |
| Are backups automated? | `[Preferred]` Yes / `[Red Flag]` No | Backup requirement exists |
| Are backups monitored for success and failure? | `[Preferred]` Yes / `[Concern]` No | Backups exist |
| `[Trick Question]` When was the last time someone restored the backup and proved the application worked? | Verifies restore, not just backup existence. | Backups exist |
| Are backups stored separately from production access paths? | `[Preferred]` Yes / `[Red Flag]` No | Backups exist |
| Are backups immutable or protected from deletion? | `[Preferred]` Yes / `[Red Flag]` No | Backups exist |
| Are backups encrypted? | `[Preferred]` Yes / `[Concern]` No | Backups exist |
| ↳ Are backup encryption keys protected separately? | `[Preferred]` Yes / `[Concern]` No | Encrypted backups exist. `[Skip if: No encrypted backups or provider-managed only]` |
| Are backup scopes reviewed for completeness? | `[Preferred]` Yes / `[Concern]` No | Backups exist |
| Are backup exclusions documented? | `[Preferred]` Yes / `[Concern]` No | Backup exclusions exist |
| `[Trick Question]` Are the recovery instructions stored in the same system being recovered? | Identifies circular dependency. | Recovery documentation exists |

### 12.2 Recovery Objectives

| Field | Response | Evidence |
| ----- | -------- | -------- |
| Recovery Time Objective |
| Recovery Point Objective |
| Maximum tolerable downtime |
| Minimum acceptable service level during recovery |
| Critical recovery dependencies |
| Last restore test date |
| Last full disaster recovery exercise |
| Recovery test outcome | Pass / Partial / Fail / Unknown |  |

| Question | Expected / Options | Depends on |
| -------- | ------------------ | ---------- |
| Are RTO and RPO documented for the system? | `[Preferred]` Yes / `[Concern]` No | Always ask |
| `[Trick Question]` What dependency must be working before recovery can begin? | Identifies hidden recovery blockers. | Always ask |
| Are RTO and RPO approved by business owners? | `[Preferred]` Yes / `[Concern]` No | RTO/RPO are documented |
| Are recovery objectives technically achievable? | `[Preferred]` Yes / `[Concern]` No | RTO/RPO are documented |
| `[Trick Question]` Can the identity provider outage prevent recovery? | Tests reliance on centralized identity. | Central identity provider exists |

### 12.3 High Availability and Failover

| Question | Expected / Options | Depends on |
| -------- | ------------------ | ---------- |
| Is the system deployed across availability zones or equivalent? | Yes / No / Not Applicable | High availability requirement exists |
| Is the system deployed across regions? | Yes / No / Not Applicable | Regional resiliency requirement exists |
| Is failover automated? | Yes / No / Partial | Failover design exists |
| ↳ Is failover tested? | `[Preferred]` Yes / `[Concern]` No | Failover design exists. `[Skip if: No failover design]` |
| `[Trick Question]` Can the team recover if the primary cloud account, subscription, or tenant is unavailable? | Tests blast radius of control-plane failure. | Cloud control plane exists |
| Are dependencies included in failover testing? | `[Preferred]` Yes / `[Concern]` No | Failover testing occurs |
| Are DNS, certificates, identity, and secrets included in recovery plans? | `[Preferred]` Yes / `[Concern]` No | Recovery planning exists |
| Are manual recovery steps documented? | `[Preferred]` Yes / `[Concern]` No | Manual recovery steps exist |

---

## 13. Incident Readiness

### 13.1 Playbooks

| Question | Expected / Options | Depends on |
| -------- | ------------------ | ---------- |
| Is there a security incident response plan? | `[Preferred]` Yes / `[Red Flag]` No | Always ask |
| Is there a ransomware playbook? | `[Preferred]` Yes / `[Concern]` No | Ransomware is a relevant scenario |
| Is there a data breach playbook? | `[Preferred]` Yes / `[Concern]` No | Sensitive, customer, regulated, or confidential data exists |
| `[Trick Question]` Who is allowed to declare an incident? | Should be clear and not overly centralized. | Always ask |
| Is there a DDoS playbook? | `[Preferred]` Yes / `[Concern]` No | Internet-facing services exist |
| Is there a compromised administrator playbook? | `[Preferred]` Yes / `[Concern]` No | Administrative access exists |
| Is there a cloud account compromise playbook? | `[Preferred]` Yes / `[Concern]` No | Cloud is used |
| Is there a provider outage playbook? | `[Preferred]` Yes / `[Concern]` No | Provider-hosted services exist |
| `[Trick Question]` What happens if the person who understands the system is unavailable? | Tests operational resilience and documentation. | Always ask |
| Are playbooks tested? | `[Preferred]` Yes / `[Concern]` No | Playbooks exist |
| ↳ Are playbooks updated after incidents or exercises? | `[Preferred]` Yes / `[Concern]` No | Playbooks are tested or used. `[Skip if: No playbook testing or incidents]` |

### 13.2 Response Capabilities

| Question | Expected / Options | Depends on |
| -------- | ------------------ | ---------- |
| Is there dedicated incident response ownership? | `[Preferred]` Yes / `[Concern]` No | Always ask |
| Is after-hours escalation defined? | `[Preferred]` Yes / `[Concern]` No | Production or critical services exist |
| Are legal, privacy, communications, and business owners included when needed? | `[Preferred]` Yes / `[Concern]` No | Incidents may involve customers, regulated data, or business impact |
| `[Trick Question]` If the attacker has administrator access, what evidence survives? | Tests tamper resistance. | Administrative access exists |
| Can compromised identities be rapidly disabled? | `[Preferred]` Yes / `[Concern]` No | Identity provider exists |
| Can compromised devices be isolated? | `[Preferred]` Yes / `[Concern]` No | Managed devices exist |
| Can compromised workloads be isolated? | `[Preferred]` Yes / `[Concern]` No | Workloads exist |
| Can secrets be rotated rapidly? | `[Preferred]` Yes / `[Concern]` No | Secrets exist |
| `[Trick Question]` Who can shut down production to contain an incident? | Tests decision rights. | Production services exist |
| Can network access be restricted quickly? | `[Preferred]` Yes / `[Concern]` No | Network controls exist |
| Can forensic evidence be preserved? | `[Preferred]` Yes / `[Concern]` No | Incident investigation may be required |
| `[Trick Question]` Which response action could make the incident worse? | Tests response planning maturity. | Always ask |

---

## 14. Security Through Obscurity Check

### 14.1 Hidden Assumptions

| Question | Expected / Options | Depends on |
| -------- | ------------------ | ---------- |
| Are any controls effective only because attackers are assumed not to know about them? | `[Red Flag]` Yes / `[Preferred]` No | Always ask |
| `[Trick Question]` Are we hiding a weakness or protecting a secret? | Distinguishes secrecy from security. | Always ask |
| Are resource names, URLs, ports, or paths treated as secrets? | `[Concern]` Yes / `[Preferred]` No | Resource names, URLs, ports, or paths exist |
| Is architecture documentation restricted because it would reveal weaknesses? | `[Red Flag]` Yes / `[Preferred]` No | Architecture documentation exists |
| `[Trick Question]` What security control disappears if someone explains the architecture accurately? | `[Preferred]` None. | Always ask |
| Are confusing names used as a security measure? | `[Concern]` Yes / `[Preferred]` No | Naming conventions exist |
| Are undocumented dependencies relied on for security? | `[Red Flag]` Yes / `[Preferred]` No | Dependencies exist |
| Is tribal knowledge required to understand the security model? | `[Concern]` Yes / `[Preferred]` No | Always ask |
| `[Trick Question]` Which part of the design is safer when fewer defenders understand it? | `[Preferred]` None, except true secrets such as keys, tokens, and credentials. | Always ask |
| Are defenders able to understand the architecture well enough to challenge it? | `[Preferred]` Yes / `[Red Flag]` No | Always ask |

### 14.2 Disclosure-Resistant Design

| Question | Expected / Options | Depends on |
| -------- | ------------------ | ---------- |
| If the architecture diagram leaked, would the system still be secure? | `[Preferred]` Yes / `[Red Flag]` No | Architecture diagram exists |
| If all hostnames and IPs were known, would access still be controlled? | `[Preferred]` Yes / `[Red Flag]` No | Hostnames or IPs exist |
| `[Trick Question]` If this design were reviewed by a skeptical engineer, what would they challenge first? | Encourages “see something, say something” thinking. | Always ask |
| If all admin paths were known, would they still require strong identity and device controls? | `[Preferred]` Yes / `[Red Flag]` No | Admin paths exist |
| If an attacker knew the deployment process, would they still be blocked from changing production? | `[Preferred]` Yes / `[Red Flag]` No | Deployment process exists |
| If a vendor knew the internal architecture, would that create unacceptable risk? | `[Concern]` Yes / `[Preferred]` No | Vendor access or vendor review exists |
| `[Trick Question]` If transparency makes the system feel less secure, what control was actually doing the protecting? | Should reveal whether secrecy is being mistaken for architecture. | Always ask |

---

## 15. Administrative Tooling and Support Access

### 15.1 Support Access

| Question | Expected / Options | Depends on |
| -------- | ------------------ | ---------- |
| Can support staff access production infrastructure? | Yes / No / Limited | Support function exists |
| ↳ Is support access JIT or time-bound? | `[Preferred]` Yes / `[Concern]` No | Support staff can access production. `[Skip if: No support access]` |
| ↳ Is support access approved before use? | `[Preferred]` Yes / `[Concern]` No | Support staff can access production. `[Skip if: No support access]` |
| `[Trick Question]` Which support tool can bypass normal authorization? | Identifies shadow admin paths. | Support tooling exists |
| ↳ Is support access logged? | `[Preferred]` Yes / `[Red Flag]` No | Support staff can access production. `[Skip if: No support access]` |
| ↳ Is support access reviewed? | `[Preferred]` Yes / `[Concern]` No | Support staff can access production. `[Skip if: No support access]` |
| Can support staff access customer data? | Yes / No / Limited | Support function exists |
| ↳ Is customer data access masked, minimized, or audited? | `[Preferred]` Yes / `[Red Flag]` No | Support staff can access customer data. `[Skip if: No customer data support access]` |
| `[Trick Question]` If a support engineer is phished, what customer or production systems can be reached? | Tests blast radius. | Support staff or support tooling exists |

### 15.2 Administrative Tooling

| Question | Expected / Options | Depends on |
| -------- | ------------------ | ---------- |
| Are administrative tools standardized and approved? | `[Preferred]` Yes / `[Concern]` No | Administrative tools exist |
| Are administrative tools reviewed before use? | `[Preferred]` Yes / `[Concern]` No | Administrative tools exist |
| `[Trick Question]` Are support tools more trusted than production systems? | Tests clean source assumptions. | Support or admin tools exist |
| Are scripts and automation stored in version control? | `[Preferred]` Yes / `[Concern]` No | Admin scripts or automation exist |
| ↳ Are administrative scripts peer-reviewed? | `[Preferred]` Yes / `[Concern]` No | Admin scripts or automation exist. `[Skip if: No admin scripts]` |
| Are administrative tools run from clean administrative workstations? | `[Preferred]` Yes / `[Concern]` No | Administrative tools exist |
| Are emergency tools documented and controlled? | `[Preferred]` Yes / `[Concern]` No | Emergency tools exist |
| `[Trick Question]` Which script is copied from person to person instead of being reviewed and versioned? | Identifies uncontrolled automation. | Admin scripts or informal automation exist |

---

## 16. Third-Party and SaaS Infrastructure Dependencies

### 16.1 Third-Party Infrastructure Services

| Question | Expected / Options | Depends on |
| -------- | ------------------ | ---------- |
| Are third-party infrastructure services used? | Yes / No | Always ask |
| ↳ Are third-party services inventoried? | `[Preferred]` Yes / `[Concern]` No | Third-party services are used. `[Skip if: No third-party services]` |
| `[Trick Question]` Which vendor outage would become your outage immediately? | Identifies critical external dependencies. | Third-party services are used |
| ↳ Are third-party services assigned owners? | `[Preferred]` Yes / `[Concern]` No | Third-party services are used. `[Skip if: No third-party services]` |
| ↳ Are third-party services integrated with SSO? | `[Preferred]` Yes / `[Concern]` No | Third-party services are used. `[Skip if: No third-party services]` |
| `[Trick Question]` Which vendor admin portal has weaker authentication than your own environment? | Tests weakest-link identity assumptions. | Third-party services are used |
| ↳ Are third-party admin accounts least-privileged? | `[Preferred]` Yes / `[Concern]` No | Third-party services are used. `[Skip if: No third-party services]` |
| ↳ Are third-party logs available to the organization? | `[Preferred]` Yes / `[Concern]` No | Third-party services are used. `[Skip if: No third-party services]` |
| ↳ Are third-party logs integrated into central monitoring? | `[Preferred]` Yes / `[Concern]` No | Third-party logs are available. `[Skip if: No third-party logs available]` |
| `[Trick Question]` Which provider do you trust because “everyone uses them”? | Exposes reputation-based trust. | Third-party services are used |
| ↳ Are third-party outages included in recovery planning? | `[Preferred]` Yes / `[Concern]` No | Third-party services are used. `[Skip if: No third-party services]` |
| ↳ Are provider security documents reviewed? | `[Preferred]` Yes / `[Concern]` No | Third-party services are used. `[Skip if: No third-party services]` |
| ↳ Are contractual security obligations documented? | `[Preferred]` Yes / `[Concern]` No | Third-party services are used. `[Skip if: No third-party services]` |
| `[Trick Question]` What happens if the provider cannot produce logs during an incident? | Tests investigation readiness. | Third-party services are used |

---

## 17. Policy, Guardrails, and Continuous Assurance

### 17.1 Cloud and Infrastructure Guardrails

| Question | Expected / Options | Depends on |
| -------- | ------------------ | ---------- |
| Are preventive policies used to block unsafe configurations? | `[Preferred]` Yes / `[Concern]` No | Cloud, IaC, or managed infrastructure exists |
| Are detective policies used to find drift? | `[Preferred]` Yes / `[Concern]` No | Cloud, IaC, or managed infrastructure exists |
| `[Trick Question]` What would stop someone from deploying a public database tomorrow? | Tests preventive controls. | Cloud or database services exist |
| Are public storage resources blocked by default? | `[Preferred]` Yes / `[Red Flag]` No | Cloud storage exists |
| Are insecure protocols blocked by policy? | `[Preferred]` Yes / `[Concern]` No | Networked services exist |
| Are unapproved regions blocked or controlled? | `[Preferred]` Yes / `[Concern]` No | Cloud resources exist |
| Are required tags or metadata enforced? | `[Preferred]` Yes / `[Concern]` No | Cloud resources exist |
| `[Trick Question]` Which unsafe configuration is allowed because blocking it would inconvenience a team? | Identifies governance weakness. | Preventive or detective guardrails exist |
| Are unmanaged identities or keys detected? | `[Preferred]` Yes / `[Concern]` No | Identities or keys exist |
| Are policy exemptions reviewed and expired? | `[Preferred]` Yes / `[Concern]` No | Policy exemptions exist |

### 17.2 Continuous Review

| Question | Expected / Options | Depends on |
| -------- | ------------------ | ---------- |
| Is architecture reviewed after major changes? | `[Preferred]` Yes / `[Concern]` No | Architecture changes occur |
| Are security controls reviewed periodically? | `[Preferred]` Yes / `[Concern]` No | Security controls exist |
| `[Trick Question]` Which policy exists on paper but is not technically enforced or monitored? | Tests policy-vs-reality gap. | Policies exist |
| Are access reviews performed for infrastructure roles? | `[Preferred]` Yes / `[Concern]` No | Infrastructure roles exist |
| Are stale resources reviewed and removed? | `[Preferred]` Yes / `[Concern]` No | Infrastructure resources exist |
| Are exceptions tracked centrally? | `[Preferred]` Yes / `[Concern]` No | Exceptions exist |
| `[Trick Question]` Which exception has no expiration date? | Exposes permanent exceptions. | Exceptions exist |
| Are risk acceptances time-bound? | `[Preferred]` Yes / `[Red Flag]` No | Risk acceptances exist |

---

## 18. Review Summary

### 18.1 Key Findings

| ID | Finding | Severity | Principle | Owner | Due Date | Status |
| --- | --- | --- | --- | --- | --- | --- |
| INF-001 |  | Low / Medium / High / Critical | Assume Breach / Defense in Depth / Shared Responsibility / CIA / Clean Source / Obscurity |  |  | Open |
| INF-002 |  | Low / Medium / High / Critical | Assume Breach / Defense in Depth / Shared Responsibility / CIA / Clean Source / Obscurity |  |  | Open |
| INF-003 |  | Low / Medium / High / Critical | Assume Breach / Defense in Depth / Shared Responsibility / CIA / Clean Source / Obscurity |  |  | Open |

### 18.2 Risk Acceptance

| Field | Response |
| ----- | -------- |
| Risk accepted? | Yes / No / Partial |
| Accepted by |  |
| Acceptance date |  |
| Expiration date |  |
| Business justification |  |
| Compensating controls |  |
| Conditions for re-review |  |

### 18.3 Review Decision

| Decision | Select |
| -------- | ------ |
| Approved |  |
| Approved with conditions |  |
| Remediation required |  |
| Rejected |  |
| Deferred pending evidence |  |

### 18.4 Required Follow-Up

| Action | Owner | Due Date | Evidence Required | Status |
| --- | --- | --- | --- | --- |
|  |  |  |
|  |  |  |
|  |  |  |

---

## Appendix A: Reviewer Prompts

Use these prompts when the answer sounds vague, overly confident, or based on assumption.

### Assume Breach Prompts

- What happens if this control fails?
- What can a compromised identity reach?
- What can a compromised device control?
- What can a compromised workload access?
- What is the blast radius?
- How would we know?
- How would we contain it?
- How would we recover?

### Defense in Depth Prompts

- What is the second layer?
- What detects failure of the first layer?
- What limits the damage?
- What prevents lateral movement?
- What prevents privilege escalation?
- What still works during partial failure?

### Shared Responsibility Prompts

- Who owns this control?
- Who operates it?
- Who monitors it?
- Who proves it is working?
- Who responds when it fails?
- What does the contract say?
- What evidence does the provider supply?

### CIA Prompts

#### Confidentiality

- Who can read the data?
- Who can export the data?
- Who can access the keys?
- Who can view logs containing sensitive data?

#### Integrity

- Who can change the data?
- Who can change the infrastructure?
- Who can change the pipeline?
- How are unauthorized changes detected?

#### Availability

- What can take the system down?
- What dependencies must be available?
- What is the recovery path?
- When was recovery tested?

### Clean Source Prompts

- What controls this system?
- What controls the controller?
- What device performs privileged actions?
- What pipeline deploys production?
- What identity can modify the pipeline?
- What upstream compromise becomes downstream compromise?

### Security Through Obscurity Prompts

- Is this hidden, or is it protected?
- If the attacker learns this, what security remains?
- Does documentation make the system safer or weaker?
- Are we protecting secrets or hiding weaknesses?
- Can defenders understand the system well enough to improve it?
