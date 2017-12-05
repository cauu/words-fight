package gate

import (
	"server/game"
	"server/msg"
)

func init() {
	msg.Processor.SetRouter(&msg.BattleInit{}, game.ChanRPC)
	msg.Processor.SetRouter(&msg.JoinBattle{}, game.ChanRPC)
	msg.Processor.SetRouter(&msg.BattleReady{}, game.ChanRPC)
}
