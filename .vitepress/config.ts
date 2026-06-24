import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/',
  title: 'Hélène Draux',
  description: 'methods for knowledge and evaluation',
  cleanUrls: true,
  srcExclude: ['**/_drafts/**'],

  themeConfig: {
    docFooter: {
      prev: false,
      next: false,
    },

    nav: [
      { text: 'Pipelines', link: '/pipelines/' },
      { text: 'Tools', link: '/tools/' },
      { text: 'Writing', link: '/writing/' },
      { text: 'Archive', link: '/archive/' },
      { text: 'Notes', link: '/notes/' },
      { text: 'About', link: '/about/' },
    ],

    sidebar: {
      '/pipelines/': [
        {
          text: 'Pipelines',
          items: [
            { text: 'Journalscape', link: '/pipelines/journalscape/' },
            { text: 'GRID+', link: '/pipelines/grid-plus/' },
            { text: 'Biblioscope', link: '/pipelines/biblioscope/' },
          ]
        }
      ],
      '/tools/': [
        {
          text: 'Tools',
          items: [
            { text: 'AV|VA', link: '/tools/av-va/' },
            { text: 'DimQuery', link: '/tools/dimquery/' },
            { text: 'Loom', link: '/tools/loom/' },
            { text: 'Kids voice assistant', link: '/tools/kids-voice-assistant/' },
            { text: 'Claude Projects as workflows', link: '/tools/claude-projects-workflows/' },
          ]
        }
      ],
      '/writing/': [
        {
          text: 'Writing',
          items: [
            { text: 'AI metascientist', link: '/writing/ai-metascientist/' },
            { text: 'BiblioFlow', link: '/writing/biblioflow/' },
            { text: 'Tufte\'s extensions', link: '/writing/tufte-extensions/' },
            { text: 'Interviewing yourself', link: '/writing/interviewing-yourself/' },
          ]
        }
      ],
      '/archive/': [
        {
          text: 'Archive',
          items: [
            { text: 'Building a network', link: '/archive/building-a-network/' },
            { text: 'Tropical Neglected Diseases', link: '/archive/tropical-neglected-diseases/' },
            { text: 'NLP of a Facebook page', link: '/archive/nlp-facebook-page/' },
          ]
        }
      ],
      '/notes/': [
        { text: 'Notes', items: [] }
      ],
      '/about/': [
        {
          text: 'About',
          items: [
            { text: 'Approach', link: '/about/approach/' },
            { text: 'Background', link: '/about/background/' },
            { text: 'CV', link: '/about/cv/' },
            { text: 'Contact', link: '/about/contact/' },
            { text: 'References', link: '/about/references/' },
          ]
        }
      ],
    },

    socialLinks: [],
  },
})
