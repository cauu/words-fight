package model

import (
	"errors"

	"gopkg.in/mgo.v2/bson"
)

type Frame struct {
	Id         int
	Selections [2]int
}

type Battle struct {
	Id           bson.ObjectId `bson:"_id,omitempty"`
	Name         string
	Watchers     [3]User
	Players      [2]User
	Ip           string
	ReadyPlayers [2]User `bson:"-"`
	Status       int     `bson:"-"` // 0--Wait 1--Ready 2--Play 3--End 4--Stop
	Frames       []Frame `bson:"_"`
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

func (battle *Battle) Start() Frame {
	emptyFrame := Frame{}

	if battle.Frames == nil {
		battle.Frames = make([]Frame, 0, 100)
	}

	if len(battle.Frames) == 0 {
		return emptyFrame
	}

	currFrame := battle.Frames[len(battle.Frames)-1]

	battle.Frames = battle.Frames[:len(battle.Frames)-1]

	return currFrame
}
