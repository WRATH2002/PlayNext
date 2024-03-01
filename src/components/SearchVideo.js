import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { SEARCH_TEXT_API } from "../utils/constants";
import SearchVideosCard from "./SearchVideosCard";

const vidData = [
  {
    kind: "youtube#searchResult",
    etag: "4ZSt-VoIQVslgPbPJojAH_JYjYI",
    id: {
      kind: "youtube#video",
      videoId: "gHnWkmW6qRI",
    },
    snippet: {
      publishedAt: "2023-07-29T01:45:01Z",
      channelId: "UCfCv0ckR89HTy2ASEgZHNSg",
      title:
        "A For Apple B For Ball I Abcd Song I Abcd Rhymes I Abc Song Nursery Rhymes I Happy Bachpan",
      description:
        "A For Apple B For Ball C For Cat D For Dog Nursery Rhyme by Shaan is a preschool/kindergarten song that will help kids and ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/gHnWkmW6qRI/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/gHnWkmW6qRI/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/gHnWkmW6qRI/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Happy Bachpan",
      liveBroadcastContent: "none",
      publishTime: "2023-07-29T01:45:01Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "l4t3isUtuQZhHi7M8TDSef5t8NI",
    id: {
      kind: "youtube#video",
      videoId: "oefBfed016I",
    },
    snippet: {
      publishedAt: "2024-02-04T20:57:46Z",
      channelId: "UCIMasKY5YlgzcOmxVW4loaw",
      title: "Unlocking My Tesla With Apple Vision Pro 😈",
      description: "",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/oefBfed016I/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/oefBfed016I/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/oefBfed016I/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Tesla Flex",
      liveBroadcastContent: "none",
      publishTime: "2024-02-04T20:57:46Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "-8xTNl-wjMXbM-esThC5jufl1ug",
    id: {
      kind: "youtube#video",
      videoId: "hq3yfQnllfQ",
    },
    snippet: {
      publishedAt: "2014-03-06T20:57:50Z",
      channelId: "UCBnZ16ahKA2DZ_T5W0FPUXg",
      title:
        "Phonics Song with TWO Words - A For Apple - ABC Alphabet Songs with Sounds for Children",
      description:
        "This song is available to listen on all music streaming platforms.- https://orcd.co/chuchutvhits To download and watch this video ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/hq3yfQnllfQ/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/hq3yfQnllfQ/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/hq3yfQnllfQ/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "ChuChu TV Nursery Rhymes & Kids Songs",
      liveBroadcastContent: "none",
      publishTime: "2014-03-06T20:57:50Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "FAIFaJc0BixIlEMnZ-HzN-NrMlQ",
    id: {
      kind: "youtube#video",
      videoId: "cShtHM7cFR0",
    },
    snippet: {
      publishedAt: "2024-02-19T18:23:36Z",
      channelId: "UCBJycsmduvYEL83R_U4JriQ",
      title: "This Airless Basketball is 3D Printed!",
      description: "",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/cShtHM7cFR0/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/cShtHM7cFR0/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/cShtHM7cFR0/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Marques Brownlee",
      liveBroadcastContent: "none",
      publishTime: "2024-02-19T18:23:36Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "tQLS19-64YRyLDrEYfj0xCMFnuw",
    id: {
      kind: "youtube#video",
      videoId: "OuskxtK0C6s",
    },
    snippet: {
      publishedAt: "2023-07-12T00:30:10Z",
      channelId: "UCrZ5za3HHU3Aj1BvoeCVOhw",
      title:
        "A for apple | अ से अनार | abcd | phonics song | a for apple b for ball c for cat | abcd song | abcde",
      description:
        "A for apple | अ से अनार | abcd | phonics song | a for apple b for ball c for cat | abcd song | abcde #abcd #nurseryrhymes #art ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/OuskxtK0C6s/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/OuskxtK0C6s/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/OuskxtK0C6s/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Funnywe🙃",
      liveBroadcastContent: "none",
      publishTime: "2023-07-12T00:30:10Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "CzyFsxXa87dmS4iyqi7JXO9huho",
    id: {
      kind: "youtube#video",
      videoId: "uOJezpK3m88",
    },
    snippet: {
      publishedAt: "2024-01-31T10:30:30Z",
      channelId: "UCiKJTsaE8EXi4GRz6q3-N4A",
      title:
        "ABC song | nursery rhymes | abc phonics song for toddlers | a for apple",
      description:
        "abc phonics songs , Nursery rhymes | phonics song ABC Phonics song , ABC song , Alphabet song , Kids songs , Nursery ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/uOJezpK3m88/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/uOJezpK3m88/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/uOJezpK3m88/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "ABC kid's katta",
      liveBroadcastContent: "none",
      publishTime: "2024-01-31T10:30:30Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "5HzlL8eMKzLMCor8Yjvb_X66hrQ",
    id: {
      kind: "youtube#video",
      videoId: "ooxTUI9-IWI",
    },
    snippet: {
      publishedAt: "2024-02-16T05:47:13Z",
      channelId: "UCMOLiZpKXp-w5CNfqJObQUw",
      title: "She BROKE my Apple vision pro’s 😡😂",
      description: "",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/ooxTUI9-IWI/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/ooxTUI9-IWI/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/ooxTUI9-IWI/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "KEEMOKAZI",
      liveBroadcastContent: "none",
      publishTime: "2024-02-16T05:47:13Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "5w3EOk45WpqT5lHkE2539qBUSoE",
    id: {
      kind: "youtube#video",
      videoId: "vZPzz0N-J38",
    },
    snippet: {
      publishedAt: "2024-02-27T23:00:10Z",
      channelId: "UCCOrp7GPgZA8EGrbOcIAsyQ",
      title: "The Apple Vision Pro Is… Unrepairable?",
      description:
        "Try Out Nord VPN for yourself! Risk-free with a 30 day Money Back Guarantee https://nordvpn.com/prg In this video, we assess ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/vZPzz0N-J38/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/vZPzz0N-J38/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/vZPzz0N-J38/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Phone Repair Guru",
      liveBroadcastContent: "none",
      publishTime: "2024-02-27T23:00:10Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "VsWQG58_YMkChHchXT-zVYAxpDg",
    id: {
      kind: "youtube#video",
      videoId: "Lt31HQHqWdc",
    },
    snippet: {
      publishedAt: "2024-02-27T21:56:22Z",
      channelId: "UCoi3Uk6JtP9QgA5BRwnh6NQ",
      title: "Why Apple Canceled The Apple Car...",
      description:
        "After 10 years of development and millions of dollars spent, Apple has decided to cancel their ambitious Apple Car project... but ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/Lt31HQHqWdc/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/Lt31HQHqWdc/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/Lt31HQHqWdc/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "GregsGadgets",
      liveBroadcastContent: "none",
      publishTime: "2024-02-27T21:56:22Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "XKuWmZjxzofUMbVHIQN3jbkXmjU",
    id: {
      kind: "youtube#video",
      videoId: "BkhCePcY-MI",
    },
    snippet: {
      publishedAt: "2022-10-05T13:30:07Z",
      channelId: "UCOh01Sv2bdi_hjci9tOH7Mg",
      title:
        "Grandpa 🇮🇳 👴 Eating Emoji🤪 Apple 🍎 Coconut 🥥 Banana 🍌 3 Emoji 😜#shorts #ytshorts #challenge",
      description:
        "Grandpa Eating Emoji   Apple Coconut Banana 3 Emoji #shorts #ytshorts #challenge.",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/BkhCePcY-MI/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/BkhCePcY-MI/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/BkhCePcY-MI/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Aja Kitchen",
      liveBroadcastContent: "none",
      publishTime: "2022-10-05T13:30:07Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "n5hDk6KlxjZYatzcxUpkzj9amO0",
    id: {
      kind: "youtube#video",
      videoId: "TX9qSaGXFyg",
    },
    snippet: {
      publishedAt: "2023-06-05T19:08:16Z",
      channelId: "UCE_M8A5yxnLfW0KghEeajjw",
      title: "Introducing Apple Vision Pro",
      description:
        "The era of spatial computing is here, where digital content blends seamlessly with your physical space. So you can do the things ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/TX9qSaGXFyg/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/TX9qSaGXFyg/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/TX9qSaGXFyg/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Apple",
      liveBroadcastContent: "none",
      publishTime: "2023-06-05T19:08:16Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "Ozx_xQCGK9X_b0XAkQr8pQXzSSw",
    id: {
      kind: "youtube#video",
      videoId: "1DU_ugXyoxM",
    },
    snippet: {
      publishedAt: "2024-02-22T23:07:13Z",
      channelId: "UCVj2aIJYrMrHea7KcFDkPzA",
      title: "Trying the Apple Vision Pros for the first time 😳",
      description: "",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/1DU_ugXyoxM/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/1DU_ugXyoxM/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/1DU_ugXyoxM/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Nick Wilkins",
      liveBroadcastContent: "none",
      publishTime: "2024-02-22T23:07:13Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "uvAtUmnFRELwgQYs_VrwkHKkWRI",
    id: {
      kind: "youtube#video",
      videoId: "-S1RsBwSw74",
    },
    snippet: {
      publishedAt: "2023-02-27T16:19:57Z",
      channelId: "UCCOrp7GPgZA8EGrbOcIAsyQ",
      title:
        "Fake $30 Apple Pencil Vs Real $120 Apple Pencil (2nd gen) #Shorts",
      description:
        "Join this channel to get access to perks: https://www.youtube.com/channel/UCCOrp7GPgZA8EGrbOcIAsyQ/join Thank you for ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/-S1RsBwSw74/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/-S1RsBwSw74/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/-S1RsBwSw74/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Phone Repair Guru",
      liveBroadcastContent: "none",
      publishTime: "2023-02-27T16:19:57Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "eZEjZpL9euLzZjQSIaCo8m0IJSo",
    id: {
      kind: "youtube#video",
      videoId: "i4ufQYYVwco",
    },
    snippet: {
      publishedAt: "2023-06-15T21:20:34Z",
      channelId: "UCZbDycYPRMKxFiEeBTAcmnw",
      title: "Future Apple Products",
      description: "",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/i4ufQYYVwco/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/i4ufQYYVwco/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/i4ufQYYVwco/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Ali Koca",
      liveBroadcastContent: "none",
      publishTime: "2023-06-15T21:20:34Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "Swa9bUMsNMnH4vjcKuK-DrTDV3c",
    id: {
      kind: "youtube#video",
      videoId: "qIggzMAxiHU",
    },
    snippet: {
      publishedAt: "2024-02-17T01:09:46Z",
      channelId: "UCcd4iyTC0KkHPgfJmcDY2bw",
      title:
        "BATMAN: When you steal the Apple Vision Pro in Gotham #batman #shorts #apple w/ @DarrylMayes",
      description: "",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/qIggzMAxiHU/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/qIggzMAxiHU/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/qIggzMAxiHU/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Gavinblake23",
      liveBroadcastContent: "none",
      publishTime: "2024-02-17T01:09:46Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "9WS4bsfVrB0Moz1DUpDnSdPiXp8",
    id: {
      kind: "youtube#video",
      videoId: "cK7jkRuRTJk",
    },
    snippet: {
      publishedAt: "2024-02-10T18:19:09Z",
      channelId: "UCVAbWl3d3XuHY28wU9DoDpA",
      title: "FIRST TIME USING APPLE VISION PRO",
      description: "",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/cK7jkRuRTJk/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/cK7jkRuRTJk/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/cK7jkRuRTJk/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "pierson",
      liveBroadcastContent: "none",
      publishTime: "2024-02-10T18:19:09Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "2qcjfxHAbmu7auwBKawNePtKlc8",
    id: {
      kind: "youtube#video",
      videoId: "QXwT3u2Obrk",
    },
    snippet: {
      publishedAt: "2024-02-26T19:21:52Z",
      channelId: "UCiQMYozSSTkJ2twtZM1bG9w",
      title: "iOS 18 Redesign, A Smart Ring and iPhone 16 Pro",
      description:
        "iOS 18 Design, A Smart Ring and iPhone 16 Pro - iOS 18 Design is expected to be an overhaul, but not exactly like visionOS, ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/QXwT3u2Obrk/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/QXwT3u2Obrk/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/QXwT3u2Obrk/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "zollotech",
      liveBroadcastContent: "none",
      publishTime: "2024-02-26T19:21:52Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "2qvo35_ul1vOpixhrjZFPbs9bzo",
    id: {
      kind: "youtube#video",
      videoId: "dtp6b76pMak",
    },
    snippet: {
      publishedAt: "2024-01-31T14:52:28Z",
      channelId: "UCBJycsmduvYEL83R_U4JriQ",
      title: "Using Apple Vision Pro: What It’s Actually Like!",
      description:
        "Everything you need to know about using Apple Vision Pro Vision Pro Review: https://youtu.be/86Gy035z_KA Apple's Forbidden ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/dtp6b76pMak/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/dtp6b76pMak/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/dtp6b76pMak/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Marques Brownlee",
      liveBroadcastContent: "none",
      publishTime: "2024-01-31T14:52:28Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "XKnjalw8xYINxmcy2p60W_qdmqk",
    id: {
      kind: "youtube#video",
      videoId: "cwl3vr6RCuM",
    },
    snippet: {
      publishedAt: "2024-02-27T19:52:26Z",
      channelId: "UCUvvj5lwue7PspotMDjk5UA",
      title: "Apple JUST Canceled the Apple Car | Warning for Tesla.",
      description:
        "EXPIRING SOON ⚠️ Wealth, Income, and Investing Courses with private livestreams at https://meetkevin.com ⚠️ Real Estate ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/cwl3vr6RCuM/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/cwl3vr6RCuM/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/cwl3vr6RCuM/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Meet Kevin",
      liveBroadcastContent: "none",
      publishTime: "2024-02-27T19:52:26Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "mxzGAAjeEAv42lL0o2QXcRcR7gg",
    id: {
      kind: "youtube#video",
      videoId: "vZ5--7YWxBc",
    },
    snippet: {
      publishedAt: "2024-02-10T21:45:47Z",
      channelId: "UCDka4-WyKGDSS8j2AR18K_Q",
      title: "LENTE FUTURISTA vs APPLE VISION PRO",
      description:
        "O novo Apple Vision Pro Review chegou e já está com seus dias contados de acordo com a Mojo Vision. Eles lançaram um ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/vZ5--7YWxBc/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/vZ5--7YWxBc/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/vZ5--7YWxBc/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "TecnoGeek",
      liveBroadcastContent: "none",
      publishTime: "2024-02-10T21:45:47Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "CfhPQtlhp190cIGCV9ILdyebKjQ",
    id: {
      kind: "youtube#video",
      videoId: "YXicsj3oXEA",
    },
    snippet: {
      publishedAt: "2023-06-17T10:58:10Z",
      channelId: "UC9zyXRd97WhPvDUWPrJFuIQ",
      title: "The Pierced Heart and the Poisoned Apple 💘🍏",
      description:
        "Let's talk about that cheeky poisoned apple. It's not your ordinary apple, my friends. Nope, it's the epitome of temptation with a side ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/YXicsj3oXEA/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/YXicsj3oXEA/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/YXicsj3oXEA/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "thelovelyhorrorshow",
      liveBroadcastContent: "none",
      publishTime: "2023-06-17T10:58:10Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "JZbeXHq6zS_S1Cxpj-hP1_qsres",
    id: {
      kind: "youtube#video",
      videoId: "ezCKGT7XPQo",
    },
    snippet: {
      publishedAt: "2024-02-27T20:39:11Z",
      channelId: "UCIALMKvObZNtJ6AmdCLP7Lg",
      title: "Apple Pulls Plug on Electric Car Plans",
      description:
        "Apple Inc. is canceling a decade-long effort to build an electric car, according to people with knowledge of the matter, abandoning ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/ezCKGT7XPQo/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/ezCKGT7XPQo/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/ezCKGT7XPQo/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Bloomberg Television",
      liveBroadcastContent: "none",
      publishTime: "2024-02-27T20:39:11Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "10Qy6CljPlzPMLaNXontGtsJUFY",
    id: {
      kind: "youtube#video",
      videoId: "lT4EXibwlpk",
    },
    snippet: {
      publishedAt: "2024-02-05T23:05:24Z",
      channelId: "UCv6T1ljYi3CETJ1Jqj1bFMQ",
      title: "الجهاز الذي سيغير العالم ! Apple Vision Pro",
      description:
        "1XBET Link : https://guest.link/LQz PromoCode : FAR11 For business farouklifework@gmail.com Instagram @farouklife Link ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/lT4EXibwlpk/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/lT4EXibwlpk/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/lT4EXibwlpk/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Farouk Life",
      liveBroadcastContent: "none",
      publishTime: "2024-02-05T23:05:24Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "hIkOxcMEN8WfU7j473Pm_n41TsM",
    id: {
      kind: "youtube#video",
      videoId: "deJjONetpnI",
    },
    snippet: {
      publishedAt: "2023-01-04T16:27:26Z",
      channelId: "UCCOrp7GPgZA8EGrbOcIAsyQ",
      title: "Apple Watches Can Have Cameras..? 😮#Shorts",
      description:
        "Check it out here : https://amzn.to/3jRYkvj Unboxing of a Wristcam! Check in for more videos about the Wristcam in the future.",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/deJjONetpnI/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/deJjONetpnI/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/deJjONetpnI/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Phone Repair Guru",
      liveBroadcastContent: "none",
      publishTime: "2023-01-04T16:27:26Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "m52uAb1Ff4XHcwmR8_bKZTj1Px4",
    id: {
      kind: "youtube#video",
      videoId: "NmS61959Phc",
    },
    snippet: {
      publishedAt: "2023-10-18T21:48:14Z",
      channelId: "UC9Tib0IsWBst6tlQ-p3L4Pw",
      title: "THE NEW APPLE PENCIL IS WEIRD 🤨👀",
      description:
        "Apple just announced a brand new Apple Pencil with a cheaper price point, sliding USB-C charging port, no wireless charging ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/NmS61959Phc/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/NmS61959Phc/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/NmS61959Phc/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Will Bowers",
      liveBroadcastContent: "none",
      publishTime: "2023-10-18T21:48:14Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "Tf3toAn_V0ZEKFzlIGqwq-MSGJA",
    id: {
      kind: "youtube#video",
      videoId: "6Ksn1HhwayI",
    },
    snippet: {
      publishedAt: "2023-03-06T01:50:00Z",
      channelId: "UC5fOe09ibGwjh4DOfiI30YQ",
      title:
        "k se kabutar, a se anar aa se aam,a for Apple b for ball, abcd phonics song, क से कबूतर#abcd #shorts",
      description:
        "k se kabutar, a se anar aa se aam,a for Apple b for ball, abcd phonics song, क से कबूतर#abcd #shorts #abcd ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/6Ksn1HhwayI/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/6Ksn1HhwayI/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/6Ksn1HhwayI/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Chhuk Chhuk TV",
      liveBroadcastContent: "none",
      publishTime: "2023-03-06T01:50:00Z",
    },
  },
];

const SearchVideo = () => {
  const [searchParams] = useSearchParams();
  const [searchVideos, setSearchVideos] = useState();
  console.log("searchParams.get");
  console.log(searchParams.get("v"));

  useEffect(() => {
    SearchSuggestion();
  }, []);

  useEffect(() => {
    console.log("searchVideos");
    console.log(searchVideos);
  }, [searchVideos]);

  const SearchSuggestion = async () => {
    const data = await fetch(SEARCH_TEXT_API + searchParams.get("v"));
    const json = await data.json();
    console.log("search suggestion");
    console.log(json);
    console.log(searchVideos);
    setSearchVideos(json.items);
    // console.log(searSuggestion);
    // setVideos(json.items);
  };

  return (
    <div className="bg-[#0f0f0f] w-full flex flex-col justify-center items-start text-white h-full z-50 px-0 md:px-[25px] lg:px-[25px]">
      {/* <img className="w-[100px] " src={props.data.thumbnails.dafault}></img> */}
      {searchVideos === undefined ? (
        <></>
      ) : (
        <>
          {searchVideos.map((vid) => {
            return (
              <Link
                className="w-full "
                key={vid?.id?.videoId}
                to={"/watch?v=" + vid?.id?.videoId}
              >
                <SearchVideosCard data={vid} />
              </Link>
            );
          })}
        </>
      )}
    </div>
  );
};

export default SearchVideo;
