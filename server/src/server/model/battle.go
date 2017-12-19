package model

import (
	"errors"

	"gopkg.in/mgo.v2/bson"
)

type Battle struct {
	Id           bson.ObjectId `bson:"_id,omitempty"`
	Name         string
	Watchers     [3]User
	Players      [2]User
	Ip           string
	ReadyPlayers [2]User `bson:"-"`
}

func (battle *Battle) Save() error {
	return nil
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

func (battle *Battle) Start() {
	if len(battle.ReadyPlayers) == 2 {
		// 如果battle.isStart，那么就向对战双方发送各自的操作
		// 如果battle还没有Start，发送countdown，等待3秒后，isStart设为true
		// 并开始向双方发送对战信息
	}
}
