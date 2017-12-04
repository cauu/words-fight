package internal

import (
	"server/model"

	"gopkg.in/mgo.v2/bson"
)

func createBattle(args []interface{}) interface{} {
	var battle model.Battle

	if _, ok := args[0].(model.Battle); ok {
		battle = args[0].(model.Battle)
	}

	battle.Id = bson.NewObjectId()

	db := mongoDB.Ref()
	defer mongoDB.UnRef(db)
	err := db.DB(DB).C(C_BATTLE).Insert(battle)
	if err != nil {
		panic(&err)
	}

	return battle
}

func getBattleById(args []interface{}) interface{} {
	var id string
	var result model.Battle

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
