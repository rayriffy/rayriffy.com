import type { Talk } from '../@types/Talk'

export const talks: Talk[] = [
  {
    title: 'Web can be fun!',
    event: 'JSConf JP',
    year: 2024,
    href: 'youtube',
    description:
      "Web APIs is capable of way more than we might think. There're so many unusual Web APIs to explore. We'll explore parts of the web that we might not known before. Did you know you can send Bluetooth signal directly to the web? or did you know you can control web by using synthesizer via Web MIDI? In this session, we will play something fun together, by controlling my jacket, and synthesizer, and explore ranges of strange Web APIs.",
    image: {
      src: '/static/talks/webfun.jpg',
      ratio: 16 / 9,
    },
    links: {
      youtube: 'https://youtu.be/2G_tdfSTDcE',
      keynote: 'https://storage.rayriffy.com/files/jsconf-web-can-be-fun.pdf',
    },
  },
  {
    title: 'Using GitHub as a database for rich content and video processing',
    event: 'GitHub Community Meetup',
    year: 2023,
    href: 'youtube',
    description:
      'After more than 1 year of formally founded Creatorsgarten, we organize more than 30 events acrros multiple locations. This talk will take you behind the sinces on how we use GitHub to automate our workflow and managing our self-made wiki engine.',
    image: {
      src: '/static/talks/logistic.jpg',
      ratio: 16 / 9,
    },
    links: {
      youtube: 'https://youtu.be/i58lEAFqDlw',
      keynote: 'https://storage.rayriffy.com/files/logistic.pdf',
    },
  },
  {
    title: 'Atomic cross-framework state manager with nanostores',
    event: 'Bkk.js #18',
    year: 2023,
    href: 'youtube',
    description:
      'A lighinting-talk session to discover new possibilities to manage state in your application, with future-proofing for the next generation of frameworks.',
    image: {
      src: '/static/talks/nanostores.jpg',
      ratio: 16 / 9,
    },
    links: {
      youtube: 'https://youtu.be/47oIXnbQXps',
      keynote: 'https://storage.rayriffy.com/files/atomic-nanostores.pdf',
      github: 'https://github.com/rayriffy/nanostores-demo',
    },
  },
  {
    title: 'Easily publishing fully-typed dependency with confidence',
    event: 'TypeScript Community Meetup',
    year: 2023,
    href: 'youtube',
    description:
      'มาเรียนรู้เกี่ยวกับการ Publish Dependency แบบง่าย ๆ ด้วย GitHub Actions และสร้าง Provenance สำหรับแพ็คเกจด้วย npm',
    image: {
      src: '/static/talks/npm.jpg',
      ratio: 16 / 9,
    },
    links: {
      youtube: 'https://youtu.be/Gaa3Te6bqrw',
      keynote:
        'https://storage.rayriffy.com/files/typescript1-easily-publishing-fully-typed-dependency-with-confidence.pdf',
      github: 'https://l.rayriffy.com/changesets-keynote',
    },
  },
  {
    title: 'Rejecting client-side, embrace server-side',
    event: 'React Meetup 06/23',
    year: 2023,
    href: 'youtube',
    description:
      'Is it possible to write a React app without serving any JS to the client? Let’s find out.',
    image: {
      src: '/static/talks/reject-client-side.jpg',
      ratio: 16 / 9,
    },
    links: {
      youtube: 'https://youtu.be/47oIXnbQXps',
      keynote:
        'https://storage.rayriffy.com/files/react-meetup-rejecting-client-side.pdf',
      github: 'https://github.com/rayriffy/mlth',
    },
  },
  {
    title: 'Say goodbye to password… permanently',
    event: 'BKK.JS Meetup #16',
    year: 2022,
    href: 'youtube',
    description:
      'Passwords are bad for people when the website required you to include at least capital and special case character. Why waste time remembering a hard password, or using a password manager and waiting for the time to be phished? Introducing WebAuthn, the password-less authentication method for the future.',
    image: {
      src: '/static/talks/passkeys.jpg',
      ratio: 16 / 9,
    },
    links: {
      youtube: 'https://youtu.be/wjwNIYIhYhw',
      keynote:
        'https://storage.rayriffy.com/files/bkkjs16-says-goodbye-to-password.pdf',
      github: 'https://github.com/rayriffy/juri',
    },
  },
  {
    title: 'TypeScript.life',
    event: 'YWC Programmer Meetup',
    year: 2020,
    description:
      "JavaScript is hell when trying to handle a site securely, especially when your codebase is shared with multiple developers. TypeScript is the future of JavaScript, you can prevent type conflict before it is pushed to production. And I'm here to tell you how.",
    href: 'keynote',
    links: {
      web: 'https://www.facebook.com/rayriffy/posts/1291988020988611',
      keynote:
        'https://storage.rayriffy.com/files/ywcprogmeet-typescript-life.pdf',
    },
  },
  {
    title: 'GraphQL Introduction',
    event: 'GraphQL BKK Meetup #8',
    year: 2020,
    description:
      "Don't waste the user's precious data bandwidth to load very large JSON from REST API. Only choose what you need with GraphQL.",
    href: 'keynote',
    links: {
      web: 'https://www.meetup.com/graphql-bangkok/events/267810446/',
      keynote:
        'https://storage.rayriffy.com/files/gqlbkk8-graphql-introduction.pdf',
      github: 'https://github.com/rayriffy/gql-bkk-8-demo',
    },
  },
]
