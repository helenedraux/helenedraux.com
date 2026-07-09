import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import StatusBadge from './components/StatusBadge.vue'
import SectionLanding from './components/SectionLanding.vue'
import BumpedStackedBar from './components/BumpedStackedBar.vue'
import ColorModeImage from './components/ColorModeImage.vue'
import SiteIllustration from './components/SiteIllustration.vue'
import NotFoundPage from './components/NotFoundPage.vue'
import SiteMap from '../components/SiteMap.vue'
import Layout from './Layout.vue'
import { redirects } from './redirects'
import './custom.css'

declare global {
  interface Window {
    goatcounter?: {
      count?: (vars?: { path?: string }) => void
    }
  }
}

function trackPageview(path: string) {
  if (typeof window === 'undefined') return

  const send = () => {
    window.goatcounter?.count?.({ path })
  }

  if (window.goatcounter?.count) {
    send()
    return
  }

  const started = Date.now()
  const timer = window.setInterval(() => {
    if (window.goatcounter?.count) {
      window.clearInterval(timer)
      send()
    } else if (Date.now() - started > 8000) {
      window.clearInterval(timer)
    }
  }, 100)
}

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router }) {
    app.component('StatusBadge', StatusBadge)
    app.component('SectionLanding', SectionLanding)
    app.component('BumpedStackedBar', BumpedStackedBar)
    app.component('ColorModeImage', ColorModeImage)
    app.component('SiteIllustration', SiteIllustration)
    app.component('NotFoundPage', NotFoundPage)
    app.component('SiteMap', SiteMap)
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
    // VitePress calls router.go() on first load, so this covers initial + SPA navigations.
    router.onAfterRouteChange = (to: string) => {
      trackPageview(to)
    }

    if (typeof window !== 'undefined') {
      applyRedirect(window.location.pathname)
    }
  },
} satisfies Theme
