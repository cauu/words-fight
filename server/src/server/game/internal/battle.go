package internal

import (
	"fmt"
	"reflect"
	"server/model"
	"server/msg"
	"sync"

	"github.com/name5566/leaf/gate"
)

var mut *sync.Mutex
var battles map[int]model.Battle
var increment int
var playerA model.User
var playerB model.User

func init() {
	increment = 0
	mut = new(sync.Mutex)

	battles = make(map[int]model.Battle)

	registerHandler(&msg.BattleInit{}, onBattleInit)
	registerHandler(&msg.BattleReady{}, onBattleReady)
}

func registerHandler(m interface{}, h interface{}) {
	skeleton.RegisterChanRPC(reflect.TypeOf(m), h)
}

func onBattleInit(args []interface{}) {
	agent := args[1].(gate.Agent)

	if _, ok := args[0].(*msg.BattleInit); ok {
		battleInfo := args[0].(*msg.BattleInit)

		skeleton.Go(func() {
			_, err := model.ChanRPC.Call1("GetBattleById", battleInfo.Bid)

			if err != nil {
				agent.WriteMsg(&msg.RespError{Status: "failed", Message: "cannot find battle"})
				return
			}

			mut.Lock()
			// Update battle info in memory
			fmt.Printf("find battle")
			mut.Unlock()

		}, func() {
		})
	}
}

func onBattleReady(args []interface{}) {
	if _, ok := args[0].(*msg.BattleReady); ok {
		fmt.Println("receive battle ready!")
	}
}

func onJoinBattle(args []interface{}) {
}
