export class Slug {
  public value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(slug: string): Slug {
    return new Slug(slug)
  }

  /**
   * Receives a string and normalizes it to a slug.
   *
   * Example: "An example title" => "an-example-title"
   *
   * @param value {string}
   */
  static createFromText(text: string): Slug {
    const slugText = text
      .normalize('NFKD')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/_/g, '-')
      .replace(/--+/g, '-')
      .replace(/-$/g, '')

    return new Slug(slugText)
  }
}
