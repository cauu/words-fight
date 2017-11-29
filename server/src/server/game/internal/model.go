package internal

type User struct {
	id     int
	openId string
	name   string
	avatar string
	gender string
}

type Battle struct {
	id       int
	watchers [3]User
	players  [2]User
}

type Question struct {
	id      string
	title   string
	answers [4]Answer
}

type Answer struct {
	id   string
	text string
}
