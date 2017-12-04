package internal

import (
	"server/model"

	"gopkg.in/mgo.v2/bson"
)

const dbUser = "users"

func getUserById(args []interface{}) interface{} {
	var id string
	var result model.User

	if _, ok := args[0].(string); ok {
		id = args[0].(string)
	}

	db := mongoDB.Ref()
	defer mongoDB.UnRef(db)
	err := db.DB(DB).C(C_USER).FindId(bson.ObjectIdHex(id)).One(&result)

	if err != nil {
		panic(&err)
	}

	return result
}
