//import DBConfig from './../configs/db-config.js';
import provincesArray from "../entities/province.js";
import ValidacionesHelper from "../helpers/validaciones-helper.js";
import {StatusCodes} from "http-status-codes";

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
   let mensaje;
   const Id = parseInt(entity.id);
   const Name = ValidacionesHelper.getStringOrDefault(entity.name, null);
   const Full_name = ValidacionesHelper.getStringOrDefault(entity.full_name, null);
   const Latitude = ValidacionesHelper.getIntegerOrDefault(parseInt(entity.latitude), null);
   const Longitude = ValidacionesHelper.getIntegerOrDefault(parseInt(entity.longitude), null);
   const Display_order = ValidacionesHelper.getIntegerOrDefault(entity.display_order, null);
   if (Id == null || !Id || Name == null || !Name || Name.length < 3 || Full_name == null || Full_name.length < 3 || !Full_name || Latitude == null || !Latitude || Longitude == null || !Longitude || Display_order == null || !Display_order) {
      mensaje = false;
  }
  else {
      let newProvince = {
         id: Id, 
         name: Name, 
         full_name: Full_name, 
         latitude: Latitude, 
         longitude: Longitude, 
         display_order: Display_order
      }
      provincesArray.push(newProvince);
      mensaje = true;
  }
  return mensaje;
 }
 updateAsync = async (entity, id) => {
   let mensaje;
   const Name = ValidacionesHelper.getStringOrDefault(entity.name, null);
   const Full_name = ValidacionesHelper.getStringOrDefault(entity.full_name, null);
   const Latitude = ValidacionesHelper.getIntegerOrDefault(parseInt(entity.latitude), null);
   const Longitude = ValidacionesHelper.getIntegerOrDefault(parseInt(entity.longitude), null);
   const Display_order = ValidacionesHelper.getIntegerOrDefault(entity.display_order, null);
   let provinceI = provincesArray.findIndex(p => p.id === id);
   if ((provinceI != -1) && (((Name != null)&& (Name.length < 3)) || ((Full_name != null) && (Full_name.length < 3)))){
      mensaje = 400;
      return mensaje;
   }
   else if (provinceI != -1 ){
      if (Name == null) Name == provincesArray[provinceI].name; 
      if (Full_name == null) Full_name == provincesArray[provinceI].full_name; 
      if (Latitude == null) Latitude == provincesArray[provinceI].latitude; 
      if (Longitude == null) Longitude == provincesArray[provinceI].longitude; 
      if (Display_order == null) Display_order == provincesArray[provinceI].display_order; 
       
      provincesArray[provinceI].name = Name;
      provincesArray[provinceI].full_name = Full_name;
      provincesArray[provinceI].latitude = Latitude;
      provincesArray[provinceI].longitude = Longitude;
      provincesArray[provinceI].display_order = Display_order;

      mensaje = 201;
   }
   else if (provinceI == -1) mensaje = 404;
   return mensaje;
 }
 deleteByIdAsync = async (id) => {
   let mensaje;
   let provinceI = provincesArray.findIndex(p => p.id === id);
   if (provinceI != -1) {
       provincesArray.splice(provinceI, 1);
      mensaje = true;
   }
   else mensaje = false;
   return mensaje;
 }
}