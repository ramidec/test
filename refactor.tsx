import React, {useCallback, useEffect, useState, FunctionComponent} from 'react'
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Button,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native'
import someListener from 'some-listener-library'

/*
  PURPOSE: The purpose of this exercise is for you to demonstrate
  your understanding and ability to work with React Native components.

  TASK: 
  - Refactor this component to make use of React Hooks.
  - Identify and address any performance issues.
  - Identify and address any poor code practices/implementation.
  - In the comment block at the end of the file, write any notes about
  what you did, anything you've identified and improved.
*/

/*
  THINGS TO NOTE: 
  - someListener returns a function with a remove method on it.

  - This component is implemented poorly on purpose.

  - This file is not meant to compile nor depend on the help of
  linting or formatting tools. It is simple enough that we expect
  you to identify what can be improved with it visually.
*/

type DataSetItem = {
  title: string
}

interface RefactorComponentProps {
  dataSet: DataSetItem[]
}

const RefactorComponent: FunctionComponent<RefactorComponentProps> = ({
  dataSet,
}) => {
  const getTimeStamp = () => {
    const date = new Date()
    return date.toLocaleString()
  }

  const [currentTimeStamp, setCurrentTimeStamp] = useState(getTimeStamp())

  useEffect(() => {
    someListener.register((e) => {
      // This callback for the listener is arbitrary and can
      // be ignored for this exercise
    })
    return someListener.remove()
  }, [])
  
  const _onPress = (item: DataSetItem) =>
    console.log(`Does pressing things with ${item.title}`)

  const renderTimeItem = useCallback(
    ({item}) => (
      <TouchableOpacity onPress={() => _onPress(item)}>
        <View style={styles.itemContainer}>
          <Text>{item.title}</Text>
          <Text>{getTimeStamp()}</Text>
        </View>
      </TouchableOpacity>
    ),
    [],
  )

  return (
    <View style={styles.mainContainer}>
      <View style={styles.timeTitle}>
        <Text
          style={styles.textTitle}>{`Current Time: ${currentTimeStamp}`}</Text>
        <Button
          title="Update Timestamp"
          onPress={() => setCurrentTimeStamp(getTimeStamp())}
        />
      </View>
      <FlatList data={dataSet} renderItem={renderTimeItem} />
    </View>
  )
}

const styles = StyleSheet.create<{
  mainContainer: ViewStyle
  timeTitle: ViewStyle
  itemContainer: ViewStyle
  textTitle: TextStyle
}>({
  mainContainer: {flex: 1, padding: 30, marginTop: 30},
  timeTitle: {width: '100%', height: 60},
  itemContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginVertical: 2,
  },
  textTitle: {textAlign: 'center', fontWeight: '500', fontSize: 18},
})

export default RefactorComponent

/*
  Write your notes below:
  - Moved all the logic from the class based component to a functional component
    - Use of hooks (useState, useEffect) to achieve desired results
  - Included some basic typing with Typescript
  - Removed listener memory leak
  - Moved existing styles to stylesheet to improve code readability
    - Added some more basic styles for good visiblity
  - Used useCallback for memoization of the renderItem function
  - Use of TouchableOpacity for visual effects instead of TouchableHighlight
*/
