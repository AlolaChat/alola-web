import postcss from 'postcss'
import preset from '~/preset'

const input = `
.button {
  background: light-dark(var(--alola-color-red-5), var(--alola-color-blue-9));
}
`

async function test() {
  console.log(
    (
      await postcss([preset]).process(input, {
        from: undefined,
      })
    ).css
  )
}

test()
