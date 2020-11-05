/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "a40a999e6b79c77bbd997ca756c6425f"
  },
  {
    "url": "about/contact.html",
    "revision": "5dbf9a28a39da219ea92c88036af61bf"
  },
  {
    "url": "about/contributing.html",
    "revision": "04a6033d7dd0524e8ae12dc4a2af3eb2"
  },
  {
    "url": "about/index.html",
    "revision": "590c761a7a6f837fa50b60fd41c0f10f"
  },
  {
    "url": "about/license.html",
    "revision": "ec89f18529ca0a3a30e5c43d64a21972"
  },
  {
    "url": "App-Store-EN.png",
    "revision": "93b8fc354362e06b72bc139f9562f3d3"
  },
  {
    "url": "App-Store-FR.jpg",
    "revision": "1de408fdffc08ffb10f9f06087a4f99e"
  },
  {
    "url": "assets/css/0.styles.53aacec5.css",
    "revision": "71898d0f04a7418f26a8c3c8d5e2b179"
  },
  {
    "url": "assets/img/Account-EN.f53e78aa.png",
    "revision": "f53e78aab760de162e33451c93573695"
  },
  {
    "url": "assets/img/Account-FR.9b2a0ecf.png",
    "revision": "9b2a0ecfcd3eed067c584da77a9fdd4e"
  },
  {
    "url": "assets/img/Android-Update-EN.63bc440c.png",
    "revision": "63bc440cd26abc0257d61361e0ffab68"
  },
  {
    "url": "assets/img/Android-Update-FR.72adfab5.png",
    "revision": "72adfab5cff060d81d2a9614970c1c10"
  },
  {
    "url": "assets/img/Event-Archiving-EN.85f9f90d.png",
    "revision": "85f9f90d5d216b891e51691f98d06a82"
  },
  {
    "url": "assets/img/Event-Archiving-FR.ba42d676.png",
    "revision": "ba42d676546547a76b95dd0586ef8949"
  },
  {
    "url": "assets/img/Event-Map-EN.35114c95.png",
    "revision": "35114c9553fec81d58e74effac0ee52d"
  },
  {
    "url": "assets/img/Event-Map-FR.dbb46864.png",
    "revision": "dbb46864a11c6e48cc31de6f89f716d2"
  },
  {
    "url": "assets/img/Event-Workflow-1-EN.a190e1f6.png",
    "revision": "a190e1f6118c460a7551874e9b88a3b4"
  },
  {
    "url": "assets/img/Event-Workflow-1-FR.95c07da8.png",
    "revision": "95c07da88dbd95542cf1c0c72a4bca4a"
  },
  {
    "url": "assets/img/Event-Workflow-2-EN.b31bfada.png",
    "revision": "b31bfadaea1367555793092b3c048d17"
  },
  {
    "url": "assets/img/Event-Workflow-2-FR.743e85f3.png",
    "revision": "743e85f30254e32ee93d3c138d8d8ff5"
  },
  {
    "url": "assets/img/Events-Chart-EN.aacd4fa0.png",
    "revision": "aacd4fa0b0294a56dcd5b0634d9ceade"
  },
  {
    "url": "assets/img/Events-Chart-FR.5c81e6a6.png",
    "revision": "5c81e6a6f7f0cedc213a0a79e9e744cc"
  },
  {
    "url": "assets/img/Events-HeatMap-EN.9251b4a7.png",
    "revision": "9251b4a7824e95c2e4793e7ae2b8b721"
  },
  {
    "url": "assets/img/Events-HeatMap-FR.f50fec48.png",
    "revision": "f50fec4868c33a81fc38d55438ec36a4"
  },
  {
    "url": "assets/img/Events-Map.3898da6b.png",
    "revision": "3898da6b386389e89f963c90a6065c3f"
  },
  {
    "url": "assets/img/gfs.ffb926a4.jpg",
    "revision": "ffb926a428b9eb480321043a85b53b90"
  },
  {
    "url": "assets/img/gsmap.13795c39.png",
    "revision": "13795c3944450435d043e700c8a2cf40"
  },
  {
    "url": "assets/img/hydrometrie-hubeau.c58257a8.jpg",
    "revision": "c58257a89559371d967290e9b2093a7a"
  },
  {
    "url": "assets/img/ign_orthohr.1bee8004.jpg",
    "revision": "1bee8004894c6e3480f58759fe464b43"
  },
  {
    "url": "assets/img/Interaction-EN.fd9290da.png",
    "revision": "fd9290da3ebf5e295b3931ecf6398639"
  },
  {
    "url": "assets/img/Interaction-FR.77b2aae6.png",
    "revision": "77b2aae60160b1bee3991b1ec6895afe"
  },
  {
    "url": "assets/img/mapillary.142775ec.jpg",
    "revision": "142775ec435348e6da778ccfae38dfd4"
  },
  {
    "url": "assets/img/openaq.30e27655.png",
    "revision": "30e2765529670f52c3aa535c9e6999f9"
  },
  {
    "url": "assets/img/openstreetmap.787b1c2f.png",
    "revision": "787b1c2f2859022794591af3cbd22b89"
  },
  {
    "url": "assets/img/planetsat.5f348342.jpg",
    "revision": "5f3483426522cc8076496f13ca724a3d"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/img/structure-EN.02adbeb3.png",
    "revision": "02adbeb3dd25e5bd4093fab3935fa351"
  },
  {
    "url": "assets/img/structure-FR.be5bb2b6.png",
    "revision": "be5bb2b6f0f711403751c36971f8c8a0"
  },
  {
    "url": "assets/img/teleray.55cb7aee.jpg",
    "revision": "55cb7aee0db52e2a80869acf8db393c9"
  },
  {
    "url": "assets/img/Tour-EN.1c09b422.png",
    "revision": "1c09b422c4edfdb10c0964760f961f87"
  },
  {
    "url": "assets/img/Tour-FR.04071a69.png",
    "revision": "04071a69e42d740510ee470b4fa0d75c"
  },
  {
    "url": "assets/img/user-organisations.df6c1591.png",
    "revision": "df6c15912d1c3f515e47ea7dc8e9b8be"
  },
  {
    "url": "assets/img/vigicrues.ad945a8b.jpg",
    "revision": "ad945a8bad74bd87adf11b6146982383"
  },
  {
    "url": "assets/js/10.47abdcc1.js",
    "revision": "dd2b8f38982f4eeee23b65e72e57dbfe"
  },
  {
    "url": "assets/js/11.885ae7eb.js",
    "revision": "f01f4be05655089dbb005c15cbb4bef9"
  },
  {
    "url": "assets/js/12.ba26abc1.js",
    "revision": "5108d25e5a33cea485da3260c0180646"
  },
  {
    "url": "assets/js/13.5e9c3930.js",
    "revision": "07e3b1a8fe8596bb38d9f2288e786a47"
  },
  {
    "url": "assets/js/14.45749716.js",
    "revision": "4cb3a8e8a11bb205ea81fac567c39766"
  },
  {
    "url": "assets/js/15.ca22c66b.js",
    "revision": "08f577a91b1d25c21ff7e2d6e328839c"
  },
  {
    "url": "assets/js/16.5db03bc1.js",
    "revision": "5a3f66eb084a9b3534503bb0447c04a9"
  },
  {
    "url": "assets/js/17.aa8388b5.js",
    "revision": "47f832d0d85f346dd6e76ea5d920ec5c"
  },
  {
    "url": "assets/js/18.20b8fc0d.js",
    "revision": "b185c264d6d41e790b3776862af6c287"
  },
  {
    "url": "assets/js/19.bf0b1b94.js",
    "revision": "bdf7823418e5120214dc413e6a7ad87d"
  },
  {
    "url": "assets/js/2.b01df8ec.js",
    "revision": "f6aef1fa26ed00b4ae716a76dd71aa19"
  },
  {
    "url": "assets/js/20.9147eb05.js",
    "revision": "329d979d3bf1adc115f9ed0875506c6e"
  },
  {
    "url": "assets/js/21.882125b5.js",
    "revision": "41c4690dbb58e228d11c8b190d38064f"
  },
  {
    "url": "assets/js/22.01989747.js",
    "revision": "9c873328e6ab81f36d49e39fefc1facd"
  },
  {
    "url": "assets/js/23.d1270d30.js",
    "revision": "eb8fb55d5c058e027f7d61131938ea90"
  },
  {
    "url": "assets/js/24.f4c151f9.js",
    "revision": "1db0a152b4f79db6cba696a196dc7fab"
  },
  {
    "url": "assets/js/25.9b4d9ee2.js",
    "revision": "91b8186c574751a318cc547f1589379f"
  },
  {
    "url": "assets/js/26.1ff3c2a1.js",
    "revision": "e5d1f06cbd926ac0fdebb413b5e855a4"
  },
  {
    "url": "assets/js/27.b23c8c85.js",
    "revision": "6d81e283becf52aca15810e039bebfc7"
  },
  {
    "url": "assets/js/28.16140262.js",
    "revision": "e0c26f9f9b9cbc7dc8b0509f232fc94f"
  },
  {
    "url": "assets/js/29.18b639f2.js",
    "revision": "b67f9a9c8d2204c77fd63a778e78ebcb"
  },
  {
    "url": "assets/js/3.e8c4216f.js",
    "revision": "6beb8f7116f76813d339ae825afc6a6f"
  },
  {
    "url": "assets/js/30.9ebb5ecb.js",
    "revision": "4a647efe0d8e8d3b8485fb0a8f74844e"
  },
  {
    "url": "assets/js/31.7679ba18.js",
    "revision": "b0c81dee21345b0498823340af87b6ce"
  },
  {
    "url": "assets/js/32.9ebb4925.js",
    "revision": "a3c61e3b0c2da79768c4993898c2b12b"
  },
  {
    "url": "assets/js/33.2a62420d.js",
    "revision": "9905f7206ec30a76426bc23064aee3c9"
  },
  {
    "url": "assets/js/34.fc6db148.js",
    "revision": "c4968ee3fc3a53e34e721dcaca111f3f"
  },
  {
    "url": "assets/js/35.0dac0c41.js",
    "revision": "c7afff23b3d3f5779357d0e5b885f1b1"
  },
  {
    "url": "assets/js/36.020b87e1.js",
    "revision": "56bc6fd251c78e36e9c03f43e7fbddd1"
  },
  {
    "url": "assets/js/37.ee949510.js",
    "revision": "b49e92003ebd472552af98b3e3e9c023"
  },
  {
    "url": "assets/js/38.e97831db.js",
    "revision": "2865f74b0dde1002c203db6c4112168d"
  },
  {
    "url": "assets/js/39.b1af72ab.js",
    "revision": "97ac15ba274e5ddae7f6de3dc020c1eb"
  },
  {
    "url": "assets/js/4.b312d3eb.js",
    "revision": "8f257f12b1b8a6badadaffe1f3133bbc"
  },
  {
    "url": "assets/js/40.82fe6007.js",
    "revision": "232760849062c85577c19295961f5834"
  },
  {
    "url": "assets/js/41.10412967.js",
    "revision": "bf8d2983660a63e5b53b2a81fdaa1074"
  },
  {
    "url": "assets/js/42.270d907d.js",
    "revision": "36cab39cbabb6188414d49b194081065"
  },
  {
    "url": "assets/js/43.dcb67803.js",
    "revision": "a661addf1a37db0c47323fab2fbf8628"
  },
  {
    "url": "assets/js/5.96a6e4e6.js",
    "revision": "28454429799ae84cc4186c29a51f60d9"
  },
  {
    "url": "assets/js/6.b4a59d4e.js",
    "revision": "992c9296c96b560fd861dcd08aefac2f"
  },
  {
    "url": "assets/js/7.c24f2aca.js",
    "revision": "54e52d6c531f5e7b4a4393f431679c61"
  },
  {
    "url": "assets/js/8.03233a63.js",
    "revision": "1319ea29c2098553f7da37c04e434848"
  },
  {
    "url": "assets/js/9.6fe85751.js",
    "revision": "eb6e7a99c9aa76bcf4170bf337a8b5e7"
  },
  {
    "url": "assets/js/app.b160c278.js",
    "revision": "b3e06fbdc05d7f6ed40a4ae71dcc5257"
  },
  {
    "url": "fr/about/contact.html",
    "revision": "b3d62c9b7b653061553796461a5a175d"
  },
  {
    "url": "fr/about/contributing.html",
    "revision": "475e1fe4ba8a8f80a49e88a8b03e9333"
  },
  {
    "url": "fr/about/index.html",
    "revision": "20a99919cc6d72afdf869d26d86ca00a"
  },
  {
    "url": "fr/about/license.html",
    "revision": "19d0b74838fa483c4cecf0d2c19511c0"
  },
  {
    "url": "fr/gofurther/alert.html",
    "revision": "7e8e3300298a1a068efaafb412852af9"
  },
  {
    "url": "fr/gofurther/archiving.html",
    "revision": "03b8988b29ed088592b502f9fe199dac"
  },
  {
    "url": "fr/gofurther/catalog.html",
    "revision": "178f13813497c1fb5c889942683d453b"
  },
  {
    "url": "fr/gofurther/index.html",
    "revision": "9c41cdd74cc1a31a7d92209dbd6294cb"
  },
  {
    "url": "fr/gofurther/workflow.html",
    "revision": "44b917ac0badc6628c1bc35845b8ccc1"
  },
  {
    "url": "fr/index.html",
    "revision": "cd18fa95f0f676c6c03dae0cad8dce03"
  },
  {
    "url": "fr/quickstart/benefits.html",
    "revision": "ecfcb2ab92f47f060b1493cde949f723"
  },
  {
    "url": "fr/quickstart/concepts.html",
    "revision": "e9f39ac7391b66955dbb39bb6e4fd43c"
  },
  {
    "url": "fr/quickstart/features.html",
    "revision": "a8b43f73a2587a9047f0a343c1594787"
  },
  {
    "url": "fr/quickstart/index.html",
    "revision": "0d511cdf7a7fcf45731198f0ed2219fb"
  },
  {
    "url": "fr/quickstart/installation.html",
    "revision": "3dea7cf13b016f6f42c69a60cbfecf05"
  },
  {
    "url": "fr/quickstart/update.html",
    "revision": "aa7fab07a43e5fa199766b7c639fc4ef"
  },
  {
    "url": "gofurther/alert.html",
    "revision": "5af862a8d9a8f06de8e6fc3c2d6bba7e"
  },
  {
    "url": "gofurther/archiving.html",
    "revision": "503a9550528c5da405ae3a6aae54dba5"
  },
  {
    "url": "gofurther/catalog.html",
    "revision": "cc50c8503b963770198838cd0579214c"
  },
  {
    "url": "gofurther/index.html",
    "revision": "2d27a62752a2b786a1a6ef3d2b74ad62"
  },
  {
    "url": "gofurther/workflow.html",
    "revision": "da2b7040cef2af9bbe866a45c898e581"
  },
  {
    "url": "Google-Play-EN.png",
    "revision": "22686a6e0bf60534bc836b5e9e9353fb"
  },
  {
    "url": "Google-Play-FR.png",
    "revision": "e6fcc3304b2bbd83d18144ed4962d1cf"
  },
  {
    "url": "index.html",
    "revision": "8792b1b58376358d4bc59feef93d4b02"
  },
  {
    "url": "quickstart/benefits.html",
    "revision": "6fe27abe49ac04c5247351c3f3092684"
  },
  {
    "url": "quickstart/concepts.html",
    "revision": "eef1fe4df9ee1f9ca236256d64daffae"
  },
  {
    "url": "quickstart/features.html",
    "revision": "c4811a1e667c69a901ccbe538a4093bc"
  },
  {
    "url": "quickstart/index.html",
    "revision": "322740efcc8de822eb54f903fc2b4379"
  },
  {
    "url": "quickstart/installation.html",
    "revision": "e1ba0549e5f464b4bea00c17b40ba1b1"
  },
  {
    "url": "quickstart/update.html",
    "revision": "79a49cfbd6e4448e79f6b6756e46f8d2"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
