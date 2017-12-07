package model

import "gopkg.in/mgo.v2/bson"

type User struct {
	Id       bson.ObjectId `bson:"_id,omitempty"`
	OpenId   string
	Avatar   string
	UserName string
	NickName string
}
