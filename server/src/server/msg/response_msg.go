package msg

import "server/model"

type RespError struct {
	Status  string
	Message string
	UserMsg string
}

type RespBattleInfo struct {
	model.Battle
}
