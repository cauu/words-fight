package msg

type RespError struct {
	Status  string
	Message string
}

type UserInfo struct {
}

type BattleInfo struct {
	Bid     int
	Players [2]UserInfo
}
