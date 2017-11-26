package internal

import (
	"fmt"
	"reflect"
	"server/msg"
)

func init() {
	registerHandler(&msg.BattleInit{}, onBattleInit)
	registerHandler(&msg.BattleReady{}, onBattleReady)
}

func registerHandler(m interface{}, h interface{}) {
	skeleton.RegisterChanRPC(reflect.TypeOf(m), h)
}

func onBattleInit(args []interface{}) {
	if _, ok := args[0].(*msg.BattleInit); ok {
		fmt.Println("receive battle init1234567!")

	}
}

func onBattleReady(args []interface{}) {
	if _, ok := args[0].(*msg.BattleReady); ok {
		fmt.Println("receive battle ready!")
	}
}
