package msg

import "server/model"

type BattleInit struct {
	Uid string
}

type BattleReady struct {
	Bid int
}

type JoinBattle struct {
	Bid  string
	User model.User
}
