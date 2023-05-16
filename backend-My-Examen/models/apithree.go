package models

type Apier struct {
	Options []Options `json:"options"`
}

type Options struct {
	Name          string          `json:"name"`
	Version       []string        `json:"version"`
	GrownUp       bool            `json:"grownup"`
	SecondOptions []SecondOptions `json:"secondoptions"`
}

type SecondOptions struct {
	Gender   bool   `json:"gender"`
	Human    bool   `json:"human"`
	Age      bool   `json:"age"`
	Quantity int    `json:"quantity"`
	Name     string `json:"name"`
}
