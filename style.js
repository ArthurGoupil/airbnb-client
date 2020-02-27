import { StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';

const mainRed = '#F35960';
const mainGrey = '#BBBBBB';

export default StyleSheet.create({
  // MAIN STYLING
  constants: {
    paddingTop: Constants.statusBarHeight
  },
  isFull: {
    width: '100%'
  },

  // BACKGROUND STYLING
  bgIsRed: {
    backgroundColor: mainRed
  },

  // FONT STYLING
  isWhite: {
    color: 'white'
  },
  isBlack: {
    color: 'black'
  },
  isRed: {
    color: mainRed
  },
  isGrey: {
    color: mainGrey
  },
  is12: {
    fontSize: 12,
    lineHeight: 18
  },
  is16: {
    fontSize: 16,
    lineHeight: 24
  },
  is17: {
    fontSize: 17,
    lineHeight: 22
  },
  is18: {
    fontSize: 18,
    lineHeight: 22
  },
  is24: {
    fontSize: 24,
    lineHeight: 30
  },
  is28: {
    fontSize: 28,
    lineHeight: 34
  },
  isBold: {
    fontWeight: 'bold'
  },
  isUnderlined: {
    textDecorationLine: 'underline'
  },

  // FLEX-BOX
  flex1: {
    flex: 1
  },
  flex2: {
    flex: 2
  },
  flex3: {
    flex: 3
  },
  flex4: {
    flex: 4
  },
  justifyCenter: {
    justifyContent: 'center'
  },
  spaceBetween: {
    justifyContent: 'space-between'
  },
  spaceAround: {
    justifyContent: 'space-around'
  },
  alignCenter: {
    alignItems: 'center'
  },
  alignStart: {
    alignItems: 'flex-start'
  },
  alignEnd: {
    alignItems: 'flex-end'
  },
  flexRow: {
    flexDirection: 'row'
  },
  flexRows: {
    alignItems: 'flex-end'
  },
  justifyStart: {
    justifyContent: 'flex-start'
  },

  // COMPONENTS STYLING
  // Input
  input: {
    width: '80%',
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'white'
  },
  // Button
  button: {
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 30
  },
  // RoomBloc
  roomBloc: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: mainGrey
  },
  roomBlocImgContainer: {
    position: 'relative'
  },
  roomBlocImg: {
    width: '100%',
    height: 240,
    marginBottom: 10
  },
  roomBlocPriceContainer: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'black',
    padding: 10
  },
  ratingStarsContainer: {
    width: '50%',
    marginRight: 20
  },
  // Room Details
  roomDetails: {
    width: '73%'
  },
  roomDetailsUserImg: {
    width: 60,
    height: 60,
    borderRadius: 50
  },
  reviewsContainer: {
    marginTop: 5
  },

  // SCREENS STYLING
  // Sign in
  logo: {
    width: 120,
    height: 120,
    marginTop: 20
  },
  signinInputContainer: {
    height: '20%'
  },
  signinActionsContainer: {
    height: '13%'
  },
  // Sign up
  signupInputContainer: {
    height: '50%'
  },
  longInput: {
    width: '80%',
    height: 96,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 8,
    borderWidth: 1,
    borderColor: 'white',
    marginTop: 10
  },
  // Home
  homeScreenScrollView: {
    padding: 25
  },
  // Room
  roomScreenBottom: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20
  },
  viewPager: {
    height: 250
  }
});
