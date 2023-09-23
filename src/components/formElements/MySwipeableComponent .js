import React, { useState } from 'react'
import Meeting from '../../pages/Meeting'
import { useSwipeable } from 'react-swipeable';
import { ZoomMtg } from '@zoomus/websdk';

function MySwipeableComponent() {

    const [videoUserIds, setVideoUserIds] = useState([]);
    // let videoIndex = 0;
    const [videoIndex, setVideoIndex] = useState(0);
    const [videoId, setvideoId] = useState();
    const handleSwipe = (direction) => {
        if (direction === 'right') {
            alert('Right');
            // Increment video index and handle wrapping around
            const newIndex = (videoIndex + 1) % videoUserIds.length;
            setVideoIndex(newIndex);
        } else if (direction === 'left') {
            // Decrement video index and handle wrapping around
            const newIndex = (videoIndex - 1 + videoUserIds.length) % videoUserIds.length;
            setVideoIndex(newIndex);
        }

        // Get the new video ID based on the updated index
        const videoId = videoUserIds[videoIndex];
        setvideoId(videoId);

    };


    const handlers = useSwipeable({
        onSwipedLeft: () => handleSwipe('left'),
        onSwipedRight: () => handleSwipe('right'),
    });

    ZoomMtg.inMeetingServiceListener('onUserJoin', function (data) {
        if (data.isHost || data.isCoHost) {
            videoUserIds.push(data.userId);
        }
    });

    console.log(handlers);
    return (
        <div {...handlers}  >

            <Meeting videoId={videoId} />

        </div>
    )
}

export default MySwipeableComponent 