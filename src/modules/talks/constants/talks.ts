import type { Talk } from '../@types/Talk'

export const talks: Talk[] = [
  {
    title: 'Say goodbye to password… permanently',
    event: 'BKK.JS Meetup #16',
    year: 2022,
    description:
      'Passwords are bad for people when the website required you to include at least capital and special case character. Why waste time remembering a hard password, or using a password manager and waiting for the time to be phished? Introducing WebAuthn, the password-less authentication method for the future.',
    links: [
      {
        label: 'Video',
        url: 'https://youtu.be/wjwNIYIhYhw',
      },
      {
        label: 'Keynote',
        url: 'https://storage.rayriffy.com/files/bkkjs16-says-goodbye-to-password.pdf',
      },
      {
        label: 'Demo',
        url: 'https://github.com/rayriffy/juri',
      },
    ],
  },
  {
    title: 'TypeScript.life',
    event: 'YWC Programmer Meetup',
    year: 2020,
    description:
      "JavaScript is hell when trying to handle a site securely, especially when your codebase is shared with multiple developers. TypeScript is the future of JavaScript, you can prevent type conflict before it is pushed to production. And I'm here to tell you how.",
    links: [
      {
        label: 'Facebook',
        url: 'https://www.facebook.com/rayriffy/posts/1291988020988611',
      },
      {
        label: 'Keynote',
        url: 'https://storage.rayriffy.com/files/ywcprogmeet-typescript-life.pdf',
      },
    ],
  },
  {
    title: 'GraphQL Introduction',
    event: 'GraphQL BKK Meetup #8',
    year: 2020,
    description:
      "Don't waste the user's precious data bandwidth to load very large JSON from REST API. Only choose what you need with GraphQL.",
    links: [
      {
        label: 'Meetup',
        url: 'https://www.meetup.com/graphql-bangkok/events/267810446/',
      },
      {
        label: 'Keynote',
        url: 'https://storage.rayriffy.com/files/gqlbkk8-graphql-introduction.pdf',
      },
      {
        label: 'Demo',
        url: 'https://github.com/rayriffy/gql-bkk-8-demo',
      },
    ],
  },
]
