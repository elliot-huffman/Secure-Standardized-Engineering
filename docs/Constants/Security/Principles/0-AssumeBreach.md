---
description: The 'Assume Breach' principle is the foundational pillar of all security architecture. It shifts the focus from perimeter defense to attack surface reduction and breach containment.
icon: fontawesome/solid/arrow-down-up-lock
title: Assume Breach
tags:
  - Shared
---

## Overview

The Principle of Assume Breach is the most critical tool in any engineer's belt.

In a traditional security model, most engineers stop at the perimeter.
They assume that if they have a strong firewall, a well-configured identity provider, and a secure network, then their system is safe.
However, this mindset is flawed because it assumes that the perimeter is impenetrable and that all internal actors are trustworthy.

The Principle of Assume Breach flips this assumption on its head.
It says that you should assume that your system has already been compromised and design your architecture accordingly.

Assume Breach is a state of constant, disciplined scrutiny.
It assumes that every part, whether it is a piece of code, an identity, or a third-party dependency, is a potential vector for an attacker or can become an attacker out of nowhere. 

!!! Abstract "Reality Check"
    The Principle of Assume Breach is not a pessimistic view of security; it is a realistic one.
    It acknowledges that no system is perfect and that attackers are constantly evolving their tactics.
    
    No security can be perfect. Given enough time, resources, and effort, an attacker will find a way in.
    The Principle of Assume Breach is about accepting this reality and designing your system to be resilient in the face of inevitable compromise.

## Internal Actors

A note on internal actors: The Principle of Assume Breach is not just about external attackers; it is also about internal actors.
Internal actors can be malicious, negligent, or simply make mistakes that lead to a compromise.

All components in your architecture should be treated as untrusted, even if they are internal.

Examples of internal actors include:

- Employees/Contractors
- Machines on the VPN
- IoT/IIoT/EIoT/OT devices
- Servers in the data center
- Libraries in your codebase
- CI/CD pipelines

## How To Derive Security Principles from Assume Breach

The Principle of Assume Breach can be used to derive other security principles that can be applied to your architecture.
Assume breach is a very time-consuming process, so by creating new security principles, you can take mental shortcuts to reduce the time it takes to design a breach-resistant architecture.
Security principles are just shortcuts to help you reduce the time to run through assume breach scenarios.

Examples:

- Clean Source
    - If the thing that controls me is compromised, then I must assume that the things I am doing will be compromised by proxy.
- Defense in Depth
    - A single layer is easy to breach, let's add more layers.
- Least Privilege
    - If a compromise happens, let's limit the blast radius of that compromise.

## Cross Disciplinary Application

The Principle of Assume Breach is not limited to a single discipline or technology stack.
It can be used in:

- Building design
- Test taking/design
- Software engineering
- Infrastructure architecture
- Organizational policy
- Legal contracting
- And more!

Assume breach is a mindset that can be applied to any system that you want to control the flow of something, such as:

- Access
- Actions
- Information
- Resources
- etc.

## Summary

Security is not a destination or a complete checklist; it is a continuous journey of refinement.

If security is the vessel navigating the uncertain waters of the digital landscape, Assume Breach is the mindset that is used to think up the multiple bulk heads in your hull.
It is the mindset of structural integrity that keeps you afloat even when the hull is breached and a compartment becomes flooded.

## See Also

- [Microsoft Docs: SPA](https://aka.ms/spa){:target="_blank"}
- [Microsoft: SDL](https://www.microsoft.com/sdl){:target="_blank"}
- [Microsoft: OSA](https://microsoft.com/osa){:target="_blank"}
