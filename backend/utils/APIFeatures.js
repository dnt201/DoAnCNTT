const { ConnectionStates } = require("mongoose");
const Category = require('../models/Category.Model')

class APIFeature {
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        } : {}

        this.query = this.query.find({...keyword})
        return this;
    }

    searchExact(){
        const keyword = this.queryStr.name ? {
            "name": this.queryStr.name
        }: {}

        this.query = this.query.find({...keyword});
        return this;
    }

    filter(){

        const queryData = {...this.queryStr};

        const removeField = ['keyword', 'limit', 'page']
        removeField.forEach(element => delete queryData[element]);

        let queryStr = JSON.stringify(queryData);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)
        this.query = this.query.find(JSON.parse(queryStr));
        
        return this;
    }

    pagination(resPerPage){
        const currentPage = Number(this.queryStr.page) || 1;
        const skipProduct = (currentPage - 1) * resPerPage;

        this.query = this.query.limit(resPerPage).skip(skipProduct);
        
        return this;
    }
}

module.exports = APIFeature;