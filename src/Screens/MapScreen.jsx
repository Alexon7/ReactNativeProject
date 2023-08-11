import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { data } from '../Source/posts';



const MapScreen = ({ route }) => {
	// const { longitude, latitude } = route.params.location;
	// const coords = route.params.coords;
	
	// console.log(longitude);
	// console.log(latitude);
	return (
		<View style={styles.container}>
			<MapView
				style={styles.mapStyle}
				region={{
				// 	latitude: coords.latitude,
				// 	longitude: coords.longitude,
					latitudeDelta: 1,
					longitudeDelta: 1,
				}}
				mapType="standard"
				maxZoomLevel={10}
			>
				<Marker
					title="You here"
					coordinate={{
						latitude: 47.097133,
                        longitude: 37.543367}}
					
					// coordinate={{
					// 	latitude: coords.latitude,
					// 	longitude: coords.longitude,
					// }}
				/>
			</MapView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
	},
	mapStyle: {
		width: '100%',
		height: '100%',
	},
});

export default MapScreen;


