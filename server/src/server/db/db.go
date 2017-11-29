package db

import (
	"server/conf"

	"github.com/name5566/leaf/db/mongodb"
	"github.com/name5566/leaf/log"
)

var MongoDB *mongodb.DialContext

const DB = "wordsfight"

func init() {
	if conf.Server.DBMaxConnNum <= 0 {
		conf.Server.DBMaxConnNum = 100
	}
	db, err := Mongodb.Dial(conf.Server.DBUrl, conf.Server.DBMaxConnNum)
	if err != nil {
		log.Fatal("dial mongodb error: %v", err)
	}
	MongoDB = db

	err = db.EnsureCounter(DB, "counters", "users")
	if err != nil {
		log.Fatal("ensure counter error: %v", err)
	}

	err = db.EnsureCounter(DB, "counters", "rooms")
	if err != nil {
		log.Fatal("ensure counter error: %v", err)
	}
}

func mongoDBDestroy() {
	MongoDB.Close()
	MongoDB = nil

}

func mongoDBNextSeq(id string) (int, error) {
	return MongoDB.NextSeq(DB, "counters", id)
}
