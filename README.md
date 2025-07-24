<div id="top">

<!-- HEADER STYLE: CLASSIC -->
<div align="center">

<img src="readmeai/assets/logos/purple.svg" width="30%" style="position: relative; top: 0; right: 0;" alt="Project Logo"/>

# <code>❯ JL Forum Backend API</code>

<em>A robust and scalable Node.js backend API for a modern forum application, deployed on AWS Elastic Beanstalk and utilizing AWS RDS for MySQL.</em>

<em>Built with the tools and technologies:</em>

<img src="https://img.shields.io/badge/Express-000000.svg?style=default&logo=Express&logoColor=white" alt="Express">
<img src="https://img.shields.io/badge/JSON-000000.svg?style=default&logo=JSON&logoColor=white" alt="JSON">
<img src="https://img.shields.io/badge/npm-CB3837.svg?style=default&logo=npm&logoColor=white" alt="npm">
<img src="https://img.shields.io/badge/.ENV-ECD53F.svg?style=default&logo=dotenv&logoColor=black" alt=".ENV">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=default&logo=JavaScript&logoColor=black" alt="JavaScript">
<br>
<img src="https://img.shields.io/badge/sharp-99CC00.svg?style=default&logo=sharp&logoColor=white" alt="sharp">
<img src="https://img.shields.io/badge/Nodemon-76D04B.svg?style=default&logo=Nodemon&logoColor=white" alt="Nodemon">
<img src="https://img.shields.io/badge/Passport-34E27A.svg?style=default&logo=Passport&logoColor=white" alt="Passport">
<img src="https://img.shields.io/badge/Sequelize-52B0E7.svg?style=default&logo=Sequelize&logoColor=white" alt="Sequelize">
<img src="https://img.shields.io/badge/Axios-5A29E4.svg?style=default&logo=Axios&logoColor=white" alt="Axios">
<br>
<img src="https://img.shields.io/badge/AWS%20Elastic%20Beanstalk-232F3E?style=default&logo=amazon-elastic-beanstalk&logoColor=white" alt="AWS Elastic Beanstalk">
<img src="https://img.shields.io/badge/AWS%20RDS-232F3E?style=default&logo=amazon-rds&logoColor=white" alt="AWS RDS">
<img src="https://img.shields.io/badge/MySQL-4479A1.svg?style=default&logo=mysql&logoColor=white" alt="MySQL">

</div>
<br>

