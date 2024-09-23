import { AppState, View } from "react-native";
import { createElement, useEffect } from "react";

export function NativeAppStateWidget(props) {
    const { onBackgroundAction, onResumeAction } = props;

    useEffect(() => {
        const subscription = AppState.addEventListener("change", nextAppState => {
            // console.info("Next appState: " + nextAppState);
            if (nextAppState === "background" || nextAppState === "inactive") {
                if (onBackgroundAction && onBackgroundAction.canExecute && !onBackgroundAction.isExecuting) {
                    onBackgroundAction.execute();
                }
            }

            if (nextAppState === "active") {
                if (onResumeAction && onResumeAction.canExecute && !onResumeAction.isExecuting) {
                    onResumeAction.execute();
                }
            }
        });

        return () => {
            subscription.remove();
        };
    }, [onBackgroundAction, onResumeAction]);
    return <View></View>;
}
