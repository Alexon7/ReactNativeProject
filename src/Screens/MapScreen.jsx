import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';



const MapScreen = ({ route }) => {
	const { longitude, latitude } = route.params.location;
	return (
		<View style={styles.container}>
			<MapView
				style={styles.mapStyle}
				region={{
					latitude,
					longitude,
					latitudeDelta: 1,
					longitudeDelta: 1,
				}}
				mapType="standard"
				maxZoomLevel={10}
			>
				<Marker
					title="You here"
					coordinate={{ longitude, latitude }}
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

