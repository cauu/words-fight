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
var battles map[bson.ObjectId]*model.Battle

func init() {
	mut = new(sync.Mutex)

	battles = make(map[bson.ObjectId]*model.Battle)

	registerHandler(&msg.BattleInit{}, onBattleInit)
	registerHandler(&msg.ReadyForBattle{}, onReadyForBattle)
	registerHandler(&msg.JoinBattle{}, onJoinBattle)
}

/**
* 调用流程为:
* 1. 用户A调用initBattle 创建房间,创建房间后，开始监听对战信息
* 2. 用户B调用joinBattle加入房间,加入房间后，也监听对战信息
**/

func registerHandler(m interface{}, h interface{}) {
	skeleton.RegisterChanRPC(reflect.TypeOf(m), h)
}

func onBattleStart() {
	// 等待游戏开始
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
			battles[battle.Id] = &battle
			fmt.Println("房间创建成功", battle)
			mut.Unlock()
			agent.WriteMsg(&msg.RespBattleInfo{battle})
		}, func() {
			// 等待游戏开始
		})
	}
}

func onReadyForBattle(args []interface{}) {
	agent := args[1].(gate.Agent)

	if _, ok := args[0].(*msg.ReadyForBattle); ok {
		data := args[0].(*msg.ReadyForBattle)

		fmt.Println("receive battle ready!", data)

		skeleton.Go(func() {
			mut.Lock()
			battle := battles[bson.ObjectIdHex(data.Bid)]
			battle.ReadyForBattle(bson.ObjectIdHex(data.Uid))
			fmt.Println(battle)
			mut.Unlock()
			agent.WriteMsg(&msg.RespJoinBattle{*battles[bson.ObjectIdHex(data.Bid)]})
		}, func() {

		})
	}
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
			battle := battles[bson.ObjectIdHex(joinData.Bid)]
			battle.JoinBattle(joinData.User)
			mut.Unlock()
			agent.WriteMsg(&msg.RespJoinBattle{*battles[bson.ObjectIdHex(joinData.Bid)]})
		}, func() {
			// 等待游戏开始
		})
	}
}
