import { IonToast } from "@ionic/react"

function Toast({showToast, setShowToast, text, duration}) {
    return (
        <IonToast
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            message={text}
            duration={duration}
        />
    )
}

export default Toast
