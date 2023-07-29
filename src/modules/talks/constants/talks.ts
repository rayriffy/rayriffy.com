import type { Talk } from '../@types/Talk'

export const talks: Talk[] = [
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
    title: 'Say goodbye to password… permanently',
    event: 'BKK.JS Meetup #16',
    year: 2022,
    href: 'youtube',
    description:
      'Passwords are bad for people when the website required you to include at least capital and special case character. Why waste time remembering a hard password, or using a password manager and waiting for the time to be phished? Introducing WebAuthn, the password-less authentication method for the future.',
    image: {
      src: '/static/talks/reject-client-side.jpg',
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
