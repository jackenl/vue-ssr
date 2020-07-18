<template>
  <div class="home">
    <Header></Header>
    {{ msg }}
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {
      msg: 'Hello Vue SSR'
    }
  },
  created() {},
  mounted() {},
}
</script>

<style scoped>
</style>
