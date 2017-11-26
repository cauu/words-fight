<template>
  <Breadcrumb>
    <Breadcrumb-item
      v-for="item in crumbItem"
      :href="item.href"
      >
      {{ item.text }}
    </Breadcrumb-item>
    <Breadcrumb-item>
      {{ currText }}
    </Breadcrumb-item>
  </Breadcrumb>
</template>

<script>
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { Getter } from 'vuex-class'


  const CODE_SEQ = ['book', 'level', 'scene', 'question']
  const CODE_HASH = {
    book: {
      text: ({ title }) => `书本-${title}`,
      href: () => `/book/list`
    },
    level: {
      text: ({ title }) => `关卡-${title}`,
      href: ({ book }) => `/level/list/${book._id}`
    },
    scene: {
      text: ({ title }) => `场景-${title}`,
      href: ({ level }) => `/scene/list/${level._id}`
    },
    question: {
      text: () => '问题',
      href: () => ''
    }
  }

  @Component({
    props: {
      currText: String,
      currCode: String
    }
  })
  export default class CrumbNav extends Vue {
    currText: string

    currCode: string

    @Getter('flattenedNavList') navList

    get crumbItem() {
      const idx = CODE_SEQ.indexOf(this.currCode)
      const navList = this.navList
      const result = []

      for(let i = 0; i <  idx; i++) {
        navList[i] &&
          result.push({
            text: CODE_HASH[CODE_SEQ[i]]['text'](navList[i]),
            href: CODE_HASH[CODE_SEQ[i]]['href'](navList[i])
          })
      }

      return result
    }

    mounted() {
    }
  }
</script>