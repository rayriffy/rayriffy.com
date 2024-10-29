import type { Project } from '../@types/Project'

export const projects: Project[] = [
  {
    title: 'Mirai',
    year: 2022,
    description:
      'A thesis project for my bachelor degree. This is a prototype of the new arcade token system for coins to be purchased, stored and used digitally.',
    href: 'web',
    links: {
      web: 'https://storage.rayriffy.com/files/SP2021-35.pdf',
      github: 'https://github.com/rayriffy/mirai',
    },
  },
  {
    title: 'Urami',
    year: 2023,
    active: true,
    description:
      "Automatic image optimization that complies with standard Request, and Response API. Use them with any backend frameworks!",
    href: 'web',
    links: {
      web: 'https://www.npmjs.com/package/@urami/core',
      github: 'https://github.com/rayriffy/urami',
    },
  },
  {
    title: 'Apple Music GitHub Profile',
    year: 2022,
    active: true,
    description:
      'Displaying card on your GitHub profile to show your recently played song on Apple Music',
    href: 'web',
    links: {
      web: 'https://music-profile.rayriffy.com/',
      github: 'https://github.com/rayriffy/apple-music-github-profile',
    },
  },
  {
    title: 'Juri',
    year: 2022,
    description:
      'A demo for passkeys, the future of password-less authentication. Made for talks at BKK.JS #16 Meetup called "Say goodbye to passwords... permanently"',
    href: 'keynote',
    links: {
      web: 'https://juri.rayriffy.com/',
      keynote:
        'https://storage.rayriffy.com/files/bkkjs16-says-goodbye-to-password.pdf',
      github: 'https://github.com/rayriffy/juri',
    },
  },
  {
    title: 'Jacquard RTC',
    year: 2022,
    description:
      "I brought Levi's Trucker Jacket with Google Jacquard included, but I saw more potential in terms of functionality than just using Google's application. So I wrote a Swift application to send gestures from my jacket to my Macbook by using peer-to-peer to trigger a keyboard press.",
    href: 'github',
    links: {
      web: 'https://soli-debugger.vercel.app/',
      github: 'https://github.com/rayriffy/soli-debugger',
    },
  },
  {
    title: 'Stupid Randomizer',
    year: 2022,
    description:
      'Awarding game for The ៦th Stupid Hackathon Thailand. Built with React, and jQuery to project the 3D perspective of the reward table onto the rug.',
    href: 'github',
    links: {
      github: 'https://github.com/rayriffy/stupid-randomizer',
    },
  },
  {
    title: 'セカイ Wiki',
    year: 2020,
    description:
      'A wiki site for Project Sekai: Colorful Stage feat. Hatsune Miku, optimized for speed by NextJS',
    href: 'github',
    links: {
      github: 'https://github.com/rayriffy/sekai-next',
    },
  },
  {
    title: 'Riffy Blog',
    year: 2019,
    active: false,
    description:
      'My personal blog was originally founded in 2018 but those days my blogs are powered by PHP which consumes a lot of computing power from my server. So, I changed my tech stack for my blog to be statically generated.',
    href: 'github',
    links: {
      github: 'https://github.com/rayriffy/rayriffy-blog-next',
    },
  },
  {
    title: 'Thai Lotto API',
    year: 2019,
    active: true,
    description:
      "There's very little public API to see Thai lottery results so I made one by myself. Serving over 200,000 requests per month.",
    href: 'github',
    links: {
      web: 'https://lotto.api.rayriffy.com/',
      github: 'https://github.com/rayriffy/thai-lotto-api',
    },
  },
  {
    title: 'Vote',
    year: 2019,
    description:
      'A much better voting system when compared to Dormitory Elect from 2018. Powered by Firebase so everything is fast scalable and real-time.',
    href: 'github',
    links: {
      github: 'https://github.com/rayriffy/rayriffy-vote',
    },
  },
  {
    title: 'Riffy H',
    year: 2018,
    active: true,
    description:
      'Thinking like an alternative manga reader web application, but is optimized for speed and without ads.',
    href: 'github',
    links: {
      web: 'https://h.rayriffy.com',
      github: 'https://github.com/rayriffy/rayriffy-h',
    },
  },
  {
    title: 'Siri Fastpass',
    year: 2018,
    description:
      "This project was made in Actions on Google Hackathon Thailand which was sponsored by Sansiri. We see a problem that Sansiris' residents have difficulty inviting visitors into their homes due to its high security. This project will create a QR code as visitor pass to their phone via SMS, which can be easily made by the homeowner by talking to Google Assistant. We got a second prize, and get a Google Home hub, and a Google Home mini as rewards.",
    href: 'web',
    links: {
      web: 'https://blog.rayriffy.com/review-actions-on-google-hackathon',
      github: 'https://github.com/rayriffy/siri-fastpass',
    }
  },
  {
    title: 'scan-mang (แสกนแม่ง) API',
    year: 2018,
    description:
      'The backend of scan-mang, the project was created with a group of 5 people to compete in the Hack Your Tech hackathon at the Faculty of ICT, Mahidol University. This project has won the first prize with 50,000 THB as a reward.',
    href: 'web',
    links: {
      web: 'https://www.facebook.com/rayriffy/posts/936047413249342',
      github: 'https://github.com/rayriffy/hacktech-backend',
    }
  },
  {
    title: 'Dockr',
    year: 2018,
    description:
      'Web application to manage Docker container without interacting with the command line at all. This project has been contested in the 20th National Software Contest, and received consolation prize award.',
    href: 'web',
    links: {
      web: 'https://www.facebook.com/rayriffy/posts/819627834891301',
      github: 'https://github.com/rayriffy/dockr',
    }
  },
  {
    title: 'OrchidGazer',
    year: 2016,
    description:
      'This is the science project that I worked on with my team as a graduation thesis at Mahidol Wittayanusorn School. This project has been contested in the 19th National Software Contest and received the first runner-up award.',
    href: 'web',
    links: {
      web: 'https://www.facebook.com/rayriffy/posts/656233194564100',
      github: 'https://github.com/rayriffy/caffeCNN',
    }
  },
]
