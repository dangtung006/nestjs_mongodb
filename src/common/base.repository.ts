import { Model, FilterQuery, QueryOptions, Document } from 'mongoose';

export class BaseRepository<T extends Document>{
    constructor(private readonly model : Model<T>){}

    async findById(id: string, option?: QueryOptions): Promise<T>{
        return this.model.findById(id);
    }

    async findAll(): Promise<T[]>{
        return this.model.find()
    }

    async create(doc: T): Promise<any>{
        const newDoc = new this.model(doc);
        return await newDoc.save();
    }
    
    async findByIdAndUpdate(id , update){
        return this.model.findOneAndUpdate(id, update)
    }

    async updateMany(filter, update, option?: any | null, callback?: any | null) {
        return this.model.updateMany(filter, update, option, callback);
    }

    async deleteOne(id: string){
        return this.model.deleteOne({ _id : id } as FilterQuery<T>)
    }

    async deleteMany(id: string[]){
        return this.model.deleteMany({ _id : { $in : id} } as FilterQuery<T>)
    }

    async deleteByCondition(filter : any) {
        return this.model.deleteMany(filter);
    }
}