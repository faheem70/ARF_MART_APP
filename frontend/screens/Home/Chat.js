import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const Chat = () => {
    useEffect(() => {
        // Add your Kommunicate settings here
        const kommunicateSettings = {
            appId: '119eeeca19ad173f3de3c02219bde6910',
            popupWidget: true,
            automaticChatOpenOnNavigation: true,
            clearChatOnFirstTimeUser: true, // Add this property to clear chat history
        };

        // Create a stringified JSON representation of the settings
        const settingsJSON = JSON.stringify(kommunicateSettings);

        // Inject Kommunicate settings and chat widget script into the WebView
        const script = `
      (function () {
        var kommunicateSettings = ${settingsJSON};
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
        var h = document.getElementsByTagName("head")[0];
        h.appendChild(s);
        window.kommunicate = m;
        m._globals = kommunicateSettings;
      })();
    `;

        // Execute the script in the WebView
        window.postMessage(script, '*');
    }, []);

    return (
        <View style={styles.container}>
            <WebView
                source={{ html: '<div id="root"></div>' }}
                javaScriptEnabled={true}
                onMessage={(event) => {
                    // Handle messages from the WebView if needed
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Chat;
