const { ccclass, property } = cc._decorator

const KEY_STATUS = ['press', 'disabled', 'prompt', 'normal']

@ccclass
export class Key extends cc.Component {
    @property(Number)
    transDuration: Number = 0

    @property(String)
    status: String = 'normal'

    value: String = 'A'

    press: cc.Node = null

    disabled: cc.Node = null

    prompt: cc.Node = null

    normal: cc.Node = null

    enable() {
        this.enableBtnStatus('normal')
    }

    disable() {
        this.enableBtnStatus('disabled')
    }

    enableBtnStatus(status) {
        KEY_STATUS.forEach((s) => {
            if(s !== status) {
                this[s].active = false
            } else {
                this[s].active = true
            }
        })
    }

    getValue() {
        return this.value
    }

    setValue(val) {
        this.value = val

        KEY_STATUS.forEach((status) => {
            this[status].getChildByName('text').getComponent(cc.Label).string = val
        })
    }

    onLoad() {
        KEY_STATUS.forEach((status) => {
            this[status] = this.node.getChildByName(status)
        })

        this.enableBtnStatus('normal')

        const onTouchDown = (e) => {
            if(this.status === 'disabled') return

            this.enableBtnStatus('press')

            this.node.emit('onTouchStart', { value: this.value })
        }

        const onTouchUp = (e) => {
            if(this.status === 'disabled') return

            this.enableBtnStatus('normal')

            this.node.emit('onTouchEnd', { value: this.value })
        }

        this.node.on('touchstart',onTouchDown, this.node);
        this.node.on('touchend', onTouchUp, this.node);
        this.node.on('touchcancel', onTouchUp, this.node);

        this.setValue(this.value)
    }
}