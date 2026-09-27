---
title: "Continuous deployment: a practical release workflow for small web projects"
slug: "what-is-continuous-deployment-how-modern-frontend-teams-ship-to-production-without-the-fear"
description: "How automated checks, controlled releases and a tested recovery process fit together, without treating automation as a guarantee of safety."
date: "2026-09-22"
updated: "2026-09-27"
language: "en"
author: "Mantas Počiuipa"
authorSlug: "mantas-pociuipa"
category: "Deployment"
categorySlug: "deployment"
tags: ["ci-cd", "workflow"]
published: true
---

Continuous deployment means that an eligible change can reach production automatically after the required checks pass. The important word is “required”: a passing build is useful evidence, but it does not prove that a change behaves correctly for every user.

For a small project, the goal should be a release process that is understandable and repeatable. Releasing more often is not an achievement if nobody can explain what was tested or how to recover.

## Separate integration, delivery and deployment

Continuous integration checks changes as they are combined with the shared codebase. Continuous delivery keeps a tested version ready for release, while the production release may still require a decision. Continuous deployment removes that routine manual release gate for changes that meet the configured conditions.

A Git-based hosting integration can publish automatically without running a meaningful test suite. Check the actual configuration rather than assuming that an automatic deployment includes all the checks your project needs.

## Start with a small set of useful checks

For a portfolio with a blog and a contact form, I would start with:

- Installing dependencies from the committed lockfile.
- Checking TypeScript and producing a production build.
- Confirming that the home page, a post and a missing URL behave correctly.
- Testing the contact form against a controlled test service.
- Reviewing the mobile layout when the interface changes.

Add a test when it addresses a real failure risk. A large number of checks that all repeat the same basic assertion can create confidence without providing much protection.

GitHub Actions is one way to automate builds and tests. Its workflows can run in response to repository events, and deployment environments can apply additional controls. A hosting provider’s built-in workflow or a carefully maintained server pipeline can also be appropriate.

## Review configuration as well as code

A preview is useful for opening the proposed version in a browser. It can reveal broken links, missing assets and layout problems that a code review misses.

However, preview and production may use different credentials or data. Confirm the production configuration separately. Never use a test payment or a test email as an excuse to trigger a real transaction accidentally.

Keep releases focused where practical. If a change updates content, authentication and database structure at once, understanding a failure becomes harder. Smaller changes are a useful way to reduce the number of explanations you must investigate, not a promise that failures disappear.

## Make recovery concrete

Write down how to restore a known working application version. Check which assets, configuration values and external services that version expects.

An application rollback does not automatically undo database migrations or external side effects. Prefer changes that leave the previous application compatible while the new version is being verified. Some incidents are safer to fix forward than to reverse blindly.

My recommendation is to rehearse recovery with a harmless change before relying on it during an incident. Record what happened and where the process was confusing.

## Choose the level of automation you can support

A manual approval step can be sensible for a sensitive change or an early project. It does not make the workflow a failure. Remove the gate when the checks and operational experience justify doing so.

Start by making a release repeatable. Then automate the repetitive steps, observe the result and improve the checks that missed real problems. That is a more useful foundation than pursuing a particular number of deployments per day.

## Technical references

- [Understanding GitHub Actions](https://docs.github.com/en/actions/get-started/understand-github-actions)
- [Controlling deployments with GitHub Actions](https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/control-deployments)
