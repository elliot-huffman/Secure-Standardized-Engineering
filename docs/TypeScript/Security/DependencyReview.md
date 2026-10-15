---
description: List of dependencies that have had acceptable risk evaluations.
icon: fontawesome/solid/microscope
---

# Dependency Review

Below are a list of dependencies that I have security reviewed and determined whether they pose an acceptable level of risk or not.
These assessments are based on my review of the dependencies' security practices, code structure, CVEs, time to response, and other relevant factors.

## How They Are Measured

The dependencies below are measured against an overall rubric of:

!!! quote ""

    Are these dependencies secure enough for privileged security use cases?

More specifically, here is the check list that I evaluate each dependency in the following order:

1.  [Socket.dev](https://socket.dev){:target="_blank"} scoring
    - Evaluate alerts
    - Evaluate scores and their reasons
    - Allows for fail fast during dependency review.
2.  Dependency maintenance and activity
    -   Should generally have at least yearly activity
    -   If not exhibiting yearly activity, it should have source code activity in its repository.
        - E.g. [sequelize](https://www.npmjs.com/package/sequelize){:target="_blank"}, publishes infrequently but is in active development in its [repository](https://github.com/sequelize/sequelize){:target="_blank"}.
    -   Alternatively, if low activity is observed, it should then be so simple that it doesn't need frequent work/updates.
3.  CI/CD Practices
    -   [SLSA Level 3](https://slsa.dev){:target="_blank"} or higher is preferred
    -   Credential-less systems
        - OIDC preferred
    -   Human-free publishing
    -   Human approvals are fine, this is meant to ensure that the build and publish process is fully automated in GH Actions/GL Runners
    -   Unification of package management
    -   Removal of dev time artifacts from production builds
4.  Mean time to patch CVEs
5.  Code Review
    - This is put lower in the list since it is an intensive and time-consuming process and fail-fast allows for time savings by quickly eliminating high-risk dependencies before investing time in code reviews.
    - The code review is a "trust but verify" step, ensuring that even if other checks pass, the code is still scrutinized for potential security issues.
6.  Is the author open to security and/or other improvements
    - This is evaluated over time, not necessarily immediately.

!!! info "CVE Tracking"

    I don't not track number of CVEs, only the time it takes for them to be patched.
    The more popular a project is the more CVEs it will have.
    More eyes on a project will find more issues. Humans are flawed and mistakes are inevitable.

!!! question "Why Socket.dev?"

    Read my [case study](https://socket.dev/case-study/shi){:target="_blank"} on why I augment my supply chain security with Socket.

    TL;DR: Socket provides automated checks for what I do by hand, but it is done by machines that don't make mistakes at scale.
    It helps highlights issues I may have missed otherwise.

### Dependencies That Are Auto Approved

As an ex. Microsoft engineer in MSFT's SAS organization under CSEO, I got to see the security requirements and systems that Microsoft has for their external facing official products.

Microsoft follows SDL, and OSA which are enforced by 1ES and SAS internally.
To protect HVAs, MSFT uses PAWs, and HREs to isolate and secure them using assume breach principles.
These practices that I followed and studied while at MSFT and meet or exceeded my requirements for evaluating the security of dependencies.

I base my evaluation of acceptable risk off of the internal SAS standard at MSFT.
Albeit, not as closely as I am a single person with limited resources.
I still try my best! If you notice something that could be improved, please let me know.

---

## Approved List

List of dependencies I have approved for use in my projects.

These meet my requirements based on how I define acceptable risk and security standards.

| Dependency                                                                                    | Version At Time of Review | Risk Assessment/Notes                                                                                                                                                                                                                                                                                                                                                          |
| --------------------------------------------------------------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [@azure/*](https://azure.github.io/azure-sdk-for-js/){:target="_blank"}                       | All                       | MSFT HVAs depend on these packages and are invested in to be high quality because of this (Azure, Entra, M365, Defender, and more...). Additionally, these are generated programmatically by the [autorest](https://github.com/Azure/autorest){:target="_blank"} tooling. To be migrated to [TypeSpec](https://typespec.io/){:target="_blank"} once feature parity is reached. |
| [@fluentui/*](https://github.com/microsoft/fluentui){:target="_blank"}                        | All                       | MSFT HVAs depend on these packages and are invested in to be high quality because of this (Azure, Entra, M365, Defender, and more...).                                                                                                                                                                                                                                         |
| [@griffel/*](https://github.com/microsoft/griffel){:target="_blank"}                          | All                       | MSFT HVAs depend on these packages and are invested in to be high quality because of this (Azure, Entra, M365, Defender, and more...).                                                                                                                                                                                                                                         |
| [@types/*](https://github.com/DefinitelyTyped/DefinitelyTyped){:target="_blank"}              | All                       | MSFT HVAs depend on these packages and are invested in to be high quality because of this (Azure, Entra, M365, Defender, and more...).                                                                                                                                                                                                                                         |
| [@socketregistry/*](https://socket.dev/blog/introducing-socket-optimize){:target="_blank"}    | All                       | I have gone through the whole security review process on all of the dependencies manually 🙃, and no issues were found. I keep up to date with these as new overrides are made available.                                                                                                                                                                                      |
| [Electron.JS](https://www.electronjs.org/){:target="_blank"}                                  | All                       | MSFT HVAs depend on these packages and are invested in to be high quality because of this.                                                                                                                                                                                                                                                                                     |
| [signature_pad](https://www.npmjs.com/package/signature_pad){ target="_blank" }               | 5.1.4                     | Cleared full review. Simpler implementation than expected. Dev deps are included in the prod bundle, will make a ticket on this later to reduce bundle size and risk of compromise.                                                                                                                                                                                            |
| [react-router](https://www.npmjs.com/package/react-router){ target="_blank" }                 | 8.4.0                     | Cleared full review.                                                                                                                                                                                                                                                                                                                                                           |
| [@react-router/node](https://www.npmjs.com/package/@react-router/node){ target="_blank" }     | 8.4.0                     | Cleared full review.                                                                                                                                                                                                                                                                                                                                                           |
| [@react-router/serve](https://www.npmjs.com/package/@react-router/serve){ target="_blank" }   | 8.4.0                     | Cleared full review.                                                                                                                                                                                                                                                                                                                                                           |
| [@react-router/dev](https://www.npmjs.com/package/@react-router/dev){ target="_blank" }       | 8.4.0                     | Cleared full review.                                                                                                                                                                                                                                                                                                                                                           |
| [vite](https://www.npmjs.com/package/vite){ target="_blank" }                                 | All                       | MSFT HVAs depend on this package and is invested in to be high quality because of this.                                                                                                                                                                                                                                                                                        |
| [@vitejs/plugin-react](https://www.npmjs.com/package/@vitejs/plugin-react){ target="_blank" } | All                       | MSFT HVAs depend on this package and is invested in to be high quality because of this.                                                                                                                                                                                                                                                                                        |
| [vitest](https://www.npmjs.com/package/vitest){ target="_blank" }                             | All                       | MSFT HVAs depend on this package and is invested in to be high quality because of this.                                                                                                                                                                                                                                                                                        |
| [react](https://www.npmjs.com/package/react){ target="_blank" }                               | All                       | MSFT HVAs depend on this package and is invested in to be high quality because of this.                                                                                                                                                                                                                                                                                        |
| [react-dom](https://www.npmjs.com/package/react-dom){ target="_blank" }                       | All                       | MSFT HVAs depend on this package and is invested in to be high quality because of this.                                                                                                                                                                                                                                                                                        |
| [typia](https://www.npmjs.com/package/typia){ target="_blank" }                               | 12.1.1                    | Cleared full review. Newer GO based version needs reviewed since it was rewritten from scratch with help of AI.                                                                                                                                                                                                                                                                |
| [@typia/unplugin](https://www.npmjs.com/package/@typia/unplugin){ target="_blank" }           | 12.1.1                    | Cleared full review. Newer GO based version needs reviewed since it was rewritten from scratch with help of AI.                                                                                                                                                                                                                                                                |

---

## Ban List

Sometimes deps pass the sniff check, but fail upon deeper inspection.
These are a list of dependencies that are deemed too risky or problematic to be used in any projects.

| Dependency                                                     | Reason                                                                                                                                                                                                                                                              |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [NX](https://nx.dev){:target="_blank"}                         | NDA under MSFT, sorry can't share.                                                                                                                                                                                                                                  |
| [OpenSSL](https://openssl-library.org/){:target="_blank"}      | NDA under MSFT, sorry can't share. I understand that this is unavoidable in a LOT of cases. If you can, chose Windows Secure Channel Library. If not, no biggie.                                                                                                    |
| [Helmet.JS](https://helmet.js.org/){:target="_blank"}          | [Author has no desire to implement breach resistant deployment pipeline](https://github.com/helmetjs/helmet/issues/504){:target="_blank"} and is at risk for dev compromised publish operations.                                                                    |
| [jsdom](https://www.npmjs.com/package/jsdom){:target="_blank"} | [Author has no desire to implement breach resistant deployment pipeline](https://github.com/jsdom/whatwg-url/issues/338){:target="_blank"} and is at risk for dev compromised publish operations. They accidentally enabled attestations and don't care about SLSA. |
| [GitHub/jsdom/*](https://github.com/jsdom/)                    | All packages owned by this namespace in GH. See `jsdom` for details. Same Author, same issue.                                                                                                                                                                       |
