---
title: Review Template
description: The foundation that you build your systems on, implementing the principles that you learned earlier to ensure your systems are secure.
icon: fontawesome/solid/list-check
tags:
  - Shared
  - Review Template
---

## Overviews

According to the [clean source principle](../Principles/CleanSource.md), any dependencies of your system(s) need to be as secure as your system at a minimum.
Otherwise, your system's top security level degrades to match the security level of the least secure dependency. This is especially important for dependencies that are part of your supply chain, such as cloud providers, hosting providers, and other third-party services.

The review templates are guided by the various [security principles](../Principles/index.md) (including but not limited to):

- [Assume Breach](../Principles/0-AssumeBreach.md): Design as if something is already compromised.
- [Defense in Depth](../Principles/1-DefenseInDepth.md): Avoid single-control security designs.
- [Shared Responsibility](../Principles/2-SharedResponsibility.md): Know what the provider handles and what remains your responsibility.
- [CIA](../Principles/CIA.md): Evaluate confidentiality, integrity, and availability across each layer.
- [Clean Source](../Principles/CleanSource.md): Protect upstream/ systems that control downstream systems.
- [Security Through Obscurity](../Principles/securityThroughObscurity.md): Treat hidden details as supporting friction, not primary protection.
