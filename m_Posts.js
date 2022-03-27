'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    claps: { type: Number, default: 0 },
    no_claps: { type: Number, default: 0 },
    subscriberId: { type: String, required: false },
    //empresaId:{ type: Schema.ObjectId, ref:'Empresas', required: false },
    titlePost: { type: String, trim: true, /* require:true  */ },
    price: { type: Number, /* require:true  */ },
    category: { type: String, /* require:true  */ },
    descriptionPost: { type: String, /*require:true,*/ trim: true, },
    Images: { type: [String], /* require:true  */ },
    address: { type: String, /* require:true  */ },
    phoneNumber: { type: String, /* require:true  */ },
    createDate: { type: Date, default: new Date() },
    createDateClaps: { type: Date },
    createDateNoClaps: { type: Date },
    updateDate: { type: Date, default: new Date() },
});

PostSchema.methods.clap = function () {
    this.claps++
    this.createDateClaps = new Date()
    return this.save();
}

PostSchema.methods.no_clap = function () {
    this.no_claps++
    this.createDateNoClaps = new Date()
    return this.save();
}

PostSchema.index({
    category: 1,
    createDate: 1,
    createDateClaps: 1,
    createDateNoClaps: 1
})

module.exports = mongoose.model('Posts', PostSchema);
