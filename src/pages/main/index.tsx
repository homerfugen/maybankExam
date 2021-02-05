import { AppBar, Box, Container, Toolbar, Typography } from '@material-ui/core';
import GoogleMapReact from 'google-map-react';
import Autocomplete from 'react-google-autocomplete';
import React, { Dispatch, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { StateType } from './model';

interface GeoLocation {
    geometry: {
        location: {
            lat: () => number;
            lng: () => number;
        }
    }
}

interface MainPageProps {
    dispatch: Dispatch<any>;
    mainPageReducer: StateType;
}

interface MapSettings {
    lat: number;
    lng: number;
    zoom: number;
}

const MainPage: React.FC<MainPageProps> = (props) => {

    const [mapSettings, setMapSettings] = useState<MapSettings>({
        lat: 3.161,
        lng: 101.696,
        zoom: 8
    });

    const handlePlaceSelected = (event: GeoLocation) => {
        const { dispatch } = props;
        dispatch({
            type: 'MainModel',
            payload: {
                lat: event.geometry.location.lat(),
                lng: event.geometry.location.lng()
            }
        });
    }

    useEffect(() => {
        if (props.mainPageReducer.coordinates) {
            const { lat, lng } = props.mainPageReducer.coordinates;
            if (lat && lng) {
                setMapSettings({
                    lat: lat,
                    lng: lng,
                    zoom: 16
                })
            }
        }
    }, [props.mainPageReducer])

    return (
        <Container disableGutters maxWidth={false}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        Search Location
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box m={2} height="50%">
                <Container maxWidth="lg">
                    <div style={{ height: '75vh', width: '100%' }}>
                        <GoogleMapReact bootstrapURLKeys={{ key: 'AIzaSyABOFQNLMiTVN0AG3eWNmspVfVC8gNda68' }}
                            center={{ lat: mapSettings.lat, lng: mapSettings.lng }}
                            zoom={mapSettings.zoom}
                            options={{
                                gestureHandling: "greedy"
                            }}>
                        </GoogleMapReact>
                    </div>
                </Container>
            </Box>
            <Box m={2}>
                <Container maxWidth="lg">
                    <Autocomplete
                        style={{ width: "100%", height: "40px" }}
                        apiKey={'AIzaSyABOFQNLMiTVN0AG3eWNmspVfVC8gNda68'}
                        types={['(regions)']}
                        onPlaceSelected={handlePlaceSelected} />
                </Container>
            </Box>
        </Container >
    )
}

export default connect((state: StateType) => (state))(MainPage);