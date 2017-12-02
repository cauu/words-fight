package internal

import (
	"fmt"

	"gopkg.in/mgo.v2/bson"
)

type BattleModel struct {
	Id       bson.ObjectId `bson:"_id,omitempty"`
	Watchers [3]UserModel
	Players  [2]UserModel
	Ip       string
}

func createBattle(args []interface{}) {
	fmt.Println("create battle!")
}

func getBattleById(args []interface{}) interface{} {
	var id string
	var result BattleModel

	if _, ok := args[0].(string); ok {
		id = args[0].(string)
	}

	db := mongoDB.Ref()
	defer mongoDB.UnRef(db)
	err := db.DB(DB).C(C_BATTLE).FindId(bson.ObjectIdHex(id)).One(&result)
	if err != nil {
		panic(&err)
	}

	return result
}

func updateBattle(args []interface{}) {
}
