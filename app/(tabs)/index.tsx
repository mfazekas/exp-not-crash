import { Image, StyleSheet, Platform, View, TextInput, ScrollView, Button } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';

import * as Notifications from 'expo-notifications';

import {
  reloadAsync,
} from 'expo-updates'

function BusyComponent({n,d}: {n:number, d:number}) {
  const items = Array.from(Array(n).keys())
  //console.log("Items", items)
  return (
    <View style={{backgroundColor:'blue', minHeight: 20, minWidth: 20, flexDirection: 'row', flexWrap: 'wrap'}}>
    <View style={{width:3*5, height: 3*5, backgroundColor: 'red', borderRadius: 2}} key={`item1111`} />
    {items.map((i) => (
      <View style={{width:(i*5+d)/10.0, height: (i*5+d)/10.0, backgroundColor: 'red', borderRadius: i-1}} key={`item${i*d}`} >
      {((i % 4) == 0) && <TextInput value={String(n*d*`pp:${i*7+d*19}`)}/>}
      </View>
    ))}
    </View>
  )
}

function AnimatedStuff() {
  const [actD, setActD] = useState(0)
  console.log("render")
  requestAnimationFrame(() => {
    setActD((actD+1)%100)
  })
  return (<BusyComponent n={21+10*(actD%7)} d={actD} />)
}

function NotificationWhileReloadTesterComponent() {
  return (
    <>
    <Button title="Ask for notify & reload" onPress={async () => {
    console.log("=> bef req perm")
    setTimeout(() => {
      console.log("before reload")
      reloadAsync()
      console.log("reload issued")
    },2000)
    const ret = await Notifications.requestPermissionsAsync()
    console.log("=> after req perm", ret)
    console.log("after req perm", ret)
    }} />
    </>
  )
}

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1234: Try it</ThemedText>
        <NotificationWhileReloadTesterComponent />
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({ ios: 'cmd + d', android: 'cmd + m' })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
