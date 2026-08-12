import { config, library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faGithub,
  faLinkedin,
  faMedium,
  faStackOverflow
} from '@fortawesome/free-brands-svg-icons'
import {
  faDownload,
  faEnvelope,
  faBars,
  faQuoteLeft,
  faChevronLeft,
  faChevronRight,
  faTimes,
  faArrowRight,
  faArrowLeft,
  faBriefcase,
  faSleigh,
  faCommentDots
} from '@fortawesome/free-solid-svg-icons'

export default defineNuxtPlugin((nuxtApp) => {
  config.autoAddCss = false
  library.add(
    faGithub,
    faLinkedin,
    faMedium,
    faStackOverflow,
    faDownload,
    faEnvelope,
    faBars,
    faQuoteLeft,
    faChevronLeft,
    faChevronRight,
    faTimes,
    faArrowRight,
    faArrowLeft,
    faBriefcase,
    faSleigh,
    faCommentDots
  )
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})
