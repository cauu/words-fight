package internal

import (
	"fmt"
)

type BattleModel struct {
	id       int
	watchers [3]UserModel
	players  [2]UserModel
}

func createBattle(args []interface{}) {
	fmt.Println("create battle!")
}
