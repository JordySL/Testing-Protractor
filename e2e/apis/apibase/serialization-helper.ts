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
	
	static toInstanceArray<T>(obj: T, jsonObj: any): T[] {
		let objArr: typeof obj[] = [];
		for (let i: number = 0; i < jsonObj.length; i++) {
			// Copy our blank source object
			const copy = Object.assign({}, obj);
			const newObj = this.toInstance(copy, jsonObj[i]);
			objArr.push(newObj);
		}
		return objArr;
	}
}