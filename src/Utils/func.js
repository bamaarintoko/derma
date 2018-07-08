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