---
id: guide-idolmaster-live
title: จะไปคอนเสิร์ต THE IDOLM@STER สักวัน ต้องเตรียมตัวยังไง
subtitle: ก่อนที่คุณจะเดินทางไปคอนเสิร์ต THE IDOLM@STER ครั้งแรกของคุณ มาดูกันว่าควรเตรียมตัวยังไงกันบ้าง
featured: false
banner: ./cover.jpg
date: 2025-01-25
categories: []
preview: false
type: local
---

สวัสดีครับทุกคน ห่างหายไปนานไม่ได้เขียนบทความมานานมาก วันนี้ก็จะมีเรื่องมาเล่าให้ฟังกัน ถ้าหากทุกคนอ่าน [Year in review](/blog/year-in-review-2024)
กันมาจะรู้ว่าในปี 2024 นี้ผมได้ไปคอนเสิร์ต THE IDOLM@STER เยอะมากเนื่องจากเราที่ตามทั้งบ้าน MILLION LIVE และ Shiny Colors ด้วย
และในปี 2025 นี้ก็มีคอนเสิร์ต [HOTCHPOTCH FESTIV@L 2](https://idolmaster-official.jp/live_event/hpf2/)

ด้วยการที่มีเพื่อนหลายคนรอบๆ ที่กำลังกลับมาในวงการ และสนใจงานนี้เป็นจำนวนนึง เราก็จะมาเล่าเรื่องราวการเตรียมตัวก่อนไปคอนเสิร์ต THE IDOLM@STER กัน
เพื่อเป็นข้อมูลสำหรับคนที่จะไปคอนเสิร์ตครั้งแรก หรือคนที่อยากจะไปคอนเสิร์ตครั้งต่อไป

## การกดตั๋วคอนเสิร์ต

เมื่อก่อนตั๋วคอนเสิร์ตของ THE IDOLM@STER มักจะขายทางระบบ [E-Plus](https://eplus.jp/) แต่หลังจากปี 2023 มาทาง Bandai Namco Entertainment
ได้เปิดตัวระบบการขายตั๋วทางเว็บไซต์ของตัวเองที่ชื่อว่า [ASOBI TICKET](https://asobiticket2.asobistore.jp/)

ระบบการจำหน่ายตั๋วของ ASOBI TICKET จะแบ่งได้ 2 ประเภท คือ ระบบล็อตเตอรี่ (**抽選**) และระบบมาก่อนได้ก่อน (**先着**)

```jsx
// !esm - root2
import { render } from 'https://esm.sh/preact'
import React, { useState, useMemo } from 'https://esm.sh/preact/compat'

import { toUnicode, toASCII } from 'https://esm.sh/punycode'

const Component = () => {
  const [input, setInput] = useState('')

  const resultPuny = useMemo(
    () => toUnicode(input.length === 0 ? 'みんな' : input),
    [input]
  )
  const resultAscii = useMemo(
    () => toASCII(input.length === 0 ? 'みんな' : input),
    [input]
  )

  return (
    <div>
      <b>Input</b>
      <input
        type="text"
        className="input"
        placeholder="みんな"
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <p>
        <b>Punycode: </b> {resultPuny}
      </p>
      <p>
        <b>ASCII: </b> {resultAscii}
      </p>
    </div>
  )
}

render(<Component />, document.querySelector('#root2'))
```
