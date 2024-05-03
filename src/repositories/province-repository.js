//import DBConfig from './../configs/db-config.js';
import provincesArray from "../entities/province.js";

import pkg from 'pg'
const { Client, Pool } = pkg;
export default class ProvinceRepository {
 getAllAsync = async () => {
    let returnArray = provincesArray;
    return returnArray;
 }
 getByIdAsync = async (id) => {
    returnArray = provincesArray.find(p => p.id === id);;
    return returnArray;
 }
 createAsync = async (entity) => {
    
 }
 updateAsync = async (entity) => {

 }
 deleteByIdAsync = async (id) => {

 }
}