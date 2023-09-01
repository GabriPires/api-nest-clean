import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { DeleteAnswerCommentUseCase } from './delete-answer-comment'
import { NotAllowedError } from '@/core/errors/not-allowed-error'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: DeleteAnswerCommentUseCase

describe('Delete Answer Comment', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository)
  })

  test('should be able to delete a comment answer', async () => {
    const newAnswer = makeAnswerComment()

    inMemoryAnswerCommentsRepository.create(newAnswer)

    await sut.execute({
      answerCommentId: newAnswer.id.toString(),
      authorId: newAnswer.authorId.toString(),
    })

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0)
  })

  test('should not be able to delete a answer comment from another user', async () => {
    const newAnswer = makeAnswerComment({
      authorId: new UniqueEntityId('author-1'),
    })

    inMemoryAnswerCommentsRepository.create(newAnswer)

    const result = await sut.execute({
      answerCommentId: newAnswer.id.toString(),
      authorId: 'author-2',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
