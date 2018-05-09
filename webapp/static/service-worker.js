/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/data/css/small.css","51c22c5364996913efb7040684220b28"],["/data/stdimg/404.png","ac70f21936c8963600ec05a84aa4ecaf"],["/data/stdimg/arrow-bl.png","9132fc22c023eb13f449ce9a943f67ab"],["/data/stdimg/arrow-gl.png","5b528c9af6b95db301ea7f65d339dcfc"],["/data/stdimg/arrow-gr.png","c2610266c926c0905f259eeb2444e57e"],["/data/stdimg/arrow-left.png","7e2da442140404a624096d24db09997f"],["/data/stdimg/arrow.png","9eb07cc17ca90a37788093bd4ab4862c"],["/data/stdimg/audit-indi.png","755709d3c24b8606adf5047348ad5879"],["/data/stdimg/audit-team.png","c88e2681e93efbef8f55e6ef6730c827"],["/data/stdimg/audit1.png","016903721ff6fd5de0bef29f93a20971"],["/data/stdimg/bestandenbeheer.png","1d9d8f49817deacee635bea489c09336"],["/data/stdimg/bg-block-gototut.png","386d6b263ecac9c0abca014ff020259e"],["/data/stdimg/bg-block-usp-mobile.png","ac32f3086f20f61153c0c396631f405c"],["/data/stdimg/bg-block-usp.png","df408069e3ecee68342280dba101d0f6"],["/data/stdimg/block-bigspot.jpg","2c72e138554fa9515dd23f398283160a"],["/data/stdimg/clients.png","0b691b65cb071506bf2b506b60d18a85"],["/data/stdimg/eva-indi.png","2953f556749835aa9d4dde449bcefef3"],["/data/stdimg/eva-team.png","0cbaa2168701029a5ba01cf87b725cf2"],["/data/stdimg/favicon.png","baf60ecb8023612b23f91db930f52656"],["/data/stdimg/goto.png","4b20ea07e903ac877c0407c010e21f66"],["/data/stdimg/hero-gradient2.png","a032b0017a2d14fa7340c81a8271ad5f"],["/data/stdimg/icon-usp1.png","ba8c2b669a8f9251647191f69feca6b7"],["/data/stdimg/icon-usp2.png","565f28977a955e2dd9c69cc7293af520"],["/data/stdimg/icon-usp3.png","56e7bfcbff76d50acd98273f69b7d8e6"],["/data/stdimg/image-hero.jpg","8d9031ec8ef69f732734a149ee06eeed"],["/data/stdimg/image-hero2.jpg","8d9031ec8ef69f732734a149ee06eeed"],["/data/stdimg/image-hero3.jpg","1179269cd91aaa7c86b8e3603ec13b99"],["/data/stdimg/image-hero4.jpg","6d1225764b9953a2028040215761b467"],["/data/stdimg/image-hero6.jpg","8d9031ec8ef69f732734a149ee06eeed"],["/data/stdimg/image-panel-1.png","3e5fa9789674646300693c67179263db"],["/data/stdimg/image-panel-2.png","4b0ae856a3992706e23585b1eac0c075"],["/data/stdimg/image-panel-catalog.png","33a77031dc2bfdd418a2fc1266329fc2"],["/data/stdimg/image-panel-catalog2.png","be7aa041dd778cd3c69d61e5562d763b"],["/data/stdimg/image-service.jpg","c28cb187a00193dfb6e8fe670218719b"],["/data/stdimg/image-strength.png","c8a214315d7d6c6a67b0e9bb2fce9587"],["/data/stdimg/image-strength1.png","d19be0d291b24b2f6499d1c1bca094d0"],["/data/stdimg/image-strength2.png","049efba7775c3af3d78757b9b60d4e2e"],["/data/stdimg/image-strength3.png","6eadc5446318c197e4517432b966f981"],["/data/stdimg/image-strength4.png","a5316eccae1c0f755a9971ae3be0afec"],["/data/stdimg/image-strength5.png","ca18ec046a487edf44f77e9be2e7d28d"],["/data/stdimg/image-strength6.png","4415dd7ccc2705672c05422b514e7445"],["/data/stdimg/image-strength7.png","b9dce071703a1be7e1aa3f16466ee50e"],["/data/stdimg/image-strength8.png","3d0f0ac1f0888ea0d50a78f99e8b2d10"],["/data/stdimg/image-strength9.png","c6f22f13f6f4c3151424b73bd238b6dd"],["/data/stdimg/logo-large.png","37378a0003d8af15e14006390d716528"],["/data/stdimg/matrix.png","01f29024a43346dff880d619a7acf3aa"],["/data/stdimg/ogimage.jpg","fc46e3da61782266efb4fae206d72d21"],["/data/stdimg/overzicht.png","ab062c2702d728be0578863c330795bf"],["/data/stdimg/pdca.png","2af081d3f7b483bf2c67aee631af4401"],["/data/stdimg/planmodule.png","9c258975961910b36c472f6efe4a2660"],["/data/stdimg/proces/audit individueel@2x.png","5294f574ece4f1d2c0e09f1eacd888f5"],["/data/stdimg/proces/audit teamverband@2x.png","c414b56919867594e05150430cc1d194"],["/data/stdimg/proces/evaluatie individueel@2x.png","07b540f75b1f89131d61a0d9d5e46a4b"],["/data/stdimg/proces/evaluatie teamverband@2x.png","927eaf2c8dd8249ba093728be95cfd87"],["/data/stdimg/proces/ontwikkelen@2x.png","10ba482d63b92fd31b8065af30a6a5d5"],["/data/stdimg/proces/pdca-yucan-in-shoptabs928px-module10.png","ef33d631c5333adcb7370d719699bc59"],["/data/stdimg/proces/pdca-yucan-in-shoptabs928px-module11.png","51b0cbca57ee8667b25f9cfef88f95af"],["/data/stdimg/proces/pdca-yucan-in-shoptabs928px-module12.png","18a5865fca0f13975f8fae3162880046"],["/data/stdimg/proces/pdca-yucan-in-shoptabs928px-module13.png","b34723299e04e714dec2b4def220a953"],["/data/stdimg/proces/pdca-yucan-in-shoptabs928px-module14.png","42720ef4031042cb38cd4853f04acf1b"],["/data/stdimg/proces/pdca-yucan-in-shoptabs928px-module15.png","0d7d461926ce4d2d2044eb23b6d04d69"],["/data/stdimg/proces/pdca-yucan-in-shoptabs928px-module18.png","2d5dad9cb6969fa7a0ae4abede030e37"],["/data/stdimg/proces/pdca-yucan-in-shoptabs928px-module19.png","f5340ab87ec7e8c13fa128f417fb0a99"],["/data/stdimg/proces/pdca-yucan-in-shoptabs928px-module21.png","7284a6a47e487b79e984cfd86b77dbf5"],["/data/stdimg/proces/pdca-yucan-in-shoptabs928px-module23.png","a69680ca2c88d6796387f8da9e641da9"],["/data/stdimg/proces/pdca-yucan-in-shoptabs928px-module25.png","e4cac352a278922eef62c6a22e4a3abd"],["/data/stdimg/proces/pdca-yucan-in-shoptabs928px-module27.png","e21692779e01433dd8079aa068d0d1f0"],["/data/stdimg/proces/pdca-yucan-in-shoptabs928px-module29.png","4a583f863350fc943b95b8bb4e4c181b"],["/data/stdimg/proces/pdca-yucan-in-shoptabs928px-module31.png","1bbd76004f67b035c9a4e7c8e8b3325b"],["/data/stdimg/proces/pdca-yucan-in-shoptabs928px-module33.png","dcec1c24e4dbef8b37bb8056dbda2ad8"],["/data/stdimg/proces/pdca-yucan-in-shoptabs928px-module35.png","7284a6a47e487b79e984cfd86b77dbf5"],["/data/stdimg/proces/pdca-yucan-in-shoptabs928px-module36.png","dcec1c24e4dbef8b37bb8056dbda2ad8"],["/data/stdimg/proces/pdca-yucan-in-shoptabs928px-module38.png","5058e619dfb8e69285b817c9102a77a7"],["/data/stdimg/proces/pdca-yucan-in-shoptabs928px-module39.png","b34723299e04e714dec2b4def220a953"],["/data/stdimg/proces/pdca-yucan-in-shoptabs928px-module9.png","5058e619dfb8e69285b817c9102a77a7"],["/data/stdimg/slider-pagination.png","0d2d420680b6ef3828d848e57f134f64"],["/data/stdimg/soon.png","df82bdd1b64cd1f802e353058ee406fa"],["/data/stdimg/spacer.png","04a51eab17ed94d0dc0f32f136a8b285"],["/data/stdimg/spot.jpg","f534cd67d21518863ea1d897796aa6e6"],["/data/stdimg/spot2.jpg","9b15e987a2c823af3db04e43b0141ac9"],["/data/stdimg/spot3.jpg","2c5d7aaf87b074ddd750131dd421b60e"],["/data/stdimg/team-1.jpg","5ba9623e7d5ee9ea6283f34f3d5f6c96"],["/data/stdimg/team-10.jpg","5ac264aae45e75c37377b8b0c6627766"],["/data/stdimg/team-11.jpg","b36217075b4ac42b597222a996054ef3"],["/data/stdimg/team-12.jpg","455af6df30fbf598c46acd0343ab1431"],["/data/stdimg/team-13.jpg","c83acc1a18ffa276dd4f1b8f1d045e4f"],["/data/stdimg/team-14.jpg","ce85d64827ba7c26543a6f3eefbabfa6"],["/data/stdimg/team-15.jpg","16dfc4da6a29437e7d417f302c76af44"],["/data/stdimg/team-16.jpg","ded1b70799f0bac0f9ac8181a68b752a"],["/data/stdimg/team-17.jpg","2e1a1386eb46187adf251fac1d7ed1a7"],["/data/stdimg/team-18.jpg","4d86d779a6733f2f00290b19ab082da5"],["/data/stdimg/team-19.jpg","b8544d21dbfc14354009880ef9ddbb05"],["/data/stdimg/team-2.jpg","77f43af65d3e1a06377308a15f9bf60d"],["/data/stdimg/team-20.jpg","afead7e18b3924b5ac50111a0b3052cc"],["/data/stdimg/team-3.jpg","acfa02a078404e3ea67e13d55fa411a9"],["/data/stdimg/team-4.jpg","5ba2b3e0533ae7615a76345b4dd5100c"],["/data/stdimg/team-5.jpg","8c91183c6a984e74528fd370d368326d"],["/data/stdimg/team-6.jpg","f07c15ef380baa11414af496939d0417"],["/data/stdimg/team-7.jpg","66bb7e3391ff003f113f39afc18a139c"],["/data/stdimg/team-8.jpg","6caa1b5c4b9828af969bf3c3cb70e1d1"],["/data/stdimg/team-9.jpg","e5644dbab423a833181630520a46d875"],["/data/stdimg/toptasks-links.png","8b80fdbaa27a62c92ac03bb25371cbab"],["/data/stdimg/toptasks-service.png","35f23f4c9e8aaff5c6f31f4cf0952151"],["/data/stdimg/usp-active-mobile.png","55ffcd0d71cb930de2b8f6fc4f040768"],["/data/stdimg/usp-active.png","b7c402846166604911b1029f1cbe55c4"],["/data/stdimg/verbeteren-jaarplannen.png","3068a0b40474486615e53d1854d22794"],["/data/stdimg/verbeteren-projecten.png","f4776ef5f915f909bcec1d5e87136960"],["/data/stdimg/verbeteren-risico.png","7ea38ee2f0aed7d891c1595a34ba9df4"],["/data/stdimg/yucannl-home-block-standards-1.jpg","6b419ceab203dda2ba3247468f793fe6"],["/data/stdimg/yucannl-home-block-standards-2.jpg","a4da3b5865422151b279ca8e7ae8407a"],["/data/stdimg/yucannl-home-block-standards-3.jpg","691f991c269fea6e15d844e635300e40"],["/data/stdimg/yucannl-home-block-standards.jpg","6b419ceab203dda2ba3247468f793fe6"],["/data/stdimg/yucannl-home-block-standards.png","917cc6b60ee91872e13d8ad9d4faeef0"],["/data/stdimg/zelfeva-indi-planmodule.png","21430c324d887c64253865b82393f153"],["/data/stdimg/zelfeva-indi.png","a0bbf9cef29f04b27200b6683fa86738"],["/data/stdimg/zelfeva-team.png","5ad700fc680dbc3954cbb62beef8673e"],["/data/stdimg/zelfeva1.png","049832d21472fa5f6b8537fc5fa03fe9"],["/data/whitepaper/9_eva.png","fd7e32b0d97bec7df2c3f3969eaa9125"],["/data/whitepaper/Kalam-Regular.ttf","08c397f4e53e808a95110abf531d69b3"],["/data/whitepaper/OpenSans-Bold.ttf","50145685042b4df07a1fd19957275b81"],["/data/whitepaper/OpenSans-Light.ttf","1bf71be111189e76987a4bb9b3115cb7"],["/data/whitepaper/OpenSans-Regular.ttf","629a55a7e793da068dc580d184cc0e31"],["/data/whitepaper/Ubuntu-Light.ttf","8571edb1bb4662f1cdba0b80ea0a1632"],["/data/whitepaper/Ubuntu-Regular.ttf","1c5965c2b1dcdea439b54c3ac60cee38"],["/data/whitepaper/logo-yucan.png","af1002cb23ac2d28d1f8f9a3e9810786"],["/data/whitepaper/pdf.css","3c57e2a9195e25497cb0d1d2d8b8ff14"],["/data/whitepaper/style.css","de68b95ca844207e9a651f3c426323d8"],["/data/whitepaper/yucan-invoice-fullbg.jpg","e3156beaca002618831108f9adb6a2b8"],["/dist/379d71d28bb6d648295ab3c5d12c90ed.jpg","379d71d28bb6d648295ab3c5d12c90ed"],["/dist/448c34a56d699c29117adc64c43affeb.woff2","448c34a56d699c29117adc64c43affeb"],["/dist/674f50d287a8c48dc19ba404d20fe713.eot","674f50d287a8c48dc19ba404d20fe713"],["/dist/68ed7e046f0c970c166e22384b86c879.png","68ed7e046f0c970c166e22384b86c879"],["/dist/7bd33d8b2cb4752ff5fffb1687ec4ba2.jpg","7bd33d8b2cb4752ff5fffb1687ec4ba2"],["/dist/80808753cb0957c3af7b6386d64aa3eb.jpg","80808753cb0957c3af7b6386d64aa3eb"],["/dist/89889688147bd7575d6327160d64e760.svg","89889688147bd7575d6327160d64e760"],["/dist/912ec66d7572ff821749319396470bde.svg","912ec66d7572ff821749319396470bde"],["/dist/a907980a69404cd59a9d74f935b5e9cd.jpg","a907980a69404cd59a9d74f935b5e9cd"],["/dist/af7ae505a9eed503f8b8e6982036873e.woff2","af7ae505a9eed503f8b8e6982036873e"],["/dist/b06871f281fee6b241d60582ae9369b9.ttf","b06871f281fee6b241d60582ae9369b9"],["/dist/e18bbf611f2a2e43afc071aa2f4e1512.ttf","e18bbf611f2a2e43afc071aa2f4e1512"],["/dist/f4769f9bdb7466be65088239c12046d1.eot","f4769f9bdb7466be65088239c12046d1"],["/dist/fa2772327f55d8198301fdb8bcfc8158.woff","fa2772327f55d8198301fdb8bcfc8158"],["/dist/fee66e712a8a08eef5805a46892932ad.woff","fee66e712a8a08eef5805a46892932ad"],["/dist/font/OpenSans-Bold.eot","148a6749baa5f658a45183ddb5ee159f"],["/dist/font/OpenSans-Bold.svg","2e00b2635b51ba336b4b67a5d0bc03c7"],["/dist/font/OpenSans-Bold.ttf","7e08cc656863d52bcb5cd34805ac605b"],["/dist/font/OpenSans-Bold.woff","623e3205570002af47fc2b88f9335d19"],["/dist/font/OpenSans-Bold.woff2","d08c09f2f169f4a6edbcf8b8d1636cb4"],["/dist/font/OpenSans-Italic.eot","9b695c7dff832fca56d270d8fd90cd3c"],["/dist/font/OpenSans-Italic.svg","fd2ba7503f70aafcdcc45211a481684d"],["/dist/font/OpenSans-Italic.ttf","f42df73dcb75559a62c2e654035a784e"],["/dist/font/OpenSans-Italic.woff","db70d0b9cb27ada1a260a2b35e756b8b"],["/dist/font/OpenSans-Italic.woff2","987032ea5d57c93d8da215678eae3b86"],["/dist/font/OpenSans-Light.eot","76b56857ebbae3a5a689f213feb11af0"],["/dist/font/OpenSans-Light.svg","27ef0b062b2e221df16f3bbd97c2dca8"],["/dist/font/OpenSans-Light.ttf","177cc92d2e8027712a8c1724abd272cd"],["/dist/font/OpenSans-Light.woff","521d17bc9f3526c690e8ada6eee55bec"],["/dist/font/OpenSans-Light.woff2","60c866748ff15f5b347fdba64596b1b1"],["/dist/font/OpenSans-LightItalic.eot","687596afb6f25cbf28e2ab036f2228cd"],["/dist/font/OpenSans-LightItalic.svg","c0a3320c5a9694ba4e43a880e3de5cf2"],["/dist/font/OpenSans-LightItalic.ttf","c03f38daf03bc9e1329c1d9215406a13"],["/dist/font/OpenSans-LightItalic.woff","8a648ff38ded89ea15916e84529d62d3"],["/dist/font/OpenSans-LightItalic.woff2","06bbd3188b34820cd83a0e0b3d0a6f57"],["/dist/font/OpenSans-Regular.eot","9dce7f01715340861bdb57318e2f3fdc"],["/dist/font/OpenSans-Regular.svg","7aab4c13671282c90669eb6a10357e41"],["/dist/font/OpenSans-Regular.ttf","c045b73d86803686f4cd1cc3f9ceba59"],["/dist/font/OpenSans-Regular.woff","bf2d0783515b7d75c35bde69e01b3135"],["/dist/font/OpenSans-Regular.woff2","cffb686d7d2f4682df8342bd4d276e09"],["/dist/font/OpenSans-SemiBold.eot","7728dd9fbbce1c14cfbf8579d7a867a1"],["/dist/font/OpenSans-SemiBold.svg","e16f375be3c2a73b58255a02f6d3a9ce"],["/dist/font/OpenSans-SemiBold.ttf","c062d7d188586db3c4cf61e1ae43b331"],["/dist/font/OpenSans-SemiBold.woff","1cd5320f8937d337b61d5117cf9d7b28"],["/dist/font/OpenSans-SemiBold.woff2","223a277bd88d8a90c8cdf24cda0ad5f5"],["/dist/font/Ubuntu-Light.eot","66ba6ac736b4f0c7caa3bb7af84a6b2c"],["/dist/font/Ubuntu-Light.svg","1d78262dd49a4677830582ed949bb6a4"],["/dist/font/Ubuntu-Light.ttf","ca36f17e52c66c0c8decd0a4e22dbcf7"],["/dist/font/Ubuntu-Light.woff","c14ac9239feb5683599f8524e778d61e"],["/dist/font/Ubuntu-Light.woff2","0e8444a9379b733d1512229a52737330"],["/dist/font/Ubuntu-Medium.eot","7f28efd5143fabede4604537d493bec3"],["/dist/font/Ubuntu-Medium.svg","c6d4b87d6dcae52931ee0ed61274b542"],["/dist/font/Ubuntu-Medium.ttf","55af43df52a71857a3460e7965fe933c"],["/dist/font/Ubuntu-Medium.woff","f93d3f00332a2128479710abb3b98349"],["/dist/font/Ubuntu-Medium.woff2","d55b974e71864814519a0571516819d0"],["/dist/font/Ubuntu-Regular.eot","76eecbc1368f8dee975f3d7cc0ce805c"],["/dist/font/Ubuntu-Regular.svg","3c51cf95e0cf5b2145510b36882a66ed"],["/dist/font/Ubuntu-Regular.ttf","69d044a98a459d2a567649120bb660bf"],["/dist/font/Ubuntu-Regular.woff","08ad9d371a15b6f695d86af3cd5de8fd"],["/dist/font/Ubuntu-Regular.woff2","c1777245327bec775fbf955c24b98bc1"],["/dist/font/Zeyada-Regular.eot","f6b0a01eb12d6ec86c13a284434c5762"],["/dist/font/Zeyada-Regular.svg","0e98f3fdb7f0c780c20cf9f854c71e54"],["/dist/font/Zeyada-Regular.ttf","ab61287d94edcccb97f9c30f0c193945"],["/dist/font/Zeyada-Regular.woff","511766a5c4ff84c34d4d0b06fed73fd3"],["/dist/font/Zeyada-Regular.woff2","303f2a589408522a9cd3b79a3f42bf3c"],["/dist/fonts.css","79d8cae51e397c8893caeb6ac19ace2a"],["/dist/index.html","353f1a80bed2f062606f54a04fe4c6ad"],["/dist/main-2172973e191c13889d6e.js","29edd0576c308875f9369d21618043d8"],["/dist/main.css","67c3ba25caa028bdd0faf1990dc4e283"],["/favicon.png","4bf553704539dd64cc5bf3bf11d7999f"],["/js/async.js","c2631a8fdacec48d02a595e1253793a8"],["/js/cssrelpreload.min.js","f66db4d415c073633a1a242157c5eab5"],["/js/imageMapResizer.min.js","cbc938da1fb1d2b4ff14e71db376514a"],["/js/jquery.appear.js","7c9a964e05b41e2b0a73db879f3f3fdb"],["/js/loadCSS.min.js","b9cc19097856b116a22bdaf4793dc970"],["/js/plupload-2.1.9/moxie.js","4fbe14406fd5e8f953535ad3379563f6"],["/js/plupload-2.1.9/plupload.dev.js","7890bfd039dec13d0b4af07028e2db2e"],["/js/plupload-2.1.9/plupload.full.min.js","c626050154dee5f927f9467d710c8427"],["/js/plupload-2.1.9/plupload.min.js","025cad3d5a55432783d31b02fb95a060"],["/js/tinymce/js/tinymce/jquery.tinymce.min.js","f1919a8a8304a5591791cfc8178ea60c"],["/js/tinymce/js/tinymce/plugins/advlist/plugin.min.js","f8768fc97c9a6f7e3d3084f473e9d488"],["/js/tinymce/js/tinymce/plugins/anchor/plugin.min.js","a4158ef8d962a9a160be1083c223ddea"],["/js/tinymce/js/tinymce/plugins/autolink/plugin.min.js","1f6fb897085454dae892cacc835616da"],["/js/tinymce/js/tinymce/plugins/autoresize/plugin.min.js","52d7df5d0944fa1d95e8d82594fd297c"],["/js/tinymce/js/tinymce/plugins/autosave/plugin.min.js","770b9b64491da07c9a82ccc2e05e1466"],["/js/tinymce/js/tinymce/plugins/bbcode/plugin.min.js","73b44642a180b203cf1d65e37be3cf9c"],["/js/tinymce/js/tinymce/plugins/charmap/plugin.min.js","7c306fb1046e660c97bc9b7f3ebd3e13"],["/js/tinymce/js/tinymce/plugins/code/plugin.min.js","3b4bff8455bdbc76c8875be13885c209"],["/js/tinymce/js/tinymce/plugins/codesample/css/prism.css","df3f7d54eba0f7771dce00316ed62361"],["/js/tinymce/js/tinymce/plugins/codesample/plugin.min.js","928076af69b74d5272d88f74e8c50160"],["/js/tinymce/js/tinymce/plugins/colorpicker/plugin.min.js","5c509ea150c4abff1c5a288de7299c41"],["/js/tinymce/js/tinymce/plugins/contextmenu/plugin.min.js","0222215d126278c82c827939c0a5df08"],["/js/tinymce/js/tinymce/plugins/directionality/plugin.min.js","6e485d9790488dcaf9f3f00dcf63f856"],["/js/tinymce/js/tinymce/plugins/emoticons/img/smiley-cool.gif","e26e97a318f82ec144b0818e5a8f8edb"],["/js/tinymce/js/tinymce/plugins/emoticons/img/smiley-cry.gif","e72bf995ceca9230273ed9909c5db9c8"],["/js/tinymce/js/tinymce/plugins/emoticons/img/smiley-embarassed.gif","d59171236e6b0b96091eeda1f7b57ce3"],["/js/tinymce/js/tinymce/plugins/emoticons/img/smiley-foot-in-mouth.gif","c12d9db6a14ad0b52f66f1e2cf2a38e7"],["/js/tinymce/js/tinymce/plugins/emoticons/img/smiley-frown.gif","59930208822fe755f651a67ef4b70530"],["/js/tinymce/js/tinymce/plugins/emoticons/img/smiley-innocent.gif","ec0477c8a206ff250782e40f9bae4b4c"],["/js/tinymce/js/tinymce/plugins/emoticons/img/smiley-kiss.gif","4ae8945f3960751b5d294f18242e144d"],["/js/tinymce/js/tinymce/plugins/emoticons/img/smiley-laughing.gif","c37f405db4e13cbebf24e745534687bf"],["/js/tinymce/js/tinymce/plugins/emoticons/img/smiley-money-mouth.gif","11c14bd1496afd0e21df115d25b68e96"],["/js/tinymce/js/tinymce/plugins/emoticons/img/smiley-sealed.gif","bb828cb46b377d1589927a02f8fd1762"],["/js/tinymce/js/tinymce/plugins/emoticons/img/smiley-smile.gif","2968a664098d9580079c66d628dad1a8"],["/js/tinymce/js/tinymce/plugins/emoticons/img/smiley-surprised.gif","2e136ebd637bf3e6c9fc6bdc20cbe73e"],["/js/tinymce/js/tinymce/plugins/emoticons/img/smiley-tongue-out.gif","5ec3bb4781c8e43a51d3a1a948b98fc0"],["/js/tinymce/js/tinymce/plugins/emoticons/img/smiley-undecided.gif","3c0c011d16b1a2331385ed97e160a42a"],["/js/tinymce/js/tinymce/plugins/emoticons/img/smiley-wink.gif","897275ac7d07032b4d93fb83a0d2a41b"],["/js/tinymce/js/tinymce/plugins/emoticons/img/smiley-yell.gif","19bb8ebfe3c2f5ef3ffb9aa4a027900d"],["/js/tinymce/js/tinymce/plugins/emoticons/plugin.min.js","529f9db680386cf38832751f4530e300"],["/js/tinymce/js/tinymce/plugins/fullpage/plugin.min.js","986623d1bb5b134cfdddcb61d0ad2fef"],["/js/tinymce/js/tinymce/plugins/fullscreen/plugin.min.js","69119370ea789693d6c810f34364c99c"],["/js/tinymce/js/tinymce/plugins/help/img/logo.png","aad7b81bff16823f25cb4ec981013304"],["/js/tinymce/js/tinymce/plugins/help/plugin.min.js","dd611004a59ba893c365577ebfa51c96"],["/js/tinymce/js/tinymce/plugins/hr/plugin.min.js","a0a566612a12ce9069e89054bf2559b3"],["/js/tinymce/js/tinymce/plugins/image/plugin.min.js","fcd22e18e8ee0fcf99a822f19dac98d7"],["/js/tinymce/js/tinymce/plugins/imagetools/plugin.min.js","8d875d19313d4f186e13845ff327170d"],["/js/tinymce/js/tinymce/plugins/importcss/plugin.min.js","181cd432a283b78e047a80a3e361e687"],["/js/tinymce/js/tinymce/plugins/insertdatetime/plugin.min.js","55b225b14b26e43a153bfc59c8d1718a"],["/js/tinymce/js/tinymce/plugins/legacyoutput/plugin.min.js","4d927c8b1401dc4eb7cd4c52088dc22e"],["/js/tinymce/js/tinymce/plugins/link/plugin.min.js","1e91d98046824776453f116115c0774d"],["/js/tinymce/js/tinymce/plugins/lists/plugin.min.js","20e9f3b6a4a72b77a6d2c5679542dff6"],["/js/tinymce/js/tinymce/plugins/media/plugin.min.js","b068d94458289ccfca5221fe750b4155"],["/js/tinymce/js/tinymce/plugins/nonbreaking/plugin.min.js","4437b87924aa5e4c547fe3734b5abcd2"],["/js/tinymce/js/tinymce/plugins/noneditable/plugin.min.js","8326ccf8e0b1d01d8dc08267276af3ed"],["/js/tinymce/js/tinymce/plugins/pagebreak/plugin.min.js","163ff149cefd3d6fb57ddacbd2567974"],["/js/tinymce/js/tinymce/plugins/paste/plugin.min.js","63f2227d228333d8803fb963062aeee3"],["/js/tinymce/js/tinymce/plugins/preview/plugin.min.js","2e1fe563fcae3cf15db779d9828a69cc"],["/js/tinymce/js/tinymce/plugins/print/plugin.min.js","e71584bd05614f26bcdfcb2a1a3303d3"],["/js/tinymce/js/tinymce/plugins/save/plugin.min.js","bb1d623527ab1ec6a96046ab266e4f3e"],["/js/tinymce/js/tinymce/plugins/searchreplace/plugin.min.js","9ed7d9b2a22bb76ce419e18eba486dee"],["/js/tinymce/js/tinymce/plugins/spellchecker/plugin.min.js","8dab73e3b0d0f39e4d980e6612de874b"],["/js/tinymce/js/tinymce/plugins/tabfocus/plugin.min.js","fc31bb3d75b7635ca8249600a9884236"],["/js/tinymce/js/tinymce/plugins/table/plugin.min.js","6804289e963ea1a5207ed29e6e329158"],["/js/tinymce/js/tinymce/plugins/template/plugin.min.js","9cf4b5f3a0fab335a49337081b3cfb06"],["/js/tinymce/js/tinymce/plugins/textcolor/plugin.min.js","b8176b7448cc4a20744ca6c5e88e4c41"],["/js/tinymce/js/tinymce/plugins/textpattern/plugin.min.js","f4f90b2572b8c526d9c1d95a40d9fb03"],["/js/tinymce/js/tinymce/plugins/toc/plugin.min.js","988259e64fafeb4a7d3dffa91bcfcfa7"],["/js/tinymce/js/tinymce/plugins/visualblocks/css/visualblocks.css","03ea1695db057e6a1aa0b24699401ef7"],["/js/tinymce/js/tinymce/plugins/visualblocks/plugin.min.js","72f1bebe00b1ad0ef86f91729ca5e404"],["/js/tinymce/js/tinymce/plugins/visualchars/plugin.min.js","f6e64cd9e9b0e89b0d33611e9e5d0774"],["/js/tinymce/js/tinymce/plugins/wordcount/plugin.min.js","2d965f9bc174bec190d0dbd902c4a6c1"],["/js/tinymce/js/tinymce/skins/lightgray/content.inline.min.css","4e0b29837fad1438a92fd0f27c43db68"],["/js/tinymce/js/tinymce/skins/lightgray/content.min.css","2f9c65ecc50238c129c9db06f7d1b0de"],["/js/tinymce/js/tinymce/skins/lightgray/fonts/tinymce-small.eot","12d26c285b71d790f4b0c94423ef1f99"],["/js/tinymce/js/tinymce/skins/lightgray/fonts/tinymce-small.svg","a2a1f732cc34764c684ed521c6f3327c"],["/js/tinymce/js/tinymce/skins/lightgray/fonts/tinymce-small.ttf","28806940c647cf671bebf4ae0630e570"],["/js/tinymce/js/tinymce/skins/lightgray/fonts/tinymce-small.woff","7e0c88f02dcaf2f78c90b4dc7827b709"],["/js/tinymce/js/tinymce/skins/lightgray/fonts/tinymce.eot","6196b6eb25b52ac8bbe4a94e6da8ae27"],["/js/tinymce/js/tinymce/skins/lightgray/fonts/tinymce.svg","7262d908f15434ec7c3ae2126bc87350"],["/js/tinymce/js/tinymce/skins/lightgray/fonts/tinymce.ttf","aefbfcb02f143d3b3d3e47ff3de8efb1"],["/js/tinymce/js/tinymce/skins/lightgray/fonts/tinymce.woff","a7a41ea9358b658ec53e9d042334c1a8"],["/js/tinymce/js/tinymce/skins/lightgray/img/anchor.gif","abd3613571800fdcc891181d5f34f840"],["/js/tinymce/js/tinymce/skins/lightgray/img/loader.gif","394bafc3cc4dfb3a0ee48c1f54669539"],["/js/tinymce/js/tinymce/skins/lightgray/img/object.gif","f3726450d7457d750a2f4d9441c7ee20"],["/js/tinymce/js/tinymce/skins/lightgray/img/trans.gif","12bf9e19374920de3146a64775f46a5e"],["/js/tinymce/js/tinymce/skins/lightgray/skin.min.css","b7da29baf0549e017bdeaa2d836db37b"],["/js/tinymce/js/tinymce/themes/inlite/theme.min.js","bf1d945945d6748aad3efed41f3f12ef"],["/js/tinymce/js/tinymce/themes/modern/theme.min.js","bc96d40fcee1715d4164324dfc0ce718"],["/js/tinymce/js/tinymce/tinymce.min.js","796115d213af92091748caf99f74fc46"],["/js/tinymce/tinymce/js/tinymce/jquery.tinymce.min.js","f1919a8a8304a5591791cfc8178ea60c"],["/js/tinymce/tinymce/js/tinymce/plugins/advlist/plugin.min.js","f8768fc97c9a6f7e3d3084f473e9d488"],["/js/tinymce/tinymce/js/tinymce/plugins/anchor/plugin.min.js","a4158ef8d962a9a160be1083c223ddea"],["/js/tinymce/tinymce/js/tinymce/plugins/autolink/plugin.min.js","1f6fb897085454dae892cacc835616da"],["/js/tinymce/tinymce/js/tinymce/plugins/autoresize/plugin.min.js","52d7df5d0944fa1d95e8d82594fd297c"],["/js/tinymce/tinymce/js/tinymce/plugins/autosave/plugin.min.js","770b9b64491da07c9a82ccc2e05e1466"],["/js/tinymce/tinymce/js/tinymce/plugins/bbcode/plugin.min.js","73b44642a180b203cf1d65e37be3cf9c"],["/js/tinymce/tinymce/js/tinymce/plugins/charmap/plugin.min.js","e21c5873be5aa8407266377225b67c26"],["/js/tinymce/tinymce/js/tinymce/plugins/code/plugin.min.js","3b4bff8455bdbc76c8875be13885c209"],["/js/tinymce/tinymce/js/tinymce/plugins/codesample/css/prism.css","df3f7d54eba0f7771dce00316ed62361"],["/js/tinymce/tinymce/js/tinymce/plugins/codesample/plugin.min.js","928076af69b74d5272d88f74e8c50160"],["/js/tinymce/tinymce/js/tinymce/plugins/colorpicker/plugin.min.js","5c509ea150c4abff1c5a288de7299c41"],["/js/tinymce/tinymce/js/tinymce/plugins/contextmenu/plugin.min.js","a6512db9aca35558d6ad507ef9cc67ae"],["/js/tinymce/tinymce/js/tinymce/plugins/directionality/plugin.min.js","6e485d9790488dcaf9f3f00dcf63f856"],["/js/tinymce/tinymce/js/tinymce/plugins/emoticons/img/smiley-cool.gif","e26e97a318f82ec144b0818e5a8f8edb"],["/js/tinymce/tinymce/js/tinymce/plugins/emoticons/img/smiley-cry.gif","e72bf995ceca9230273ed9909c5db9c8"],["/js/tinymce/tinymce/js/tinymce/plugins/emoticons/img/smiley-embarassed.gif","d59171236e6b0b96091eeda1f7b57ce3"],["/js/tinymce/tinymce/js/tinymce/plugins/emoticons/img/smiley-foot-in-mouth.gif","c12d9db6a14ad0b52f66f1e2cf2a38e7"],["/js/tinymce/tinymce/js/tinymce/plugins/emoticons/img/smiley-frown.gif","59930208822fe755f651a67ef4b70530"],["/js/tinymce/tinymce/js/tinymce/plugins/emoticons/img/smiley-innocent.gif","ec0477c8a206ff250782e40f9bae4b4c"],["/js/tinymce/tinymce/js/tinymce/plugins/emoticons/img/smiley-kiss.gif","4ae8945f3960751b5d294f18242e144d"],["/js/tinymce/tinymce/js/tinymce/plugins/emoticons/img/smiley-laughing.gif","c37f405db4e13cbebf24e745534687bf"],["/js/tinymce/tinymce/js/tinymce/plugins/emoticons/img/smiley-money-mouth.gif","11c14bd1496afd0e21df115d25b68e96"],["/js/tinymce/tinymce/js/tinymce/plugins/emoticons/img/smiley-sealed.gif","bb828cb46b377d1589927a02f8fd1762"],["/js/tinymce/tinymce/js/tinymce/plugins/emoticons/img/smiley-smile.gif","2968a664098d9580079c66d628dad1a8"],["/js/tinymce/tinymce/js/tinymce/plugins/emoticons/img/smiley-surprised.gif","2e136ebd637bf3e6c9fc6bdc20cbe73e"],["/js/tinymce/tinymce/js/tinymce/plugins/emoticons/img/smiley-tongue-out.gif","5ec3bb4781c8e43a51d3a1a948b98fc0"],["/js/tinymce/tinymce/js/tinymce/plugins/emoticons/img/smiley-undecided.gif","3c0c011d16b1a2331385ed97e160a42a"],["/js/tinymce/tinymce/js/tinymce/plugins/emoticons/img/smiley-wink.gif","897275ac7d07032b4d93fb83a0d2a41b"],["/js/tinymce/tinymce/js/tinymce/plugins/emoticons/img/smiley-yell.gif","19bb8ebfe3c2f5ef3ffb9aa4a027900d"],["/js/tinymce/tinymce/js/tinymce/plugins/emoticons/plugin.min.js","529f9db680386cf38832751f4530e300"],["/js/tinymce/tinymce/js/tinymce/plugins/fullpage/plugin.min.js","986623d1bb5b134cfdddcb61d0ad2fef"],["/js/tinymce/tinymce/js/tinymce/plugins/fullscreen/plugin.min.js","69119370ea789693d6c810f34364c99c"],["/js/tinymce/tinymce/js/tinymce/plugins/help/img/logo.png","aad7b81bff16823f25cb4ec981013304"],["/js/tinymce/tinymce/js/tinymce/plugins/help/plugin.min.js","dd611004a59ba893c365577ebfa51c96"],["/js/tinymce/tinymce/js/tinymce/plugins/hr/plugin.min.js","a0a566612a12ce9069e89054bf2559b3"],["/js/tinymce/tinymce/js/tinymce/plugins/image/plugin.min.js","fcd22e18e8ee0fcf99a822f19dac98d7"],["/js/tinymce/tinymce/js/tinymce/plugins/imagetools/plugin.min.js","fab3a9586c08b73055b51ff84f0a8140"],["/js/tinymce/tinymce/js/tinymce/plugins/importcss/plugin.min.js","181cd432a283b78e047a80a3e361e687"],["/js/tinymce/tinymce/js/tinymce/plugins/insertdatetime/plugin.min.js","55b225b14b26e43a153bfc59c8d1718a"],["/js/tinymce/tinymce/js/tinymce/plugins/legacyoutput/plugin.min.js","4d927c8b1401dc4eb7cd4c52088dc22e"],["/js/tinymce/tinymce/js/tinymce/plugins/link/plugin.min.js","a52a04f149c6e052aeb22456a611480c"],["/js/tinymce/tinymce/js/tinymce/plugins/lists/plugin.min.js","20e9f3b6a4a72b77a6d2c5679542dff6"],["/js/tinymce/tinymce/js/tinymce/plugins/media/plugin.min.js","b068d94458289ccfca5221fe750b4155"],["/js/tinymce/tinymce/js/tinymce/plugins/nonbreaking/plugin.min.js","4437b87924aa5e4c547fe3734b5abcd2"],["/js/tinymce/tinymce/js/tinymce/plugins/noneditable/plugin.min.js","8326ccf8e0b1d01d8dc08267276af3ed"],["/js/tinymce/tinymce/js/tinymce/plugins/pagebreak/plugin.min.js","163ff149cefd3d6fb57ddacbd2567974"],["/js/tinymce/tinymce/js/tinymce/plugins/paste/plugin.min.js","9a5921a7c437326254b77cead9116c6c"],["/js/tinymce/tinymce/js/tinymce/plugins/preview/plugin.min.js","08ac11bd281f45b128628c9f1ebaf3c7"],["/js/tinymce/tinymce/js/tinymce/plugins/print/plugin.min.js","e71584bd05614f26bcdfcb2a1a3303d3"],["/js/tinymce/tinymce/js/tinymce/plugins/save/plugin.min.js","bb1d623527ab1ec6a96046ab266e4f3e"],["/js/tinymce/tinymce/js/tinymce/plugins/searchreplace/plugin.min.js","9ed7d9b2a22bb76ce419e18eba486dee"],["/js/tinymce/tinymce/js/tinymce/plugins/spellchecker/plugin.min.js","8dab73e3b0d0f39e4d980e6612de874b"],["/js/tinymce/tinymce/js/tinymce/plugins/tabfocus/plugin.min.js","fc31bb3d75b7635ca8249600a9884236"],["/js/tinymce/tinymce/js/tinymce/plugins/table/plugin.min.js","9dd5ee2910658a4589aa68fc02044415"],["/js/tinymce/tinymce/js/tinymce/plugins/template/plugin.min.js","9cf4b5f3a0fab335a49337081b3cfb06"],["/js/tinymce/tinymce/js/tinymce/plugins/textcolor/plugin.min.js","b8176b7448cc4a20744ca6c5e88e4c41"],["/js/tinymce/tinymce/js/tinymce/plugins/textpattern/plugin.min.js","f4f90b2572b8c526d9c1d95a40d9fb03"],["/js/tinymce/tinymce/js/tinymce/plugins/toc/plugin.min.js","988259e64fafeb4a7d3dffa91bcfcfa7"],["/js/tinymce/tinymce/js/tinymce/plugins/visualblocks/css/visualblocks.css","03ea1695db057e6a1aa0b24699401ef7"],["/js/tinymce/tinymce/js/tinymce/plugins/visualblocks/plugin.min.js","72f1bebe00b1ad0ef86f91729ca5e404"],["/js/tinymce/tinymce/js/tinymce/plugins/visualchars/plugin.min.js","f6e64cd9e9b0e89b0d33611e9e5d0774"],["/js/tinymce/tinymce/js/tinymce/plugins/wordcount/plugin.min.js","2d965f9bc174bec190d0dbd902c4a6c1"],["/js/tinymce/tinymce/js/tinymce/skins/lightgray/content.inline.min.css","f1277d98c26cc9b26bc1c17cdb06bcca"],["/js/tinymce/tinymce/js/tinymce/skins/lightgray/content.min.css","09a8e927e49e3515d737e6846b5948af"],["/js/tinymce/tinymce/js/tinymce/skins/lightgray/fonts/tinymce-small.eot","12d26c285b71d790f4b0c94423ef1f99"],["/js/tinymce/tinymce/js/tinymce/skins/lightgray/fonts/tinymce-small.svg","a2a1f732cc34764c684ed521c6f3327c"],["/js/tinymce/tinymce/js/tinymce/skins/lightgray/fonts/tinymce-small.ttf","28806940c647cf671bebf4ae0630e570"],["/js/tinymce/tinymce/js/tinymce/skins/lightgray/fonts/tinymce-small.woff","7e0c88f02dcaf2f78c90b4dc7827b709"],["/js/tinymce/tinymce/js/tinymce/skins/lightgray/fonts/tinymce.eot","6196b6eb25b52ac8bbe4a94e6da8ae27"],["/js/tinymce/tinymce/js/tinymce/skins/lightgray/fonts/tinymce.svg","7262d908f15434ec7c3ae2126bc87350"],["/js/tinymce/tinymce/js/tinymce/skins/lightgray/fonts/tinymce.ttf","aefbfcb02f143d3b3d3e47ff3de8efb1"],["/js/tinymce/tinymce/js/tinymce/skins/lightgray/fonts/tinymce.woff","a7a41ea9358b658ec53e9d042334c1a8"],["/js/tinymce/tinymce/js/tinymce/skins/lightgray/img/anchor.gif","abd3613571800fdcc891181d5f34f840"],["/js/tinymce/tinymce/js/tinymce/skins/lightgray/img/loader.gif","394bafc3cc4dfb3a0ee48c1f54669539"],["/js/tinymce/tinymce/js/tinymce/skins/lightgray/img/object.gif","f3726450d7457d750a2f4d9441c7ee20"],["/js/tinymce/tinymce/js/tinymce/skins/lightgray/img/trans.gif","12bf9e19374920de3146a64775f46a5e"],["/js/tinymce/tinymce/js/tinymce/skins/lightgray/skin.min.css","b7da29baf0549e017bdeaa2d836db37b"],["/js/tinymce/tinymce/js/tinymce/themes/inlite/theme.min.js","bf1d945945d6748aad3efed41f3f12ef"],["/js/tinymce/tinymce/js/tinymce/themes/modern/theme.min.js","75c97923eb04944e60b3659633f6fc8f"],["/js/tinymce/tinymce/js/tinymce/tinymce.min.js","530c6b6997d4d97963d90f0861c83dd0"],["/launcher-icon-2x.png","dbac950e21bc27469fd8b35a0abfb2c8"],["/launcher-icon-3x.png","90305d6faac8a233a771c5c460331f1d"],["/launcher-icon-4x.png","1da3c16fd62073db4f80433bb87ac880"],["/logo.jpg","54c13d142b6eb5dbd4b91ef1d3047234"],["/service-worker.js","4bace71c8634723a883fdf09ebc98b5e"]];
var cacheName = 'sw-precache-v3-yucan-webshop-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = '/dist/';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '/dist/index.html';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});


