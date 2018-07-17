import timestampNow from 'performance-now'
import React from 'react';
import { PixelRatio,Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
let pixelRatio = PixelRatio.get();
import md5 from 'crypto-js/md5';
export const normalize = (size) => {
    switch (true){
        case (pixelRatio < 1.4):
            return size * 0.8;
        case (pixelRatio < 2.4):
            return size * 1.15;
        case (pixelRatio < 3.4):
            return size * 1.35;
        default:
            return size * 1.5;
    }
}

export const normalizeFont = (size) => {
    if (pixelRatio < 1.4){
        return Math.sqrt((height*height)+(width*width))*(size/175);
    }
    return Math.sqrt((height*height)+(width*width))*(size/100);
}
export function throttle() {
    return false
}

export function secure(key){
    return md5(md5(key).toString()).toString()
}
export function jsDateToSqlDT(value) {
    let tomorrow = value
    if (tomorrow === null || tomorrow === "") {
        tomorrow = new Date()
    } else {
        tomorrow = new Date(value);
        tomorrow.setDate(tomorrow.getDate() + 1)
    }
    //returned from mysql timestamp/datetime field
    // let a = value.split(" ");
    // let d = a[0].split("-");
    // let t = a[1].split(":");
    // let formatedDate = new Date(d[0], (d[1] - 1), d[2], t[0], t[1], t[2]);

    return tomorrow.toISOString().substring(0, 19).replace('T', ' ');
}
export function jsDateToSqlDTPlusOne(value) {
    let tomorrow = value
    if (tomorrow === null || tomorrow === "") {
        tomorrow = new Date()
    } else {
        tomorrow = new Date(value);
    }
    //returned from mysql timestamp/datetime field
    // let a = value.split(" ");
    // let d = a[0].split("-");
    // let t = a[1].split(":");
    // let formatedDate = new Date(d[0], (d[1] - 1), d[2], t[0], t[1], t[2]);

    return tomorrow.toISOString().substring(0, 19).replace('T', ' ');
}

export function jsDateToSqlD(value) {
    // console.log(value)
    let tomorrow = value
    if (tomorrow === null || tomorrow === "") {
        tomorrow = new Date()
    } else {
        tomorrow = new Date(value);
        tomorrow.setDate(tomorrow.getDate())
    }
    //returned from mysql timestamp/datetime field
    // let a = value.split(" ");
    // let d = a[0].split("-");
    // let t = a[1].split(":");
    // let formatedDate = new Date(d[0], (d[1] - 1), d[2], t[0], t[1], t[2]);

    return tomorrow.toISOString().substring(0, 10);
}
export function sqlToJsISO(sqlDateStr) {
    if (sqlDateStr === null || sqlDateStr === "") {
        sqlDateStr = '2018-02-22 00:00:00'
    }
    //returned from mysql timestamp/datetime field
    let a = sqlDateStr.split(" ");
    let d = a[0].split("-");
    let t = a[1].split(":");
    let formatedDate = new Date(d[0], (d[1] - 1), d[2], t[0], t[1], t[2]);
    //console.log(formatedDate.toISOString())
    return formatedDate.toISOString();
}
export function sqlToJsDate(sqlDateStr) {
    if (sqlDateStr === '') {
        sqlDateStr = '2018-02-22 00:00:00'
    }
    // sqlDateStr = sqlDateStr.replace(/:| /g, "-");
    return new Date(Date.parse(sqlDateStr.replace('-', '/', 'g'))).toISOString()
    // return sqlDate.toISOString().substring(0, 19).replace('T', ' ');
}