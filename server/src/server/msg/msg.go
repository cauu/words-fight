package msg

import (
	"github.com/name5566/leaf/network/json"
)

type BattleInit struct {
	bid string
}

type BattleReady struct {
	bid string
}

var Processor = json.NewProcessor()

func init() {
	Processor.Register(&BattleInit{})
	Processor.Register(&BattleReady{})
}
