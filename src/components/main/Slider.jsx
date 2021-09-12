import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonLabel, IonSlide } from "@ionic/react"
import { home, options, settings } from "ionicons/icons"
import { useState } from "react"
import { useSelector } from "react-redux";
import { useHistory } from 'react-router';
import "./slider.css"

function Slider() {
    const [isOpen, setIsOpen] = useState(false)
    const history = useHistory()
    const user = useSelector(state => state.user)
    
    return (
        <>
            <IonSlide>
                <IonCard
                    color="primary"
                    className="card"
                >
                    <IonCardHeader>
                        <IonCardSubtitle>Баланс</IonCardSubtitle>
                        <IonCardTitle>{user?.username}</IonCardTitle>
                    </IonCardHeader>

                    <IonCardContent>
                        <IonCardTitle style={{ fontSize: "30px" }}>&#8376; {user?.balance}</IonCardTitle>
                    </IonCardContent>
                    <div className="right-menu">
                        <IonButton fill="clear" shape="round" size="small" onClick={() => setIsOpen(!isOpen)}>
                            <IonIcon slot="icon-only" color="medium" icon={settings} />
                        </IonButton>
                    </div>
                    <div className={isOpen ? "settings" : "settings-closed"}>
                        <IonButton fill="clear" shape="round" size="small" onClick={() => history.push("/user")}>
                            <IonIcon slot="start" size="large" color="light" icon={options} />
                            <IonLabel color="light">Изменить</IonLabel>
                        </IonButton>
                        {/* <IonButton fill="clear" shape="round" size="small">
                            <IonIcon slot="start" size="large" color="light" icon={home} />
                            <IonLabel color="light">test</IonLabel>
                        </IonButton>
                        <IonButton fill="clear" shape="round" size="small">
                            <IonIcon slot="start" size="large" color="light" icon={home} />
                            <IonLabel color="light">test</IonLabel>
                        </IonButton> */}
                    </div>
                </IonCard>
            </IonSlide>
            {/* <IonSlide>
                <IonCard
                    color="primary"
                    className="card"
                >
                    <IonCardHeader>
                        <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                        <IonCardTitle>Card Title</IonCardTitle>
                    </IonCardHeader>

                    <IonCardContent>
                    </IonCardContent>
                </IonCard>
            </IonSlide> */}
        </>
    )
}

export default Slider
