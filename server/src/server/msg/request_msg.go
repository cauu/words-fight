package msg

import "server/model"

type BattleInit struct {
	Uid string
}

type ReadyForBattle struct {
	Bid string
	Uid string
}

type JoinBattle struct {
	Bid  string
	User model.User
}

type UserOperate struct {
	Bid       string
	Uid       string
	Selection int
}
