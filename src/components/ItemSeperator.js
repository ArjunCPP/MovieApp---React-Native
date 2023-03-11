import React from "react";
import {View,Text,StyleSheet, Dimensions} from "react-native"

const ItemSperator = ({height,width}) =>{
    return (
        <View style={{width,height}}/>
    )
}

ItemSperator.defaultProps ={
    height:0,
    width:0
}

export default ItemSperator;