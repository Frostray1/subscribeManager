const UserModel = require('../models/user-model')
const bcrypt = require('bcrypt')
const tokenService = require('./token-service')
const UserDto = require('../dtos/user-dto')
const ApiError = require('../exceptions/api-errors')

class UserService {
	async registration(username, email, password) {
		const candidate = await UserModel.findOne({ email })
		if (candidate) {
			throw ApiError.BadRequest(
				`Пользователь с таким email ${email} уже существует`
			)
		}
		const hashPassword = await bcrypt.hash(password, 3)
		const user = await UserModel.create({
			username,
			email,
			password: hashPassword
		})

		const userDto = new UserDto(user)
		const tokens = tokenService.generateTokens({ ...userDto })
		await tokenService.saveToken(userDto.id, tokens.refreshToken)

		return {
			...tokens,
			user: userDto
		}
	}

	async login(email, password) {
		const user = await UserModel.findOne({ email })
		if (!user) {
			throw ApiError.BadRequest('Пользователь с таким email не найден')
		}
		const isPassEquals = await bcrypt.compare(password, user.password)
		if (!isPassEquals) {
			throw ApiError.BadRequest('Неверный пароль')
		}
		const userDto = new UserDto(user)
		const tokens = tokenService.generateTokens({ ...userDto })

		await tokenService.saveToken(userDto.id, tokens.refreshToken)
		return { ...tokens, user: userDto }
	}

	async logout(refreshToken) {
		const token = await tokenService.removeToken(refreshToken)
		return token
	}
}

module.exports = new UserService()