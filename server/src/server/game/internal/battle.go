package internal

import (
	"fmt"
	"reflect"
	"server/dao"
	"server/model"
	"server/msg"
	"sync"

	"github.com/name5566/leaf/gate"
	"github.com/name5566/leaf/log"
	"gopkg.in/mgo.v2/bson"
)

var mut *sync.Mutex
var battles map[bson.ObjectId]model.Battle

func init() {
	mut = new(sync.Mutex)

	battles = make(map[bson.ObjectId]model.Battle)

	registerHandler(&msg.BattleInit{}, onBattleInit)
	registerHandler(&msg.BattleReady{}, onBattleReady)
}

func registerHandler(m interface{}, h interface{}) {
	skeleton.RegisterChanRPC(reflect.TypeOf(m), h)
}

func onBattleInit(args []interface{}) {
	agent := args[1].(gate.Agent)

	var err error

	defer func() {
		if err != nil {
			log.Error(err.Error())

			agent.WriteMsg(&msg.RespError{
				Status:  "Failed",
				Message: "Battle init failed",
				UserMsg: "房间创建失败!",
			})
		}
	}()

	if _, ok := args[0].(*msg.BattleInit); ok {
		initData := args[0].(*msg.BattleInit)

		var battle model.Battle
		skeleton.Go(func() {
			var rawUser interface{}
			var rawBattle interface{}
			// step1: 查找用户[uid]
			rawUser, err = dao.ChanRPC.Call1("GetUserById", initData.Uid)

			if err != nil {
				return
			}

			if _, ok := rawUser.(model.User); !ok {
				return
			}

			user := rawUser.(model.User)

			// step2: 用户[uid]开始创建房间
			rawBattle, err = dao.ChanRPC.Call1("CreateBattle", model.Battle{
				Watchers: [3]model.User{},
				Players:  [2]model.User{user},
			})

			if err != nil {
				return
			}

			mut.Lock()
			// step3: 在内存中初始化battle信息，并发送battleinited信息给客户端
			if _, ok := rawBattle.(model.Battle); !ok {
				return
			}
			battle = rawBattle.(model.Battle)
			battles[battle.Id] = battle
			fmt.Println("房间创建成功", battles)
			mut.Unlock()
		}, func() {
			agent.WriteMsg(&msg.RespBattleInfo{battle})
		})
	}
}

func onBattleReady(args []interface{}) {
	if _, ok := args[0].(*msg.BattleReady); ok {
		fmt.Println("receive battle ready!")
	}
}

// 找个位置坐下
func appendToWaitList(bid bson.ObjectId, user model.User) {
	noUser := model.User{}
	noBattle := model.Battle{}

	battle := battles[bid]

	if battle == noBattle {
		return
	}

	for index, value := range battle.Players {
		if value == noUser {
			battle.Players[index] = user
			return
		}
	}

	for index, value := range battle.Watchers {
		if value == noUser {
			battle.Watchers[index] = user
			return
		}
	}

	return
}

func onJoinBattle(args []interface{}) {
	agent := args[1].(gate.Agent)

	var err error

	defer func() {
		if err != nil {
			log.Error(err.Error())

			agent.WriteMsg(&msg.RespError{
				Status:  "Failed",
				Message: "Join battle failed!",
				UserMsg: "加入房间失败！",
			})
		}
	}()
	/** 修改内存中对应的Battle信息 **/
	if _, ok := args[0].(*msg.JoinBattle); ok {
		joinData := args[0].(*msg.JoinBattle)

		skeleton.Go(func() {
			mut.Lock()
			// 修改内存中的battle对象
			appendToWaitList(bson.ObjectIdHex(joinData.Bid), joinData.User)
			mut.Unlock()

		}, func() {
		})

		fmt.Println("join battle")
	}
}
