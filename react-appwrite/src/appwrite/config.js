import conf from "../conf/conf";
import { Client, Databases, Storage, Query, ID } from "appwrite";

export class Service {
	client = new Client();
	databases;
	bucket;

	constructor() {
		this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
		this.databases = new Databases(this.client);
		this.bucket = new Storage(this.client);
	}

	async createPost({ title, slug, content, featuredImage, userId, status }) {
		try {
			return await this.databases.createDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				ID.unique(),
				{
					title,
					slug,
					featuredImage,
					status,
					userId,
					content,
				}
			);
		} catch (error) {
			console.log("Appwrite Service createPost", error);
		}
	}

	async updatePost(id, { title, slug, content, featuredImage, status }) {
		try {
			return await this.databases.updateDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				id,
				{
					title,
					content,
					featuredImage,
					status,
					slug,
				}
			);
		} catch (error) {
			console.log("App write updatePost", error);
		}
	}

	async deletePost(id) {
		try {
			await this.databases.deleteDocument(
				conf.appwriteDatabaseId,
				conf.appwriteDatabaseId,
				id
			);
			return true;
		} catch (error) {
			console.log("App write deletedoc", error);
			return false;
		}
	}

	async getPost(id) {
		try {
			return await this.databases.getDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				id
			);
		} catch (error) {
			console.log("App Write get post", error);
			return false;
		}
	}

	async getPosts(queries = [Query.equal("status", "active")]) {
		try {
			await this.databases.listDocuments(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				queries
			);
		} catch (error) {
			console.log("app write getPosts", error);
		}
	}

	// file upload service

	async uploadFile(file) {
		try {
			return await this.bucket.createFile(
				conf.appwriteBucketId,
				ID.unique(),
				file
			);
		} catch (error) {
			console.log("app write upload file", error);
			return false;
		}
	}

	async deleteFile(id) {
		try {
			await this.bucket.deleteFile(conf.appwriteBucketId, id);
			return true;
		} catch (error) {
			console.log("delete file", error);
			return false;
		}
	}
	async getFilePreview(id) {
		return this.bucket.getFilePreview(conf.appwriteBucketId, id);
	}
}

const service = new Service();
export default service;
