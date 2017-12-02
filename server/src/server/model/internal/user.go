package internal

import (
	"gopkg.in/mgo.v2/bson"
)

type UserModel struct {
	Id       bson.ObjectId `bson:"_id,omitempty"`
	UserName string
	NickName string
}

const dbUser = "users"

func getUserById(args []interface{}) interface{} {
	var id string
	var result UserModel

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
