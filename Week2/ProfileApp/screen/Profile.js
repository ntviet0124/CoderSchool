/**
 * Import React and Component needd for component
 */
import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Alert, StatusBar } from 'react-native';
import { Ionicons, Feather, SimpleLineIcons } from '@expo/vector-icons';





/**
 * Defind general color value
 */
const FOLLOW_COLOR = 'rgb(71,113,246)';
const SEND_MESSAGE_COLOR = 'rgb(120,213,250)';





/**
 * Render View
 */
export default class ProfileScreen extends React.Component {

  // Hidden header navigator
  static navigationOptions = {
      header: null
  }

  render() {

    const imgData = [
      { id: 1, imgSource: require('../assets/image/image1.jpg') },
      { id: 2, imgSource: require('../assets/image/image2.jpg') },
      { id: 3, imgSource: require('../assets/image/image3.jpg') },
      { id: 4, imgSource: require('../assets/image/image4.jpg') },
      { id: 5, imgSource: require('../assets/image/image5.jpg') },
      { id: 6, imgSource: require('../assets/image/image6.jpg') },
      { id: 7, imgSource: require('../assets/image/image7.jpg') },
      { id: 8, imgSource: require('../assets/image/image8.jpg') },
      { id: 9, imgSource: require('../assets/image/image9.jpg') },
      { id: 10, imgSource: require('../assets/image/image10.jpg') },
    ];
  
    const centerImgData = Math.floor(imgData.length / 2);
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>

        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
  
        <View style={ styles.headerSection }>
          <TouchableOpacity style={ styles.wrapIconHeaderLeft }>
            <Feather name="arrow-left" size={25} color="#6b7596" />
          </TouchableOpacity>
          <TouchableOpacity style={ styles.wrapIconHeaderRight }>
            <SimpleLineIcons name="grid" size={20} color="#6b7596" />
          </TouchableOpacity>
        </View>
        
        {/* START info section */}
        <View style={ styles.infoSection }>
  
          <View style={ styles.wrapInfoAvatar }>
            <Image
              style={ styles.avatarImage}
              source={require('../assets/avatar.jpeg')}/>
          </View>
  
          <View style={ styles.wrapInfoPerson }>
  
            <Text style={ styles.infoPersonName }>Nguyen Tuan Viet</Text>
            <Text style={ styles.infoPersonJob }>Developer</Text>
  
            <View style={ styles.infoPersonWrapBtn }>
              <TouchableOpacity style={ [styles.btnFollow, styles.btnShadow] } onPress={() => Alert.alert('Notify', 'Followed')}>
                <Text style={ styles.textBtnFollow }>Follow</Text>
              </TouchableOpacity>
              <TouchableOpacity style={ [styles.btnSend, styles.btnShadow] } onPress={() => Alert.alert('Notify', 'Message sended')}>
                <Ionicons name="ios-send" size={22} color="#fff" style={ styles.textBtnSend } />
              </TouchableOpacity>
            </View>
  
          </View>
  
        </View>
        {/* END info section */}
  
        {/* START statis section */}
        <View style={ styles.statisSection }>
          <View style={ styles.statisItem }>
            <Text style={ styles.statisItemCount }>210</Text>
            <Text style={ styles.statisItemTitle }>Photos</Text>
          </View>
          <View style={ styles.statisItem }>
            <Text style={ styles.statisItemCount }>15k</Text>
            <Text style={ styles.statisItemTitle }>Followers</Text>
          </View>
          <View style={ styles.statisItem }>
            <Text style={ styles.statisItemCount }>605</Text>
            <Text style={ styles.statisItemTitle }>Following</Text>
          </View>
        </View>
        {/* END statis section */}
  
        {/* START gallery section */}
        <View style={ styles.gallerySection }>
          <ScrollView contentContainerStyle={{ flexGrow: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
          {imgData.map(item => {
            return (
              <TouchableOpacity
                style={ styles.wrapGalleryItem } key={item.id}
                onPress={() => navigate('Photo', {id: item.imgSource})}
              >
                <Image style={ styles.galleryItem } source={item.imgSource} resizeMode="cover" />
              </TouchableOpacity>
            );
          })}
          </ScrollView>
        </View>
        {/* END gallery section */}
  
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


  // START Styles info section
  infoSection: {
    flex: 0.2,
    flexDirection: 'row',
    // backgroundColor: 'red',
  },
  wrapInfoAvatar: {
    flex: 0.4,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  wrapInfoPerson: {
    flex: 0.6,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  infoPersonName: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 5,
    color: '#101c3d',
  },
  infoPersonJob: {
    color: '#acadba',
    fontSize: 15,
    fontWeight: '500',
  },
  infoPersonWrapBtn: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15,
  },
  btnFollow: {
    backgroundColor: FOLLOW_COLOR,
    borderRadius: 20,
  },
  textBtnFollow: {
    color: '#fff',
    fontWeight: '400',
    paddingHorizontal: 25,
    paddingBottom: 3,
    paddingTop: 5,
    fontSize: 16,
  },
  btnSend: {
    backgroundColor: SEND_MESSAGE_COLOR,
    borderRadius: 20,
    marginLeft: 10,
  },
  textBtnSend: {
    paddingHorizontal: 25,
    paddingVertical: 3,
    transform: [{rotate: '42deg'}],
  },
  btnShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    
    elevation: 24,
  },
  // END Styles info section


  // START Styles statis secttion
  statisSection: {
    flex: 0.1,
    flexDirection: 'row',
    // backgroundColor: 'blue',
  },
  statisItem: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  statisItemCount: {
    fontSize: 25,
    fontWeight: '600',
    color: '#101c3d',
    marginBottom: 6,
  },
  statisItemTitle: {
    fontWeight: '500',
    color: '#acadba',
  },
  // END Styles statis secttion

  
  // START Styles gallery secttion
  gallerySection: {
    flex: 0.5,
    paddingHorizontal: 30,
  },
  wrapGalleryItem: {
    padding: 5,
    width: '50%',
  },
  galleryItem: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  // END Styles gallery secttion


  // START header section
  headerSection: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 30,
    // backgroundColor: 'green',
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


  // START tab bottom
  tabBottom: {
    flex: 0.1,
    paddingHorizontal: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    // backgroundColor: 'yellow',
  },
  wrapIconTabBottom: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // END tab bottom
});
