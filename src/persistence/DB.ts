import {DynamoDB} from "aws-sdk";

export class DB {

    private db: DynamoDB

    constructor(private table: string) {
        this.db = new DynamoDB()
    }

    store(item: any, condition: any) {
        item = this.formatItem(item)
        this.db.putItem({
            TableName: this.table,
            Item: item,
            ConditionExpression: condition
        })
    }

    get(key: any, callback: (err: any, data: any) => void) {
        let item: any = {
            TableName: this.table,
            Key: this.formatItem(key)
        }
        this.db.getItem(item, callback)
    }

    private formatItem(item: any) {
        let formatted: any = {}
        Object.keys(item).forEach(property => {
            switch (typeof item[property]) {
                case 'string':
                    formatted[property] = { S: item[property] }
                case 'number':
                    formatted[property] = { N: `${item[property]}` }
                case 'bool':
                    formatted[property] = { BOOL: item[property] }
            }
        })

        return formatted
    }
}

