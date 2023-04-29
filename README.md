# Storyblok App Starter
Storyblok's [official app starter is still based on Nuxt 2)[https://github.com/storyblok/storyblok-workflow-app].
This starter provides a Nuxt 3 alternative.
If you have any feedback, please let us know now in the Issues section or send us a PR.


Under `/application`, find the source code with server and client side logic.

Under `/infrastructure`, find the infrastructure stack definition for the hosting provider.


Note that no infrastructure definition is provided with this starter.

This starter is built on top of [Nuxt](https://nuxt.com/).

Therefore, you'll need a server capable of running Node.Js.

___

## Prerequisites

- [Node.js](https://nodejs.org/en) >= 18.0.0
- [Ngrok](https://ngrok.com/)
- [A Storyblok partner account](https://www.storyblok.com/partners)
- Basic understanding on how [Storyblok plugins](https://www.storyblok.com/docs/plugins/introduction) work.
  We suggest reading these <sup>[1](https://www.storyblok.com/docs/plugins/custom-application)</sup><sup>[2](https://www.storyblok.com/docs/authentication-apps)</sup><sup>[3](https://www.storyblok.com/tp/how-to-create-a-oauth2-authentication-flow-with-koa)</sup><sup>[4](https://www.storyblok.com/docs/plugins/tool)</sup>

## Local development

This guide assumes you're working on a Unix system. 
If you're using Windows, please adjust accordingly.

Start by installing the global dependencies at the root of the monorepo.

`npm install`

Navigate to the application directory
`cd application`

Install dependencies for the app
`npm install`

Before running the app, refer to [application/readme.md](/application/readme.md)

## Notes for Visual studio code users

If you're using Visual studio code, this starter recommends extensions to be installed.
Consider installing them, as they'll improve your development experience.
