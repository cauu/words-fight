package conf

import (
	"encoding/json"
	"io/ioutil"

	"github.com/name5566/leaf/log"
)

var Server struct {
	LogLevel     string
	LogPath      string
	WSAddr       string
	CertFile     string
	KeyFile      string
	TCPAddr      string
	MaxConnNum   int
	DBMaxConnNum int
	DBUrl        string
	ConsolePort  int
	ProfilePath  string
}

func init() {
	data, err := ioutil.ReadFile("conf/server.json")
	if err != nil {
		log.Fatal("%v", err)
	}
	err = json.Unmarshal(data, &Server)
	if err != nil {
		log.Fatal("%v", err)
	}
}
