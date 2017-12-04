package internal

import (
	"fmt"
	"reflect"
	"server/dao"
	"server/model"
	"server/msg"
	"sync"

	"github.com/name5566/leaf/gate"
)

var mut *sync.Mutex
var battles map[string]model.Battle
var increment int
var playerA model.User
var playerB model.User

func init() {
	mut = new(sync.Mutex)

	battles = make(map[string]model.Battle)

	registerHandler(&msg.BattleInit{}, onBattleInit)
	registerHandler(&msg.BattleReady{}, onBattleReady)
}

func registerHandler(m interface{}, h interface{}) {
	skeleton.RegisterChanRPC(reflect.TypeOf(m), h)
}

func onBattleInit(args []interface{}) {
	agent := args[1].(gate.Agent)

	if _, ok := args[0].(*msg.BattleInit); ok {
		battleInfo := args[0].(*msg.BattleInit)

		skeleton.Go(func() {
			creator, err := dao.ChanRPC.Call1("GetUserById", battleInfo.Uid)

			fmt.Println("get user by id", creator)

			if err != nil {
				return
			}

			if _, ok := creator.(model.User); !ok {
				return
			}

			user := creator.(model.User)
			battle := model.Battle{
				Watchers: [3]model.User{},
				Players:  [2]model.User{user},
			}

			fmt.Println("create battle", user.UserName)

			dao.ChanRPC.Call0("CreateBattle", battle)

			if err != nil {
				agent.WriteMsg(&msg.RespError{Status: "failed", Message: "cannot find battle"})
				return
			}

			mut.Lock()
			/** 在内存中初始化battle信息，并发送battleinited信息给客户端 */
			fmt.Printf("find battle")
			mut.Unlock()
		}, func() {
		})
	}
}

func onBattleReady(args []interface{}) {
	if _, ok := args[0].(*msg.BattleReady); ok {
		fmt.Println("receive battle ready!")
	}
}

func onJoinBattle(args []interface{}) {
	/** 修改内存中对应的Battle信息 **/
}
