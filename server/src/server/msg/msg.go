package msg

import (
	"github.com/name5566/leaf/network/json"
)

var Processor = json.NewProcessor()

func init() {
	// Request msg
	// BattleInit会从数据库中根据BattleId获取Battle信息并保存到内存中
	Processor.Register(&BattleInit{})
	Processor.Register(&JoinBattle{})
	Processor.Register(&BattleReady{})

	// Response msg
	Processor.Register(&RespError{})
	Processor.Register(&RespBattleInfo{})
}
