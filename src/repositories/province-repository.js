//import DBConfig from './../configs/db-config.js';
import provincesArray from "../entities/province.js";

import pkg from 'pg'
const { Client, Pool } = pkg;
export default class ProvinceRepository {
 getAllAsync = async () => {
    let returnArray = provincesArray;
    return returnArray;
    // habia algo de BD que esta en la presentacion de 08-Arquitectura
 }
 getByIdAsync = async (id) => {
    let returnArray = provincesArray.find(p => p.id === id);
    return returnArray;
 }
 createAsync = async (entity) => {
    
 }
 updateAsync = async (entity) => {

 }
 deleteByIdAsync = async (id) => {

 }
}