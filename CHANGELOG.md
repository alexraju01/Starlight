## [2.2.0](https://github.com/alexraju01/Starlight/compare/v2.1.3...v2.2.0) (2025-06-21)

### ✨ Features

* Added a simple navbar ([d81b179](https://github.com/alexraju01/Starlight/commit/d81b179ce89a719d51095cf416c68f4e87d36830))
* Added a slider for top 20 movies today ([25a20cf](https://github.com/alexraju01/Starlight/commit/25a20cfd2e0bf412cbf7d1624a532b2d2024e290))
* Added feature where handles uncaught routes and gives suggestions ([9a03321](https://github.com/alexraju01/Starlight/commit/9a03321b184cd1eb320cbe2369dbeea379469427))
* Added Layout shift feature, navbar to sidebar ([aa06269](https://github.com/alexraju01/Starlight/commit/aa0626925e7b162a29a3e623525fea12526e90ae))
* Added search box, sample auth buttons into NavBar  and used global color variable ([d90fefc](https://github.com/alexraju01/Starlight/commit/d90fefc341629cc6c183fe5e2b5f56a0b298e2d0))
* Added Top 20 movies as a reusable  slider component ([1d62e22](https://github.com/alexraju01/Starlight/commit/1d62e22dd3e7781b81b3e4b14f0081cf0f54183f))
* Added upcoming tag to  movies and handled movies without rating, improve SEO using semantic tags ([f64f1bb](https://github.com/alexraju01/Starlight/commit/f64f1bb2b8dc275bb79465f258e93c57eef06aff))
* Applied the new mediaCard on the movies page ([b24ba02](https://github.com/alexraju01/Starlight/commit/b24ba02d07b059b3de0949e770e8d8c3abe1f933))
* Discover page now supports MediaCard component with trailors and fully responsive ([81e37e8](https://github.com/alexraju01/Starlight/commit/81e37e8ebc4dbd3b4c5f82b230d45a5eaa6a9601))
* Implemented an error handler for CustomSlider ([7c6cae7](https://github.com/alexraju01/Starlight/commit/7c6cae7d57564157a07b008fa3a10c2a089952ec))
* Implemented trailers for each movie card on hover ([6724ad0](https://github.com/alexraju01/Starlight/commit/6724ad07c0cae9dd7785ddbb8687627ae5a47c92))
* Loading skeleton placeholder  feature implemented ([d2dff42](https://github.com/alexraju01/Starlight/commit/d2dff42aab0d8f01cbfa7759e8d34cbdc74df074))
* Media poster has rating, release date and genres ([fa3c37d](https://github.com/alexraju01/Starlight/commit/fa3c37df59d9207ea70fff00cf440375d8a632da))
* New feature genre collection for the new design ([65f1771](https://github.com/alexraju01/Starlight/commit/65f1771ebfd9b713fe5602824eb52510831880b0))

### 🐛 Bug Fixes

* Fixed carousel control box size ([fb95f26](https://github.com/alexraju01/Starlight/commit/fb95f269f4f1193187796f5dbdda7a32af5cb81c))
* Fixed fetchData to handle query '?' sign and '&' to fetch discover ([4b35fbd](https://github.com/alexraju01/Starlight/commit/4b35fbdfdf863076e27734861c66d0ed5756f5c2))
* Fixed flickering in movie page when hovered over card ([d8b3679](https://github.com/alexraju01/Starlight/commit/d8b36797ded306199e40bbcf806ae71eeb6ee460))
* Fixed GenreCollection component's style so that the container doesn't lose its shape on larger screen ([26151f0](https://github.com/alexraju01/Starlight/commit/26151f0d92b9ddb146a1baf987f0e0e43a0efbce))
* Fixed getMedia fetch, by passing in correct page parameter ([d75a278](https://github.com/alexraju01/Starlight/commit/d75a27851b2b1d24952296adf06b0b2338eb05a8))
* Fixed overflow on the hovered item in CustomSider component ([f355cf4](https://github.com/alexraju01/Starlight/commit/f355cf416b88971f088e04d0af7e63670ef29dec))
* Fixed overflow scroll ([99726b2](https://github.com/alexraju01/Starlight/commit/99726b2a76ab65d3846dcf1f97a79ccca3aea4e0))
* Fixed responsive issue with caurosel on smaller screens ([f1098ee](https://github.com/alexraju01/Starlight/commit/f1098eeff59c58fc6c2dd24d58731681654f6e81))
* Fixed so that if trailer doesn't exist it looks for teaser on hover ([996841d](https://github.com/alexraju01/Starlight/commit/996841da318313e48e61f79010ab278f4905da46))
* Fixed the flicker effect caused when hovering over the last item in CustomSlider component ([9b8d5c9](https://github.com/alexraju01/Starlight/commit/9b8d5c94ba051665a50a054aa7900365558861d8))
* Fixed the flicker on hover in movies page ([c7b588e](https://github.com/alexraju01/Starlight/commit/c7b588ecb6ca6f6b23892af981df52b9f9503f7c))
* Fixed the missing genres and increased the carousel slides ([5f54669](https://github.com/alexraju01/Starlight/commit/5f546692daac3e0c1bcb4440be71816bf7bbf02e))
* Fixed the position of last item when hover  enlarges the image for all screen size ([8375ed8](https://github.com/alexraju01/Starlight/commit/8375ed8991222629eb389bf3a63dd63629fae096))
* Fixed typescript errors caused when building the app ([4811951](https://github.com/alexraju01/Starlight/commit/4811951c520b8075d0ec063cddd01ee468de69a6))
* Fixed typescript errors on build time ([d71e869](https://github.com/alexraju01/Starlight/commit/d71e8697d85ecac99ef90c6175bf39ace8267f06))
* Fixed where genre collection doesn't take you to the desired link page ([91f8032](https://github.com/alexraju01/Starlight/commit/91f8032966ee689a758d0180e7fe20202b6f00a3))
* Fixing broken images in GenreCollection and removing duplicate movies shown in other genres ([6cefde3](https://github.com/alexraju01/Starlight/commit/6cefde35af366cec7f737d8181fea3384b8fc67b))
* Fixing overflow bug ([bd23036](https://github.com/alexraju01/Starlight/commit/bd23036770ab58b7ea45b0f7dcc162ad77077e89))
* Implementing genreCollection responsiveness ([d129e49](https://github.com/alexraju01/Starlight/commit/d129e4939ba1dc8417398c4e3fa9a4a538663c66))
* Improve responsiveness on smaller screens ([a38b8d6](https://github.com/alexraju01/Starlight/commit/a38b8d682431961c4de6a1f1af23eeb7e21b1bb9))
* Prevented overfetching from search endpoint by implementing debounce ([8495e8a](https://github.com/alexraju01/Starlight/commit/8495e8aef649527a134f50f1bdb87fdf90fea3c8))
* Removed console.logs ([1145378](https://github.com/alexraju01/Starlight/commit/11453786794b933db532cd52fcd44335b9ed0df5))

### 🛠 Refactors

* Centralised the routes and improved SEO by making user friendly URL ([ae5b6de](https://github.com/alexraju01/Starlight/commit/ae5b6de02e15c66bb0caf43979ba6fc1fb1f9b45))
* Changed the the style of the carousel. It takes the whole page ([3df3a52](https://github.com/alexraju01/Starlight/commit/3df3a52d0c52d9b04df1f50fea535a2f97dcbff6))
* Improved MediaCard component ([ef814a9](https://github.com/alexraju01/Starlight/commit/ef814a9f3e59630ba52d60ddf1b23b352f86ad56))
* Improved the Carousel components genre style on hover ([b5b5e5f](https://github.com/alexraju01/Starlight/commit/b5b5e5f38b44c7198b2f7ff0ede82036a0158eca))
* Improved the carousel home page ([f8e4df5](https://github.com/alexraju01/Starlight/commit/f8e4df5848ffab9bb91ae3cfa0d56a9ead410ec5))
* Made the CustomSlider component resuable so that titles can be added to match what it shows ([9d1e607](https://github.com/alexraju01/Starlight/commit/9d1e607108e998f40385e55ff8e89dfe2ddd5d3a))
* refactor: Extracted TMDB image URL with typed categories and sizes ([809431b](https://github.com/alexraju01/Starlight/commit/809431bdf7c1c6461f5c9c24f1d0f86ac99042ac))
* Refactored CustomSliderClient component to follow SOLID principle ([00069fa](https://github.com/alexraju01/Starlight/commit/00069fa5fb1469a7d5c371a4b5a663730f07a85c))
* Refactored discover page and it's search logic using SOLID principle ([2febd03](https://github.com/alexraju01/Starlight/commit/2febd039182bcb807c4a47fa4bf201bd6170e173))
* Refactored mediaCard following SOLID principles ([eb72031](https://github.com/alexraju01/Starlight/commit/eb7203103fb4c6a3028fef9e983800078f30914d))

## [2.1.3](https://github.com/alexraju01/Starlight/compare/v2.1.2...v2.1.3) (2025-04-07)


### Bug Fixes

* Fetch function in the wrong folder ([a2521c8](https://github.com/alexraju01/Starlight/commit/a2521c86b8beef437639c4338176f1543893b712))
* Fixed eslint error ([d30ddaf](https://github.com/alexraju01/Starlight/commit/d30ddaf9fc70d4ce0247abc0ab31b4c50788f83c))
* Fixing build time eslint errors ([d94c3a4](https://github.com/alexraju01/Starlight/commit/d94c3a4f150fa7975e5b81a46d05f2fb5abeb7b2))
* Fixing build time eslint errors ([46d7330](https://github.com/alexraju01/Starlight/commit/46d73305205ea25a65eb219647809936b65da0fd))
* Making sure that .env files are ignored ([d763598](https://github.com/alexraju01/Starlight/commit/d763598b708d9e8180ba2c5621d6c24546cf0ca7))
* Moved the workflow to the correct folder ([ba70270](https://github.com/alexraju01/Starlight/commit/ba70270a9c50362c14c07ab0034c7f16069565c3))
* **semantic:** release notes github action errors fixed ([5c18719](https://github.com/alexraju01/Starlight/commit/5c1871933bdd5aa37c5667767bc4fcc7ce6bf7e9))

## [2.1.2](https://github.com/alexraju01/Starlight/compare/v2.1.1...v2.1.2) (2025-04-03)

### 🐛 Bug Fixes

* Fixed Image component's legacy props error ([f7e7ecb](https://github.com/alexraju01/Starlight/commit/f7e7ecb77f74083982ba37fdcf8fa7de0dc28156))

## [2.1.1](https://github.com/alexraju01/Starlight/compare/v2.1.0...v2.1.1) (2025-04-02)

### 🐛 Bug Fixes

* Checking changes ([b5d9c1a](https://github.com/alexraju01/Starlight/commit/b5d9c1a09516d0f06e29de9b3546765d5bfbe540))
* Fix semantic release ([4ccdec8](https://github.com/alexraju01/Starlight/commit/4ccdec822ecc6569b113ea70ed0b19e3fa9202f9))
* Fixed home page creating overflow making a scrollbar appear ([2680e49](https://github.com/alexraju01/Starlight/commit/2680e49c458e1af95a93030769d9b6382fcaa68d))
* Fixed production error ([9c6cb02](https://github.com/alexraju01/Starlight/commit/9c6cb0252e5e23a4bcb9245eb380ad7ac0082279))
* Fixed release commit links ([eb6ebcc](https://github.com/alexraju01/Starlight/commit/eb6ebcce448ac4386e3c8ef6f7589bc7c239a459))
* Fixed the searchbox being too close to the nav bar ([c9ec64d](https://github.com/alexraju01/Starlight/commit/c9ec64d5da33b5ee63b3f05b632593b6042c3cd1))
* Fixing the release issue ([0dc6d0a](https://github.com/alexraju01/Starlight/commit/0dc6d0a84546de539c518c6b3ef6491083117512))
* Removed the padding on x-axis on lg screen and above ([0921d6c](https://github.com/alexraju01/Starlight/commit/0921d6cc43ce399aed1522924ab9cd34b0e0cf39))
* reverting changes ([167acbf](https://github.com/alexraju01/Starlight/commit/167acbfee08496d6cdaa3cc21eadb6a4e6d1bb27))
* testing ([5320989](https://github.com/alexraju01/Starlight/commit/5320989bb2a05564ce0cf6794892e213d2572cde))
* testing ([7b416ea](https://github.com/alexraju01/Starlight/commit/7b416eae2667d07081d7d187f0668ad5850d8daa))
* testing ([f3982f3](https://github.com/alexraju01/Starlight/commit/f3982f3c39a6e01800a4e226da3108db9f9dfe30))
* testing ([042650e](https://github.com/alexraju01/Starlight/commit/042650e69780dc5414191d8ab11febfa1bf308dd))
* Testing ([315abd9](https://github.com/alexraju01/Starlight/commit/315abd9c7279a0d25bbb94aa6ba12dd7824667f0))
* Testing changes again ([76c50be](https://github.com/alexraju01/Starlight/commit/76c50be802b1b60d76385818aeb3eb2127146d0d))
* testing changes on release config ([08a5f38](https://github.com/alexraju01/Starlight/commit/08a5f38cb80ebd7e8ddd2d2798b8d1849891eea3))
* Testing release change for commit message ([0b5cd94](https://github.com/alexraju01/Starlight/commit/0b5cd94c2bda5982532d84c97ce5b8de6b7d7431))
* Testing release changes ([eaf452a](https://github.com/alexraju01/Starlight/commit/eaf452a9e70be24a13193638cc4fd4dc3937857d))
* Testing release changes again ([27e62c1](https://github.com/alexraju01/Starlight/commit/27e62c1e81b1798d626102cf4429a3b17e944121))
* Testing release notes ([b549010](https://github.com/alexraju01/Starlight/commit/b5490108ef826d4637b14023bb5112e18e37d061))

### 🛠 Refactors

* Added a debounce to the search box in the home page ([fdc0c58](https://github.com/alexraju01/Starlight/commit/fdc0c582d2782c35b606eb98512d51274535f491))
* Improved release notes ([271daac](https://github.com/alexraju01/Starlight/commit/271daaca7dd8232ffd341af0fa1f8bc932c947e9))

## [2.1.4](https://github.com/alexraju01/Starlight/compare/v2.1.3...v2.1.4) (2025-04-02)

### 🐛 Bug Fixes

* Fixed the searchbox being too close to the nav bar ([c9ec64d](https://github.com/alexraju01/Starlight/commit/c9ec64d5da33b5ee63b3f05b632593b6042c3cd1))

## [2.1.3](https://github.com/alexraju01/Starlight/compare/v2.1.2...v2.1.3) (2025-04-02)

### 🐛 Bug Fixes

* Removed the padding on x-axis on lg screen and above ([0921d6c](https://github.com/alexraju01/Starlight/commit/0921d6cc43ce399aed1522924ab9cd34b0e0cf39))

## [2.1.2](https://github.com/alexraju01/Starlight/compare/v2.1.1...v2.1.2) (2025-04-02)

### 🐛 Bug Fixes

* Fixed home page creating overflow making a scrollbar appear ([2680e49](https://github.com/alexraju01/Starlight/commit/2680e49c458e1af95a93030769d9b6382fcaa68d))
* Fixed production error ([9c6cb02](https://github.com/alexraju01/Starlight/commit/9c6cb0252e5e23a4bcb9245eb380ad7ac0082279))

## [2.1.1](https://github.com/alexraju01/Starlight/compare/v2.1.0...v2.1.1) (2025-04-02)

### 🐛 Bug Fixes

* Checking changes ([b5d9c1a](https://github.com/alexraju01/Starlight/commit/b5d9c1a09516d0f06e29de9b3546765d5bfbe540))
* Fix semantic release ([4ccdec8](https://github.com/alexraju01/Starlight/commit/4ccdec822ecc6569b113ea70ed0b19e3fa9202f9))
* Fixed release commit links ([eb6ebcc](https://github.com/alexraju01/Starlight/commit/eb6ebcce448ac4386e3c8ef6f7589bc7c239a459))
* Fixing the release issue ([0dc6d0a](https://github.com/alexraju01/Starlight/commit/0dc6d0a84546de539c518c6b3ef6491083117512))
* reverting changes ([167acbf](https://github.com/alexraju01/Starlight/commit/167acbfee08496d6cdaa3cc21eadb6a4e6d1bb27))
* testing ([5320989](https://github.com/alexraju01/Starlight/commit/5320989bb2a05564ce0cf6794892e213d2572cde))
* testing ([7b416ea](https://github.com/alexraju01/Starlight/commit/7b416eae2667d07081d7d187f0668ad5850d8daa))
* testing ([f3982f3](https://github.com/alexraju01/Starlight/commit/f3982f3c39a6e01800a4e226da3108db9f9dfe30))
* testing ([042650e](https://github.com/alexraju01/Starlight/commit/042650e69780dc5414191d8ab11febfa1bf308dd))
* Testing ([315abd9](https://github.com/alexraju01/Starlight/commit/315abd9c7279a0d25bbb94aa6ba12dd7824667f0))
* Testing changes again ([76c50be](https://github.com/alexraju01/Starlight/commit/76c50be802b1b60d76385818aeb3eb2127146d0d))
* testing changes on release config ([08a5f38](https://github.com/alexraju01/Starlight/commit/08a5f38cb80ebd7e8ddd2d2798b8d1849891eea3))
* Testing release change for commit message ([0b5cd94](https://github.com/alexraju01/Starlight/commit/0b5cd94c2bda5982532d84c97ce5b8de6b7d7431))
* Testing release changes ([eaf452a](https://github.com/alexraju01/Starlight/commit/eaf452a9e70be24a13193638cc4fd4dc3937857d))
* Testing release changes again ([27e62c1](https://github.com/alexraju01/Starlight/commit/27e62c1e81b1798d626102cf4429a3b17e944121))
* Testing release notes ([b549010](https://github.com/alexraju01/Starlight/commit/b5490108ef826d4637b14023bb5112e18e37d061))

### 🛠 Refactors

* Improved release notes ([271daac](https://github.com/alexraju01/Starlight/commit/271daaca7dd8232ffd341af0fa1f8bc932c947e9))

## [2.1.10](https://github.com/alexraju01/Starlight/compare/v2.1.9...v2.1.10) (2025-04-01)

### 🐛 Bug Fixes

* testing changes on release config ([08a5f38](https://github.com/alexraju01/Starlight/commit/08a5f38cb80ebd7e8ddd2d2798b8d1849891eea3))

## [2.1.9](https://github.com/alexraju01/Starlight/compare/v2.1.8...v2.1.9) (2025-04-01)

### 🐛 Bug Fixes

* reverting changes ([167acbf](https://github.com/alexraju01/Starlight/commit/167acbfee08496d6cdaa3cc21eadb6a4e6d1bb27))

## [2.1.8](https://github.com/alexraju01/Starlight/compare/v2.1.7...v2.1.8) (2025-04-01)

### 🐛 Bug Fixes

* testing ([5320989](https://github.com/alexraju01/Starlight/commit/5320989bb2a05564ce0cf6794892e213d2572cde))

## [2.1.7](https://github.com/alexraju01/Starlight/compare/v2.1.6...v2.1.7) (2025-04-01)

### 🐛 Bug Fixes

* testing ([7b416ea](https://github.com/alexraju01/Starlight/commit/7b416eae2667d07081d7d187f0668ad5850d8daa))

## [2.1.6](https://github.com/alexraju01/Starlight/compare/v2.1.5...v2.1.6) (2025-04-01)

### fix

* * Testing (315abd9) ([](https://github.com/alexraju01/Starlight/commit/315abd9c7279a0d25bbb94aa6ba12dd7824667f0))
* * testing (f3982f3) ([](https://github.com/alexraju01/Starlight/commit/f3982f3c39a6e01800a4e226da3108db9f9dfe30))

* * Merge branch 'main' of https://github.com/alexraju01/Starlight (a96b44a) ([](https://github.com/alexraju01/Starlight/commit/a96b44a81f936392f6dba58a003de725813f2265))

## [2.1.5](https://github.com/alexraju01/Starlight/compare/v2.1.4...v2.1.5) (2025-04-01)

* * Merge branch 'main' of https://github.com/alexraju01/Starlight (9f29848) ([](https://github.com/alexraju01/Starlight/commit/9f29848fb50c0296bb4f5abd0bc5acae3d6c153c))

### fix

* * testing (042650e) ([](https://github.com/alexraju01/Starlight/commit/042650e69780dc5414191d8ab11febfa1bf308dd))

## [2.1.4](https://github.com/alexraju01/Starlight/compare/v2.1.3...v2.1.4) (2025-04-01)

* * Merge branch 'main' of https://github.com/alexraju01/Starlight (/commit/ad27556c3c8ac40c918ff94e372db7bceaf09231) ([](https://github.com/alexraju01/Starlight/commit/ad27556c3c8ac40c918ff94e372db7bceaf09231))

### fix

* * Testing release notes (/commit/b5490108ef826d4637b14023bb5112e18e37d061) ([](https://github.com/alexraju01/Starlight/commit/b5490108ef826d4637b14023bb5112e18e37d061))

## [2.1.3](https://github.com/alexraju01/Starlight/compare/v2.1.2...v2.1.3) (2025-04-01)

* * Merge branch 'main' of https://github.com/alexraju01/Starlight ([](https://github.com/alexraju01/Starlight/commit/4256f286b0795ca72e846ff485ca72b83c2fcb5f))

### fix

* * Checking changes ([](https://github.com/alexraju01/Starlight/commit/b5d9c1a09516d0f06e29de9b3546765d5bfbe540))

## [2.1.2](https://github.com/alexraju01/Starlight/compare/v2.1.1...v2.1.2) (2025-04-01)

* * Merge branch 'main' of https://github.com/alexraju01/Starlight (https://github.com/alexraju01/Starlight/commit/2e9a0d04253827e9370d16d5d2612cce13136c73) ([](https://github.com/alexraju01/Starlight/commit/2e9a0d04253827e9370d16d5d2612cce13136c73))

### fix

* * Testing release change for commit message (https://github.com/alexraju01/Starlight/commit/0b5cd94c2bda5982532d84c97ce5b8de6b7d7431) ([](https://github.com/alexraju01/Starlight/commit/0b5cd94c2bda5982532d84c97ce5b8de6b7d7431))

## [2.1.1](https://github.com/alexraju01/Starlight/compare/v2.1.0...v2.1.1) (2025-04-01)

### 🐛 Bug Fixes

* Fix semantic release ([4ccdec8](https://github.com/alexraju01/Starlight/commit/4ccdec822ecc6569b113ea70ed0b19e3fa9202f9))
* Fixed release commit links ([eb6ebcc](https://github.com/alexraju01/Starlight/commit/eb6ebcce448ac4386e3c8ef6f7589bc7c239a459))
* Fixing the release issue ([0dc6d0a](https://github.com/alexraju01/Starlight/commit/0dc6d0a84546de539c518c6b3ef6491083117512))
* Testing changes again ([76c50be](https://github.com/alexraju01/Starlight/commit/76c50be802b1b60d76385818aeb3eb2127146d0d))
* Testing release changes ([eaf452a](https://github.com/alexraju01/Starlight/commit/eaf452a9e70be24a13193638cc4fd4dc3937857d))
* Testing release changes again ([27e62c1](https://github.com/alexraju01/Starlight/commit/27e62c1e81b1798d626102cf4429a3b17e944121))

### 🛠 Refactors

* Improved release notes ([271daac](https://github.com/alexraju01/Starlight/commit/271daaca7dd8232ffd341af0fa1f8bc932c947e9))

## [2.3.1](https://github.com/alexraju01/Starlight/compare/v2.3.0...v2.3.1) (2025-04-01)

### 🐛 Bug Fixes

* Fix semantic release ([4ccdec8](https://github.com/alexraju01/Starlight/commit/4ccdec822ecc6569b113ea70ed0b19e3fa9202f9))
* Fixing the release issue ([0dc6d0a](https://github.com/alexraju01/Starlight/commit/0dc6d0a84546de539c518c6b3ef6491083117512))
* Fixing the release issue ([a1d2462](https://github.com/alexraju01/Starlight/commit/a1d24627f544512d473096c4a9cddf423e14bbef))

### 🛠 Refactors

* Improved release notes ([271daac](https://github.com/alexraju01/Starlight/commit/271daaca7dd8232ffd341af0fa1f8bc932c947e9))

## [2.3.1](https://github.com/alexraju01/Starlight/compare/v2.3.0...v2.3.1) (2025-04-01)

### 🐛 Bug Fixes

* Fix semantic release ([496fbb8](https://github.com/alexraju01/Starlight/commit/496fbb82ba8841af61f0b896ffef31d5e299c8b5))
* Fixing the release issue ([9668d91](https://github.com/alexraju01/Starlight/commit/9668d9174abc0f0aa13b2171af9839d2184dcf6b))
* Fixing the release issue ([35ef338](https://github.com/alexraju01/Starlight/commit/35ef33860624d6a0f9c02969197596393c7fd3f2))

### 🛠 Refactors

* Improved release notes ([7b6d30f](https://github.com/alexraju01/Starlight/commit/7b6d30f6dd9097bf41cdf5407b6c14bb30dae74a))

## [2.1.1](https://github.com/alexraju01/Starlight/compare/v2.1.0...v2.1.1) (2025-04-01)

### 🐛 Bug Fixes

* Fixing the release issue ([9668d91](https://github.com/alexraju01/Starlight/commit/9668d9174abc0f0aa13b2171af9839d2184dcf6b))

### 🛠 Refactors

* Improved release notes ([7b6d30f](https://github.com/alexraju01/Starlight/commit/7b6d30f6dd9097bf41cdf5407b6c14bb30dae74a))

## [2.1.0](https://github.com/alexraju01/Starlight/compare/v2.0.1...v2.1.0) (2025-04-01)

### Bug Fixes

* fixed build error causing deployment failures ([3f172f6](https://github.com/alexraju01/Starlight/commit/3f172f69c0b6ed29301d8dd1ca5fd1853d57221c))
* fixed conflicting dependencies ([2c2af49](https://github.com/alexraju01/Starlight/commit/2c2af494e34d4363a889a86f57a4abaf735a273f))
* Fixed conflicting tailwind error for now as tailwind eslint doesn't support tailwind v4 ([77b20c1](https://github.com/alexraju01/Starlight/commit/77b20c1c283193ebc89b2b15a5932e56fd6002c7))
* Fixed link issues and also improves the home page search box style ([89dadde](https://github.com/alexraju01/Starlight/commit/89dadde060144c515a23d83a84a64c7424571f6f))
* Fixed navbar styling ([edf5807](https://github.com/alexraju01/Starlight/commit/edf58079538453a98d86c01b7fbedef77d87fd8f))
* Fixed the error shown when typing into the home page search box ([ebc9184](https://github.com/alexraju01/Starlight/commit/ebc9184f33c471ee2c153aa3e47f1469154e20ed))
* Fixing building errors ([fc1d8b8](https://github.com/alexraju01/Starlight/commit/fc1d8b8f4805b36c2f46467fd65961084f20cfe9))
* Fixing the release issue ([35ef338](https://github.com/alexraju01/Starlight/commit/35ef33860624d6a0f9c02969197596393c7fd3f2))

## [2.0.1](https://github.com/alexraju01/Starlight/compare/v2.0.0...v2.0.1) (2025-03-22)

### Bug Fixes

* **semantic:** release notes github action errors fixed ([5c18719](https://github.com/alexraju01/Starlight/commit/5c1871933bdd5aa37c5667767bc4fcc7ce6bf7e9))

### Features

* Implemented automated patch notes using github actions ([eb4a73f](https://github.com/alexraju01/Starlight/commit/eb4a73f63c2be7ffb04605b7abcc3c211cdc490f))

# [2.0.0](https://github.com/alexraju01/Starlight/compare/v1.1.0...v2.0.0) (2025-03-22)


### Bug Fixes

* Fetch function in the wrong folder ([a2521c8](https://github.com/alexraju01/Starlight/commit/a2521c86b8beef437639c4338176f1543893b712))
* fix crash on Upcoming page ([6e300a7](https://github.com/alexraju01/Starlight/commit/6e300a74dcedf62ade388ac523555373d9dfc66e))
* Fixing build time eslint errors ([d94c3a4](https://github.com/alexraju01/Starlight/commit/d94c3a4f150fa7975e5b81a46d05f2fb5abeb7b2))
* Fixing build time eslint errors ([46d7330](https://github.com/alexraju01/Starlight/commit/46d73305205ea25a65eb219647809936b65da0fd))
* Installed the missing dev dependencies and ts issues ([27b3467](https://github.com/alexraju01/Starlight/commit/27b3467b6b02e792707fe5d142044938ea3fa034))
* Making sure that .env files are ignored ([d763598](https://github.com/alexraju01/Starlight/commit/d763598b708d9e8180ba2c5621d6c24546cf0ca7))
* Moved the workflow to the correct folder ([ba70270](https://github.com/alexraju01/Starlight/commit/ba70270a9c50362c14c07ab0034c7f16069565c3))


### chore

* **deps:** upgrade to Next.js 15 ([035e029](https://github.com/alexraju01/Starlight/commit/035e029228c5e12652ca48df05f5290f876f3256))


### Features

* **ui:** Reinstall shadcn and migrate the UI components to TypeScript ([5153c38](https://github.com/alexraju01/Starlight/commit/5153c388d13203dfc88bece985c39b2821275c5e))


### BREAKING CHANGES

* **deps:** Next.js upgrade may cause compatibility issues.

# [1.1.0](https://github.com/alexraju01/Starlight/compare/v1.0.0...v1.1.0) (2025-03-22)


### Bug Fixes

* Fetch function in the wrong folder ([6994305](https://github.com/alexraju01/Starlight/commit/6994305323d6c3854b3a9abdf13d365823d06b7e))
* fix crash on Upcoming page ([60ba620](https://github.com/alexraju01/Starlight/commit/60ba6209550769499c30a50dab916df805f1fbad))
* Fixing build time eslint errors ([682cda0](https://github.com/alexraju01/Starlight/commit/682cda0bb5193703b3a8eada3f729e4289fd19ed))
* Installed the missing dev dependencies and ts issues ([aed8be4](https://github.com/alexraju01/Starlight/commit/aed8be4c7082ee6241a085151463b1ff2c5b3cc8))
* Making sure that .env files are ignored ([4cefb5a](https://github.com/alexraju01/Starlight/commit/4cefb5a6d5121367b93ce22a7977cf5cc76d321c))
* Moved the workflow to the correct folder ([a7d53f3](https://github.com/alexraju01/Starlight/commit/a7d53f3185213c507a35880122e5f1203393f89c))


### Features

* **ui:** Reinstall shadcn and migrate the UI components to TypeScript ([b40709b](https://github.com/alexraju01/Starlight/commit/b40709b25efcfa4b2d0c842b90dab39752b7635f))
