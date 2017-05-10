<style scoped>
</style>

<template>
  <Menu width="auto" @on-select="onSelect">
    <Menu-group v-for="group of menuGroups" v-bind:title="group.name">
      <Menu-item v-for="menu of group.menus" v-bind:name="menu.to">
        {{ menu.name }}
      </Menu-item>
    </Menu-group>
  </Menu>
</template>

<script>
  import menuGroups from '../../constants/menu'

  export default {
    data() {
      return {
        menuGroups
      }
    },
    methods: {
      onSelect(value) {
        // this.$router.router.go({
        //   name: value
        // })
        this.$router.push(value);
        console.log('select menu', value)
      }
    }
  }
</script>