package internal

import "sync"

func WaitUntil(fn func(wg *sync.WaitGroup)) {
	wg := new(sync.WaitGroup)
	wg.Add(1)
	go fn(wg)
	wg.Wait()
}
