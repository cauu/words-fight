package internal

import (
	"server/msg"
)

func (battle *Battle) ToResponse() *msg.BattleInfo {
	var resp *msg.BattleInfo

	resp = &msg.BattleInfo{
		Bid: battle.id,
	}

	return resp
}
