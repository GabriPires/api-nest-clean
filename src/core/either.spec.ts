import { Either, left, right } from './either'

function doSomething(x: boolean): Either<string, number> {
  if (x) {
    return right(1)
  } else {
    return left('error')
  }
}

describe('Either', () => {
  it('success result', () => {
    const result = doSomething(true)

    expect(result.value).toEqual(1)
    expect(result.isRight()).toBeTruthy()
    expect(result.isLeft()).toBeFalsy()
  })

  it('error result', () => {
    const result = doSomething(false)

    expect(result.value).toEqual('error')
    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
  })
})
