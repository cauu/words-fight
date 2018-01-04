package model

import (
	"errors"
	"fmt"
	"sync"
	"time"

	"gopkg.in/mgo.v2/bson"
)

var mut *sync.Mutex

type BattleListener func(frame Frame)

func init() {
	mut = new(sync.Mutex)
}

//
type Frame struct {
	Id         int
	Selections [2]int
}

type Battle struct {
	Id             bson.ObjectId `bson:"_id,omitempty"`
	Name           string
	Watchers       [3]User
	Players        [2]User
	Ip             string
	ReadyPlayers   [2]User          `bson:"-"`
	Status         int              `bson:"-"` // 0--Wait 1--Ready 2--Play 3--End 4--Stop
	CurrentFrameId int              `bson:"-"`
	NextFrame      Frame            `bson:"-"`
	Frames         []Frame          `bson:"-"`
	Listeners      []BattleListener `bson:"-"`
}

func (battle *Battle) Save() error {
	return nil
}

func (battle *Battle) Subscribe(listener BattleListener) {
	if battle.Listeners == nil {
		battle.Listeners = make([]BattleListener, 0, 5)
	}

	battle.Listeners = append(battle.Listeners, listener)
}

func (battle *Battle) JoinBattle(user User) error {
	noUser := User{}

	for index, player := range battle.Players {
		if player == noUser {
			battle.Name = "fuck"
			battle.Players[index] = user
			return nil
		}
	}

	for index, watcher := range battle.Watchers {
		if watcher == noUser {
			battle.Watchers[index] = user
			return nil
		}
	}

	return errors.New("房间已满")
}

func (battle *Battle) ReadyForBattle(uid bson.ObjectId) error {
	noUser := User{}

	for index, player := range battle.ReadyPlayers {
		if player.Id == uid {
			battle.ReadyPlayers[index] = noUser
			return nil
		}
	}

	for index, player := range battle.Players {
		if player.Id == uid && battle.ReadyPlayers[index].Id != uid {
			battle.ReadyPlayers[index] = player
			return nil
		}
	}

	return errors.New("用户不在房间中")
}

// 将operation保存到下一个frame中
func (battle *Battle) OpToNextFrame(uid bson.ObjectId, selection int) {
	var userIdx int
	for i, p := range battle.Players {
		if p.Id == uid {
			userIdx = i
		}
	}

	mut.Lock()

	battle.NextFrame.Selections[userIdx] = selection

	mut.Unlock()
}

func (battle *Battle) NotifyAll() {
	// listeners := battle.Listeners
	for _, listener := range battle.Listeners {
		listener(battle.NextFrame)
	}
}

// 向所有的listener发送游戏帧
// 如果还有用户没准备完毕，则返回，否则游戏开始
func (battle *Battle) Start() {
	fmt.Println("游戏开始!")
	if battle.Frames == nil {
		battle.Frames = make([]Frame, 0, 30000)
	}

	battle.NextFrame = Frame{Id: battle.CurrentFrameId, Selections: [2]int{}}

	ticker := time.NewTicker(time.Millisecond * 50)

	for range ticker.C {
		battle.NotifyAll()
		battle.CurrentFrameId++
		battle.NextFrame = Frame{Id: battle.CurrentFrameId, Selections: [2]int{}}
		battle.Frames = append(battle.Frames, battle.NextFrame)
	}
}
