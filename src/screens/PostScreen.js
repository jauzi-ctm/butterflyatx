import React from 'react';
import { useNavigation } from '@react-navigation/native';
import ButtonUjval from '../components/ButtonUjval'; 

const PostScreen = () =>
{
    const navigation = useNavigation();
    const pickupGamesPost ={
        label: 'Post Pickup Games',
        whatAction: () => navigation.navigate('pickupForm'),  
    };

    const individualEventsPost ={
        label: 'Post Individual Events',
        whatAction: () => navigation.navigate('individualForm'),  
    };

    const communityEventsPost ={
        label: 'Post Community Events',
        whatAction: () => console.log('Community Events'),  
    };
    
    return(
        <>
        <ButtonUjval data={pickupGamesPost} />
        <ButtonUjval data={individualEventsPost} />
        <ButtonUjval data={communityEventsPost} />
        </>
    )

}

export default PostScreen