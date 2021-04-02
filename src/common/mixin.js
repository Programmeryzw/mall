import { debounce } from './utils'
import BackTop from 'components/content/backtop/BackTop'

export const addListener = {
  data() {
    return {
      imgLoadListener: null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 200)
    this.imgLoadListener = () => { refresh() }
    this.$bus.$on('imgLoad', this.imgLoadListener)
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBack: false
    }
  },
  methods: {
    backToTop() {
      this.$refs.scroll.scrollTo(0, 0,300)
    }
  }
}