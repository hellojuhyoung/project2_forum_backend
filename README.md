<div id="top">

<!-- HEADER STYLE: CLASSIC -->
<div align="center">

<img src="readmeai/assets/logos/purple.svg" width="30%" style="position: relative; top: 0; right: 0;" alt="Project Logo"/>

# <code>❯ REPLACE-ME</code>

<em></em>

<!-- BADGES -->
<!-- local repository, no metadata badges. -->

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
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

---

## Overview

---

## Features

<code>❯ REPLACE-ME</code>

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

### Project Index

<details open>
	<summary><b><code>/</code></b></summary>
	<!-- __root__ Submodule -->
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
					<td style='padding: 8px;'>- Openssl_san.cnf<code> configures the generation of an SSL/TLS certificate<br>- It specifies key parameters, distinguished name attributes (like organization and location), and importantly, Subject Alternative Names (SANs)<br>- The SANs define additional domain names associated with the certificate, enabling secure communication for multiple hostnames, such as </code>forum-backend-env.eba-rkkugpwy.ap-southeast-2.elasticbeanstalk.com` in this instance<br>- This ensures proper server authentication within the projects infrastructure.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='/swagger.js'>swagger.js</a></b></td>
					<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='/forum-backend-env.env.yml'>forum-backend-env.env.yml</a></b></td>
					<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='/package-lock.json'>package-lock.json</a></b></td>
					<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='/package.json'>package.json</a></b></td>
					<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='/app.js'>app.js</a></b></td>
					<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
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
					<td style='padding: 8px;'><b><a href='/migrations/20250522070405-create-post-images.js'>20250522070405-create-post-images.js</a></b></td>
					<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='/migrations/20250527103428-create-likes.js'>20250527103428-create-likes.js</a></b></td>
					<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='/migrations/20250428094449-create-post.js'>20250428094449-create-post.js</a></b></td>
					<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='/migrations/20250428090000-create-category.js'>20250428090000-create-category.js</a></b></td>
					<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='/migrations/20250428064947-create-user.js'>20250428064947-create-user.js</a></b></td>
					<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
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
					<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
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
					<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='/config/config.js'>config.js</a></b></td>
					<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
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
					<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='/auth/AuthController.js'>AuthController.js</a></b></td>
					<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='/auth/SocialAuthController.js'>SocialAuthController.js</a></b></td>
					<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
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
					<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='/middlewares/sessionMiddleware.js'>sessionMiddleware.js</a></b></td>
					<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
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
					<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='/utils/seedCategories.js'>seedCategories.js</a></b></td>
					<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='/utils/jwtUtils.js'>jwtUtils.js</a></b></td>
					<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
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
							<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
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
					<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='/models/PostImagesModel.js'>PostImagesModel.js</a></b></td>
					<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='/models/UserModel.js'>UserModel.js</a></b></td>
					<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='/models/index.js'>index.js</a></b></td>
					<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='/models/CategoryModel.js'>CategoryModel.js</a></b></td>
					<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='/models/PostModel.js'>PostModel.js</a></b></td>
					<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
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
					<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='/controllers/ImageController.js'>ImageController.js</a></b></td>
					<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='/controllers/CategoryController.js'>CategoryController.js</a></b></td>
					<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='/controllers/PostController.js'>PostController.js</a></b></td>
					<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='/controllers/UserController.js'>UserController.js</a></b></td>
					<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='/controllers/LikeController.js'>LikeController.js</a></b></td>
					<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
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
					<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='/routes/PostRoute.js'>PostRoute.js</a></b></td>
					<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='/routes/CategoryRoute.js'>CategoryRoute.js</a></b></td>
					<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='/routes/UserRoute.js'>UserRoute.js</a></b></td>
					<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='/routes/AuthRoute.js'>AuthRoute.js</a></b></td>
					<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='/routes/ImageUploadRoute.js'>ImageUploadRoute.js</a></b></td>
					<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='/routes/LikeRoute.js'>LikeRoute.js</a></b></td>
					<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
				</tr>
			</table>
		</blockquote>
	</details>
</details>

---

## Getting Started

### Prerequisites

This project requires the following dependencies:

- **Programming Language:** JavaScript
- **Package Manager:** Npm

### Installation

Build from the source and intsall dependencies:

1. **Clone the repository:**

   ```sh
   ❯ git clone ../
   ```

2. **Navigate to the project directory:**

   ```sh
   ❯ cd
   ```

3. **Install the dependencies:**

<!-- SHIELDS BADGE CURRENTLY DISABLED -->

    <!-- [![npm][npm-shield]][npm-link] -->
    <!-- REFERENCE LINKS -->
    <!-- [npm-shield]: https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white -->
    <!-- [npm-link]: https://www.npmjs.com/ -->

    **Using [npm](https://www.npmjs.com/):**

    ```sh
    ❯ npm install
    ```

### Usage

Run the project with:

**Using [npm](https://www.npmjs.com/):**

```sh
npm start
```

### Testing

uses the {**test_framework**} test framework. Run the test suite with:

**Using [npm](https://www.npmjs.com/):**

```sh
npm test
```

---

## Roadmap

- [x] **`Task 1`**: <strike>Implement feature one.</strike>
- [ ] **`Task 2`**: Implement feature two.
- [ ] **`Task 3`**: Implement feature three.

---

## Contributing

- **💬 [Join the Discussions](https://LOCAL///discussions)**: Share your insights, provide feedback, or ask questions.
- **🐛 [Report Issues](https://LOCAL///issues)**: Submit bugs found or log feature requests for the `` project.
- **💡 [Submit Pull Requests](https://LOCAL///blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your LOCAL account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone .
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to LOCAL**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="left">
   <a href="https://LOCAL{///}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=/">
   </a>
</p>
</details>

---

## License

is protected under the [LICENSE](https://choosealicense.com/licenses) License. For more details, refer to the [LICENSE](https://choosealicense.com/licenses/) file.

---

## Acknowledgments

- Credit `contributors`, `inspiration`, `references`, etc.

<div align="right">

[![][back-to-top]](#top)

</div>

[back-to-top]: https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square

---
