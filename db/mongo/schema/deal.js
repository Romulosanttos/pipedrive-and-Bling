class Schema {
  constructor(db) {
    this.db = db;
    this.name = 'deal';
  }

  async exist() {
    const existArray = await this.db.listCollections({ name: this.name }).toArray();
    return (existArray.map((elem) => elem.name === this.name)[0]) ? false : this.create();
  }

  async create() {
    await this.db.createCollection('deal', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          additionalProperties: false,
          required: [
            'id',
            'title',
            'official_document',
            'value',
            'status',
            'won_time',
          ],
          properties: {
            _id: {
              bsonType: 'objectId',
              title: 'The _id schema',
              description: 'An explanation about the purpose of this instance.',
              required: [
                '$oid',
              ],
              additionalProperties: true,
              properties: {
                $oid: {
                  bsonType: 'string',
                  title: 'The $oid schema',
                  description: 'An explanation about the purpose of this instance.',
                },
              },
            },
            id: {
              bsonType: 'int',
              title: 'The id schema',
              description: 'An explanation about the purpose of this instance.',
            },
            created_at: {
              bsonType: 'date',
              description: 'data de criação',
            },
            bling_send: {
              bsonType: 'bool',
              description: 'data de criação',
            },
            official_document: {
              bsonType: 'string',
              title: 'The official_document schema',
              description: 'An explanation about the purpose of this instance.',
            },
            title: {
              bsonType: 'string',
              title: 'The title schema',
              description: 'An explanation about the purpose of this instance.',
            },
            status: {
              bsonType: 'string',
              title: 'The status schema',
              description: 'An explanation about the purpose of this instance.',
            },
            value: {
              bsonType: 'int',
              title: 'The value schema',
              description: 'An explanation about the purpose of this instance.',
            },
            won_time: {
              bsonType: 'date',
              title: 'The won_time schema',
              description: 'An explanation about the purpose of this instance.',
            },
          },
        },
      },
    }).catch((err) => { throw new Error(err); });

    await this.db.collection('deal').createIndex({ id: 1 }, { unique: true })
      .catch((err) => { throw new Error(err); });
  }
}

export default async (db) => new Schema(db).exist();