// *** Start of auto-included sw-toolbox code. ***
/* 
 Copyright 2016 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.toolbox=e()}}(function(){return function e(t,n,r){function o(c,s){if(!n[c]){if(!t[c]){var a="function"==typeof require&&require;if(!s&&a)return a(c,!0);if(i)return i(c,!0);var u=new Error("Cannot find module '"+c+"'");throw u.code="MODULE_NOT_FOUND",u}var f=n[c]={exports:{}};t[c][0].call(f.exports,function(e){var n=t[c][1][e];return o(n?n:e)},f,f.exports,e,t,n,r)}return n[c].exports}for(var i="function"==typeof require&&require,c=0;c<r.length;c++)o(r[c]);return o}({1:[function(e,t,n){"use strict";function r(e,t){t=t||{};var n=t.debug||m.debug;n&&console.log("[sw-toolbox] "+e)}function o(e){var t;return e&&e.cache&&(t=e.cache.name),t=t||m.cache.name,caches.open(t)}function i(e,t){t=t||{};var n=t.successResponses||m.successResponses;return fetch(e.clone()).then(function(r){return"GET"===e.method&&n.test(r.status)&&o(t).then(function(n){n.put(e,r).then(function(){var r=t.cache||m.cache;(r.maxEntries||r.maxAgeSeconds)&&r.name&&c(e,n,r)})}),r.clone()})}function c(e,t,n){var r=s.bind(null,e,t,n);d=d?d.then(r):r()}function s(e,t,n){var o=e.url,i=n.maxAgeSeconds,c=n.maxEntries,s=n.name,a=Date.now();return r("Updating LRU order for "+o+". Max entries is "+c+", max age is "+i),g.getDb(s).then(function(e){return g.setTimestampForUrl(e,o,a)}).then(function(e){return g.expireEntries(e,c,i,a)}).then(function(e){r("Successfully updated IDB.");var n=e.map(function(e){return t.delete(e)});return Promise.all(n).then(function(){r("Done with cache cleanup.")})}).catch(function(e){r(e)})}function a(e,t,n){return r("Renaming cache: ["+e+"] to ["+t+"]",n),caches.delete(t).then(function(){return Promise.all([caches.open(e),caches.open(t)]).then(function(t){var n=t[0],r=t[1];return n.keys().then(function(e){return Promise.all(e.map(function(e){return n.match(e).then(function(t){return r.put(e,t)})}))}).then(function(){return caches.delete(e)})})})}function u(e,t){return o(t).then(function(t){return t.add(e)})}function f(e,t){return o(t).then(function(t){return t.delete(e)})}function h(e){e instanceof Promise||p(e),m.preCacheItems=m.preCacheItems.concat(e)}function p(e){var t=Array.isArray(e);if(t&&e.forEach(function(e){"string"==typeof e||e instanceof Request||(t=!1)}),!t)throw new TypeError("The precache method expects either an array of strings and/or Requests or a Promise that resolves to an array of strings and/or Requests.");return e}function l(e,t,n){if(!e)return!1;if(t){var r=e.headers.get("date");if(r){var o=new Date(r);if(o.getTime()+1e3*t<n)return!1}}return!0}var d,m=e("./options"),g=e("./idb-cache-expiration");t.exports={debug:r,fetchAndCache:i,openCache:o,renameCache:a,cache:u,uncache:f,precache:h,validatePrecacheInput:p,isResponseFresh:l}},{"./idb-cache-expiration":2,"./options":4}],2:[function(e,t,n){"use strict";function r(e){return new Promise(function(t,n){var r=indexedDB.open(u+e,f);r.onupgradeneeded=function(){var e=r.result.createObjectStore(h,{keyPath:p});e.createIndex(l,l,{unique:!1})},r.onsuccess=function(){t(r.result)},r.onerror=function(){n(r.error)}})}function o(e){return e in d||(d[e]=r(e)),d[e]}function i(e,t,n){return new Promise(function(r,o){var i=e.transaction(h,"readwrite"),c=i.objectStore(h);c.put({url:t,timestamp:n}),i.oncomplete=function(){r(e)},i.onabort=function(){o(i.error)}})}function c(e,t,n){return t?new Promise(function(r,o){var i=1e3*t,c=[],s=e.transaction(h,"readwrite"),a=s.objectStore(h),u=a.index(l);u.openCursor().onsuccess=function(e){var t=e.target.result;if(t&&n-i>t.value[l]){var r=t.value[p];c.push(r),a.delete(r),t.continue()}},s.oncomplete=function(){r(c)},s.onabort=o}):Promise.resolve([])}function s(e,t){return t?new Promise(function(n,r){var o=[],i=e.transaction(h,"readwrite"),c=i.objectStore(h),s=c.index(l),a=s.count();s.count().onsuccess=function(){var e=a.result;e>t&&(s.openCursor().onsuccess=function(n){var r=n.target.result;if(r){var i=r.value[p];o.push(i),c.delete(i),e-o.length>t&&r.continue()}})},i.oncomplete=function(){n(o)},i.onabort=r}):Promise.resolve([])}function a(e,t,n,r){return c(e,n,r).then(function(n){return s(e,t).then(function(e){return n.concat(e)})})}var u="sw-toolbox-",f=1,h="store",p="url",l="timestamp",d={};t.exports={getDb:o,setTimestampForUrl:i,expireEntries:a}},{}],3:[function(e,t,n){"use strict";function r(e){var t=a.match(e.request);t?e.respondWith(t(e.request)):a.default&&"GET"===e.request.method&&0===e.request.url.indexOf("http")&&e.respondWith(a.default(e.request))}function o(e){s.debug("activate event fired");var t=u.cache.name+"$$$inactive$$$";e.waitUntil(s.renameCache(t,u.cache.name))}function i(e){return e.reduce(function(e,t){return e.concat(t)},[])}function c(e){var t=u.cache.name+"$$$inactive$$$";s.debug("install event fired"),s.debug("creating cache ["+t+"]"),e.waitUntil(s.openCache({cache:{name:t}}).then(function(e){return Promise.all(u.preCacheItems).then(i).then(s.validatePrecacheInput).then(function(t){return s.debug("preCache list: "+(t.join(", ")||"(none)")),e.addAll(t)})}))}e("serviceworker-cache-polyfill");var s=e("./helpers"),a=e("./router"),u=e("./options");t.exports={fetchListener:r,activateListener:o,installListener:c}},{"./helpers":1,"./options":4,"./router":6,"serviceworker-cache-polyfill":16}],4:[function(e,t,n){"use strict";var r;r=self.registration?self.registration.scope:self.scope||new URL("./",self.location).href,t.exports={cache:{name:"$$$toolbox-cache$$$"+r+"$$$",maxAgeSeconds:null,maxEntries:null},debug:!1,networkTimeoutSeconds:null,preCacheItems:[],successResponses:/^0|([123]\d\d)|(40[14567])|410$/}},{}],5:[function(e,t,n){"use strict";var r=new URL("./",self.location),o=r.pathname,i=e("path-to-regexp"),c=function(e,t,n,r){t instanceof RegExp?this.fullUrlRegExp=t:(0!==t.indexOf("/")&&(t=o+t),this.keys=[],this.regexp=i(t,this.keys)),this.method=e,this.options=r,this.handler=n};c.prototype.makeHandler=function(e){var t;if(this.regexp){var n=this.regexp.exec(e);t={},this.keys.forEach(function(e,r){t[e.name]=n[r+1]})}return function(e){return this.handler(e,t,this.options)}.bind(this)},t.exports=c},{"path-to-regexp":15}],6:[function(e,t,n){"use strict";function r(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}var o=e("./route"),i=e("./helpers"),c=function(e,t){for(var n=e.entries(),r=n.next(),o=[];!r.done;){var i=new RegExp(r.value[0]);i.test(t)&&o.push(r.value[1]),r=n.next()}return o},s=function(){this.routes=new Map,this.routes.set(RegExp,new Map),this.default=null};["get","post","put","delete","head","any"].forEach(function(e){s.prototype[e]=function(t,n,r){return this.add(e,t,n,r)}}),s.prototype.add=function(e,t,n,c){c=c||{};var s;t instanceof RegExp?s=RegExp:(s=c.origin||self.location.origin,s=s instanceof RegExp?s.source:r(s)),e=e.toLowerCase();var a=new o(e,t,n,c);this.routes.has(s)||this.routes.set(s,new Map);var u=this.routes.get(s);u.has(e)||u.set(e,new Map);var f=u.get(e),h=a.regexp||a.fullUrlRegExp;f.has(h.source)&&i.debug('"'+t+'" resolves to same regex as existing route.'),f.set(h.source,a)},s.prototype.matchMethod=function(e,t){var n=new URL(t),r=n.origin,o=n.pathname;return this._match(e,c(this.routes,r),o)||this._match(e,[this.routes.get(RegExp)],t)},s.prototype._match=function(e,t,n){if(0===t.length)return null;for(var r=0;r<t.length;r++){var o=t[r],i=o&&o.get(e.toLowerCase());if(i){var s=c(i,n);if(s.length>0)return s[0].makeHandler(n)}}return null},s.prototype.match=function(e){return this.matchMethod(e.method,e.url)||this.matchMethod("any",e.url)},t.exports=new s},{"./helpers":1,"./route":5}],7:[function(e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache first ["+e.url+"]",n),i.openCache(n).then(function(t){return t.match(e).then(function(t){var r=n.cache||o.cache,c=Date.now();return i.isResponseFresh(t,r.maxAgeSeconds,c)?t:i.fetchAndCache(e,n)})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],8:[function(e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache only ["+e.url+"]",n),i.openCache(n).then(function(t){return t.match(e).then(function(e){var t=n.cache||o.cache,r=Date.now();if(i.isResponseFresh(e,t.maxAgeSeconds,r))return e})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],9:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: fastest ["+e.url+"]",n),new Promise(function(r,c){var s=!1,a=[],u=function(e){a.push(e.toString()),s?c(new Error('Both cache and network failed: "'+a.join('", "')+'"')):s=!0},f=function(e){e instanceof Response?r(e):u("No result returned")};o.fetchAndCache(e.clone(),n).then(f,u),i(e,t,n).then(f,u)})}var o=e("../helpers"),i=e("./cacheOnly");t.exports=r},{"../helpers":1,"./cacheOnly":8}],10:[function(e,t,n){t.exports={networkOnly:e("./networkOnly"),networkFirst:e("./networkFirst"),cacheOnly:e("./cacheOnly"),cacheFirst:e("./cacheFirst"),fastest:e("./fastest")}},{"./cacheFirst":7,"./cacheOnly":8,"./fastest":9,"./networkFirst":11,"./networkOnly":12}],11:[function(e,t,n){"use strict";function r(e,t,n){n=n||{};var r=n.successResponses||o.successResponses,c=n.networkTimeoutSeconds||o.networkTimeoutSeconds;return i.debug("Strategy: network first ["+e.url+"]",n),i.openCache(n).then(function(t){var s,a,u=[];if(c){var f=new Promise(function(r){s=setTimeout(function(){t.match(e).then(function(e){var t=n.cache||o.cache,c=Date.now(),s=t.maxAgeSeconds;i.isResponseFresh(e,s,c)&&r(e)})},1e3*c)});u.push(f)}var h=i.fetchAndCache(e,n).then(function(e){if(s&&clearTimeout(s),r.test(e.status))return e;throw i.debug("Response was an HTTP error: "+e.statusText,n),a=e,new Error("Bad response")}).catch(function(r){return i.debug("Network or response error, fallback to cache ["+e.url+"]",n),t.match(e).then(function(e){if(e)return e;if(a)return a;throw r})});return u.push(h),Promise.race(u)})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],12:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: network only ["+e.url+"]",n),fetch(e)}var o=e("../helpers");t.exports=r},{"../helpers":1}],13:[function(e,t,n){"use strict";var r=e("./options"),o=e("./router"),i=e("./helpers"),c=e("./strategies"),s=e("./listeners");i.debug("Service Worker Toolbox is loading"),self.addEventListener("install",s.installListener),self.addEventListener("activate",s.activateListener),self.addEventListener("fetch",s.fetchListener),t.exports={networkOnly:c.networkOnly,networkFirst:c.networkFirst,cacheOnly:c.cacheOnly,cacheFirst:c.cacheFirst,fastest:c.fastest,router:o,options:r,cache:i.cache,uncache:i.uncache,precache:i.precache}},{"./helpers":1,"./listeners":3,"./options":4,"./router":6,"./strategies":10}],14:[function(e,t,n){t.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}},{}],15:[function(e,t,n){function r(e,t){for(var n,r=[],o=0,i=0,c="",s=t&&t.delimiter||"/";null!=(n=x.exec(e));){var f=n[0],h=n[1],p=n.index;if(c+=e.slice(i,p),i=p+f.length,h)c+=h[1];else{var l=e[i],d=n[2],m=n[3],g=n[4],v=n[5],w=n[6],y=n[7];c&&(r.push(c),c="");var b=null!=d&&null!=l&&l!==d,E="+"===w||"*"===w,R="?"===w||"*"===w,k=n[2]||s,$=g||v;r.push({name:m||o++,prefix:d||"",delimiter:k,optional:R,repeat:E,partial:b,asterisk:!!y,pattern:$?u($):y?".*":"[^"+a(k)+"]+?"})}}return i<e.length&&(c+=e.substr(i)),c&&r.push(c),r}function o(e,t){return s(r(e,t))}function i(e){return encodeURI(e).replace(/[\/?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function c(e){return encodeURI(e).replace(/[?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function s(e){for(var t=new Array(e.length),n=0;n<e.length;n++)"object"==typeof e[n]&&(t[n]=new RegExp("^(?:"+e[n].pattern+")$"));return function(n,r){for(var o="",s=n||{},a=r||{},u=a.pretty?i:encodeURIComponent,f=0;f<e.length;f++){var h=e[f];if("string"!=typeof h){var p,l=s[h.name];if(null==l){if(h.optional){h.partial&&(o+=h.prefix);continue}throw new TypeError('Expected "'+h.name+'" to be defined')}if(v(l)){if(!h.repeat)throw new TypeError('Expected "'+h.name+'" to not repeat, but received `'+JSON.stringify(l)+"`");if(0===l.length){if(h.optional)continue;throw new TypeError('Expected "'+h.name+'" to not be empty')}for(var d=0;d<l.length;d++){if(p=u(l[d]),!t[f].test(p))throw new TypeError('Expected all "'+h.name+'" to match "'+h.pattern+'", but received `'+JSON.stringify(p)+"`");o+=(0===d?h.prefix:h.delimiter)+p}}else{if(p=h.asterisk?c(l):u(l),!t[f].test(p))throw new TypeError('Expected "'+h.name+'" to match "'+h.pattern+'", but received "'+p+'"');o+=h.prefix+p}}else o+=h}return o}}function a(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function u(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function f(e,t){return e.keys=t,e}function h(e){return e.sensitive?"":"i"}function p(e,t){var n=e.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)t.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return f(e,t)}function l(e,t,n){for(var r=[],o=0;o<e.length;o++)r.push(g(e[o],t,n).source);var i=new RegExp("(?:"+r.join("|")+")",h(n));return f(i,t)}function d(e,t,n){return m(r(e,n),t,n)}function m(e,t,n){v(t)||(n=t||n,t=[]),n=n||{};for(var r=n.strict,o=n.end!==!1,i="",c=0;c<e.length;c++){var s=e[c];if("string"==typeof s)i+=a(s);else{var u=a(s.prefix),p="(?:"+s.pattern+")";t.push(s),s.repeat&&(p+="(?:"+u+p+")*"),p=s.optional?s.partial?u+"("+p+")?":"(?:"+u+"("+p+"))?":u+"("+p+")",i+=p}}var l=a(n.delimiter||"/"),d=i.slice(-l.length)===l;return r||(i=(d?i.slice(0,-l.length):i)+"(?:"+l+"(?=$))?"),i+=o?"$":r&&d?"":"(?="+l+"|$)",f(new RegExp("^"+i,h(n)),t)}function g(e,t,n){return v(t)||(n=t||n,t=[]),n=n||{},e instanceof RegExp?p(e,t):v(e)?l(e,t,n):d(e,t,n)}var v=e("isarray");t.exports=g,t.exports.parse=r,t.exports.compile=o,t.exports.tokensToFunction=s,t.exports.tokensToRegExp=m;var x=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g")},{isarray:14}],16:[function(e,t,n){!function(){var e=Cache.prototype.addAll,t=navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/);if(t)var n=t[1],r=parseInt(t[2]);e&&(!t||"Firefox"===n&&r>=46||"Chrome"===n&&r>=50)||(Cache.prototype.addAll=function(e){function t(e){this.name="NetworkError",this.code=19,this.message=e}var n=this;return t.prototype=Object.create(Error.prototype),Promise.resolve().then(function(){if(arguments.length<1)throw new TypeError;return e=e.map(function(e){return e instanceof Request?e:String(e)}),Promise.all(e.map(function(e){"string"==typeof e&&(e=new Request(e));var n=new URL(e.url).protocol;if("http:"!==n&&"https:"!==n)throw new t("Invalid scheme");return fetch(e.clone())}))}).then(function(r){if(r.some(function(e){return!e.ok}))throw new t("Incorrect response status");return Promise.all(r.map(function(t,r){return n.put(e[r],t)}))}).then(function(){})},Cache.prototype.add=function(e){return this.addAll([e])})}()},{}]},{},[13])(13)});


// *** End of auto-included sw-toolbox code. ***



// Runtime cache configuration, using the sw-toolbox library.

toolbox.router.get(/\/api\/(.*)/, toolbox.networkFirst, {"debug":true});




