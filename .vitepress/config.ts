import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/',
  title: 'Hélène Draux',
  description: 'methods for knowledge and evaluation',
  cleanUrls: true,
  srcExclude: ['**/_drafts/**', '**/_review/**'],

  themeConfig: {
    docFooter: {
      prev: false,
      next: false,
    },

    nav: [
      { text: 'Home', link: '/' },
      { text: 'AI analytics', link: '/ai-analytics/', activeMatch: '^/ai-analytics/' },
      { text: 'Evaluation', link: '/evaluation/', activeMatch: '^/evaluation/' },
      { text: 'Writing', link: '/writing/', activeMatch: '^/writing/' },
      { text: 'Builds', link: '/builds/', activeMatch: '^/builds/' },
      { text: 'CV', link: '/cv/' },
    ],

    sidebar: {
      '/ai-analytics/': [
        {
          text: 'AI analytics',
          items: [
            { text: 'The AI metascientist', link: '/ai-analytics/ai-metascientist/' },
            { text: 'Claude Projects', link: '/ai-analytics/corpus-builder/' },
            { text: 'Biblioflow', link: '/ai-analytics/biblioflow/' },
            { text: 'DimQuery', link: '/ai-analytics/dimquery/' },
            { text: 'Research organisation typology', link: '/ai-analytics/grid-plus/' },
            { text: 'Journalscape', link: '/ai-analytics/journalscape/' },
            { text: 'Biblioscope', link: '/ai-analytics/biblioscope/' },
          ],
        },
      ],
      '/evaluation/': [
        {
          text: 'Evaluation',
          items: [
            { text: 'Vacuity index', link: '/evaluation/vacuity-index/' },
            { text: 'AV|VA', link: '/evaluation/av-va/' },
            { text: 'Verification comparison', link: '/evaluation/verification-comparison/' },
            { text: 'Red-teaming an analytical agent', link: '/evaluation/red-teaming/' },
          ],
        },
      ],
      '/writing/': [
        {
          text: 'Writing',
          items: [
            { text: 'Research Musings', link: '/writing/research-musings/' },
            { text: 'Tufte\'s extensions', link: '/writing/tufte-extensions/' },
            { text: 'Interviewing yourself', link: '/writing/interviewing-yourself/' },
          ],
        },
      ],
      '/builds/': [
        {
          text: 'Builds',
          items: [
            { text: 'Loom', link: '/builds/loom/' },
            { text: 'Children voice assistant', link: '/builds/children-voice-assistant/' },
          ],
        },
      ],
    },

    socialLinks: [],
  },
})
