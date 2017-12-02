package model

import (
	"server/model/internal"
)

type User struct {
	*internal.UserModel
}

type Battle struct {
	*internal.BattleModel
}

var (
	Module  = new(internal.Module)
	ChanRPC = internal.ChanRPC
)
