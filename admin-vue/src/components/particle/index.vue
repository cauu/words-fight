<template>
  <canvas ref="canvas" id="canvas">
  </canvas>
</template>

<style scoped>
  #canvas {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
</style>

<script>
  import Vue from 'vue'
  import Component from 'vue-class-component'

  class Point {
    x: number
    y: number
    r: number
    sx: number
    sy: number

    constructor(x: number, y: number) {
      this.x = x
      this.y = y
      this.r = 1 + Math.random() * 2
      this.sx = Math.random() * 2 - 1
      this.sy = Math.random() * 2 - 1
    }

    draw(ctx) {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
      ctx.closePath()
      ctx.fillStyle = '#aaa'
      ctx.fill()
    }

    move({ height, width }) {
      this.x += this.sx
      this.y += this.sy
      if(this.x >  width || this.x < 0) {
        this.sx = -this.sx
      }
      if(this.y > height || this.y < 0) {
        this.sy = -this.sy
      }
    }

    drawLine(ctx, point2: Point) {
      const dx = this.x - point2.x
      const dy = this.y - point2.y
      const d = Math.sqrt(dx * dx + dy * dy)
      if(d < 100) {
        const alpha = (100 - d) / 100 * 1
        ctx.beginPath()
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(point2.x, point2.y)
        ctx.closePath()
        ctx.strokeStyle = `rgba(170, 170, 170, ${alpha})`
        ctx.strokeWidth = 1
        ctx.stroke()
      }
    }
  }

  @Component({
    props: {
      pointAmount: Number
    }
  })
  export default class Particle extends Vue {
    pointAmount: number

    mounted() {
      const canv:any = document.getElementById('canvas')
      const ctx = canv.getContext('2d') 

      const height = canv.offsetHeight
      const width = canv.offsetWidth

      /**
       * @desc
       * Q: 此处为什么要让canvas的height和width等于offsetHeight和width?
       **/
      canv.width = width
      canv.height = height

      const points = []

      for(let i = 0; i < 40; i++) {
        points.push(new Point(Math.random() * width, Math.random() * height))
      }

      this.loop({ ctx, points, width, height })
    }

    loop({ ctx, points, width, height }) {
      /**
       * @desc
       * Q: requestAnimationFrame为什么不放在paint函数中?
       **/
      requestAnimationFrame(() => this.loop({ ctx, points, width, height }))

      this.paint(ctx, points, width, height)
    }

    paint(ctx, points, width, height) {
      ctx.clearRect(0, 0, width, height)

      points.map((point) => {
        point.move({ height, width })
        point.draw(ctx)

        points.filter((p2) => {
          return p2 !== point
        }).map((p2) => {
          point.drawLine(ctx, p2)
          return p2
        })

        return point
      })
    }
  }
</script>