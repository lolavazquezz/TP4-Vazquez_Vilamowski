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
   console.log(entity);
   const Id = parseInt(entity.id);
   const Name = ValidacionesHelper.getStringOrDefault(entity.name, null);
   const Full_name = ValidacionesHelper.getStringOrDefault(entity.full_name, null);
   const Latitude = ValidacionesHelper.getIntegerOrDefault(parseInt(entity.latitude), null);
   const Longitude = ValidacionesHelper.getIntegerOrDefault(parseInt(entity.longitude), null);
   const Display_order = ValidacionesHelper.getIntegerOrDefault(entity.display_order, null);
 
  if (Id == null ||  Name == null || Full_name == null || Latitude == null|| Longitude == null || Display_order == null){
      mensaje = "son nulos";
  }
  if (!Id || !Name ||  !Full_name || !Latitude|| !Longitude|| !Display_order){
      mensaje = "no estan";
  }
  /*if (Name.length < 3 || Full_name.length < 3){
      mensaje = "<3";
  }*/
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
   const Latitude = ValidacionesHelper.getIntegerOrDefault(entity.latitude, null);
   const Longitude = ValidacionesHelper.getIntegerOrDefault(entity.longitude, null);
   const Display_order = ValidacionesHelper.getIntegerOrDefault(entity.display_order, null);
   let provinceI = provincesArray.findIndex(p => p.id === id);
   if ((provinceI != -1) && (((Name != null)&& (Name.length < 3)) || ((Full_name != null) && (Full_name.length < 3)))){
      mensaje = 400;
      return mensaje;
   }
   else if (provinceI != -1 ){
      if (Name != null) provincesArray[provinceI].name = Name; 
      if (Full_name != null) provincesArray[provinceI].full_name = Full_name; 
      if (Latitude) provincesArray[provinceI].latitude = Latitude;       
      if (Longitude) provincesArray[provinceI].longitude = Longitude; 
      if (Display_order) provincesArray[provinceI].display_order = Display_order; 
      mensaje = 201;
   }
   else if (provinceI == -1) mensaje = 404;
   console.log(provincesArray[provinceI]);
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