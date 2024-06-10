document.addEventListener('DOMContentLoaded', async (event) => {
    const APP_ID = 'cdd84cc8edce463d97a4bab6e50ca6b5'; // Replace with your Agora App ID
    const TOKEN = '007eJxTYBDUn2L7YrrkpK/er9e+8Fuu8NY84kzpY4dNsk83b5y5Op5TgSE5JcXCJDnZIjUlOdXEzDjF0jzRJCkxySzV1CA50SzJNPZAWlpDICPDtEQjRkYGCATxWRhyEzPzGBgA0qohOw=='; // Set to null if not using token authentication
    const CHANNEL = 'main'; // Replace with your Agora channel name

    const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
    let localAudioTrack;

    // Function to join the Agora channel
    const joinChannel = async () => {
        try {
            // Join the channel
            await client.join(APP_ID, CHANNEL, TOKEN, null);

            // Create a local audio track
            localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();

            // Publish the local audio track to the channel
            await client.publish([localAudioTrack]);

            console.log('Successfully joined channel');
        } catch (error) {
            console.error('Failed to join channel', error);
        }
    };

    // Function to leave the Agora channel
    const leaveChannel = async () => {
        try {
            // Leave the channel
            await client.leave();

            // Release the local audio track
            localAudioTrack && localAudioTrack.close();

            console.log('Successfully left channel');
        } catch (error) {
            console.error('Failed to leave channel', error);
        }
    };

    // Function to toggle mute/unmute
    const toggleMute = () => {
        if (localAudioTrack) {
            if (localAudioTrack.isMuted()) {
                localAudioTrack.unmute();
                console.log('Microphone unmuted');
            } else {
                localAudioTrack.mute();
                console.log('Microphone muted');
            }
        }
    };

    // Event listeners for call controls
    document.getElementById('mute-btn').addEventListener('click', toggleMute);
    document.getElementById('end-call-btn').addEventListener('click', leaveChannel);

    // Join the channel when the page loads
    await joinChannel();
});
