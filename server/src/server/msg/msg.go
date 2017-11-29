package msg

import (
	"github.com/name5566/leaf/network/json"
)

var Processor = json.NewProcessor()

func init() {
	Processor.Register(&BattleInit{})
	Processor.Register(&BattleReady{})

	Processor.Register(&BattleInfo{})
}
