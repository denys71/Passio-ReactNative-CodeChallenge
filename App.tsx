/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useReducer} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LBS2KG = 0.453592;
const FT2M = 0.3048;
const KEY = '@data';

const calc = (value: number, isImperial: boolean, div: number) => {
  let newValue;
  if (isImperial) {
    newValue = value / div;
  } else {
    newValue = value * div;
  }
  return newValue.toString();
};

enum ActionKind {
  WEIGHT_CHANGE = 'weight-change',
  HEIGHT_CHANGE = 'height-change',
  UNIT_CHANGE = 'unit-change',
}

interface MyAction {
  type: ActionKind;
  value: string;
  imperial: boolean;
}

interface MyState {
  weight: string;
  height: string;
  isImperial: boolean;
}

const InitialSate = {
  weight: '',
  height: '',
  isImperial: true,
};
function myReducer(state: MyState, action: MyAction) {
  const {type, value, imperial} = action;
  switch (type) {
    case ActionKind.WEIGHT_CHANGE:
      return {...state, weight: value};
    case ActionKind.HEIGHT_CHANGE:
      return {...state, height: value};
    case ActionKind.UNIT_CHANGE:
      let newWeightValue = state.weight;
      if (state.weight.length > 0) {
        newWeightValue = calc(Number(state.weight), imperial, LBS2KG);
      }
      let newHiehgtValue = state.height;
      if (state.height.length > 0) {
        newHiehgtValue = calc(Number(state.height), imperial, FT2M);
      }
      return {
        isImperial: imperial,
        weight: newWeightValue,
        height: newHiehgtValue,
      };
    default:
      return state;
  }
}
const App = () => {
  const [state, dispatch] = useReducer(myReducer, InitialSate);

  const loadData = async () => {
    try {
      const data = await AsyncStorage.getItem(KEY);
      if (data) {
        const {weight, height, isImperial} = JSON.parse(data);
        dispatch({
          type: ActionKind.UNIT_CHANGE,
          value: '',
          imperial: isImperial,
        });
        dispatch({
          type: ActionKind.WEIGHT_CHANGE,
          value: weight,
          imperial: state.isImperial,
        });
        dispatch({
          type: ActionKind.HEIGHT_CHANGE,
          value: height,
          imperial: state.isImperial,
        });
      }
    } catch (e) {
      console.log('reading error', e);
    }
  };
  const onSave = () => {
    const data = {
      weight: state.weight,
      height: state.height,
      isImperial: state.isImperial,
    };
    try {
      AsyncStorage.setItem(KEY, JSON.stringify(data));
    } catch (e) {
      console.log('writing error', e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <SafeAreaView>
      <StatusBar barStyle={'dark-content'} />
      <View style={styles.Container}>
        <View style={styles.SectionContainer}>
          <Text style={styles.Label}>Weight:</Text>
          <TextInput
            style={styles.ValueText}
            keyboardType="decimal-pad"
            value={state.weight}
            onChangeText={text =>
              dispatch({
                type: ActionKind.WEIGHT_CHANGE,
                value: text,
                imperial: state.isImperial,
              })
            }
          />
          <Text style={styles.Label}>{state.isImperial ? 'lbs' : 'kg'}</Text>
        </View>
        <View style={styles.SectionContainer}>
          <Text style={styles.Label}>Height:</Text>
          <TextInput
            style={styles.ValueText}
            keyboardType="decimal-pad"
            value={state.height}
            onChangeText={text =>
              dispatch({
                type: ActionKind.HEIGHT_CHANGE,
                value: text,
                imperial: state.isImperial,
              })
            }
          />
          <Text style={styles.Label}>{state.isImperial ? 'ft' : 'm'}</Text>
        </View>
        <View style={styles.SectionContainer}>
          <Text style={styles.Label}>Units: </Text>
          <CheckBox
            // disabled={state.isImperial}
            value={state.isImperial}
            onValueChange={newValue =>
              dispatch({
                type: ActionKind.UNIT_CHANGE,
                value: '',
                imperial: newValue,
              })
            }
            boxType="square"
            style={styles.CheckBox}
          />
          <Text style={styles.Label}>imperial</Text>
          <CheckBox
            // disabled={!state.isImperial}
            value={!state.isImperial}
            onValueChange={newValue =>
              dispatch({
                type: ActionKind.UNIT_CHANGE,
                value: '',
                imperial: !newValue,
              })
            }
            boxType="square"
            style={styles.CheckBox}
          />
          <Text style={styles.Label}>metric</Text>
        </View>

        <TouchableOpacity onPress={onSave} style={styles.SaveBtn}>
          <Text style={styles.Label}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    marginTop: 30,
  },
  SectionContainer: {
    flexDirection: 'row',
    marginTop: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  Label: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
  },
  ValueText: {
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
    width: '50%',
    borderColor: Colors.dark,
    borderWidth: 1,
    borderRadius: 3,
    marginHorizontal: 10,
    padding: 8,
  },
  CheckBox: {
    marginLeft: 10,
    marginRight: 5,
  },
  SaveBtn: {
    marginTop: 30,
    marginHorizontal: 50,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderColor: Colors.dark,
    borderWidth: 1,
    borderRadius: 3,
  },
});

export default App;
