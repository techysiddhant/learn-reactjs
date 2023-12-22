/* eslint-disable no-useless-catch */
import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
	client = new Client();
	account;

	constructor() {
		this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
		this.account = new Account(this.client);
	}

	async createAccount({ email, password, name }) {
		try {
			const userAccount = await this.account.create(
				ID.unique(),
				email,
				password,
				name
			);
			if (userAccount) {
				// return userAccount;
				//call login method for better UX because user already created the account.
				return this.login({ email, password });
			} else {
				return userAccount;
			}
		} catch (error) {
			throw error;
		}
	}

	async login({ email, password }) {
		try {
			const user = await this.account.createEmailSession(email, password);
			return user;
		} catch (error) {
			throw error;
		}
	}

	async getCurrentUser() {
		try {
			return await this.account.get();
		} catch (error) {
			throw error;
		}
	}

	async logout() {
		try {
			await this.account.deleteSessions();
		} catch (error) {
			throw error;
		}
	}
}
const authService = new AuthService();
export default authService;
