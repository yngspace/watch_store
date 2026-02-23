export abstract class BaseApi {
  static async request<T>(key: string): Promise<T> {
    const response = await fetch('/database.json').then((value) => value.json())
    return new Promise<T>((resolve, reject) => {
      this.delay().finally(() => {
        if (typeof response[key] === 'undefined') reject('По вашему запросу ничего не найдено.')
        else resolve(response[key])
      })
    })
  }

  static delay(ms?: number) {
    return new Promise<void>((resolve, reject) => {
      setTimeout(resolve, ms || Math.random() * 1000)
    })
  }
}
