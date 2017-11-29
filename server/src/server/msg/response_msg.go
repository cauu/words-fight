package msg

type UserInfo struct {
}

type BattleInfo struct {
	Bid     int
	Players [2]UserInfo
}
