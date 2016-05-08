/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import Realm from 'realm';
import { ListView } from 'realm/react-native';
const realm = new Realm({ schema: [{name: 'Translation', properties: {tibetan: 'string', english: 'string'}}] });

class TibetanDictionary extends Component {
  constructor (props) {
    super(props);

    /*let allTranslations = realm.objects('Translation')
    realm.write(() => {
      realm.delete(allTranslations);
    });*/

    let dictionary = realm.objects('Translation').sorted('tibetan');
    if (dictionary.length < 1) {
      realm.write(() => {
        realm.create('Translation', {tibetan: "ཀ་", english: "  I. <consonant letter> The first of the གསལ་བྱེད་སུམ་ཅུ thirty consonants of the Tibetan language."});
        realm.create('Translation', {tibetan: "ཀ་ཀ་", english: "<noun> 1) Corrupted form of ཀའ་ཀ q.v.  2) The ཨ་ཅུག of a sheep q.v.  3) [Dialect] The clothing of a young child.  4) Slang term for སྐྱག་པ faeces."});
        realm.create('Translation', {tibetan: "ཀ་ཀ་ཎི་ལ་", english: "Mis-spelling of ཀ་ཀ་ནའི་ལ q.v."});
        realm.create('Translation', {tibetan: "བསྐུལ་", english: "<verb> See བསྐུལ་བ q.v."});
        realm.create('Translation', {tibetan: "བསྐུལ་བ་ཕྲིན་ལས་ཀྱི་སྔགས་", english: "english: <noun>phrase> \"The evocation action mantra\" of a deity.  See སྔགས་བཞི \"the four mantras\"."});
        realm.create('Translation', {tibetan: "བསྐུས་", english: "<verb> See བསྐུས་པ q.v."});
        realm.create('Translation', {tibetan: "བསྐོ་བ་", english: "<verb> Fut. of སྐོ་བ [TC]."});
        realm.create('Translation', {tibetan: "བསྐོང་བ་", english: "<verb> Fut. of v.t. སྐོང་བ q.v."});
        realm.create('Translation', {tibetan: "བསྐོངས་པ་", english: "<verb> Past of v.t. form II སྐོང་བ q.v."});
        realm.create('Translation', {tibetan: "བསྐོན་པ་", english: "<verb> Past and fut. of སྐོན་པ q.v."});
        realm.create('Translation', {tibetan: "བསྐོར་", english: "<verb> See བསྐོར་བ q.v."});
        realm.create('Translation', {tibetan: "བསྐོར་བ་", english: "<verb> Past and fut. of སྐོར་བ q.v."});
        realm.create('Translation', {tibetan: "བསྐོལ་", english: "<verb> See བསྐོལ་བ q.v."});
        realm.create('Translation', {tibetan: "བསྐོས་", english: "<verb> See བསྐོས་པ q.v."});
        realm.create('Translation', {tibetan: "བསྐོས་པ་", english: "<verb> Past of སྐོ་བ q.v."});
        realm.create('Translation', {tibetan: "བསྐྱ་བ་", english: "<verb> Fut. of སྐྱ་བ q.v."});
        realm.create('Translation', {tibetan: "ཁ་སྦྱོར་ཡན་ལག་བདུན་དང་ལདན་པ་", english: "See the usual abbrev. ཁ་སྦྱོར་ཡན་ལག་བདུན་ལདན q.v."});
        realm.create('Translation', {tibetan: "དགུ་བརྒྱ་", english: "<noun> The number \"nine hundred\"."});
        realm.create('Translation', {tibetan: "དགུ་བརྒྱ་ཐམ་པ་", english: "<noun> The number \"nine hundred (exactly)\"."});
        realm.create('Translation', {tibetan: "དགུ་བཅུ་", english: "<noun> The number \"ninety\".  To indicate ninety exactly, དགུ་བཅུ་ཐམ་པ is used."});
        realm.create('Translation', {tibetan: "དགུ་བཅུ་གོ་དགུ་", english: "<noun> The number \"ninety-nine\"."});
        realm.create('Translation', {tibetan: "དགུ་བཅུ་གོ་བརྒྱད་", english: "<noun> The number \"ninety-eight\"."});
        realm.create('Translation', {tibetan: "དགུ་བཅུ་གོ་ལྔ་", english: "<noun> The number \"ninety-five\"."});
        realm.create('Translation', {tibetan: "དགུ་བཅུ་གོ་གཅིག་", english: "<noun> The number \"ninety-one\"."});
        realm.create('Translation', {tibetan: "དགུ་བཅུ་གོ་གཉིས་", english: "<noun> The number \"ninety-two\"."});
        realm.create('Translation', {tibetan: "དགུ་བཅུ་གོ་དྲུག་", english: "<noun> The number \"ninety-six\"."});
        realm.create('Translation', {tibetan: "དགུ་བཅུ་གོ་བདུན་", english: "<noun> The number \"ninety-seven\"."});
      });
    }

    // This is a Results object, which will live-update.
    this.dictionary = dictionary;

    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }).cloneWithRows(dictionary)
    };
  }

  onSearchChange(event: Object) {
    var query = event.nativeEvent.text.toLowerCase();
    var filtered = this.dictionary.filtered('tibetan BEGINSWITH "' + query + '"');
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(filtered)
    });
  }

  render = () => {
    return (
      <View style = { styles.parent }>
        <TextInput
          placeholder="Type something in English"
          onChange={this.onSearchChange.bind(this)}
        />
        <ListView
          dataSource={this.state.dataSource}
          style={styles.list}
          renderRow={(translation) => <View style={styles.list_line}>
            <Text style={styles.list_word}>{translation.tibetan}</Text>
            <Text style={styles.list_definition}>{translation.english}</Text>
          </View>}
        />
      </View>
    );
  }
};

var styles = StyleSheet.create({
  parent: {
    flex: 1,
    padding: 10
  },
  list: {
    flex: 1
  },
  list_line: {
    padding: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1
  },
  list_word: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  list_definition: {
    fontSize: 18
  }
});

AppRegistry.registerComponent('TibetanDictionary', () => TibetanDictionary);
