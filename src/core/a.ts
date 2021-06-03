const m = new WeakMap()

const s = Symbol('m')

const p = new Promise(() => {})

const fn = () => {}

const arr2 = [...[1, 2, 3]]

type WhatYouYield = 'foo'
type WhatYouReturn = 'bar'
type WhatYouAccept = 'baz'

function* myfun(): Generator<WhatYouYield, WhatYouReturn, WhatYouAccept> {
  const myYield = 'foo' //type of myYield is WhatYouYield
  const myAccepted = yield myYield //type of myAccepted is WhatYouAccept
  return 'bar' //type of this value is WhatYouReturn
}

console.log(m, s, p, fn, arr2)
