/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from './types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Contract:'Contract',
      Main: {
        screens: {
          TabHome: {
            screens: {
              TabHome:'TabHome'
            },
          },
          TabPayment: {
            screens: {
              TabPayment: 'TabPayment',
            },
          },
          TabRequest: {
            screens: {
              TabRequest: 'TabRequest',
            },
          },
          TabInfo: {
            screens: {
              TabInfo: 'TabInfo',
            },
          },
        },
      },
      Login :{
        screens:{
          one:{screens:{
            Login:'Login'
          }},
         
          two:{}
         
        }
      }
    },
  },
};

export default linking;
