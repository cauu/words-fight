package msg

type BattleInit struct {
	Uid string
}

type BattleReady struct {
	Bid int
}

type JoinBattle struct {
	Bid string
	Uid string
}
