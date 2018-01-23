
export class UserViewAuthorizationForGroupsPayload {
	public groupList: number[];

	constructor() { }

	public static createUserViewAuthorizationForGroupsPayload(groupList: number[]): UserViewAuthorizationForGroupsPayload {

		let userViewAuthorizationForGroupsPayload: UserViewAuthorizationForGroupsPayload = new UserViewAuthorizationForGroupsPayload();
		userViewAuthorizationForGroupsPayload.groupList = groupList;

		return userViewAuthorizationForGroupsPayload;
	}
}

export class User {

	public userId;

	constructor() { }

}
