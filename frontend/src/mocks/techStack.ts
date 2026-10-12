import type { TechStack } from '../types/TechStackType'

export const MOCK_TECH_STACK: TechStack[] = [
  {
    title: 'Frontend',
    technologies: [
      {
        name: 'React',
        slug: 'react',
        logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/react.svg',
        link: 'https://react.dev/',
        weight: 5,
        color: '#61DAFB'
      },
      {
        name: 'TypeScript',
        slug: 'typescript',
        logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/typescript.svg',
        link: 'https://www.typescriptlang.org/',
        weight: 5,
        color: '#3178C6'
      },
      {
        name: 'JavaScript',
        slug: 'javascript',
        logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/javascript.svg',
        link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
        weight: 4,
        color: '#F7DF1E'
      },
      {
        name: 'HTML',
        slug: 'html',
        logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/html5.svg',
        link: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
        weight: 4,
        color: '#E34C26'
      },
      {
        name: 'CSS',
        slug: 'css',
        logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/css.svg',
        link: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
        weight: 4,
        color: '#264682'
      },
      {
        name: 'Vite',
        slug: 'vite',
        logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/vite.svg',
        link: 'https://vite.dev/',
        weight: 4,
        color: '#646CFF'
      }
    ]
  },
  {
    title: 'Backend',
    technologies: [
      {
        name: 'Node.js',
        slug: 'nodejs',
        logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/nodedotjs.svg',
        link: 'https://nodejs.org/',
        weight: 5,
        color: '#80BD01'
      },
      {
        name: 'Express',
        slug: 'express',
        logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/express.svg',
        link: 'https://expressjs.com/',
        weight: 5,
        color: '#000000'
      },
      {
        name: 'PHP',
        slug: 'php',
        logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/php.svg',
        link: 'https://www.php.net/',
        weight: 3,
        color: '#777BB4'
      }
    ]
  },
  {
    title: 'Databaser',
    technologies: [
      {
        name: 'PostgreSQL',
        slug: 'postgresql',
        logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/postgresql.svg',
        link: 'https://www.postgresql.org/',
        weight: 5,
        color: '#336791'
      },
      {
        name: 'MySQL',
        slug: 'mysql',
        logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/mysql.svg',
        link: 'https://www.mysql.com/',
        weight: 3,
        color: '#00758F'
      },
      {
        name: 'MariaDB',
        slug: 'mariadb',
        logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/mariadb.svg',
        link: 'https://mariadb.org/',
        weight: 4,
        color: '#00758F'
      },
      {
        name: 'MongoDB',
        slug: 'mongodb',
        logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/mongodb.svg',
        link: 'https://www.mongodb.com/',
        weight: 2,
        color: '#47A248'
      }
    ]
  },
  {
    title: 'Native',
    technologies: [
      {
        name: 'Swift',
        slug: 'swift',
        logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/swift.svg',
        link: 'https://developer.apple.com/swift/',
        weight: 5,
        color: '#F05138'
      },
      {
        name: 'SwiftUI',
        slug: 'swiftui',
        logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/apple.svg',
        link: 'https://developer.apple.com/documentation/swiftui',
        weight: 4,
        color: '#000000'
      },
      {
        name: 'watchOS',
        slug: 'watchos',
        logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/apple.svg',
        link: 'https://developer.apple.com/watchos/',
        weight: 4,
        color: '#000000'
      },
      {
        name: 'Core Location',
        slug: 'core-location',
        logo: 'https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/locate-fixed.svg',
        link: 'https://developer.apple.com/documentation/corelocation',
        weight: 3,
        color: '#000000'
      }
    ]
  },
  {
    title: 'DevOps',
    technologies: [
      {
        name: 'Docker',
        slug: 'docker',
        logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/docker.svg',
        link: 'https://www.docker.com/',
        weight: 5,
        color: '#2496ED'
      },
      {
        name: 'nginx',
        slug: 'nginx',
        logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/nginx.svg',
        link: 'https://nginx.org/',
        weight: 4,
        color: '#009639'
      },
      {
        name: 'Vercel',
        slug: 'vercel',
        logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/vercel.svg',
        link: 'https://vercel.com/',
        weight: 4,
        color: '#000000'
      },
      {
        name: 'Railway',
        slug: 'railway',
        logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/railway.svg',
        link: 'https://railway.com/',
        weight: 3,
        color: '#0B0D0E'
      },
      {
        name: 'Neon',
        slug: 'neon',
        logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/neon.svg',
        link: 'https://neon.com/',
        weight: 3,
        color: '#00E599'
      },
      {
        name: 'Git',
        slug: 'git',
        logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/git.svg',
        link: 'https://git-scm.com/',
        weight: 5,
        color: '#F05032'
      },
      {
        name: 'GitHub',
        slug: 'github',
        logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/github.svg',
        link: 'https://github.com/',
        weight: 5,
        color: '#181717'
      }
    ]
  }
]

export const TECHS_VISIBLE_IN_SECTION = [
  'react',
  'typescript',
  'javascript',
  'html',
  'css',
  'vite',
  'nodejs',
  'express',
  'php',
  'postgresql',
  'neon',
  'mysql',
  'mariadb',
  'mongodb',
  'swift',
  'watchos',
  'docker',
  'nginx',
  'vercel',
  'railway',
  'git',
  'github',
]