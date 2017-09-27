export class SerializationHelper {

    static toInstance<T>(obj: T, jsonObj: any) : T {
        if (typeof obj["fromJSON"] === "function") {
            obj["fromJSON"](jsonObj);
        }
        else {
            for (var propName in jsonObj) {
                obj[propName] = jsonObj[propName]
            }
        }

        return obj;
	}
	
	static toInstanceArray<T>(objArr: T[], jsonObj: any): T[] {
		objArr = [];
		for (let i: number = 0; i < jsonObj.length; i++) {
			let obj = jsonObj[i];
			if (typeof obj["fromJSON"] === "function") {
				obj["fromJSON"](jsonObj);
			}
			else {
				for (var propName in jsonObj[i]) {
					obj[propName] = jsonObj[i][propName]
				}
			}

			objArr.push(obj);
		}
		console.log(JSON.stringify(objArr));
		return objArr;
	}
}