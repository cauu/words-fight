package msg

type BattleInit struct {
	Id       int
	Username string
}

type BattleReady struct {
	Bid int
}
