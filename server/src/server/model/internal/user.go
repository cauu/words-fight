package internal

import (
	"fmt"

	"gopkg.in/mgo.v2/bson"
)

type UserModel struct {
	Id       string
	UserName string
	Password string
	NickName string
}

const dbUser = "users"

func getUserById(args []interface{}) {
	var id string
	if _, ok := args[0].(string); ok {
		id = args[0].(string)
	}
	fmt.Printf("create user")
	var result UserModel
	skeleton.Go(func() {
		db := mongoDB.Ref()
		defer mongoDB.UnRef(db)
		err := db.DB(DB).C(C_USER).Find(bson.M{"id": id}).One(&result)
		if err != nil {
			fmt.Println("error: unable to find user")
		}
		return
	}, func() {
	})

	return
}
