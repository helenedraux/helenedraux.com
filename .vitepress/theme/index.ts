import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import StatusBadge from './components/StatusBadge.vue'
import SectionLanding from './components/SectionLanding.vue'
import BumpedStackedBar from './components/BumpedStackedBar.vue'
import ColorModeImage from './components/ColorModeImage.vue'
import Layout from './Layout.vue'
import { redirects } from './redirects'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router }) {
    app.component('StatusBadge', StatusBadge)
    app.component('SectionLanding', SectionLanding)
    app.component('BumpedStackedBar', BumpedStackedBar)
    app.component('ColorModeImage', ColorModeImage)
    const applyRedirect = (path: string) => {
      const normalized = path.replace(/\.html$/i, '')
      const toPath = redirects[normalized]

      if (toPath) {
        router.go(toPath)
        return true
      }

      return false
    }

    router.onBeforeRouteChange = (to: string) => !applyRedirect(to)

    if (typeof window !== 'undefined') {
      applyRedirect(window.location.pathname)
    }
  },
} satisfies Theme
