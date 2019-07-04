<template>
  <div>
    <my-line v-if="showLine" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      showLine: false,
    }
  },
  mounted () {
    this.showLine = true // showLine will only be set to true on the client. This keeps the DOM-tree in sync.
  }, 
  asyncData () {
    const lineData = [
    ]// some data
    const options = {
    } // some options
    return { lineData, options }
  }
}
</script>
