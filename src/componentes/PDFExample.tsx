/**
 * Copyright (c) 2017-present, Wonday (@wonday.org)
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import Pdf from 'react-native-pdf';

const source = { uri: 'https://www.al.sp.gov.br/arquivos/transparencia/cartilha_comportamental_alesp.pdf', cache: true };
//const source = require('./test.pdf');  // ios only
//const source = {uri:'bundle-assets://test.pdf' };
//const source = {uri:'file:///sdcard/test.pdf'};
//const source = {uri:"data:application/pdf;base64,JVBERi0xLjcKJc..."};
//const source = {uri:"content://com.example.blobs/xxxxxxxx-...?offset=0&size=xxx"};
//const source = {uri:"blob:xxxxxxxx-...?offset=0&size=xxx"};

export function PDFExample() {
       return (
            <View style={styles.container}>
                <Pdf
                    trustAllCerts={false}
                    source={source}
                    onLoadComplete={(numberOfPages,filePath) => {
                        console.log(`Number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page,numberOfPages) => {
                        console.log(`Current page: ${page}`);
                    }}
                    onError={(error) => {
                        console.log(error);
                    }}
                    onPressLink={(uri) => {
                        console.log(`Link pressed: ${uri}`);
                    }}
                    style={styles.pdf}/>
            </View>
        );
    };

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 10,
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width - 50,
        height:Dimensions.get('window').height + 900,
    }
});