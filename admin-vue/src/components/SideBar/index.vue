<style scoped>
</style>

<template>
  <Menu>
    <Menu-group v-for="group of menuGroups" v-bind:title="group.name">
      <Menu-item v-for="menu of group.menus" v-bind:name="menu.name">
        {{ menu.name }}
      </Menu-item>
    </Menu-group>
  </Menu>
</template>

<script>
  import menuGroups from '../../constants/menu'

  export default {
    data: function() {
      return {
        menuGroups
      }
    }
  }
</script>