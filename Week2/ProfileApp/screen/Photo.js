/**
 * Import React and Component needd for component
 */
import React from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity, ImageBackground, StatusBar } from 'react-native';
import { Ionicons, Feather, SimpleLineIcons, Entypo, FontAwesome } from '@expo/vector-icons';





/**
 * Defind general color value
 */
const FOLLOW_COLOR = 'rgb(71,113,246)';





/**
 * Render View
 */
export default class PhotoScreen extends React.Component {

  // Hidden header navigator
  static navigationOptions = {
      header: null
  }

  render() {

    const { navigate } = this.props.navigation;
    let id = this.props.navigation.getParam('id');

    return (
      
      <View style={styles.container}>
  
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

        {/* START background section */}
        <View style={ styles.backgroundSection }>
          <ImageBackground source={id} style={{flex: 1}}>
            <View style={ styles.headerSection }>
              <TouchableOpacity style={ styles.wrapIconHeaderLeft } onPress={() => navigate('Profile')}>
                <Feather name="arrow-left" size={25} color="#6b7596" />
              </TouchableOpacity>
              <TouchableOpacity style={ styles.wrapIconHeaderRight }>
                <SimpleLineIcons name="grid" size={20} color="#6b7596" />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
        {/* END background section */}

        {/* START content section */}
        <View style={ styles.contentSection }>

          <View style={ styles.contenHeader }>
            <View style={ styles.leftHeader }>
              <Text style={ styles.leftHeaderTitle }>Cat funny</Text>
              <View style={ styles.leftHeaderLocal }>
                <Entypo name="location-pin" size={20} color="#9ea7d1" />
                <Text style={ styles.localText }>Hồ Chí Minh, Việt Nam</Text>
              </View>
            </View>
            <View style={ styles.rightHeader }>
              <TouchableOpacity style={ styles.btnDownload } onPress={() => Alert.alert('Notify', 'Saved')}>
                <Feather name="download-cloud" size={25} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={ styles.contentBody }>
            <Text style={ styles.contextText }>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </Text>
          </View>

          <View style={ styles.contentTag }>
            <TouchableOpacity style={ styles.tagItem }>
              <Text style={ styles.tagItemText }>#DevC</Text>
            </TouchableOpacity>
            <TouchableOpacity style={ styles.tagItem }>
              <Text style={ styles.tagItemText }>#CoderSchool</Text>
            </TouchableOpacity>
          </View>
          <View style={ styles.contenFooter }>
            <View style={ styles.contentFooterLeft }>
              <TouchableOpacity style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
                <Ionicons name="ios-heart" size={25} color="#9ea7d1" />
              </TouchableOpacity>
              <TouchableOpacity style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
                <Entypo name="message" size={30} color="#9ea7d1" />
              </TouchableOpacity>
            </View>
            <View style={ styles.contentFooterRight }>
              <TouchableOpacity style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
                <FontAwesome name="bookmark" size={25} color="#9ea7d1" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* END content section */}
  
        {/* START tab bottom */}
        <View style={ styles.tabBottom }>
          <TouchableOpacity style={ styles.wrapIconTabBottom }>
            <Ionicons name="ios-options" size={25} color="#6b7596" style={ styles.iconTabBottom } />
          </TouchableOpacity>
          <TouchableOpacity style={ styles.wrapIconTabBottom }>
            <Ionicons name="ios-add-circle-outline" size={25} color="#6b7596" style={ styles.iconTabBottom } />
          </TouchableOpacity>
          <TouchableOpacity style={ styles.wrapIconTabBottom }>
            <Feather name="user" size={25} color="#6b7596" style={ styles.iconTabBottom } />
          </TouchableOpacity>
        </View>
        {/* END tab bottom */}
  
      </View>
    );
  }
}





/**
 * Styles for View
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },


  // START Styles background section
  backgroundSection: {
    flex: 0.55,
    flexDirection: 'row',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    overflow: 'hidden',
  },
  // END Styles background section


  // START header section
  headerSection: {
    flex: 0.18,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 30,
  },
  wrapIconHeaderLeft: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  wrapIconHeaderRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  // END header section


  // START content section
  contentSection: {
    flex: 0.35,
    padding: 30,
  },
  contenHeader: {
    flex: 1,
    flexDirection: 'row',
  },
  leftHeaderTitle: {
    fontSize: 25,
    fontWeight: '700',
    marginBottom: 5,
    color: '#101c3d',
  },
  leftHeaderLocal: {
    flex: 1,
    flexDirection: 'row',
  },
  localText: {
    fontWeight: '500',
    color: '#9ea7d1',
    marginTop: 2,
  },
  rightHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  btnDownload: {
    backgroundColor: FOLLOW_COLOR,
    borderRadius: 20,
    borderTopLeftRadius: 10,
    width: 60,
    height: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    
    elevation: 24,
  },
  contentBody: {
    flex: 1,
  },
  contextText: {
    fontWeight: '500',
    fontSize: 15,
    color: '#343b52',
  },
  contentTag: {
    display: 'flex',
    flexDirection: 'row',
  },
  tagItem: {
    backgroundColor: '#f5f7fb',
    marginRight: 10,
    borderRadius: 15,
  },
  tagItemText: {
    color: '#9ea7d1',
    fontWeight: '500',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  // END content section


  // START footer section
  contenFooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  contentFooterLeft: {
    flex: 0.25,
    flexDirection: 'row',
  },
  // END footer section


  // START tab bottom
  tabBottom: {
    flex: 0.1,
    paddingHorizontal: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  wrapIconTabBottom: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // END tab bottom
});
