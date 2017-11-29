package internal

import (
	"fmt"
	"reflect"
	"server/msg"
	"sync"

	"github.com/name5566/leaf/gate"
)

var mut *sync.Mutex
var battles map[int]Battle
var increment int
var playerA User
var playerB User

func init() {
	increment = 0
	mut = new(sync.Mutex)

	battles = make(map[int]Battle)

	registerHandler(&msg.BattleInit{}, onBattleInit)
	registerHandler(&msg.BattleReady{}, onBattleReady)
}

func registerHandler(m interface{}, h interface{}) {
	skeleton.RegisterChanRPC(reflect.TypeOf(m), h)
}

func onBattleInit(args []interface{}) {
	agent := args[1].(gate.Agent)

	if _, ok := args[0].(*msg.BattleInit); ok {
		battleCreator := args[0].(*msg.BattleInit)

		mut.Lock()
		increment++
		battle := Battle{id: increment, players: [2]User{User{id: battleCreator.Id, name: battleCreator.Username}}}
		battles[increment] = battle
		mut.Unlock()

		fmt.Println("battle created!")

		for key, value := range battles {
			fmt.Println("Key:", key, "Value:", value)
		}

		// agent.WriteMsg(battle.ToResponse())
		agent.WriteMsg(&msg.BattleInit{Id: 123})
	}
}

func onBattleReady(args []interface{}) {
	if _, ok := args[0].(*msg.BattleReady); ok {
		fmt.Println("receive battle ready!")
	}
}

func onJoinBattle(args []interface{}) {
}
