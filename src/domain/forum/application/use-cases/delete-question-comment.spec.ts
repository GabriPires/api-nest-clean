import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { DeleteQuestionCommentUseCase } from './delete-question-comment'
import { NotAllowedError } from '@/core/errors/not-allowed-error'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: DeleteQuestionCommentUseCase

describe('Delete Question Comment', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentsRepository)
  })

  test('should be able to delete a comment question', async () => {
    const newQuestion = makeQuestionComment()

    inMemoryQuestionCommentsRepository.create(newQuestion)

    await sut.execute({
      questionCommentId: newQuestion.id.toString(),
      authorId: newQuestion.authorId.toString(),
    })

    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0)
  })

  test('should not be able to delete a question comment from another user', async () => {
    const newQuestion = makeQuestionComment({
      authorId: new UniqueEntityId('author-1'),
    })

    inMemoryQuestionCommentsRepository.create(newQuestion)

    const result = await sut.execute({
      questionCommentId: newQuestion.id.toString(),
      authorId: 'author-2',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
