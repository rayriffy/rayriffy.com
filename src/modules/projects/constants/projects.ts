import type { Project } from '../@types/Project'

export const projects: Project[] = [
  {
    title: 'Mirai',
    year: 2022,
    description: 'A thesis project for my banchlor degree. This is a prototype of the new arcade token system for coins to be purchased, stored and used digitally.',
    links: [
      {
        label: 'Thesis',
        url: 'https://storage.rayriffy.com/files/SP2021-35.pdf'
      },
      {
        label: 'GitHub',
        url: 'https://github.com/rayriffy/mirai'
      }
    ]
  },
  {
    title: 'Svelte Automatic Image Optimization',
    year: 2022,
    active: true,
    description: 'A recreation of NextJS\'s automatic image optimization feature for SvelteKit',
    links: [
      {
        label: 'Demo',
        url: 'https://svelte-aio.vercel.app/'
      },
      {
        label: 'GitHub',
        url: 'https://github.com/rayriffy/svelte-aio'
      }
    ]
  },
  {
    title: 'Apple Music GitHub Profile',
    year: 2022,
    active: true,
    description: 'Displaying card on your GitHub profile to show your recently played song on Apple Music',
    links: [
      {
        label: 'Web',
        url: 'https://apple-music-github-profile.rayriffy.com/'
      },
      {
        label: 'GitHub',
        url: 'https://github.com/rayriffy/apple-music-github-profile'
      }
    ]
  },
  {
    title: 'KnuckleBones',
    year: 2022,
    description: 'Svelte implementation of a mini-game "Knucklebones" featured in an action game "Cult of the Lamb" (Only designed for iPad)',
    links: [
      {
        label: 'Web',
        url: 'https://knuckle.rayriffy.com/'
      },
      {
        label: 'GitHub',
        url: 'https://github.com/rayriffy/knucklebones'
      }
    ]
  },
  {
    title: 'Juri',
    year: 2022,
    description: 'A demo for passkeys, the future of password-less authentication. Made for talks at BKK.JS #16 Meetup called "Say goodbye to passwords... permanently"',
    links: [
      {
        label: 'Web',
        url: 'https://juri.rayriffy.com/'
      },
      {
        label: 'Keynote',
        url: 'https://storage.rayriffy.com/files/bkkjs16-says-goodbye-to-password.pdf'
      },
      {
        label: 'GitHub',
        url: 'https://github.com/rayriffy/juri'
      }
    ]
  },
  {
    title: 'Jacquard RTC',
    year: 2022,
    description: 'I brought Levi\'s Trucker Jacket with Google Jacquard included, but I saw more potential in terms of functionality than just using Google\'s application. So I wrote a Swift application to send gestures from my jacket to my Macbook by using peer-to-peer to trigger a keyboard press.',
    links: [
      {
        label: 'Web',
        url: 'https://soli-debugger.vercel.app/'
      },
      {
        label: 'GitHub',
        url: 'https://github.com/rayriffy/soli-debugger'
      }
    ]
  },
  {
    title: 'Soli Debugger',
    year: 2022,
    description: 'Google Pixel 4 has a Soli sensor included. I was amazed when the Google ATAP team show what it could do in 2016. This is just a small debugger web application to test the sensor, and observe the data that the sensor sent.',
    links: [
      {
        label: 'Web',
        url: 'https://soli-debugger.vercel.app/'
      },
      {
        label: 'GitHub',
        url: 'https://github.com/rayriffy/soli-debugger'
      }
    ]
  },
  {
    title: 'Stupid Randomizer',
    year: 2022,
    description: 'Awarding game for The ៦th Stupid Hackathon Thailand. Built with React, and jQuery to project the 3D perspective of the reward table onto the rug.',
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/rayriffy/stupid-randomizer'
      }
    ]
  },
  {
    title: 'Stupid Adventure',
    year: 2022,
    description: 'Mini-adventure game for finding event tickets to The ៦th Stupid Hackathon Thailand',
    links: [
      {
        label: 'Web',
        url: 'https://ผจญภัยโง่ๆ.ริฟฟี่.ไทย'
      },
      {
        label: 'GitHub',
        url: 'https://github.com/rayriffy/stupid-adventure'
      }
    ]
  },
  {
    title: 'Horvoryor (ห.ว.ย.)',
    year: 2021,
    description: 'An attempt to write Flutter application. This app will tell you the lottery result based on number you entered to the app.',
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/rayriffy/horvoryor'
      }
    ]
  },
  {
    title: 'セカイ Wiki',
    year: 2020,
    description: 'A wiki site for Project Sekai: Colorful Stage feat. Hatsune Miku, optimized for speed by NextJS',
    links: [
      {
        label: 'Web',
        url: 'https://sekai.rayriffy.com'
      },
      {
        label: 'GitHub',
        url: 'https://github.com/rayriffy/sekai-next'
      }
    ]
  },
  {
    title: 'FISHSIX Online',
    year: 2020,
    description: 'Online course reservation system, with full payment system integration. Powered by Firebase',
    links: [
      {
        label: 'Web',
        url: 'https://online.fishsix.in.th'
      }
    ]
  },
  {
    title: 'Riffy Blog',
    year: 2019,
    active: true,
    description: 'My personal blog was originally founded in 2018 but those days my blogs are powered by PHP which consumes a lot of computing power from my server. So, I changed my tech stack for my blog to be statically generated.',
    links: [
      {
        label: 'Web',
        url: 'https://blog.rayriffy.com'
      },
      {
        label: 'GitHub',
        url: 'https://github.com/rayriffy/rayriffy-blog-next'
      }
    ]
  },
  {
    title: 'Thai Lotto API',
    year: 2019,
    active: true,
    description: 'There\'s very little public API to see Thai lottery results so I made one by myself. Serving over 200,000 requests per month.',
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/rayriffy/rayriffy-h'
      }
    ]
  },
  {
    title: 'Vote',
    year: 2019,
    description: 'A much better voting system when compared to Dormitory Elect from 2018. Powered by Firebase so everything is fast scalable and real-time.',
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/rayriffy/rayriffy-vote'
      }
    ]
  },
  {
    title: 'Instant sort',
    year: 2019,
    description: 'The fastest sorting algorithm ever with the speed of O(1). "Empty array is always sorted array"',
    links: [
      {
        label: 'NPM',
        url: 'http://npm.im/instant-sort'
      },
      {
        label: 'GitHub',
        url: 'https://github.com/rayriffy/instant-sort'
      }
    ]
  },
  {
    title: 'maimai Song Randomizer',
    year: 2019,
    description: 'Don\'t know which songs to play? maimai Song Randomizer is a Google Assistant bot to help randomly choose 5 songs to play by genre while waiting for a queue to play.',
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/rayriffy/maimai-song-randomizer'
      }
    ]
  },
  {
    title: 'Riffy H',
    year: 2018,
    active: true,
    description: 'Thinking like an alternative manga reader web application, but is optimized for speed and without ads.',
    links: [
      {
        label: 'Web',
        url: 'https://h.rayriffy.com'
      },
      {
        label: 'GitHub',
        url: 'https://github.com/rayriffy/rayriffy-h'
      }
    ]
  },
  {
    title: 'Siri Fastpass',
    year: 2018,
    description: 'This project was made in Actions on Google Hackathon Thailand which was sponsored by Sansiri. We see a problem that Sansiris\' residents have difficulty inviting visitors into their homes due to its high security. This project will create a QR code as visitor pass to their phone via SMS, which can be easily made by the homeowner by talking to Google Assistant. We got a second prize, and get a Google Home hub, and a Google Home mini as rewards.',
    links: [
      {
        label: 'Blog',
        url: 'https://blog.rayriffy.com/review-actions-on-google-hackathon'
      },
      {
        label: 'GitHub',
        url: 'https://github.com/rayriffy/siri-fastpass'
      }
    ]
  },
  {
    title: 'BirthTU',
    year: 2018,
    description: 'When your country is ruled by a dictator, you have to remember when to celebrate his birthday as well. This project was made in The Stupid Hackathon Thailand #2.',
    links: [
      {
        label: 'Demo',
        url: 'https://birth-tu.netlify.app'
      },
      {
        label: 'GitHub',
        url: 'https://github.com/Birth-TU/web'
      }
    ]
  },
  {
    title: 'scan-mang (แสกนแม่ง) API',
    year: 2018,
    description: 'The backend of scan-mang, the project was created with a group of 5 people to compete in the Hack Your Tech hackathon at the Faculty of ICT, Mahidol University. This project has won the first prize with 50,000 THB as a reward.',
    links: [
      {
        label: 'Award photo @ICT',
        url: 'https://www.facebook.com/rayriffy/posts/936047413249342'
      },
      {
        label: 'GitHub',
        url: 'https://github.com/rayriffy/hacktech-backend'
      }
    ]
  },
  {
    title: 'Dormitory Elect',
    year: 2018,
    description: 'Keeping students in the dormitory in check is hard. So every year new constitution to manage the dormitory, and act as a middleman between students and dormitory personnel. This web application is created to help dormitory staff counts vote results from students faster.',
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/rayriffy/dormitory-elect'
      }
    ]
  },
  {
    title: 'Dockr',
    year: 2018,
    description: 'Web application to manage Docker container without interacting with the command line at all. This project has been contested in the 20th National Software Contest, and received consolation prize award.',
    links: [
      {
        label: 'Award photo @NSC',
        url: 'https://www.facebook.com/rayriffy/posts/819627834891301'
      },
      {
        label: 'GitHub',
        url: 'https://github.com/rayriffy/dockr'
      }
    ]
  },
  {
    title: 'OrchidGazer Tensorflow',
    year: 2017,
    description: 'A second iteration of the image recognition model from my science project in MWIT using TensorFlow. Quickly abandoned after the project has been canceled.',
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/rayriffy/OrchidGazer-tensorflow'
      }
    ]
  },
  {
    title: 'OrchidGazer',
    year: 2016,
    description: 'This is the science project that I worked on with my team as a graduation thesis at Mahidol Wittayanusorn School. This project has been contested in the 19th National Software Contest and received the first runner-up award.',
    links: [
      {
        label: 'Award photo @NSC',
        url: 'https://www.facebook.com/rayriffy/posts/656233194564100'
      },
      {
        label: 'Poster',
        url: 'https://storage.rayriffy.com/files/nsc-poster.pdf'
      },
      {
        label: 'GitHub',
        url: 'https://github.com/rayriffy/caffeCNN'
      },
    ]
  },
  {
    title: 'Pre-MWITS 2016: The Last Chapter',
    description: 'The very first game that I wrote for Pre-MWITS camp, a camp to tease junior high school students about life at MWIT (the highest regarded science school in the country). The games use the perfect combination of software as a piece of interactive information and processing, and actual people who need to walk around and work together as a team.',
    year: 2015,
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/rayriffy/premwits_2015'
      }
    ]
  }
]