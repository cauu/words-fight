package internal

import (
	"server/conf"

	"github.com/name5566/leaf/db/mongodb"
	"github.com/name5566/leaf/log"
)

var mongoDB *mongodb.DialContext

const DB = "wordsfight"
const C_USER = "users"
const C_BATTLE = "battles"

func init() {
	if conf.Server.DBMaxConnNum <= 0 {
		conf.Server.DBMaxConnNum = 100
	}
	db, err := mongodb.Dial(conf.Server.DBUrl, conf.Server.DBMaxConnNum)
	if err != nil {
		log.Fatal("dial mongodb error: %v", err)
	}
	mongoDB = db

	err = db.EnsureCounter(DB, "counters", "users")
	if err != nil {
		log.Fatal("ensure counter error: %v", err)
	}

	err = db.EnsureCounter(DB, "counters", "battles")
	if err != nil {
		log.Fatal("ensure counter error: %v", err)
	}
}

func DBDestroy() {
	mongoDB.Close()
	mongoDB = nil

}

func DBNextSeq(id string) (int, error) {
	return mongoDB.NextSeq(DB, "counters", id)
}
