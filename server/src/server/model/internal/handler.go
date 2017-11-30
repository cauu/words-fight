package internal

func registerMsg(m string, h interface{}) {
	skeleton.RegisterChanRPC(m, h)
}

func init() {
	// battle的增删改查
	registerMsg("CreateBattle", createBattle)

	// user的增删改查
	registerMsg("GetUserById", getUserById)
}
