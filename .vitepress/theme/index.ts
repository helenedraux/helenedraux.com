import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { redirects } from './redirects'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ router }) {
    router.onBeforeRouteChange = (to: string) => {
      const path = to.replace(/\.html$/i, '')
      const toPath = redirects[path]

      if (toPath) {
        router.go(toPath)
        return false
      }

      return true
    }
  },
} satisfies Theme
