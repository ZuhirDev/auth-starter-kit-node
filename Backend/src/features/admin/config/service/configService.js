
export class ConfigService {
  constructor({ configRepository }) {
      this.configRepository = configRepository
  }

  async getAll() {
      return this.configRepository.getAll()
  }

  async getAllPublic() {
      return this.configRepository.getAllPublic()
  }

  async update(id, data) {
      return this.configRepository.updateById(id, data)
  }
}