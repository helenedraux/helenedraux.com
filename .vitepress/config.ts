import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/',
  title: 'research systems',
  description: 'methods for knowledge and evaluation',
  cleanUrls: true,
  srcExclude: ['**/_drafts/**'],

  themeConfig: {
    nav: [
      { text: 'Methods', link: '/methods/' },
      { text: 'Frameworks', link: '/frameworks/' },
      { text: 'Tools', link: '/tools/' },
      { text: 'Projects', link: '/projects/' },
      { text: 'Notes', link: '/notes/' },
      { text: 'About', link: '/about/' },
    ],

    sidebar: {
      '/methods/': [
        {
          text: 'Methods',
          items: [
            { text: 'AI metascientist', link: '/methods/ai-metascientist/' },
            { text: 'Journalscape', link: '/methods/journalscape/' },
            { text: 'Writing research publications', link: '/methods/writing-research-publications/' },
          ]
        }
      ],
      '/frameworks/': [
        {
          text: 'Frameworks',
          items: [
            { text: 'GRID+', link: '/frameworks/grid-plus/' },
            { text: 'BiblioFlow', link: '/frameworks/biblioflow/' },
            { text: 'DimQuery', link: '/frameworks/dimquery/' },
          ]
        }
      ],
      '/tools/': [
        {
          text: 'Tools',
          items: [
            { text: 'AVA', link: '/tools/ava/' },
            { text: 'URL to DSL', link: '/tools/url-to-dsl/' },
          ]
        }
      ],
      '/projects/': [
        {
          text: 'Projects',
          items: [
            { text: 'Loom', link: '/projects/loom/' },
            { text: 'Bumped stacked bar chart', link: '/projects/bumped-stacked-bar/' },
            { text: 'Small multiples', link: '/projects/small-multiples/' },
            { text: 'Claude Projects as workflows', link: '/projects/claude-projects-workflows/' },
            { text: 'Semantic layer over Vinted', link: '/projects/vinted-semantic-layer/' },
            { text: 'Voice assistant for kids', link: '/projects/kids-voice-assistant/' },
          ]
        }
      ],
      '/notes/': [
        {
          text: 'Notes',
          items: [
            { text: 'Methodological notes', link: '/notes/methodological-notes/' },
            { text: 'Ongoing work', link: '/notes/ongoing-work/' },
            { text: 'Short writings', link: '/notes/short-writings/' },
          ]
        }
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
