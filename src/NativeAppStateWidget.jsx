import { AppState, View } from "react-native";
import { Component, createElement } from "react";

export class NativeAppStateWidget extends Component {
    onAppStateChangeHandler = this.onAppStateChange.bind(this);
    appState = AppState.currentState;
    listenerReturn = null;

    componentDidMount() {
        this.listenerReturn = AppState.addEventListener("change", this.onAppStateChangeHandler);
    }

    render() {
        return <View></View>;
    }

    onAppStateChange(nextAppState) {
        if (this.appState === nextAppState) {
            return;
        }

        const { onBackgroundAction, onResumeAction } = this.props;
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

        this.appState = nextAppState;
    }

    componentWillUnmount() {
        if (this.listenerReturn) {
            this.listenerReturn.remove();
        }
    }
}
