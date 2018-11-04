const { ccclass, property } = cc._decorator

@ccclass
export class Keyboard extends cc.Component {
    @property([cc.Node])
    keys: cc.Node[] = []

    @property(cc.Node)
    btnConfirm: cc.Node = null

    @property(cc.Node)
    btnDelete: cc.Node = null

    @property(cc.Node)
    btnRefresh: cc.Node = null

    @property(cc.Node)
    btnTips: cc.Node = null

    shuffleKeyboard(keys) {
        let alphabet = [
            'A', 'B', 'C', 'D', 'E', 'F', 'G',
            'H', 'I', 'J', 'K', 'L', 'M', 'N',
            'O', 'P', 'Q', 'R', 'S', 'T', 'U',
            'V', 'W', 'X', 'Y', 'Z'
        ]

        const shuffled = []

        while(alphabet.length > 0) {
            const currIndex = Math.floor(alphabet.length * Math.random())

            shuffled.push(alphabet[currIndex])

            alphabet = alphabet.slice(0, currIndex).concat(alphabet.slice(currIndex + 1))
        }

        (keys || []).forEach((key, idx) => {
            key.setValue(shuffled[idx])
        })
    }

    onLoad() {

    }
}