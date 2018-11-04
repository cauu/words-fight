import { map } from 'rxjs/operators'
import ws from '../utils/ws'

/**
 * @description
 * 更新battle state，由于组件每一帧会自动更新，
 * 因此只需要保证state正常更新就可以保证视图也得到更新
 * 1. 点击对战按钮
 */
import { URL } from '../constant'

const BATTLE_STATE = {
}

export class BattleState {
    gameFrames

    connection

    myBlood

    enemyBlood

    constructor() {
        this.myBlood = 0
        this.enemyBlood = 0
    }

    initPractice() {
    }

    initPVE() {
        this.connection = ws(URL.PVE).subject
    }


}