---

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
  - [Project Index](#project-index)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Testing](#testing)
- [Roadmap](#roadmap)
- [License](#license)
- [Acknowledgments](#acknowledgments)

---

## Overview 🚀

This project is a **backend API for the JL Forum application**, designed to handle user management, post creation, category organization, image uploads, liking functionality, and payment processing. It's built with **Node.js**, leveraging the **Express.js** framework for robust routing, **Sequelize** as an ORM for database interactions, and **Passport.js** for flexible authentication strategies, including social logins (Kakao, Naver, Google). The API is designed to be highly scalable and maintainable, providing a solid foundation for any modern forum or social platform.

---

## Features ✨

This backend API provides a comprehensive set of features to power a dynamic forum experience:

- **User Management** 👤: Secure user registration, login, and profile management (including password hashing with `bcrypt`).
- **Authentication & Authorization** 🔑:
  - **Local Strategy**: Traditional email/password authentication using Passport.js.
  - **Social Logins**: Integration with **Google, Kakao, and Naver** for seamless social authentication.
  - **JWT (JSON Web Tokens)**: Secure token-based authentication for API access.
  - **Middleware**: Robust authentication and session management middleware to protect routes.
- **Forum Core Functionality** 💬:
  - **Category Management**: Create, read, update, and delete categories for organizing forum content.
  - **Post Management**: Create, read, update, and delete forum posts.
  - **Image Uploads** 🖼️: Handle image uploads for posts using `multer` and process them with **Sharp** for optimization (resizing, formatting).
  - **Liking System** ❤️: Users can like and unlike posts.
- **Payment Integration** 💳:
  - Integrates with **Toss Payments** for processing transactions (in process).
- **API Documentation** 📄:
  - **Swagger/OpenAPI**: Automated API documentation generation using `swagger-autogen` and served with `swagger-ui-express` for easy API exploration and testing.
- **Database Management** 🗄️:
  - **Sequelize ORM**: Manages database interactions for MySQL (or other SQL databases) with defined models and migrations for a structured schema.
- **Development Tools** 🛠️:
  - **Nodemon**: Automatically restarts the server during development for a smooth workflow.
  - **.env**: Manages environment variables for secure configuration.
  - **Axios**: Promise-based HTTP client for making API requests.

---

## Project Structure

```sh
└── /
    ├── app.js
    ├── auth
    │   ├── AuthController.js
    │   ├── SocialAuthController.js
    │   └── passportConfig.js
    ├── config
    │   ├── config.js
    │   └── config.json
    ├── controllers
    │   ├── CategoryController.js
    │   ├── ImageController.js
    │   ├── LikeController.js
    │   ├── PaymentController.js
    │   ├── PostController.js
    │   └── UserController.js
    ├── forum-backend-env.env.yml
    ├── middlewares
    │   ├── AuthMiddleware.js
    │   └── sessionMiddleware.js
    ├── migrations
    │   ├── 20250428064947-create-user.js
    │   ├── 20250428090000-create-category.js
    │   ├── 20250428094449-create-post.js
    │   ├── 20250522070405-create-post-images.js
    │   └── 20250527103428-create-likes.js
    ├── models
    │   ├── CategoryModel.js
    │   ├── LikeModel.js
    │   ├── PostImagesModel.js
    │   ├── PostModel.js
    │   ├── UserModel.js
    │   └── index.js
    ├── node_modules
    │   ├── .bin
    │   ├── .package-lock.json
    │   ├── @img
    │   ├── @isaacs
    │   ├── @mapbox
    │   ├── @one-ini
    │   ├── @pkgjs
    │   ├── @scarf
    │   ├── @types
    │   ├── abbrev
    │   ├── accepts
    │   ├── acorn
    │   ├── agent-base
    │   ├── ansi-regex
    │   ├── ansi-styles
    │   ├── anymatch
    │   ├── append-field
    │   ├── aproba
    │   ├── are-we-there-yet
    │   ├── asynckit
    │   ├── at-least-node
    │   ├── aws-ssl-profiles
    │   ├── axios
    │   ├── balanced-match
    │   ├── base64url
    │   ├── bcrypt
    │   ├── binary-extensions
    │   ├── bluebird
    │   ├── body-parser
    │   ├── brace-expansion
    │   ├── braces
    │   ├── buffer-equal-constant-time
    │   ├── buffer-from
    │   ├── busboy
    │   ├── bytes
    │   ├── call-bind-apply-helpers
    │   ├── call-bound
    │   ├── chokidar
    │   ├── chownr
    │   ├── cliui
    │   ├── color
    │   ├── color-convert
    │   ├── color-name
    │   ├── color-string
    │   ├── color-support
    │   ├── combined-stream
    │   ├── commander
    │   ├── concat-map
    │   ├── concat-stream
    │   ├── config-chain
    │   ├── console-control-strings
    │   ├── content-disposition
    │   ├── content-type
    │   ├── cookie
    │   ├── cookie-parser
    │   ├── cookie-signature
    │   ├── cors
    │   ├── cross-env
    │   ├── cross-spawn
    │   ├── debug
    │   ├── deepmerge
    │   ├── delayed-stream
    │   ├── delegates
    │   ├── denque
    │   ├── depd
    │   ├── detect-libc
    │   ├── dotenv
    │   ├── dottie
    │   ├── dunder-proto
    │   ├── eastasianwidth
    │   ├── ecdsa-sig-formatter
    │   ├── editorconfig
    │   ├── ee-first
    │   ├── emoji-regex
    │   ├── encodeurl
    │   ├── es-define-property
    │   ├── es-errors
    │   ├── es-object-atoms
    │   ├── es-set-tostringtag
    │   ├── escalade
    │   ├── escape-html
    │   ├── etag
    │   ├── express
    │   ├── express-session
    │   ├── fill-range
    │   ├── finalhandler
    │   ├── follow-redirects
    │   ├── foreground-child
    │   ├── form-data
    │   ├── forwarded
    │   ├── fresh
    │   ├── fs-extra
    │   ├── fs-minipass
    │   ├── fs.realpath
    │   ├── fsevents
    │   ├── function-bind
    │   ├── gauge
    │   ├── generate-function
    │   ├── get-caller-file
    │   ├── get-intrinsic
    │   ├── get-proto
    │   ├── glob
    │   ├── glob-parent
    │   ├── gopd
    │   ├── graceful-fs
    │   ├── has-flag
    │   ├── has-symbols
    │   ├── has-tostringtag
    │   ├── has-unicode
    │   ├── hasown
    │   ├── http-errors
    │   ├── https-proxy-agent
    │   ├── iconv-lite
    │   ├── ignore-by-default
    │   ├── inflection
    │   ├── inflight
    │   ├── inherits
    │   ├── ini
    │   ├── ipaddr.js
    │   ├── is-arrayish
    │   ├── is-binary-path
    │   ├── is-core-module
    │   ├── is-extglob
    │   ├── is-fullwidth-code-point
    │   ├── is-glob
    │   ├── is-number
    │   ├── is-promise
    │   ├── is-property
    │   ├── isexe
    │   ├── jackspeak
    │   ├── js-beautify
    │   ├── js-cookie
    │   ├── json5
    │   ├── jsonfile
    │   ├── jsonwebtoken
    │   ├── jwa
    │   ├── jws
    │   ├── lodash
    │   ├── lodash.includes
    │   ├── lodash.isboolean
    │   ├── lodash.isinteger
    │   ├── lodash.isnumber
    │   ├── lodash.isplainobject
    │   ├── lodash.isstring
    │   ├── lodash.once
    │   ├── long
    │   ├── lru-cache
    │   ├── lru.min
    │   ├── make-dir
    │   ├── math-intrinsics
    │   ├── media-typer
    │   ├── merge-descriptors
    │   ├── mime-db
    │   ├── mime-types
    │   ├── minimatch
    │   ├── minimist
    │   ├── minipass
    │   ├── minizlib
    │   ├── mkdirp
    │   ├── moment
    │   ├── moment-timezone
    │   ├── ms
    │   ├── multer
    │   ├── mysql2
    │   ├── named-placeholders
    │   ├── negotiator
    │   ├── node-addon-api
    │   ├── nodemailer
    │   ├── nodemon
    │   ├── nopt
    │   ├── normalize-path
    │   ├── npmlog
    │   ├── oauth
    │   ├── object-assign
    │   ├── object-inspect
    │   ├── on-finished
    │   ├── on-headers
    │   ├── once
    │   ├── package-json-from-dist
    │   ├── parseurl
    │   ├── passport
    │   ├── passport-google-oauth20
    │   ├── passport-kakao
    │   ├── passport-naver
    │   ├── passport-oauth
    │   ├── passport-oauth1
    │   ├── passport-oauth2
    │   ├── passport-strategy
    │   ├── path-is-absolute
    │   ├── path-key
    │   ├── path-parse
    │   ├── path-scurry
    │   ├── path-to-regexp
    │   ├── pause
    │   ├── pg-connection-string
    │   ├── picocolors
    │   ├── picomatch
    │   ├── pkginfo
    │   ├── proto-list
    │   ├── proxy-addr
    │   ├── proxy-from-env
    │   ├── pstree.remy
    │   ├── qs
    │   ├── random-bytes
    │   ├── range-parser
    │   ├── raw-body
    │   ├── readable-stream
    │   ├── readdirp
    │   ├── require-directory
    │   ├── resolve
    │   ├── retry-as-promised
    │   ├── rimraf
    │   ├── router
    │   ├── safe-buffer
    │   ├── safer-buffer
    │   ├── semver
    │   ├── send
    │   ├── seq-queue
    │   ├── sequelize
    │   ├── sequelize-cli
    │   ├── sequelize-pool
    │   ├── serve-static
    │   ├── set-blocking
    │   ├── setprototypeof
    │   ├── sharp
    │   ├── shebang-command
    │   ├── shebang-regex
    │   ├── side-channel
    │   ├── side-channel-list
    │   ├── side-channel-map
    │   ├── side-channel-weakmap
    │   ├── signal-exit
    │   ├── simple-swizzle
    │   ├── simple-update-notifier
    │   ├── sqlstring
    │   ├── statuses
    │   ├── streamsearch
    │   ├── string-width
    │   ├── string-width-cjs
    │   ├── string_decoder
    │   ├── strip-ansi
    │   ├── strip-ansi-cjs
    │   ├── supports-color
    │   ├── supports-preserve-symlinks-flag
    │   ├── swagger-autogen
    │   ├── swagger-ui-dist
    │   ├── swagger-ui-express
    │   ├── tar
    │   ├── to-regex-range
    │   ├── toidentifier
    │   ├── toposort-class
    │   ├── touch
    │   ├── tr46
    │   ├── type-is
    │   ├── typedarray
    │   ├── uid-safe
    │   ├── uid2
    │   ├── umzug
    │   ├── undefsafe
    │   ├── underscore
    │   ├── undici-types
    │   ├── universalify
    │   ├── unpipe
    │   ├── util-deprecate
    │   ├── utils-merge
    │   ├── uuid
    │   ├── validator
    │   ├── vary
    │   ├── webidl-conversions
    │   ├── whatwg-url
    │   ├── which
    │   ├── wide-align
    │   ├── wkx
    │   ├── wrap-ansi
    │   ├── wrap-ansi-cjs
    │   ├── wrappy
    │   ├── xtend
    │   ├── y18n
    │   ├── yallist
    │   ├── yargs
    │   └── yargs-parser
    ├── openssl_san.cnf
    ├── package-lock.json
    ├── package.json
    ├── routes
    │   ├── AuthRoute.js
    │   ├── CategoryRoute.js
    │   ├── ImageUploadRoute.js
    │   ├── LikeRoute.js
    │   ├── PaymentRoute.js
    │   ├── PostRoute.js
    │   └── UserRoute.js
    ├── swagger
    │   └── swagger-output.json
    ├── swagger.js
    └── utils
        ├── data
        ├── imageProcess.js
        ├── jwtUtils.js
        ├── payments
        └── seedCategories.js
```

<details open>
   <summary><b><code>/</code></b></summary>
   <details>
      <summary><b>__root__</b></summary>
      <blockquote>
         <div class='directory-path' style='padding: 8px 0; color: #666;'>
            <code><b>⦿ __root__</b></code>
         <table style='width: 100%; border-collapse: collapse;'>
         <thead>
            <tr style='background-color: #f8f9fa;'>
               <th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
               <th style='text-align: left; padding: 8px;'>Summary</th>
            </tr>
         </thead>
            <tr style='border-bottom: 1px solid #eee;'>
               <td style='padding: 8px;'><b><a href='/openssl_san.cnf'>openssl_san.cnf</a></b></td>
               <td style='padding: 8px;'>- `openssl_san.cnf` configures the generation of an SSL/TLS certificate.<br>- It specifies key parameters, distinguished name attributes (like organization and location), and importantly, Subject Alternative Names (SANs).<br>- The SANs define additional domain names associated with the certificate, enabling secure communication for multiple hostnames, such as `forum-backend-env.eba-rkkugpwy.ap-southeast-2.elasticbeanstalk.com` in this instance.<br>- This ensures proper server authentication within the **JL Forum** project's infrastructure.</td>
            </tr>
            <tr style='border-bottom: 1px solid #eee;'>
               <td style='padding: 8px;'><b><a href='/swagger.js'>swagger.js</a></b></td>
               <td style='padding: 8px;'>This file is responsible for **generating the Swagger/OpenAPI documentation** 📄. It defines the API's structure, routes, and data models, which are then used by `swagger-autogen` to produce `swagger-output.json`. This enables interactive API exploration for the **JL Forum** backend.</td>
            </tr>
            <tr style='border-bottom: 1px solid #eee;'>
               <td style='padding: 8px;'><b><a href='/forum-backend-env.env.yml'>forum-backend-env.env.yml</a></b></td>
               <td style='padding: 8px;'>This YAML file likely contains **environment variables specific to the deployment environment** ⚙️, such as AWS Elastic Beanstalk (indicated by `eba-rkkugpwy.ap-southeast-2.elasticbeanstalk.com` in `openssl_san.cnf`). It manages settings like database connection strings, API keys, and other sensitive configurations for different deployment stages of **JL Forum**.</td>
            </tr>
            <tr style='border-bottom: 1px solid #eee;'>
               <td style='padding: 8px;'><b><a href='/package-lock.json'>package-lock.json</a></b></td>
               <td style='padding: 8px;'>This file is automatically generated by `npm` and **records the exact versions of all installed dependencies and their sub-dependencies** 🔒. It ensures that everyone working on the **JL Forum** project uses the same dependency tree, preventing version-related issues and making builds reproducible.</td>
            </tr>
            <tr style='border-bottom: 1px solid #eee;'>
               <td style='padding: 8px;'><b><a href='/package.json'>package.json</a></b></td>
               <td style='padding: 8px;'>This file acts as the **manifest for the Node.js project** 📦. It contains metadata about the project (name, version, description for **JL Forum**), lists all direct project dependencies and dev dependencies, and defines various `npm` scripts for common tasks like starting the server, running tests, or generating documentation.</td>
            </tr>
            <tr style='border-bottom: 1px solid #eee;'>
               <td style='padding: 8px;'><b><a href='/app.js'>app.js</a></b></td>
               <td style='padding: 8px;'>This is the **main entry point of the Express.js application** 🚀. It initializes the Express app, configures middleware (like body parsers, session management, CORS), sets up authentication with Passport.js, connects to the database, imports and registers API routes, and starts the server for **JL Forum**.</td>
            </tr>
         </table>
      </blockquote>
   </details>
	<!-- migrations Submodule -->
	<details>
      <summary><b>migrations</b></summary>
      <blockquote>
         <div class='directory-path' style='padding: 8px 0; color: #666;'>
            <code><b>⦿ migrations</b></code>
         <table style='width: 100%; border-collapse: collapse;'>
         <thead>
            <tr style='background-color: #f8f9fa;'>
               <th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
               <th style='text-align: left; padding: 8px;'>Summary</th>
            </tr>
         </thead>
            <tr style='border-bottom: 1px solid #eee;'>
               <td style='padding: 8px;'><b><a href='/migrations/20250428064947-create-user.js'>20250428064947-create-user.js</a></b></td>
               <td style='padding: 8px;'>This migration file defines the **database schema for user accounts** 🧑‍💻. It typically includes columns for `username`, `email`, `passwordHash`, and other user-related metadata, ensuring secure and consistent user data storage for **JL Forum**.</td>
            </tr>
            <tr style='border-bottom: 1px solid #eee;'>
               <td style='padding: 8px;'><b><a href='/migrations/20250522070405-create-post-images.js'>20250522070405-create-post-images.js</a></b></td>
               <td style='padding: 8px;'>This migration file defines the **database schema for storing post-related images** 🖼️. It typically includes columns for image URL, associated post ID (foreign key), and other metadata like upload date or image size, essential for enriching **JL Forum** posts.</td>
            </tr>
            <tr style='border-bottom: 1px solid #eee;'>
               <td style='padding: 8px;'><b><a href='/migrations/20250527103428-create-likes.js'>20250527103428-create-likes.js</a></b></td>
               <td style='padding: 8px;'>This migration file creates the **database table for managing "likes"** ❤️ on posts or other entities within **JL Forum**. It usually includes foreign keys to the `User` and `Post` tables, tracking which user liked which post.</td>
            </tr>
            <tr style='border-bottom: 1px solid #eee;'>
               <td style='padding: 8px;'><b><a href='/migrations/20250428094449-create-post.js'>20250428094449-create-post.js</a></b></td>
               <td style='padding: 8px;'>This migration file sets up the **database table for forum posts** 📝. It defines columns such as `title`, `content`, `userId` (foreign key to the user who created it), `categoryId` (foreign key to the post's category), timestamps, etc., forming the core content structure of **JL Forum**.</td>
            </tr>
            <tr style='border-bottom: 1px solid #eee;'>
               <td style='padding: 8px;'><b><a href='/migrations/20250428090000-create-category.js'>20250428090000-create-category.js</a></b></td>
               <td style='padding: 8px;'>This migration file is responsible for creating the **database table for forum categories** 🏷️. It defines columns like `name` and `description` to help organize and classify posts within **JL Forum**, making content easier to navigate.</td>
            </tr>
         </table>
      </blockquote>
   </details>
	<!-- swagger Submodule -->
	<details>
      <summary><b>swagger</b></summary>
      <blockquote>
         <div class='directory-path' style='padding: 8px 0; color: #666;'>
            <code><b>⦿ swagger</b></code>
         <table style='width: 100%; border-collapse: collapse;'>
         <thead>
            <tr style='background-color: #f8f9fa;'>
               <th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
               <th style='text-align: left; padding: 8px;'>Summary</th>
            </tr>
         </thead>
            <tr style='border-bottom: 1px solid #eee;'>
               <td style='padding: 8px;'><b><a href='/swagger/swagger-output.json'>swagger-output.json</a></b></td>
               <td style='padding: 8px;'>This JSON file is the **automatically generated OpenAPI (Swagger) specification** 📋 for the JL Forum API. It's produced by `swagger-autogen` and consumed by `swagger-ui-express` to render the interactive API documentation, detailing all available endpoints, request/response schemas, and authentication methods.</td>
            </tr>
         </table>
      </blockquote>
   </details>
	<!-- config Submodule -->
	<details>
      <summary><b>config</b></summary>
      <blockquote>
         <div class='directory-path' style='padding: 8px 0; color: #666;'>
            <code><b>⦿ config</b></code>
         <table style='width: 100%; border-collapse: collapse;'>
         <thead>
            <tr style='background-color: #f8f9fa;'>
               <th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
               <th style='text-align: left; padding: 8px;'>Summary</th>
            </tr>
         </thead>
            <tr style='border-bottom: 1px solid #eee;'>
               <td style='padding: 8px;'><b><a href='/config/config.json'>config.json</a></b></td>
               <td style='padding: 8px;'>This JSON file contains **database configuration settings** ⚙️ for different environments (development, test, production) used by Sequelize. It defines connection details like database name, username, password, host, and dialect, ensuring the JL Forum API can connect to the correct database instance.</td>
            </tr>
            <tr style='border-bottom: 1px solid #eee;'>
               <td style='padding: 8px;'><b><a href='/config/config.js'>config.js</a></b></td>
               <td style='padding: 8px;'>This file often serves as a **centralized configuration module** 📚 for the JL Forum application. It might load environment variables, define application-wide constants, or configure third-party services, providing a single source of truth for various settings across the project.</td>
            </tr>
         </table>
      </blockquote>
   </details>
	<!-- auth Submodule -->
	<details>
      <summary><b>auth</b></summary>
      <blockquote>
         <div class='directory-path' style='padding: 8px 0; color: #666;'>
            <code><b>⦿ auth</b></code>
         <table style='width: 100%; border-collapse: collapse;'>
         <thead>
            <tr style='background-color: #f8f9fa;'>
               <th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
               <th style='text-align: left; padding: 8px;'>Summary</th>
            </tr>
         </thead>
            <tr style='border-bottom: 1px solid #eee;'>
               <td style='padding: 8px;'><b><a href='/auth/passportConfig.js'>passportConfig.js</a></b></td>
               <td style='padding: 8px;'>This file **configures Passport.js strategies** 🔑 for the JL Forum API, including local (username/password), Google, Kakao, and Naver authentication. It defines how users are serialized and deserialized for session management and sets up the callbacks for each social login provider.</td>
            </tr>
            <tr style='border-bottom: 1px solid #eee;'>
               <td style='padding: 8px;'><b><a href='/auth/AuthController.js'>AuthController.js</a></b></td>
               <td style='padding: 8px;'>This controller handles **traditional user authentication flows** 🧑‍💻 for JL Forum, such as registration, login, and logout using local strategies. It interacts with the `UserModel` to verify credentials, create new users, and manage sessions/JWT tokens upon successful authentication.</td>
            </tr>
            <tr style='border-bottom: 1px solid #eee;'>
               <td style='padding: 8px;'><b><a href='/auth/SocialAuthController.js'>SocialAuthController.js</a></b></td>
               <td style='padding: 8px;'>This controller manages **social login callbacks** 🌐 for providers like Google, Kakao, and Naver. It processes the authentication responses from these services, creates or retrieves user profiles in the database, and handles session management or token generation for users logging into JL Forum via social accounts.</td>
            </tr>
         </table>
      </blockquote>
   </details>
	<!-- middlewares Submodule -->
	<details>
      <summary><b>middlewares</b></summary>
      <blockquote>
         <div class='directory-path' style='padding: 8px 0; color: #666;'>
            <code><b>⦿ middlewares</b></code>
         <table style='width: 100%; border-collapse: collapse;'>
         <thead>
            <tr style='background-color: #f8f9fa;'>
               <th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
               <th style='text-align: left; padding: 8px;'>Summary</th>
            </tr>
         </thead>
            <tr style='border-bottom: 1px solid #eee;'>
               <td style='padding: 8px;'><b><a href='/middlewares/AuthMiddleware.js'>AuthMiddleware.js</a></b></td>
               <td style='padding: 8px;'>This middleware provides **authentication and authorization checks** 🛡️ for routes within the JL Forum API. It verifies user sessions or JWT tokens to ensure that only authenticated and authorized users can access protected resources, enhancing API security.</td>
            </tr>
            <tr style='border-bottom: 1px solid #eee;'>
               <td style='padding: 8px;'><b><a href='/middlewares/sessionMiddleware.js'>sessionMiddleware.js</a></b></td>
               <td style='padding: 8px;'>This middleware configures and manages **user sessions** 🍪 for the JL Forum API, typically using `express-session`. It handles session storage, cookies, and ensures session data is available across requests, which is crucial for Passport.js-based authentication.</td>
            </tr>
         </table>
      </blockquote>
   </details>
	<!-- utils Submodule -->
	<details>
      <summary><b>utils</b></summary>
      <blockquote>
         <div class='directory-path' style='padding: 8px 0; color: #666;'>
            <code><b>⦿ utils</b></code>
         <table style='width: 100%; border-collapse: collapse;'>
         <thead>
            <tr style='background-color: #f8f9fa;'>
               <th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
               <th style='text-align: left; padding: 8px;'>Summary</th>
            </tr>
         </thead>
            <tr style='border-bottom: 1px solid #eee;'>
               <td style='padding: 8px;'><b><a href='/utils/imageProcess.js'>imageProcess.js</a></b></td>
               <td style='padding: 8px;'>This utility file contains functions for **processing images** 🖼️, typically using libraries like `sharp`. It handles tasks such as resizing, cropping, and optimizing uploaded images for posts within JL Forum, ensuring efficient storage and fast loading times.</td>
            </tr>
            <tr style='border-bottom: 1px solid #eee;'>
               <td style='padding: 8px;'><b><a href='/utils/seedCategories.js'>seedCategories.js</a></b></td>
               <td style='padding: 8px;'>This script is used to **populate the database with initial category data** 🌱. It defines a set of default categories for the JL Forum, allowing for a pre-configured structure for posts upon initial application setup or database reset.</td>
            </tr>
            <tr style='border-bottom: 1px solid #eee;'>
               <td style='padding: 8px;'><b><a href='/utils/jwtUtils.js'>jwtUtils.js</a></b></td>
               <td style='padding: 8px;'>This utility file provides helper functions for **JSON Web Token (JWT) management** 🔐. It includes functionalities for generating, verifying, and decoding JWTs, which are essential for secure, stateless authentication and authorization in the JL Forum API.</td>
            </tr>
         </table>
			<!-- payments Submodule -->
			 <details>
            <summary><b>payments</b></summary>
            <blockquote>
               <div class='directory-path' style='padding: 8px 0; color: #666;'>
                  <code><b>⦿ utils.payments</b></code>
               <table style='width: 100%; border-collapse: collapse;'>
               <thead>
                  <tr style='background-color: #f8f9fa;'>
                     <th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
                     <th style='text-align: left; padding: 8px;'>Summary</th>
                  </tr>
               </thead>
                  <tr style='border-bottom: 1px solid #eee;'>
                     <td style='padding: 8px;'><b><a href='/utils/payments/tosspayments.js'>tosspayments.js</a></b></td>
                     <td style='padding: 8px;'>This file is intended to handle **integration with Toss Payments** 💳 for the JL Forum application. It contains the logic for initiating and processing payment transactions, though this feature is currently **under development** 🚧 and not yet fully implemented.</td>
                  </tr>
               </table>
            </blockquote>
         </details>
      </blockquote>
   </details>
	<!-- models Submodule -->
	<details>
      <summary><b>models</b></summary>
      <blockquote>
         <div class='directory-path' style='padding: 8px 0; color: #666;'>
            <code><b>⦿ models</b></code>
         <table style='width: 100%; border-collapse: collapse;'>
         <thead>
            <tr style='background-color: #f8f9fa;'>
               <th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
               <th style='text-align: left; padding: 8px;'>Summary</th>
            </tr>
         </thead>
            <tr style='border-bottom: 1px solid #eee;'>
               <td style='padding: 8px;'><b><a href='/models/LikeModel.js'>LikeModel.js</a></b></td>
               <td style='padding: 8px;'>This file defines the **Sequelize model for likes** ❤️ within the JL Forum. It outlines the schema for tracking user likes on posts, including associations with `User` and `Post` models.</td>
            </tr>
            <tr style='border-bottom: 1px solid #eee;'>
               <td style='padding: 8px;'><b><a href='/models/PostImagesModel.js'>PostImagesModel.js</a></b></td>
               <td style='padding: 8px;'>This file defines the **Sequelize model for images associated with posts** 🖼️ in JL Forum. It specifies the database schema for storing image URLs and their relationship to specific `Post` entries.</td>
            </tr>
            <tr style='border-bottom: 1px solid #eee;'>
               <td style='padding: 8px;'><b><a href='/models/UserModel.js'>UserModel.js</a></b></td>
               <td style='padding: 8px;'>This file defines the **Sequelize model for user accounts** 🧑‍💻 in JL Forum. It includes the database schema for user attributes like `username`, `email`, `passwordHash`, and establishes associations with other models (e.g., `Post`, `Like`).</td>
            </tr>
            <tr style='border-bottom: 1px solid #eee;'>
               <td style='padding: 8px;'><b><a href='/models/index.js'>index.js</a></b></td>
               <td style='padding: 8px;'>This is the **main entry point for Sequelize models** 🧩. It imports all individual model definitions, initializes them with the database connection, and establishes all necessary associations (e.g., one-to-many, many-to-many) between the models in JL Forum.</td>
            </tr>
            <tr style='border-bottom: 1px solid #eee;'>
               <td style='padding: 8px;'><b><a href='/models/CategoryModel.js'>CategoryModel.js</a></b></td>
               <td style='padding: 8px;'>This file defines the **Sequelize model for forum categories** 🏷️ in JL Forum. It outlines the database schema for categories, typically including `name` and `description`, and defines its association with `Post` models.</td>
            </tr>
            <tr style='border-bottom: 1px solid #eee;'>
               <td style='padding: 8px;'><b><a href='/models/PostModel.js'>PostModel.js</a></b></td>
               <td style='padding: 8px;'>This file defines the **Sequelize model for forum posts** 📝 in JL Forum. It specifies the database schema for post content, including `title`, `body`, `userId`, and `categoryId`, and sets up associations with `User`, `Category`, `Like`, and `PostImages` models.</td>
            </tr>
         </table>
      </blockquote>
   </details>
	<!-- controllers Submodule -->
	<details>
      <summary><b>controllers</b></summary>
      <blockquote>
         <div class='directory-path' style='padding: 8px 0; color: #666;'>
            <code><b>⦿ controllers</b></code>
         <table style='width: 100%; border-collapse: collapse;'>
         <thead>
            <tr style='background-color: #f8f9fa;'>
               <th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
               <th style='text-align: left; padding: 8px;'>Summary</th>
            </tr>
         </thead>
            <tr style='border-bottom: 1px solid #eee;'>
               <td style='padding: 8px;'><b><a href='/controllers/PaymentController.js'>PaymentController.js</a></b></td>
               <td style='padding: 8px;'>This controller is designed to manage **payment-related logic** 💳 for the JL Forum application. It will handle requests for processing transactions with integrated payment gateways like Toss Payments, but please note this feature is **currently under development** 🚧.</td>
            </tr>
            <tr style='border-bottom: 1px solid #eee;'>
               <td style='padding: 8px;'><b><a href='/controllers/ImageController.js'>ImageController.js</a></b></td>
               <td style='padding: 8px;'>This controller handles the **upload, storage, and retrieval of images** 🖼️ for posts and other content within JL Forum. It typically interacts with `multer` for file handling and `sharp` for image processing.</td>
            </tr>
            <tr style='border-bottom: 1px solid #eee;'>
               <td style='padding: 8px;'><b><a href='/controllers/CategoryController.js'>CategoryController.js</a></b></td>
               <td style='padding: 8px;'>This controller manages **CRUD (Create, Read, Update, Delete) operations for forum categories** 🏷️ in JL Forum. It defines the logic for adding, fetching, modifying, and removing categories, organizing the forum's content.</td>
            </tr>
            <tr style='border-bottom: 1px solid #eee;'>
               <td style='padding: 8px;'><b><a href='/controllers/PostController.js'>PostController.js</a></b></td>
               <td style='padding: 8px;'>This controller handles **CRUD operations for forum posts** 📝 in JL Forum. It defines the business logic for creating new posts, retrieving existing ones, updating post content, and deleting posts.</td>
            </tr>
            <tr style='border-bottom: 1px solid #eee;'>
               <td style='padding: 8px;'><b><a href='/controllers/UserController.js'>UserController.js</a></b></td>
               <td style='padding: 8px;'>This controller manages **user-related functionalities** 🧑‍💻, specifically focusing on user profile management (e.g., fetching user details, updating profiles) for JL Forum. Authentication-specific logic resides in `AuthController.js`.</td>
            </tr>
            <tr style='border-bottom: 1px solid #eee;'>
               <td style='padding: 8px;'><b><a href='/controllers/LikeController.js'>LikeController.js</a></b></td>
               <td style='padding: 8px;'>This controller manages the **liking and unliking functionality** ❤️ for posts within JL Forum. It handles requests to record and remove likes, interacting with the `LikeModel` to update the database.</td>
            </tr>
         </table>
      </blockquote>
   </details>
	<!-- routes Submodule -->
	<details>
      <summary><b>routes</b></summary>
      <blockquote>
         <div class='directory-path' style='padding: 8px 0; color: #666;'>
            <code><b>⦿ routes</b></code>
         <table style='width: 100%; border-collapse: collapse;'>
         <thead>
            <tr style='background-color: #f8f9fa;'>
               <th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
               <th style='text-align: left; padding: 8px;'>Summary</th>
            </tr>
         </thead>
            <tr style='border-bottom: 1px solid #eee;'>
               <td style='padding: 8px;'><b><a href='/routes/PaymentRoute.js'>PaymentRoute.js</a></b></td>
               <td style='padding: 8px;'>This file defines the **API routes for payment-related operations** 💳 in JL Forum. It maps HTTP requests to the `PaymentController` for handling transactions, though this section is **under active development** 🚧.</td>
            </tr>
            <tr style='border-bottom: 1px solid #eee;'>
               <td style='padding: 8px;'><b><a href='/routes/PostRoute.js'>PostRoute.js</a></b></td>
               <td style='padding: 8px;'>This file defines the **API routes for managing forum posts** 📝 in JL Forum. It handles requests for creating, reading, updating, and deleting posts, directing them to the `PostController`.</td>
            </tr>
            <tr style='border-bottom: 1px solid #eee;'>
               <td style='padding: 8px;'><b><a href='/routes/CategoryRoute.js'>CategoryRoute.js</a></b></td>
               <td style='padding: 8px;'>This file defines the **API routes for managing forum categories** 🏷️ in JL Forum. It handles requests for creating, retrieving, updating, and deleting categories, routing them to the `CategoryController`.</td>
            </tr>
            <tr style='border-bottom: 1px solid #eee;'>
               <td style='padding: 8px;'><b><a href='/routes/UserRoute.js'>UserRoute.js</a></b></td>
               <td style='padding: 8px;'>This file defines the **API routes for user profile management** 🧑‍💻 in JL Forum. It handles requests related to fetching and updating user information, directing them to the `UserController`.</td>
            </tr>
            <tr style='border-bottom: 1px solid #eee;'>
               <td style='padding: 8px;'><b><a href='/routes/AuthRoute.js'>AuthRoute.js</a></b></td>
               <td style='padding: 8px;'>This file defines the **API routes for user authentication** 🔑 in JL Forum. It includes routes for local login, registration, and social login callbacks (Google, Kakao, Naver), directing requests to the `AuthController` and `SocialAuthController`.</td>
            </tr>
            <tr style='border-bottom: 1px solid #eee;'>
               <td style='padding: 8px;'><b><a href='/routes/ImageUploadRoute.js'>ImageUploadRoute.js</a></b></td>
               <td style='padding: 8px;'>This file defines the **API routes for image uploads** 📸 in JL Forum. It configures endpoints for handling multipart form data containing image files and directs them to the `ImageController` for processing.</td>
            </tr>
            <tr style='border-bottom: 1px solid #eee;'>
               <td style='padding: 8px;'><b><a href='/routes/LikeRoute.js'>LikeRoute.js</a></b></td>
               <td style='padding: 8px;'>This file defines the **API routes for handling 'like' functionality** ❤️ on posts in JL Forum. It provides endpoints for users to like and unlike posts, directing requests to the `LikeController`.</td>
            </tr>
         </table>
      </blockquote>
   </details>
</details>

---

## Getting Started 🚀

This guide will help you set up and run the JL Forum backend API on your local machine for development and testing.

### Prerequisites ✅

Before you begin, ensure you have the following installed and configured on your system:

- **Programming Language:** [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
  - The entire backend is built using JavaScript (Node.js runtime). You'll need a compatible Node.js version installed (LTS recommended, e.g., Node.js 18.x or 20.x).
- **Package Manager:** [Npm](https://www.npmjs.com/)
  - Npm (Node Package Manager) is used to install project dependencies. It usually comes bundled with Node.js.
- **Database:** [MySQL](https://www.mysql.com/) (Version 8.0 or higher recommended)
  - The JL Forum backend uses MySQL as its primary database. You'll need a running MySQL instance accessible from your development environment. This could be a local installation or an AWS RDS instance.
- **Environment Variables:** `.env` setup
  - The project relies on environment variables for sensitive information (database credentials, API keys for social logins, Toss Payments, JWT secrets, etc.). You will need to create a `.env` file based on a provided example (or guided setup) with your specific configurations.

### Installation 📦

To get the JL Forum backend API up and running on your local machine, follow these steps:

1.  **Clone the repository:**

    ```sh
    git clone [https://github.com/hellojuhyoung/project2_forum_backend.git](https://github.com/hellojuhyoung/project2_forum_backend.git)
    ```

2.  **Navigate to the project's backend directory:**

    ```sh
    cd project2_forum_backend/backend
    ```

3.  **Install dependencies:**

    ```sh
    npm install
    ```

    This command will read the `package.json` file located in the `backend` directory and install all the necessary Node.js modules for the API to function.

### Usage 🚀

To start the JL Forum backend API server after installation and configuration, run the following command:

**Using [npm](https://www.npmjs.com/):**

```sh
npm start
```

### Testing 🧪

Currently, a specific testing framework is not yet configured for the JL Forum backend (the `npm test` script defaults to a placeholder message).

To implement automated testing, you would typically integrate a JavaScript testing framework. Popular choices for Node.js backends include:

- [**Mocha**](https://mochajs.org/): A flexible test framework.
- [**Chai**](https://www.chaijs.com/): An assertion library, commonly used with Mocha.
- [**Supertest**](https://github.com/visionmedia/supertest): For testing HTTP APIs.
- [**Jest**](https://jestjs.io/): An all-in-one solution for testing JavaScript code.

Once a testing framework is set up and tests are written, you would typically run the test suite with:

**Using [npm](https://www.npmjs.com/):**

```sh
npm test
```

---

## Roadmap 🗺️

The JL Forum Backend is continually evolving. Here are some of the key features and improvements planned for future development:

- [x] **Implement Core Forum Functionality**: <strike>User authentication (local & social), post/category management, and basic liking system.</strike> (Completed as part of initial development)
- [ ] **Complete Toss Payments Integration**: Fully implement and test payment processing workflows, including successful transaction handling and error management.
- [ ] **Introduce Real-time Features**: Integrate WebSockets for live notifications (e.g., new likes, replies) and potentially real-time chat functionality.
- [ ] **Advanced Search & Filtering**: Develop more robust search capabilities with advanced filters for posts and users.
- [ ] **Cloud Storage for Images**: Migrate image storage from local server to a cloud-based solution (e.g., AWS S3) for better scalability and reliability.
- [ ] **Admin Dashboard API**: Create dedicated API endpoints for administrative tasks, user moderation, and content management.

---

## License 📄

The JL Forum Backend is protected under an **open-source license**. For more details, please refer to the [LICENSE](LICENSE) file in the root of this repository.

---

## Acknowledgments 🙏

This project was made possible with the support and contributions of various tools, libraries, and resources. We extend our gratitude to:

- **Node.js Community**: For the robust JavaScript runtime environment.
- **Express.js**: For providing a fast, unopinionated, minimalist web framework.
- **Sequelize**: For the powerful ORM that simplifies database interactions.
- **Passport.js**: For the flexible authentication middleware.
- **AWS Elastic Beanstalk & RDS**: For the scalable deployment and database services.
- **Open-Source Community**: For the vast array of libraries and tools that empower developers worldwide.
- And all individuals and resources that inspired and supported the development of the JL Forum.

<div align="right">

[![][back-to-top]](#top)

</div>

[back-to-top]: https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square

---
